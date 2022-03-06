import Header from "./components/Header";
import Main from "./components/Main";
import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import { guestProjects, guestUser } from "./projects";
import SignInModal from "./components/SignInModal";

// Firebase imports
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const defaultProjects = { inbox: { tasks: [], name: "inbox" } };

  // * State
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [projects, setProjects] = useState();
  const [userInfo, setUserInfo] = useState();
  const firstLoad = useRef(true);

  useEffect(() => {
    if (getAuth().currentUser) {
      fetchDBData();
    }
  }, [userInfo]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), authStateObserver);
    return () => unsubscribe();
  }, [isSignedIn]);

  useEffect(() => {
    if (!getAuth().currentUser || firstLoad.current) return;
    pushUserData(projects);
  }, [projects]);

  const fetchDBData = async () => {
    // console.log(userInfo);
    const docLocation = doc(db, `users/${userInfo.id}`);
    const savedDataRef = await getDoc(docLocation);
    if (savedDataRef.exists()) {
      const savedData = savedDataRef.data();
      setProjects(savedData);
      console.log("fetched db data", savedData);
    } else {
      setProjects({ ...defaultProjects });
      console.log("failed fetch DB data. Creating a new One ");
    }
    setIsSignedIn(true);
    firstLoad.current = false;
  };

  const pushUserData = async (data) => {
    const docLocation = doc(db, `users/${userInfo.id}`);
    setDoc(docLocation, data);
  };

  const handleGuestClick = () => {
    setProjects(guestProjects);
    setUserInfo(guestUser);
    setIsSignedIn(true);
  };

  const handleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      const res = await signInWithPopup(auth, provider);
      const credentials = GoogleAuthProvider.credentialFromResult(res);
      const token = credentials.accessToken;
      // Signed in info
      const user = res.user;
      // console.log(user);
      setIsSignedIn(true);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.err(errorCode, errorMessage);
    }
  };

  const handleSignOut = async () => {
    setIsSignedIn(false);
    setProjects();
    firstLoad.current = true;
    if (getAuth().currentUser) {
      try {
        signOut(getAuth());
      } catch (err) {
        console.error(err);
      }
    }
  };

  const authStateObserver = (user) => {
    if (user) {
      const { displayName, email, photoURL, uid } = user;
      setUserInfo({
        displayName,
        email,
        photoURL,
        id: uid,
      });
    }
  };

  const handleProjectsUpdate = (updatedProjects) => {
    setProjects(updatedProjects);
  };

  const getMainComponent = () => {
    // console.log(isSignedIn);
    return projects ? (
      <div>
        <Header handleSignOut={handleSignOut} user={userInfo} />
        <Main projects={projects} handleProjectsUpdate={handleProjectsUpdate} />
      </div>
    ) : (
      <div>Loading...Projects</div>
    );
  };

  return isSignedIn ? (
    getMainComponent()
  ) : (
    <SignInModal
      handleSignIn={handleSignIn}
      handleGuestClick={handleGuestClick}
    />
  );
}

export default App;
