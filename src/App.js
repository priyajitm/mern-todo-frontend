import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import "./App.css";
import AddTask from "./views/AddTask";
import TasksContainer from "./views/TasksContainer";
import SignUp from "./views/SignUp";
import Login from "./views/Login";

const App = () => {
  const [tasks, setTasks] = useState("");

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    const res = await axios.get("/gettasks");
    setTasks(res.data);
  };

  const addTasks = async (taskName) => {
    const id = uuidv4();
    const ApiUrl = "/addtask";
    const taskData = {
      id: id,
      title: taskName,
      completed: false,
    };
    const res = axios.post(ApiUrl, taskData);

    if (res === 201) {
      setTasks([...tasks, taskData]);
    }
    
  };

  const completeTask = async (id) => {
    const ApiUrl = "/update";
    const taskData = {
      id: id,
      completed: true,
    };
    const res = await axios.post(ApiUrl, taskData);

    if (res.status === 200) {
      const taskData = tasks.map((task) => {
        if (task.taskid === id) {
          return { ...task, completed: true };
        }
        return task;
      });

      setTasks(taskData);
    }
  };

  const undoTask = async (id) => {
    const ApiUrl = "/update";
    const taskData = {
      id: id,
      completed: false,
    };
    const res = await axios.post(ApiUrl, taskData);

    if (res.status === 200) {
      const taskData = tasks.map((task) => {
        if (task.taskid === id) {
          return { ...task, completed: false };
        }
        return task;
      });

      setTasks(taskData);
    }
  };

  const deleteTask = async (id) => {
    const ApiUrl = "/delete";
    const res = axios.post(`${ApiUrl}/${id}`);
    if (res === 200) {
      const taskData = tasks.filter((task) => task.taskid !== id);
      setTasks(taskData);
    }
  };

  const updateTask = async (id, taskName) => {
    const ApiUrl = "/update";
    const taskData = {
      id: id,
      title: taskName,
      completed: false,
    };
    const res = await axios.post(ApiUrl, taskData);

    if (res.status === 200) {
      const taskData = tasks.map((task) => {
        if (task.taskid === id) {
          return { ...task, title: taskName };
        }
        return task;
      });
      setTasks(taskData);
    }
  };

  return (
    // <div className="container">
    //   <h1>My ToDo List</h1>
    //   <AddTask updateTask={addTasks} />
    //   <TasksContainer
    //     tasksList={tasks && tasks.filter((task) => !task.completed)}
    //     type="pending"
    //     primaryButtonClick={completeTask}
    //     updateTask={updateTask}
    //   />
    //   <TasksContainer
    //     tasksList={tasks && tasks.filter((task) => task.completed)}
    //     type="completed"
    //     primaryButtonClick={undoTask}
    //     secondaryButtonClick={deleteTask}
    //   />
    // </div>
    <Login />

  );
};

export default App;
