import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Header({ user, handleSignOut }) {
  return (
    <header>
      <Typography component="h1" variant="h3" sx={{ fontWeight: 700 }}>
        Todo List
      </Typography>
      <div>
        Welcome {user.displayName}
        <p>{user.email}</p>{" "}
        <Button variant="outlined" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
    </header>
  );
}
