import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import TodoList from "./components/TodoList/TodoList";
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <TodoList />
    </div>
  );
}

export default App;
