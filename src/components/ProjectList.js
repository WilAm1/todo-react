import React, { useState } from "react";

// MUI
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteIcon from "@mui/icons-material/Delete";
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function ProjectList({
  projects,
  handleAddProject,
  handleClick,
  handleDeleteProject,
}) {
  const [isVisible, setIsVisibile] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const checkProjectName = () => {
    return projects.indexOf(projectName) >= 0;
  };
  const handleDelete = (name) => {
    handleDeleteProject(name);
  };
  return (
    <>
      <Typography component={"h2"} variant="h4">
        Projects
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: 224,
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider", width: "100%" }}
        >
          {projects
            .filter((name) => name !== "inbox")
            .map((project, idx) => {
              return (
                <Tab
                  component="div"
                  key={project}
                  label={
                    <p>
                      {project}
                      <span>
                        {value === idx && (
                          <DeleteIcon
                            color="warning"
                            sx={{ fontSize: "20px", marginLeft: "1rem" }}
                            className="delete-project"
                            onClick={() => handleDeleteProject(project)}
                          />
                        )}
                      </span>
                    </p>
                  }
                  {...a11yProps(idx)}
                  onClick={() => handleClick(project)}
                />
              );
            })}
        </Tabs>
      </Box>

      <Button
        variant="contained"
        style={{ display: isVisible ? "none" : "block" }}
        onClick={() => setIsVisibile(!isVisible)}
      >
        New Project
      </Button>
      <form
        className="new-project-wrapper"
        style={{ display: isVisible ? "block" : "none" }}
        onSubmit={(e) => {
          e.preventDefault();
          console.log(projectName);
          setIsVisibile(!isVisible);
          if (checkProjectName()) {
            console.log("Name already in the projects");
            setProjectName("");
            return;
          }
          handleAddProject(projectName);
          setProjectName("");
        }}
      >
        <TextField
          type="text"
          onChange={(e) => setProjectName(e.target.value)}
          value={projectName}
          required
          id="new-project-btn"
          variant="outlined"
          label="Project Name"
          size="small"
          inputProps={{ maxLength: 20 }}
        />
        <ButtonGroup variant="contained">
          <Button
            className="btn add-new-project-btn"
            type="submit"
            variant="contained"
          >
            Add
          </Button>
          <Button
            variant="text"
            // className="btn cancel-new-project-btn"
            onClick={() => {
              setProjectName("");
              setIsVisibile(!isVisible);
            }}
            type="reset"
          >
            Cancel
          </Button>
        </ButtonGroup>
      </form>
    </>
  );
}
