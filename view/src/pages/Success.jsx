import React, { useEffect } from 'react'
import styles from "./success.module.css"
import { Link, useNavigate } from 'react-router-dom'

const Success = () => {
  const navigate = useNavigate()

  const params = new URLSearchParams(window.location.search)
  const token = params.get("token")

  localStorage.setItem("auth", JSON.stringify(token))
  
  const navigateHome = () => {
    navigate("/home")
  }

  useEffect(() => {
    const navigateTimeOut = () => {
      setTimeout(() => {
        navigateHome()
      }, 3000)
    }
    navigateTimeOut()

    return () => clearTimeout(navigateTimeOut)
  }, [])

  return (
    <div className={styles.successWrapper} >
      <div className={styles.successContent} >
        <h3>Login successful</h3>
        <p>you will be redirected to <span><Link to={"/home"} >Homepage</Link></span></p>
      </div>
    </div>
  )
}

export default Success