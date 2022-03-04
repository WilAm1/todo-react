import Sidebar from "./Sidebar";
import Tasklist from "./TaskList";
import SignInModal from "./SignInModal";
import React, { useState, useEffect, useMemo } from "react";
import { isWithinInterval, add, startOfToday, parseISO } from "date-fns";
import uniqid from "uniqid";

// Firebase imports
import { initializeApp } from "firebase/app";
import { getFirebaseConfig } from "./firebase-config";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

// TODO Add to firebase
const firebaseConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseConfig);
// const db = getFirestore(firebaseApp);
export default function Main({ mockAPI }) {
  const [projects, setProjects] = useState({ inbox: { tasks: [] } });
  const [currentTasks, setCurrentTasks] = useState({ tasks: [] });
  const [isSignedIn, setIsSignedIn] = useState(false);
  const defaultUser = {
    displayName: "Guest",
    email: "demo@rike.com",
    photoURL: "/somephoto",
    id: "guest01",
  };
  const [userInfo, setUserInfo] = useState(defaultUser);
  const fetchData = () => {
    setProjects(mockAPI);
    setCurrentTasks(mockAPI.inbox);
  };

  useEffect(() => {
    //fetch data
    fetchData();
  }, []);

  useEffect(() => {
    // subscribe for effects in the firebase
    console.log(userInfo);
    const unsubscribe = onAuthStateChanged(getAuth(), authStateObserver);
    return () => unsubscribe();
  }, [isSignedIn]);

  const handleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      const res = await signInWithPopup(auth, provider);
      const credentials = GoogleAuthProvider.credentialFromResult(res);
      const token = credentials.accessToken;
      // Signed in info
      const user = res.user;
      console.log(user);
      setIsSignedIn(true);
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.log(errorCode);
    }
  };

  const handleSignOut = async () => {
    try {
      signOut(getAuth());
      setIsSignedIn(false);
    } catch (err) {
      console.error(err);
    }
  };

  const authStateObserver = (user) => {
    if (user) {
      console.log(user);
      const { displayName, email, photoURL, uid } = user;
      setUserInfo({
        displayName,
        email,
        photoURL,
        id: uid,
      });
    }
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
    setCurrentTasks(updatedProjects.inbox);
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
  return isSignedIn ? (
    <main>
      <Sidebar
        projects={projects}
        handleAddProject={handleAddProject}
        handleDeleteProject={handleDeleteProject}
        projectNames={allProjectNames}
        handleProjectClick={handleProjectClick}
        handleFilterClick={handleFilterClick}
        handleSignOut={handleSignOut}
      />
      <Tasklist
        project={currentTasks}
        projectNames={allProjectNames}
        handleAddTask={handleAddTask}
        handleDeleteTask={handleDeleteTask}
      />
    </main>
  ) : (
    <SignInModal handleSignIn={handleSignIn} />
  );
}
