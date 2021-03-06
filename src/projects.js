const guestProjects = {
  inbox: {
    name: "inbox",
    tasks: [
      {
        name: "My First Task",
        description: "Make something useful!",
        priority: "high",
        date: "2022-03-03",
        id: "adadsd",
      },
      {
        name: "make breakfast",
        description: "pancakes and eggs",
        priority: "medium",
        date: "2022-01-01",
        id: "adads123",
      },
    ],
  },
  sampleProject: {
    dateCreated: "some date",
    name: "sampleProject",
    tasks: [
      {
        name: "sampleTaskName",
        date: "2022-03-04",
        id: "adads11223",
        description: "Something to look forward to",
        priority: "medium",
      },
      {
        name: "Read A Book",
        date: "2022-03-09",
        id: "adads23s",
        description: "Something to look forward for",
        priority: "high",
      },
      {
        name: "Fish",
        date: "2022-04-09",
        id: "adads123",
        description: "Something to look forward to",
        priority: "low",
      },
    ],
  },
};
const guestUser = {
  displayName: "Guest",
  email: "someUserName@demo.com",
  photoURL: "/somephoto",
  id: "guest01",
};

export { guestProjects, guestUser };
