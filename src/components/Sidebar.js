import React from "react";
import ProjectList from "./ProjectList";
import TaskDates from "./TaskDates";

export default function Sidebar({
  handleAddProject,
  projectNames,
  handleProjectClick,
  handleFilterClick,
  handleDeleteProject,
}) {
  return (
    <section className="menu-section section">
      <TaskDates handleClick={handleFilterClick}>
        <button onClick={() => handleProjectClick("inbox")}>Inbox</button>
      </TaskDates>
      <ProjectList
        projects={projectNames}
        handleAddProject={handleAddProject}
        handleClick={handleProjectClick}
        handleDeleteProject={handleDeleteProject}
      />
    </section>
  );
}
