import React from "react"
import Featured from "./featured/Featured"
import Blog from "../blog/Blog"
import Hero from "./hero/Hero"
import Location from "./location/Location"



const Home = () => {
  return (
    <>
      <Hero />
      <Featured />
      <Blog/>
      <Location />
    </>
  )
}

export default Home
