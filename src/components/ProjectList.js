import React from "react";

export default function ProjectList({ projects }) {
  return (
    <section className="project-list-section section">
      <h3>Projects</h3>
      <ul className="project-list">
        {projects.map((project) => {
          return (
            <li className="project" key={project}>
              {project}
            </li>
          );
        })}
      </ul>
      <button>Add Project</button>
    </section>
  );
}
