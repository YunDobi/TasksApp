import Head from 'next/head';

import { initializeApollo } from '../lib/client';
import { TasksDocument, TasksQuery, useTasksQuery } from '../generated/graphql-fontend';


export default function Home() {
  const result = useTasksQuery();
console.log(result.data)
  const tasks = result.data?.tasks;

  return (
    <div>
      <Head>
        <title>Tasks</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {tasks &&
        tasks.length > 0 &&
        tasks.map((task) => {
          return (
            <div key={task.id}>
              {task.title} ({task.status})
            </div>
          );
        })}
    </div>
  );
}

export const getStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query<TasksQuery>({
    query: TasksDocument,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};