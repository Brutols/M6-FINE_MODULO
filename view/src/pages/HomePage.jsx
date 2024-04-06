import React, { useEffect, useState } from 'react'
import Card from '../components/card/Card'
import axios from "axios"
import styles from "./homePage.module.css"

const HomePage = () => {
  const [travels, setTravels] = useState()

  const getTravels = async () => {
    try {
      const res = await axios.get("http://localhost:3030/travels")
      setTravels(res.data.travels)
    } catch (error) {
      console.log(error.message)
    }
  }
  
  useEffect(() => {
    getTravels()
  }, [])

  return (
    <div className={styles.cardWrapper} >
      {travels && travels.map((travel, i) => {
        return <Card key={i} location={travel.location} img={travel.img} description={travel.description} price={travel.price} />
      })}
    </div>
  )
}

export default HomePage;