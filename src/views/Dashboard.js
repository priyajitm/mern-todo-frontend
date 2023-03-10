import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddTask from "./AddTask";
import TasksContainer from "./TasksContainer";

const baseURL = 'https://motionless-rose-loafers.cyclic.app'

const Dashboard = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('auth')
    if (isAuthenticated === 'true') {
      setIsAuth(true)
    }
  }, [])

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    const res = await axios.get(`${baseURL}/gettasks`);
    setTasks(res.data);
  };

  const addTasks = async (taskName) => {
    const id = uuidv4();
    const ApiUrl = `${baseURL}/addtask`;
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
    const ApiUrl = `${baseURL}/update`;
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
    const ApiUrl = `${baseURL}/update`;
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
    const ApiUrl = `${baseURL}/delete`;
    const res = axios.post(`${ApiUrl}/${id}`);
    if (res === 200) {
      const taskData = tasks.filter((task) => task.taskid !== id);
      setTasks(taskData);
    }
  };

  const updateTask = async (id, taskName) => {
    const ApiUrl = `${baseURL}/update`;
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

  const logout = async () => {
    const res = await axios.post(`${baseURL}/logout`);
    if (res.status === 200) {
      localStorage.setItem('auth', false)
      return navigate('/');
    }
  }

  if (!isAuth) {
    return navigate('/');
  }

  return (
    <div className="container">
      <div>
        <p>Welcome User</p>
        <button onClick={logout}>Logout</button>
      </div>
      <h1>My ToDo List</h1>
      <AddTask updateTask={addTasks} />
      <TasksContainer
        tasksList={tasks && tasks.filter((task) => !task.completed)}
        type="pending"
        primaryButtonClick={completeTask}
        updateTask={updateTask}
      />
      <TasksContainer
        tasksList={tasks && tasks.filter((task) => task.completed)}
        type="completed"
        primaryButtonClick={undoTask}
        secondaryButtonClick={deleteTask}
      />
    </div>
  );
};

export default Dashboard;
