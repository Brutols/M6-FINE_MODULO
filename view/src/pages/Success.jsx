import React from 'react'

const Success = () => {

    const params = new URLSearchParams(window.location.search)

    const token = params.get("token")

  return (
    <div>Il tuo token è {token}</div>
  )
}

export default Success