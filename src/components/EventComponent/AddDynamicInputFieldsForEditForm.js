// import { useState} from "react";
// import '../../styles/addDynamicInputFields.css';

// export default function AddDynamicInputFieldsForEditForm({ tasks, setTasks }) {
//   const [inputs, setInputs] = useState(tasks || [{ id: 1, taskTitle: "", taskDescription: "" }]);
  
//   const handleAddInput = () => {
//     const newId = inputs.length > 0 ? inputs[inputs.length - 1].id + 1 : 1;
//     setInputs([...inputs, { id: newId, taskTitle: "", taskDescription: "" }]);
//   };

//   const handleChange = (event, index) => {
//     const { name, value } = event.target;
//     const newInputs = [...inputs];
//     newInputs[index][name] = value;
//     setInputs(newInputs);
//     setTasks(newInputs); // Update the tasks in the parent component
//   };

//   const handleDeleteInput = (index) => {
//     const newInputs = [...inputs];
//     newInputs.splice(index, 1);
//     setInputs(newInputs);
//     setTasks(newInputs); // Update the tasks in the parent component
//   };

//   return (
//     <div className="container_form">
//       {inputs.map((task, index) => (
//         <div className="input_container" key={task.id || index}>
//           <p>Title:</p>
//           <input
//             name="taskTitle"
//             type="text"
//             placeholder="title"
//             value={task.taskTitle}
//             onChange={(event) => handleChange(event, index)}
//           />
//           <p>Description</p>
//           <input
//             name="taskDescription"
//             type="text"
//             placeholder="description"
//             value={task.taskDescription}
//             onChange={(event) => handleChange(event, index)}
//           />
//           {inputs.length > 1 && (
//             <button onClick={() => handleDeleteInput(index)}>Delete</button>
//           )}
//         </div>
//       ))}
//       <button onClick={handleAddInput}>Add Task</button>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import '../../styles/addDynamicInputFields.css';
export default function AddDynamicInputFields({ tasks,setTasks }) {

  const [inputs, setInputs] = useState([]);

  useEffect(() => {
    // Initialize inputs state with tasks passed as props
    setInputs(tasks.map((task, index) => ({ id: index + 1, ...task })));
  }, [tasks]);

  const handleAddInput = () => {
    const newId = inputs.length + 1;
    setInputs([...inputs, { id: newId, taskTitle: "", taskDescription: "" }]);
  };

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const newInputs = [...inputs];
    newInputs[index][name] = value;
    setInputs(newInputs);
    setTasks(newInputs);
  };

  const handleDeleteInput = (index) => {
    const newArray = [...inputs];
    newArray.splice(index, 1);
    setInputs(newArray);
    setTasks(newArray);
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
    </div>
  );
}