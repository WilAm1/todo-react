import React from "react";
import { formatDistanceToNow, compareAsc } from "date-fns";
export default function Task({ task }) {
  const { name, date, description, priority } = task;
  const isExpired =
    compareAsc(new Date(), new Date(date)) >= 0 ? "due" : "not-due";
  console.log(isExpired);
  return (
    <div className={`task ${isExpired}`}>
      <p>{name}</p>

      <div className="task-initial-detail">
        <span>{formatDistanceToNow(new Date(date), { addSuffix: true })}</span>
        <button>Edit</button>
        <button>Delete</button>
      </div>

      <div className="task-extended hidden">
        <p>Date: {date}</p>
        <p>{description}</p>
        <p>{priority}</p>
      </div>
    </div>
  );
}
