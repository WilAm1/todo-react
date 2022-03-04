const config = {
  apiKey: "AIzaSyDJvxBLjDa4HQobnI7DCcDyLpdadl-LdJM",

  authDomain: "todo-list-8ff45.firebaseapp.com",

  projectId: "todo-list-8ff45",

  storageBucket: "todo-list-8ff45.appspot.com",

  messagingSenderId: "371395348001",

  appId: "1:371395348001:web:618fb911918bf2cdb74560",
};

export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error(
      "No Firebase configuration object provided." +
        "\n" +
        "Add your web app's configuration object to firebase-config.js"
    );
  } else {
    return config;
  }
}
