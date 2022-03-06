import React, { useState, useEffect } from "react";

// MUI styles
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TaskModal({
  show,
  handleClose,
  taskNames,
  handleAdd,
  projectNames,
}) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const blankForm = {
    name: "",
    description: "",
    date: "",
    priority: "low",
    project: "inbox",
  };
  const [formValues, setFormValues] = useState(blankForm);

  useEffect(() => {
    window.addEventListener("click", handleModalClick);
    return () => window.removeEventListener("click", handleModalClick);
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleModalClick = (e) => {
    if (e.target.classList.contains("modal")) {
      handleClose();
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (taskNames.indexOf(formValues.name) >= 0) {
      alert("task name already available");
      console.log("already available");
      return;
    }
    handleAdd(formValues);
    handleClose();
    setFormValues(blankForm);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={show}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={show}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h3">
            Add Task
          </Typography>
          <Box
            className="form form-new-task"
            onSubmit={handleSubmit}
            component="form"
          >
            <TextField
              onChange={handleInputChange}
              name="name"
              type="text"
              value={formValues.name}
              placeholder="Do something Productive!"
              required
              label="Task Name"
              size="small"
            />
            <Box component="span">
              <InputLabel htmlFor="due-date" component={"label"}>
                Date
              </InputLabel>
              <input
                onChange={(e) => {
                  handleInputChange(e);
                }}
                name="date"
                type="date"
                value={formValues.date}
                style={{ fontSize: `1rem`, height: "2rem" }}
              />
            </Box>
            <Box>
              <InputLabel>Description</InputLabel>
              <TextareaAutosize
                onChange={handleInputChange}
                name="description"
                type="text"
                value={formValues.description}
                placeholder="Something descriptive"
                minRows={5}
                minCols={5}
              />
            </Box>
            <Box className="input-wrapper">
              <InputLabel id="priority">Priority</InputLabel>{" "}
              <Select
                name="priority"
                labelFor="priority"
                value={formValues.priority}
                onChange={handleInputChange}
                required
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </Box>
            <Box className="input-wrapper">
              <InputLabel id="project-name">Category</InputLabel>{" "}
              <Select
                name="project"
                labelId="project-name"
                value={formValues.project}
                onChange={handleInputChange}
                required
              >
                {projectNames.map((name) => {
                  return (
                    <MenuItem value={name} key={name}>
                      {name}
                    </MenuItem>
                  );
                })}
              </Select>
            </Box>
            <Button type="submit" variant="contained">
              Add Task
            </Button>
            <Button onClick={handleClose} type="button" variant="text">
              Close
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
