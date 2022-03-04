import React, { useState, useEffect } from "react";

export default function Modal({
  show,
  handleClose,
  taskNames,
  handleAdd,
  projectNames,
}) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const blankForm = {
    name: "",
    description: "",
    date: "",
    priority: "",
    project: "",
  };
  const [formValues, setFormValues] = useState(blankForm);

  useEffect(() => {
    window.addEventListener("click", handleModalClick);
    return () => window.removeEventListener("click", handleModalClick);
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleModalClick = (e) => {
    if (e.target.classList.contains("modal")) {
      handleClose();
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (taskNames.indexOf(formValues.name) >= 0) {
      alert("task name already available");
      console.log("already available");
      return;
    }
    handleAdd(formValues);
    handleClose();
    setFormValues(blankForm);
  };

  return (
    <div className={showHideClassName}>
      <div className="modal-content modal-main ">
        <div className="modal-header">
          <h3>This is a modal!</h3>
        </div>
        <div className="modal-body">
          <form className="form form-new-task" onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="title">Title</label>
              <input
                onChange={handleInputChange}
                name="name"
                type="text"
                value={formValues.name}
                placeholder="Run for your life!"
                required
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
                onChange={(e) => {
                  handleInputChange(e);
                }}
                name="date"
                type="date"
                value={formValues.date}
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="priority">Priority</label>{" "}
              <select
                name="priority"
                id="priority"
                value={formValues.priority}
                onChange={handleInputChange}
                required
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="input-wrapper">
              <label htmlFor="project-name">Category</label>{" "}
              <select
                name="project"
                id="project-name"
                value={formValues.project}
                onChange={handleInputChange}
                required
              >
                {projectNames.map((name) => {
                  return (
                    <option value={name} key={name}>
                      {name}
                    </option>
                  );
                })}
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
