import React, { useState } from "react";
import styles from "./loginPage.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const LoginPage = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3030/login", formData)
    if (res.data.token) {
        localStorage.setItem("auth", JSON.stringify(res.data.token))
        setTimeout(() => {
            navigate("/home")
        }, 1500)
    }
  }

  const handleGitHubLogin = () => {
    window.location.href = "http://localhost:3030/auth/github"
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="e-mail"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      <button type="button" onClick={handleGitHubLogin}>GitHub Login</button>
    </div>
  );
};

export default LoginPage;
