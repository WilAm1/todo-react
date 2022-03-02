import React, { useState } from "react";
import ModalForm from "./ModalForm";
import Task from "./Task";

export default function Tasklist({ project }) {
  const { name, tasks } = project;
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };
  return Object.keys(project).length !== 0 ? (
    <section className="tasks-section section">
      <ModalForm show={showModal} handleClose={handleClose} />
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
      {/* Make Modal */}
    </section>
  ) : (
    <div>No Project Yet</div>
  );
}
