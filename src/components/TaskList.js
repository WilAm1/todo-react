import React from "react";
import Task from "./Task";

export default function Tasklist({ project }) {
  const { name, tasks } = project;

  return Object.keys(project).length !== 0 ? (
    <section className="tasks-section section">
      <h3>{name}</h3>
      <ul className="tasklist">
        {tasks.map((task) => {
          return <Task task={task} key={task.name} />;
        })}
      </ul>
    </section>
  ) : (
    <div>No Project Yet</div>
  );
}
