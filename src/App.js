import Header from "./components/Header";
import Main from "./components/Main";
import "./App.css";
import React, { useState, useEffect, useMemo } from "react";
import { mockProjects } from "./projects";
import SignInModal from "./components/SignInModal";

// Firebase imports
import { getFirebaseConfig } from "./firebase-config";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// TODO Add to firebase
const firebaseConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();

function App() {
  const defaultUser = {
    displayName: "Guest",
    email: "demo@rike.com",
    photoURL: "/somephoto",
    id: "guest01",
  };
  const defaultProjects = { inbox: { tasks: [] } };

  // * State
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [projects, setProjects] = useState();
  const [userInfo, setUserInfo] = useState(defaultUser);

  const fetchDBData = async () => {
    const docLocation = doc(db, `users/${userInfo.id}`);
    const savedDataRef = await getDoc(docLocation);
    if (savedDataRef.exists()) {
      const savedData = savedDataRef.data();
      setProjects(savedData);
      console.log("i saved the docs", savedData);
    } else {
      setProjects({ ...defaultProjects });
    }
  };

  const pushUserData = async (data) => {
    const docLocation = doc(db, `users/${userInfo.id}`);
    setDoc(docLocation, data);

    const snapShot = await getDoc(docLocation);
    if (snapShot.exists()) {
      const data = snapShot.data();
      console.log("docRef :>> ", data);
    }
  };

  // possibly redundant. use it on autStateObserver
  useEffect(() => {
    if (getAuth().currentUser) {
      fetchDBData();
    } else {
      setProjects(mockProjects);
    }
  }, [userInfo]);

  useEffect(() => {
    // check if guestmode
    const unsubscribe = onAuthStateChanged(getAuth(), authStateObserver);
    return () => unsubscribe();
  }, [isSignedIn]);

  useEffect(() => {
    console.log(projects);
    console.log(isConnected, isSignedIn);
    if (!getAuth().currentUser) return;
    pushUserData(projects);
  }, [projects]);

  const handleGuestClick = () => {
    setProjects(mockProjects);
    setUserInfo(defaultUser);
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
      console.log(user);
      setIsConnected(true);
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
      console.log(errorCode, errorMessage);
    }
  };

  const handleSignOut = async () => {
    setIsSignedIn(false);
    if (!getAuth().currentUser) return;
    try {
      signOut(getAuth());
    } catch (err) {
      console.error(err);
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
      setIsSignedIn(true);
    } else {
      setUserInfo(defaultUser);
    }
  };

  const handleProjectsUpdate = (updatedProjects) => {
    setProjects(updatedProjects);
  };

  const getMainComponent = () => {
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
