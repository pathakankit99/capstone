import React from 'react'
import ShowRestaurant from "../ShowRestaurant"
import ShowDish from "../ShowDish"
import ShowAddress from "../ShowAddress"
function index() {
  return (
    <div>
      <ShowRestaurant />
      <ShowDish />
      <ShowAddress/>
    </div>
  )
}

export default index