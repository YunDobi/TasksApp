import React, { useEffect } from "react";
import { Task, useDeleteTaskMutation } from "../generated/graphql-fontend";
import Link from "next/link";

interface Props {
  task: Task;
}

const TaskListItem: React.FC<Props> = ({ task }) => {
  const [delteTask, { loading, error }] = useDeleteTaskMutation({
    variables: { id: task.id },
    errorPolicy: 'none'
  });
  const handleDeleteClick = async () => {
    try {
      await delteTask();
    } catch (e) {
      //log error
    }
  };

  useEffect(() => {
    if (error) {
      alert("An error is ocurred. Please try again later.");
    }
  }, [error]);

  return (
    <li className="task-list-item" key={task.id}>
      <Link href="/update/[id]" as={`/update/${task.id}`}>
        <a className="task-list-item-title">{task.title}</a>
      </Link>
      <button
        className="task-list-item-delete"
        onClick={handleDeleteClick}
        disabled={loading}
      >
        &times;
      </button>
    </li>
  );
};

export default TaskListItem;
