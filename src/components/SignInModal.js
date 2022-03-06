import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function SignInModal({ handleSignIn, handleGuestClick }) {
  return (
    <div className="modal">
      <div className="modal-content modal-main sign-in-modal">
        <Typography component="h3" variant="h3">
          Welcome!
        </Typography>
        <div>
          <Button variant="contained" onClick={handleSignIn}>
            Sign in Google
          </Button>
          <Button variant="outlined" onClick={handleGuestClick}>
            Guest Mode
          </Button>
        </div>
      </div>
    </div>
  );
}
