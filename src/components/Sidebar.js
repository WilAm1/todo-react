import React from "react";
import ProjectList from "./ProjectList";
import TaskDates from "./TaskDates";

export default function Sidebar({ projects }) {
  // TODO Add functionality to taskdates
  // TODO Filters project based from filter parameters
  return (
    <section className="menu-section section">
      <TaskDates />
      <ProjectList projects={Object.keys(projects.user)} />
    </section>
  );
}
