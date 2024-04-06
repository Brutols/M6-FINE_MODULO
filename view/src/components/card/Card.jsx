import React from 'react'
import styles from "./card.module.css"

const Card = ({img, location, description, price}) => {
  return (
    <div className={styles.travelCard} >
        <img src={img} alt="" />
        <div>
            <h3>{location}</h3>
            <p className={styles.truncate} >{description}</p>
            <p>{price}</p>
        </div>
    </div>
  )
}

export default Card