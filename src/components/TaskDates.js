import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function TaskDates({ children, handleClick }) {
  return (
    <Stack spacing={2} direction="column">
      {children}
      <Button variant="outlined" onClick={() => handleClick("today")}>
        Today
      </Button>
      <Button variant="outlined" onClick={() => handleClick("week")}>
        This Week{" "}
      </Button>
    </Stack>
  );
}
