import { Resolvers, TaskStatus } from "../generated/graphql-backend"
import {ServerlessMysql} from 'serverless-mysql';
import { OkPacket} from "mysql";


interface TaskDbRow {
  id: number
  title: string
  task_status: TaskStatus
}

type TasksDbQueryResult = TaskDbRow[];
type TaskDbQueryResult = TaskDbRow[];

const getTaskById = async (id: number, db: ServerlessMysql) => {
  const tasks = await db.query<TaskDbQueryResult>('SELECT id, title, task_status FROM Tasks WHERE id=?', [id]);
  return tasks.length ? {id: tasks[0].id, title: tasks[0].title, status: tasks[0].task_status} : null;
}

interface ApolloContext {
  db: ServerlessMysql
}

//

interface Task {
  id: number
  title: string
  status: TaskStatus
}

export const resolvers: Resolvers<ApolloContext> = {
  Query: {
    //args for the options for the query **context = does not need the ApolloContext. just db.query
    async tasks(parent, args, context) {
      const {status} = args;

      let query = 'select id, title, task_status from Tasks';
      const queryParams: string[] = [];
      if (status) {
        query += ' WHERE task_status = ?';
        queryParams.push(status)
      }
      // console.log(query, queryParams)
      let tasks = await context.db.query<TasksDbQueryResult>(query, queryParams);
      await context.db.end();
      return tasks.map(({id, title, task_status}) => ({id, title, status: task_status}))
    },

    async task(parent, args, context) {
      // const tasks = await db.query<TaskDbQueryResult>('SELECT id, title, task_status FROM Tasks WHERE id=?', [args.id]);
      return await getTaskById(args.id, context.db);
    },
  },
  Mutation: {
    // **context does need Apollo interface just db.query
    async createTask(parent, args: {input: {title: string} }, context): Promise<Task> {
      //args createTask is method for the inserting the db
      const result = await context.db.query<OkPacket>('INSERT INTO Tasks (title, task_status) Values(?,?)', [args.input.title, TaskStatus.Active])

      return {id: result.insertId, title: args.input.title, status: TaskStatus.Active}
    },
    
    async updateTask(parent, args, context) {
      //divide the optional parameters in the query. Like the title, and task_status
      const colums: string[] = [];
      const sqlParams: any[] = [];

      if (args.input.title) {
        colums.push(' title = ?');
        sqlParams.push(args.input.title)
      }
      if (args.input.status) {
        colums.push(' task_status = ?');
        sqlParams.push(args.input.status);
      }
      sqlParams.push(args.input.id);

      await context.db.query(`UPDATE Tasks SET ${colums.join(",")} Where id = ?`, sqlParams)
      const updateTaks = await getTaskById(args.input.id, context.db);
      return updateTaks;
    },

    async deleteTask(parent, args, context) {
      const task = await getTaskById(args.id, context.db);
      if (!task) {
        throw new Error("could not find the task");
      }
      await context.db.query(`DELETE FROM Tasks WHERE id = ?`, args.id)
      return task;
    },
  }
}