import Link from "next/link";
import React from "react";
import { Task } from "../generated/graphql-fontend";

interface props {
  tasks: Task[]
}

const TaskList: React.FC<props> = ({tasks}) => {
  console.log("taskList", tasks.length)
  return (
    <ul className="task-list">
      {tasks.map((task) => {
          return (
            <li className="task-list-item" key={task.id}>
              <Link href="/update/[id]" as={`/update/${task.id}`}>
              <a className="task-list-item-title">{task.title}</a>
              </Link>
            </li>
          );
        })}
    </ul>
  );
}
export default TaskList;