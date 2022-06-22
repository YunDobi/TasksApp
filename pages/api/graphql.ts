import { createServer } from '@graphql-yoga/node';
import { IResolvers } from '@graphql-tools/utils';

import mysql from "../../node_modules/serverless-mysql/index"

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

// interface ApolloContext {
//   db: mysql.ServerlessMysql;
// }

const resolvers: IResolvers = {
  Query: {
    async tasks(parent, args, context) {
      let results = await db.query('select "HELLO WOLRD" as hello_world;');
      await db.end();
      console.log({results});
      return []
    },
    task(parent, args, context) {
      return null
    },
  },
  Mutation: {
    createTask(parent, args, context) {
      return null
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