import React from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../../common/Heading";
import "./hero.css";

const Hero = () => {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent the default form submission
    navigate('/blog'); // Redirect to the blog page
  };

  return (
    <>
      <section className="hero">
        {/* Video Background */}
        <video autoPlay muted loop className="background-video">
          <source
            src="https://videos.pexels.com/video-files/7578552/7578552-uhd_2560_1440_30fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Hero Content */}
        <div className="container">
          <Heading
            title="Search Your Next Home"
            subtitle="Find new & featured property located in your local city."
          />

          <form className="flex" onSubmit={handleSearch}>
            <div className="box">
              <span>City/Street</span>
              {/* Dropdown for Location */}
              <select>
                <option value="">Select Location</option>
                <option value="hyderabad">Hyderabad</option>
                <option value="chennai">Chennai</option>
                <option value="bangalore">Bangalore</option>
                <option value="mumbai">Mumbai</option>
                <option value="delhi">Delhi</option>
                <option value="goa">Goa</option>
              </select>
            </div>
            <div className="box">
              <span>Property Type</span>
              {/* Dropdown for Property Type */}
              <select>
                <option value="">Select Property Type</option>
                <option value="family-house">Family House</option>
                <option value="house-villa">House & Villa</option>
                <option value="apartment">Apartment</option>
                <option value="office-studio">Office & Studio</option>
                <option value="villa-condo">Villa & Condo</option>
              </select>
            </div>
            <div className="box">
              <span>Price Range</span>
              {/* Dropdown for Price Range */}
              <select>
                <option value="">Select Price Range</option>
                <option value="10k-50k">10k-50k</option>
                <option value="1cr-5cr">1cr-5cr</option>
              </select>
            </div>
            <div className="box">
              <h4>Advance Filter</h4>
            </div>
            <button className="btn1" type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Hero;
