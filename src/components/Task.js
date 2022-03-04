import React from "react";
import { formatDistanceToNow, compareAsc } from "date-fns";
export default function Task({ task, handleDelete }) {
  const { name, date, description, priority } = task;
  const isExpired =
    !!date && compareAsc(new Date(), new Date(date)) >= 0 ? "due" : "not-due";
  return (
    <div className={`task ${isExpired}`}>
      <p>{name}</p>

      <div className="task-initial-detail">
        <span>
          {!!date && formatDistanceToNow(new Date(date), { addSuffix: true })}
        </span>
        <button onClick={handleDelete}>Delete</button>
      </div>

      <div className="task-extended hidden">
        <p>Date: {date}</p>
        <p>{description}</p>
        <p>{priority}</p>
      </div>
    </div>
  );
}
