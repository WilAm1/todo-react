import React from "react";

// Add Modal
// Welcome Header
// TODO
// Sign in button and Demo Account

export default function SignInModal({ handleSignIn, handleGuestClick }) {
  return (
    <div className="modal">
      <div className="modal-content modal-main">
        <div className="modal-header">
          <h3>Welcome!</h3>
        </div>
        <div className="modal-body">
          <button onClick={handleSignIn}>Sign in Google</button>
          <button onClick={handleGuestClick}>Guest Mode</button>
        </div>
      </div>
    </div>
  );
}
