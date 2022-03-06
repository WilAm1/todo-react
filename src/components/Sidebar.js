import React from "react";
import ProjectList from "./ProjectList";
import TaskDates from "./TaskDates";
import Button from "@mui/material/Button";
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
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleProjectClick("inbox")}
        >
          Inbox
        </Button>
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
