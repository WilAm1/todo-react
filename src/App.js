import Header from "./components/Header";
import Main from "./components/Main";
import "./App.css";
import { projects } from "./projects";

function App() {
  return (
    <div className="App">
      <Header />
      <Main mockAPI={projects} />
    </div>
  );
}

export default App;
