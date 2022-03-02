import React, { useState } from "react";

export default function ProjectList({ projects, handleAddProject }) {
  const [isVisible, setIsVisibile] = useState(false);
  const [projectName, setProjectName] = useState("");

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
      <button
        style={{ display: isVisible ? "none" : "block" }}
        onClick={() => setIsVisibile(!isVisible)}
      >
        New Project
      </button>
      <form
        className="new-project-wrapper"
        style={{ display: isVisible ? "block" : "none" }}
        onSubmit={(e) => {
          // TODO Handle Form error if empty
          console.log(projectName);
          setIsVisibile(!isVisible);
          handleAddProject(projectName);
          setProjectName("");
          e.preventDefault();
        }}
      >
        <input
          type="text"
          onChange={(e) => setProjectName(e.target.value)}
          value={projectName}
          required
        />
        <button className="btn add-new-project-btn" type="submit">
          Add
        </button>
        <button
          className="btn cancel-new-project-btn"
          onClick={() => {
            setProjectName("");
            setIsVisibile(!isVisible);
          }}
          type="reset"
        >
          Cancel
        </button>
      </form>
    </section>
  );
}
