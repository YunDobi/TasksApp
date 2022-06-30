import React, { useState } from "react";

interface Valvues {
  title: string
}

interface Props {
  initialValues: Valvues;
}

const UpdateTaskForm:React.FC<Props> = ({initialValues}) => {
  const [value, setValue] = useState<Valvues>(initialValues)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value } = e.target;
    setValue((preValue) => ({...preValue, [name]: value}));
  }

  return <form>
    <p>
      <label className="field-label">Title</label>
      <input type="text" name="title" className="text-input" value={value.title} onChange={handleChange}/>
    </p>
    <p>
      <button className="button" type="submit">Save</button>
    </p>
  </form>
}
export default UpdateTaskForm;