import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./views/SignUp";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import NotFound from "./views/NotFound";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/register" element={<SignUp />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
