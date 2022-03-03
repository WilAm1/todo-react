import React, { useState } from "react";

export default function ProjectList({
  projects,
  handleAddProject,
  handleClick,
  handleDeleteProject,
}) {
  const [isVisible, setIsVisibile] = useState(false);
  const [projectName, setProjectName] = useState("");

  const checkProjectName = () => {
    return projects.indexOf(projectName) >= 0;
  };
  const handleDelete = (name) => {
    handleDeleteProject(name);
  };
  return (
    <section className="project-list-section section">
      <h3>Projects</h3>
      <ul className="project-list">
        {projects.map((project) => {
          return (
            <li className="project" key={project}>
              <span onClick={() => handleClick(project)}> {project}</span>
              <button onClick={() => handleDelete(project)}>Delete</button>
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
          e.preventDefault();
          console.log(projectName);
          setIsVisibile(!isVisible);
          if (checkProjectName()) {
            console.log("Name already in the projects");
            return;
          }
          handleAddProject(projectName);
          setProjectName("");
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
