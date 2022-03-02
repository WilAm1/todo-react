import React from "react";

export default function Task({ task }) {
  const { name, date, description, priority } = task;
  return (
    <div className="task">
      <p>{name}</p>
      <div className="task-initial-detail">
        <span>{date}</span>
        <span>Edit</span>
        <span>Delete</span>
      </div>
      <div className="task-extended hidden">
        <p>{description}</p>
        <p>{priority}</p>
      </div>
    </div>
  );
}
