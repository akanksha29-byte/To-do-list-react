import React, { useState } from "react";
import "../App.css";

const App = () => {
  const [task, setTask] = useState([]);
  const [text, setText] = useState("");
  const [count, setCount] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.input.value !== "") {
      setCount(count + 1);
      const newTask = { id: count, task: text, edit: false };
      setTask([...task, newTask]);
    }
    e.target.input.value = "";
  };
  const handleText = (e) => {
    setText(e.target.value);
  };
  const handleEdit = (taskEdit) => {
    const taskArray = [...task];
    const index = taskArray.indexOf(taskEdit);
    taskArray[index] = { ...taskEdit };
    taskArray[index].edit = true;
    setTask([...taskArray]);
  };

  const handleSave = (taskSave) => {
    if (text !== "") {
      const taskArray = [...task];
      const index = taskArray.indexOf(taskSave);
      taskArray[index] = { ...taskSave };
      taskArray[index].task = text;

      taskArray[index].edit = false;
      setTask([...taskArray]);
    }
  };
  const handleDelete = (taskDelete) => {
    const taskArray = task.filter((t) => t.id !== taskDelete.id);
    setTask([...taskArray]);
  };
  return (
    <div id="main">
      <div className="inner-container">
        <h1 className="title">To-do List</h1>
        <form onSubmit={handleSubmit}>
          <input
            id="task"
            rows="2"
            className="task"
            onChange={handleText}
            placeholder="Add task..."
            name="input"
          ></input>
          <button id="btn" className="btn" type="submit">
            Add
          </button>
        </form>
        <ul className="task-list">
          {task.map((i) => {
            return (
              <li key={i.id} className="list">
                {i.edit === false ? (
                  <label id="editTask">{i.task}</label>
                ) : (
                  <input
                    className="task edit"
                    onChange={handleText}
                    placeholder={i.task}
                  />
                )}
                <button onClick={() => handleEdit(i)} className="btn edit">
                  edit
                </button>
                <button
                  onClick={() => handleSave(i)}
                  disabled={i.edit === false ? true : false}
                  className="btn save"
                >
                  save
                </button>
                <button onClick={() => handleDelete(i)} className="btn delete">
                  delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default App;
