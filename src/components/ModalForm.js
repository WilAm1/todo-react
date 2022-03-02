import React, { useState } from "react";

export default function Modal({ show, handleClose }) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    date: "",
    priority: "medium",
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
  };

  return (
    <div className={showHideClassName}>
      <div className="modal-content modal-main">
        <div className="modal-header">
          <h3>This is a modal!</h3>
          <button onClick={handleClose}>X</button>
        </div>
        <div className="modal-body">
          make some form for the task content
          <form className="form form-new-task" onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="title">Title</label>
              <input
                onChange={handleInputChange}
                name="name"
                type="text"
                value={formValues.name}
                placeholder="Run for your life!"
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="desc">Description</label>
              <textarea
                onChange={handleInputChange}
                name="description"
                type="text"
                value={formValues.description}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="due-date">Date</label>
              <input
                onChange={handleInputChange}
                name="date"
                type="date"
                value={formValues.date}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="priority">Priority</label>{" "}
              <select
                name="priority"
                id="priority"
                value={formValues.priority}
                onChange={handleInputChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <button>Add Task</button>
            <button onClick={handleClose} type="button">
              Close
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
