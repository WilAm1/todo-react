import React, { useState } from "react";
import ModalForm from "./ModalForm";
import Task from "./Task";

export default function Tasklist({
  project,
  projectNames,
  handleAddTask,
  handleDeleteTask,
}) {
  const { name, tasks } = project;
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };
  const handleDelete = (id) => {
    handleDeleteTask({ id, project: name });
  };
  return projectNames.length !== 0 ? (
    <section className="tasks-section section">
      <ModalForm
        projectNames={projectNames}
        show={showModal}
        handleClose={handleClose}
        taskNames={project.tasks.reduce((accum, curr) => {
          return !!curr.name ? accum.concat(curr.name) : accum;
        }, [])}
        handleAdd={handleAddTask}
      />

      <h3>{name}</h3>
      <ul className="tasklist">
        {tasks.map((task) => {
          return (
            <Task
              task={task}
              key={task.id}
              handleDelete={() => handleDelete(task.id)}
            />
          );
        })}
      </ul>
      <button
        onClick={() => {
          setShowModal(!showModal);
        }}
      >
        New Task
      </button>
    </section>
  ) : (
    <div>No Project Yet</div>
  );
}
