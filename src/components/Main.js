import Sidebar from "./Sidebar";
import Tasklist from "./TaskList";

import React, { useState, useEffect, useMemo } from "react";
import { isWithinInterval, add, startOfToday, parseISO } from "date-fns";
import uniqid from "uniqid";

export default function Main({ updateUserData, projects }) {
  // const [projects, setProjects] = useState({ inbox: { tasks: [] } });
  const [currentTasks, setCurrentTasks] = useState({ tasks: [] });

  // const fetchData = () => {
  //   setProjects(mockAPI);
  //   setCurrentTasks(mockAPI.inbox);
  // };

  //projects first project load
  setCurrentTasks(initialProject.inbox);

  const handleDeleteProject = (name) => {
    // const updatedProjects = { ...projects };
    // delete updatedProjects[name];
    // setProjects(updatedProjects);
    setCurrentTasks(projects.inbox);
  };

  const handleProjectClick = (name) => {
    setCurrentTasks(projects[name]);
  };

  const handleAddTask = ({ project, ...task }) => {
    console.log(project, projects);

    const newTask = { ...task, id: uniqid() };
    const updatedTasks = {
      ...projects[project],
      tasks: projects[project].tasks.concat(newTask),
    };
    setCurrentTasks(updatedTasks);
  };

  const handleDeleteTask = ({ project, id }) => {
    const projectTasks = projects[project].tasks;
    const deletedTask = projectTasks.find((obj) => obj.id === id);
    const filteredTasks = {
      ...projects[project],
      tasks: projectTasks.filter((task) => task !== deletedTask),
    };
    setCurrentTasks(filteredTasks);
    setProjects({
      ...projects,
      [project]: filteredTasks,
    });
  };

  const getFilteredTasks = (deadline, projectObj) => {
    const tasks = [];
    Object.keys(projectObj).forEach((projectName) => {
      const projectTasks = projectObj[projectName].tasks;
      projectTasks.forEach((task) => {
        const isWithin = isWithinInterval(parseISO(task.date), {
          start: startOfToday(),
          end: deadline,
        });
        if (isWithin) tasks.push(task);
      });
    });
    return tasks;
  };

  const handleFilterClick = (date) => {
    const deadline =
      date === "today"
        ? add(startOfToday(), { days: 1 })
        : add(startOfToday(), { weeks: 1 });

    const filteredTasks = {
      name: date,
      tasks: [...getFilteredTasks(deadline, projects)],
    };
    setCurrentTasks(filteredTasks);
  };

  const allProjectNames = useMemo(() => Object.keys(projects), [projects]);

  return (
    <main>
      <Sidebar
        projects={projects}
        handleAddProject={handleAddProject}
        handleDeleteProject={handleDeleteProject}
        projectNames={allProjectNames}
        handleProjectClick={handleProjectClick}
        handleFilterClick={handleFilterClick}
      />
      <Tasklist
        project={currentTasks}
        projectNames={allProjectNames}
        handleAddTask={handleAddTask}
        handleDeleteTask={handleDeleteTask}
      />
    </main>
  );
}
