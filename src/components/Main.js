import Sidebar from "./Sidebar";
import Tasklist from "./TaskList";
import React, { useState, useEffect } from "react";
import { isWithinInterval, add, startOfToday, parseISO } from "date-fns";

// TODO Set Today and this week functionality
// TODO Begin to add State
// TODO Add functionality to buttons!

// TODO Add to firebase

export default function Main({ mockAPI }) {
  const [projects, setProjects] = useState({ user: {}, default: {} });
  const [currentTasks, setCurrentTasks] = useState({});

  const fetchData = () => {
    // set the current project to the default project
    setProjects(mockAPI);
    setCurrentTasks(mockAPI.default.default);
  };

  useEffect(() => {
    //fetch data
    fetchData();
  }, []);

  const handleProjectClick = (name) => {
    if (name === "default") {
      setCurrentTasks(projects.default.default);
    } else {
      console.log(projects.user[name]);
      setCurrentTasks(projects.user[name]);
    }
  };

  const handleAddProject = (name) => {
    // Sets a new project to the user object
    const date = new Date().toLocaleDateString();
    const newObject = {
      ...projects.user,
      [name]: {
        date,
        tasks: [],
      },
    };
    setProjects({
      ...projects,
      user: newObject,
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
    const tasks = {
      name: date,
      tasks: [
        ...getFilteredTasks(deadline, projects.default),
        ...getFilteredTasks(deadline, projects.user),
      ],
    };

    setCurrentTasks(tasks);
  };

  const getProjectNames = () => Object.keys(projects.user);
  return (
    <main>
      <Sidebar
        projects={projects}
        handleAddProject={handleAddProject}
        projectNames={getProjectNames()}
        handleProjectClick={handleProjectClick}
        handleFilterClick={handleFilterClick}
      />
      <Tasklist
        project={currentTasks}
        projectNames={getProjectNames()}
        handleProjectClick={handleProjectClick}
      />
    </main>
  );
}
