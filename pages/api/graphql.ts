import { createServer } from '@graphql-yoga/node';
import { IResolvers } from '@graphql-tools/utils';

import mysql from "../../node_modules/serverless-mysql/index"
import { OkPacket} from "mysql";
import { type } from 'os';

const typeDefs = /* GraphQL */ `
  enum TaskStatus {
    active
    completed
  }

  type Task {
    id: Int!
    title: String!
    status: TaskStatus!
  }
  
  input CreateTaskInput {
    title: String!
  }

  input UpdateTaskInput {
    id: Int!
    title: String
    status: TaskStatus
  }

  type Query {
    tasks(status: TaskStatus): [Task!]!
    task(id: Int!): Task
  }
  type Mutation {
    createTask(input: CreateTaskInput!): Task
    updateTask(input: UpdateTaskInput!): Task
    deleteTask(id: Int!): Task

  }
`

//
enum TaskStatus {
  active = "active",
  completed = "complted"
}

interface TaskDbRow {
  id: number
  title: string
  task_status: TaskStatus
}

type TaskDbQueryResult = TaskDbRow[];

interface ApolloContext {
  db: mysql.ServerlessMysql;
}

//

interface Task {
  id: number
  title: string
  status: TaskStatus
}

const resolvers: IResolvers<any,ApolloContext> = {
  Query: {
    //args for the options for the query **context = does not need the ApolloContext. just db.query
    async tasks(parent, args: {status?: TaskStatus}, context): Promise<Task[]> {
      const {status} = args;

      let query = 'select id, title, task_status from Tasks';
      const queryParams: string[] = [];
      if (status) {
        query += ' WHERE task_status = ?';
        queryParams.push(status)
      }
      console.log(query, queryParams)

      let tasks = await db.query<TaskDbQueryResult>(query, queryParams);
      await db.end();
      return tasks.map(({id, title, task_status}) => ({id, title, status: task_status}))
    },
    task(parent, args, context) {
      return null
    },
  },
  Mutation: {
    // **context does need Apollo interface just db.query
    async createTask(parent, args: {input: {title: string} }, context): Promise<Task> {
      //args createTask is method for the inserting the db
      const result = await db.query<OkPacket>('INSERT INTO Tasks (title, task_status) Values(?,?)', [args.input.title, TaskStatus.active])

      return {id: result.insertId, title: args.input.title, status: TaskStatus.active}
    },
    updateTask(parent, args, context) {
      return null;
    },
    deleteTask(parent, args, context) {
      return null;
    },
  }
}

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD,
    user: process.env.MYSQL_USER
  }
})

const server = createServer({
  schema: {
    typeDefs,
    resolvers,
    context: {db}
  },
  endpoint: '/api/graphql',
  // graphiql: false // uncomment to disable GraphiQL
})

export default server