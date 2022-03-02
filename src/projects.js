const projects = {
  default: {
    name: "default",
    tasks: [
      {
        name: "My First Task",
        description: "Make something useful!",
        priority: "high",
        date: "2022-03-00",
      },
      {
        name: "make breakfast",
        description: "pancakes and eggs",
        priority: "medium",
        date: "2022-01-01",
      },
    ],
  },
  user: {
    sampleProject: {
      dateCreated: "some date",
      name: "sampleProject",
      tasks: [
        {
          name: "sampleTaskName",
          date: "2022-03-00",
          description: "Something to look forward to",
          priority: "low",
        },
        {
          name: "ReadBook",
          date: "2022-01-09",
          description: "Something to look forward to",
          priority: "low",
        },
        {
          name: "Make Pancakes",
          date: "2022-04-09",
          description: "Something to look forward to",
          priority: "low",
        },
      ],
    },
  },
};

export { projects };
