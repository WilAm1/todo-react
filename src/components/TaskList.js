import React, { useState } from "react";
import TaskModal from "./ModalForm";
import Task from "./Task";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";

export default function Tasklist({
  project,
  projectNames,
  handleAddTask,
  handleDeleteTask,
}) {
  const { name, tasks } = project;
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };
  const handleDelete = (id) => {
    handleDeleteTask({ id, project: name });
  };
  return projectNames.length !== 0 ? (
    <section className="tasks-section section">
      <Typography variant="h4" component="h4">
        {name}
      </Typography>
      {/* <ul className="tasklist"> */}
      <Stack spacing={2}>
        {tasks.map((task) => {
          return (
            <Task
              task={task}
              key={task.id}
              handleDelete={() => handleDelete(task.id)}
            />
          );
        })}
      </Stack>
      {/* </ul> */}
      <Button
        onClick={() => {
          setShowModal(!showModal);
        }}
        startIcon={<AddIcon />}
      >
        New Task
      </Button>
      <TaskModal
        projectNames={projectNames}
        show={showModal}
        handleClose={handleClose}
        taskNames={project.tasks.reduce((accum, curr) => {
          return !!curr.name ? accum.concat(curr.name) : accum;
        }, [])}
        handleAdd={handleAddTask}
      />
    </section>
  ) : (
    <div>No Project Yet</div>
  );
}
