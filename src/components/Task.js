import React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

import { formatDistanceToNow, compareAsc } from "date-fns";

export default function Task({ task, handleDelete }) {
  const { name, date, description, priority } = task;
  const isExpired =
    !!date && compareAsc(new Date(), new Date(date)) >= 0 ? "due" : "not-due";
  return (
    <div className={`task ${isExpired}`}>
      <Accordion
        sx={{
          borderLeft: "10px solid violet",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6" component="p" sx={{ width: "33%" }}>
            {name}
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            {!!date && formatDistanceToNow(new Date(date), { addSuffix: true })}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: "text.secondary" }}>
            Date: {date || "No set date"}
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Priority: {priority}
          </Typography>
          <Typography>{description}</Typography>
          <Button onClick={handleDelete} variant="text" color="error">
            Delete
          </Button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
