import React from "react"
import Back from "../common/Back"
import Heading from "../common/Heading"
import img from "../images/about.jpg"
import "./about.css"

const About = () => {
  return (
    <>
      <section className='about'>
        <Back name='About Us' title='About Us - Who We Are?' cover={img} />
        <div className='container flex mtop'>
          <div className='left row'>
            <Heading title='Our Agency Story' subtitle='Check out our company story and work process' />

            <p>Rent Up is a comprehensive real estate agency designed to streamline the rental experience for both tenants and landlords. Its website offers a vast array of property listings, including residential and commercial spaces, all accompanied by detailed descriptions, high-quality images, and transparent pricing. </p>
            <p>Renters can easily search for properties that fit their preferences in terms of location, size, and budget, while landlords benefit from powerful tools to advertise and manage their properties, ensuring a seamless tenant-finding process. With a focus on convenience and customer service, Rent Up provides personalized support throughout the entire rental process, making it easier to secure the perfect space or tenant efficiently.</p>
            <button className='btn2'>More About Us</button>
          </div>
          <div className='right row'>
            <img src='./immio.jpg' alt='' />
          </div>
        </div>
      </section>
    </>
  )
}

export default About
