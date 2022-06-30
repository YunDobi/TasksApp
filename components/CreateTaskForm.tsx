import React, { useState } from "react";
import { useCreateTaskMutation } from "../generated/graphql-fontend";

interface props {
  onSuccess: () => void;
}

const CreateTaskForm: React.FC<props> = ({onSuccess}) => {
  //setting the useState and function onChange
  const [title, setTitile] = useState('');
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitile(e.target.value)
  };
  //main fucntions
  const [createTask, {loading, error}] = useCreateTaskMutation({
    onCompleted: () => {
      onSuccess()
      setTitile('')
    }
  })
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loading) {
      try {
        await createTask({variables: {input: {title}}});
      } catch (e) {
        //log
      }
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="alert-error">An error ocurred</p>}
      <input type="text" name="title" placeholder="What would you like to get done?" autoComplete="off" className="text-input new-task-text-input" value={title} onChange={handleTitleChange} />
    </form>
  )

}
export default CreateTaskForm;