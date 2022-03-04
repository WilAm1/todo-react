import React from "react";

export default function Header({ user, handleSignOut }) {
  return (
    <header>
      <h1>Todo List</h1>
      <div>
        Welcome {user.displayName}
        <p>{user.email}</p>
      </div>
      <button onClick={handleSignOut}>Sign Out</button>
    </header>
  );
}
