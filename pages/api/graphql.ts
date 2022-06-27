import { createServer } from '@graphql-yoga/node';
import { IResolvers } from '@graphql-tools/utils';

import mysql from "../../node_modules/serverless-mysql/index"
import { schema } from '../../backend/schema';


const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD,
    user: process.env.MYSQL_USER
  }
})

const server = createServer({
  schema,
  context: {db},
  endpoint: '/api/graphql',
  // graphiql: false // uncomment to disable GraphiQL
})

export default server