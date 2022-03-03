import Sidebar from "./Sidebar";
import Tasklist from "./TaskList";
import React, { useState, useEffect } from "react";
import { isWithinInterval, add, startOfToday, parseISO } from "date-fns";
import uniqid from "uniqid";
// TODO Add functionality to buttons!
// TODO Add to firebase

export default function Main({ mockAPI }) {
  const [projects, setProjects] = useState({ default: { tasks: [] } });
  const [currentTasks, setCurrentTasks] = useState({ tasks: [] });

  const fetchData = () => {
    setProjects(mockAPI);
    setCurrentTasks(mockAPI.default);
  };

  useEffect(() => {
    //fetch data
    fetchData();
  }, []);

  const handleProjectClick = (name) => {
    setCurrentTasks(projects[name]);
  };

  const handleAddProject = (name) => {
    // Sets a new project to the user object
    const date = new Date().toLocaleDateString();
    const newObject = {
      name,
      dateAdded: date,
      tasks: [],
    };
    setProjects({
      ...projects,
      [name]: newObject,
    });
  };
  const handleDeleteProject = (name) => {
    const updatedProjects = { ...projects };
    delete updatedProjects[name];
    setProjects(updatedProjects);
    setCurrentTasks(updatedProjects["default"]);
  };

  const handleAddTask = ({ project, ...task }) => {
    const newTask = { ...task, id: uniqid() };
    const updatedTasks = {
      ...projects[project],
      tasks: projects[project].tasks.concat(newTask),
    };
    setProjects({
      ...projects,
      [project]: updatedTasks,
    });
    setCurrentTasks(updatedTasks);
  };

  const handleDeleteTask = ({ project, id }) => {
    const projectTasks = projects[project].tasks;
    const deletedTask = projectTasks.find((obj) => obj.id === id);
    const filteredTasks = {
      ...projects[project],
      tasks: projectTasks.filter((task) => task !== deletedTask),
    };
    setProjects({
      ...projects,
      [project]: filteredTasks,
    });
    setCurrentTasks(filteredTasks);
  };
  const handleEditTask = () => {};

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

  const getProjectNames = () => Object.keys(projects);

  return (
    <main>
      <Sidebar
        projects={projects}
        handleAddProject={handleAddProject}
        handleDeleteProject={handleDeleteProject}
        projectNames={getProjectNames()}
        handleProjectClick={handleProjectClick}
        handleFilterClick={handleFilterClick}
      />
      <Tasklist
        project={currentTasks}
        projectNames={getProjectNames()}
        handleProjectClick={handleProjectClick}
        handleAddTask={handleAddTask}
        handleDeleteTask={handleDeleteTask}
      />
    </main>
  );
}
