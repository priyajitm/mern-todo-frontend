import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post("/login", {
      username: email,
      password,
    });

    if (res.status === 200) {
      localStorage.setItem('auth', true)
      return navigate("/dashboard");
    }
    
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="form-btn">Login</button>
        <p>No Registered? <Link to='/register'>Register Now</Link></p>
      </form>
    </div>
  );
};

export default Login;
