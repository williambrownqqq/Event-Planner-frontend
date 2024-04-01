import { useState } from "react";
import '../../styles/addDynamicInputFields.css';
export default function AddDynamicInputFields({ setTasks }) {
//   const [tasks, setTasks] = useState([{ taskTitle: "", taskDescription: "" }]);

//   const handleAddInput = () => {
//     setTasks([...tasks, { taskTitle: "",  taskDescription: "" }]);
//   };

//   const handleChange = (event, index) => {
//     let { name, value } = event.target;
//     let onChangeValue = [...tasks];
//     onChangeValue[index][name] = value;
//     setTasks(onChangeValue);
//   };

//   const handleDeleteInput = (index) => {
//     const newArray = [...tasks];
//     newArray.splice(index, 1);
//     setTasks(newArray);
//   };

const [inputs, setInputs] = useState([{id: 1, taskTitle: "", taskDescription: "" }]);

const handleAddInput = () => {
  const newId = inputs.length + 1; // Generate a unique id
  setInputs([...inputs, { id: newId, taskTitle: "", taskDescription: "" }]);
};

const handleChange = (event, index) => {
  let { name, value } = event.target;
  let newInputs = [...inputs];
  newInputs[index][name] = value;
  setInputs(newInputs);
  setTasks(newInputs); // Update the tasks in the parent component
};

const handleDeleteInput = (index) => {
  const newArray = [...inputs];
  newArray.splice(index, 1);
  setInputs(newArray);
  setTasks(newArray); // Update the tasks in the parent component
};


  return (
    <div className="container_form">
      {inputs.map((task, index) => (
        <div className="input_container" key={task.id}>
          <p>Title:</p>
          <input
            name="taskTitle"
            type="text"
            placeholder="title" 
            value={task.taskTitle}
            onChange={(event) => handleChange(event, index)}
          />
          <p>Description</p>
          <input
            name="taskDescription"
            type="text"
            placeholder="description"
            value={task.taskDescription}
            onChange={(event) => handleChange(event, index)}
          />
        
          {inputs.length > 1 && (
            <button onClick={() => handleDeleteInput(index)}>Delete</button>
          )}
          {index === inputs.length - 1 && (
            <button onClick={() => handleAddInput()}>Add</button>
          )}
        </div>
      ))}

      {/* <div className="body"> {JSON.stringify(inputs)} </div> */}
    </div>
  );
}