import React from "react";

export default function TaskDates({ children, handleClick }) {
  return (
    <section className="task-dates-section">
      {children}
      <button onClick={() => handleClick("today")}>Today</button>
      <button onClick={() => handleClick("week")}>This Week </button>
    </section>
  );
}
