import React from "react";
import ProjectList from "./ProjectList";
import TaskDates from "./TaskDates";

export default function Sidebar({
  handleAddProject,
  projectNames,
  handleProjectClick,
  handleFilterClick,
}) {
  // TODO Add functionality to taskdates
  // TODO Filters project based from filter parameters
  return (
    <section className="menu-section section">
      <TaskDates handleClick={handleFilterClick}>
        <button
          onClick={() => {
            handleProjectClick("default");
          }}
        >
          Input
        </button>
      </TaskDates>
      <ProjectList
        projects={projectNames}
        handleAddProject={handleAddProject}
        handleClick={handleProjectClick}
      />
    </section>
  );
}
