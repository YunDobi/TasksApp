import Head from 'next/head';

import { initializeApollo } from '../lib/client';
import { TasksDocument, TasksQuery, useTasksQuery } from '../generated/graphql-fontend';
import TaskList from '../components/TaskLists';
import CreateTaskForm from '../components/CreateTaskForm';


export default function Home() {
  const result = useTasksQuery();
  const tasks = result.data?.tasks;

  // console.log("tasks console",tasks)

  return (
    <div>
      <Head>
        <title>Tasks</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CreateTaskForm onSuccess={result.refetch} />
      {result.loading ? (
        <p>Loading Tasks...</p>
      ) : result.error ? (
        <p>An error ocurred</p>
      ) : tasks && tasks.length > 0 ? (
      <TaskList  tasks={tasks} />
      ) : <p className='no-tasks-message'>You're got no tasks.</p>}
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