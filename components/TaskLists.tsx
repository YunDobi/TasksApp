import Link from "next/link";
import React from "react";
import { Task } from "../generated/graphql-fontend";
import TaskListItem from "./TaskListItem";

interface props {
  tasks: Task[]
}

const TaskList: React.FC<props> = ({tasks}) => {
  console.log("taskList", tasks.length)
  return (
    <ul className="task-list">
      {tasks.map((task) => {
          return (
            <TaskListItem key={task.id} task={task} />
          );
        })}
    </ul>
  );
}
export default TaskList;