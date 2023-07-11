import { ToastContainer } from "react-toastify";
import "./App.css";
import TodoList from "./components/TodoList/TodoList";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <TodoList />
    </div>
  );
}

export default App;
