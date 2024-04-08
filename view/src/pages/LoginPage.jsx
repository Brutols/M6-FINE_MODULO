import React, { useState } from "react";
import styles from "./loginPage.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

    if (!formData.email || !formData.password) {
      alert("insert email and password")
      return
    }

    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, formData)
    .catch(function (error) {
      if (error.response) {
        alert("response error", error.message)
      } else if (error.request) {
        alert("wrong email or password")
      } else {
        alert('Error', error.message);
      }
    })

    if (res.data.token) {
      localStorage.setItem("auth", JSON.stringify(res.data.token));
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    }
  };

  const handleGitHubLogin = () => {
    window.location.href = `${process.env.REACT_APP_BASE_URL}/auth/github`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginWrapper} >
        <h3 className={styles.loginTitle} >Login</h3>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.textInput}
            type="email"
            name="email"
            placeholder="e-mail"
            onChange={handleChange}
          />
          <input
          className={styles.textInput}
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
          />
          <button className={styles.submitBtn} type="submit">Login</button>
        </form>
        <button className={styles.gitHubBtn} type="button" onClick={handleGitHubLogin}>
          Login with GitHub
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
