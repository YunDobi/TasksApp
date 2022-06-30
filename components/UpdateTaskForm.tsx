import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { useUpdateTaskMutation } from "../generated/graphql-fontend";

interface Valvues {
  title: string
}

interface Props {
  id: number;
  initialValues: Valvues;
}

const UpdateTaskForm:React.FC<Props> = ({initialValues, id}) => {
  const [value, setValue] = useState<Valvues>(initialValues)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value } = e.target;
    setValue((preValue) => ({...preValue, [name]: value}));
  }

  const [updateTask, {loading, error}] = useUpdateTaskMutation()

  const router = useRouter()

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await updateTask({variables: {input: {title: value.title, id}}})
      if (result.data?.updateTask) {
        router.push('/');
      }
    } catch(e) {
      //log the error.
    };

  } 

  let errorMessage = '';
  if (error) {
    if (error.networkError) {
      errorMessage = 'A netwrok Error ocurred'
    } else {
      errorMessage = "Sorry, an error ocurred."
    }
  }

  return <form onSubmit={handleSubmit}>
    {error && <p className="alert-error">{errorMessage}</p>}
    <p>
      <label className="field-label">Title</label>
      <input type="text" name="title" className="text-input" value={value.title} onChange={handleChange}/>
    </p>
    <p>
      <button className="button" type="submit" disabled={loading}>
        {loading ? 'Loading': 'Save'}
      </button>
    </p>
  </form>
}
export default UpdateTaskForm;