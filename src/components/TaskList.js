import React, { useEffect, useState } from "react";
import ModalForm from "./ModalForm";
import Task from "./Task";

export default function Tasklist({ project, projectNames }) {
  const { name, tasks } = project;
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };
  const handleModalClick = (e) => {
    if (e.target.classList.contains("modal")) {
      handleClose();
    }
  };

  return projectNames.length !== 0 ? (
    <section className="tasks-section section">
      <ModalForm
        show={showModal}
        handleClose={handleClose}
        taskNames={project.tasks.reduce((accum, curr) => {
          return !!curr.name ? accum.concat(curr.name) : accum;
        }, [])}
        handleModalClick={handleModalClick}
      />

      <h3>{name}</h3>
      <ul className="tasklist">
        {tasks.map((task) => {
          return <Task task={task} key={task.name} />;
        })}
      </ul>
      <button
        onClick={() => {
          console.log("add task and show modal!");
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
