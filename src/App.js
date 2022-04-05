import "./App.css";
import app from "./firebase.init";
import { getAuth } from "firebase/auth";

const auth = getAuth(app);

function App() {
  return (
    <div className="App">
      <h1>Milestone-10-React-Authentication</h1>
    </div>
  );
}

export default App;
