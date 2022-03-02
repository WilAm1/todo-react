import Sidebar from "./Sidebar";
import Tasklist from "./TaskList";
import React, { useState, useEffect } from "react";

export default function Main({ mockAPI }) {
  const [projects, setProjects] = useState({ user: {}, default: {} });
  const [currentTasks, setCurrentTasks] = useState({});

  const fetchData = () => {
    // set the current project to the default project
    setProjects(mockAPI);
    setCurrentTasks(mockAPI.default);
  };

  useEffect(() => {
    //fetch data
    fetchData();
  }, []);

  return (
    <main>
      <Sidebar projects={projects} />
      <Tasklist project={currentTasks} />
    </main>
  );
}
