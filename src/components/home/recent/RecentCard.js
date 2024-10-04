import React from "react";
import { Link } from "react-router-dom";
import { list } from "../../data/Data";
import "./recent.css";

const RecentCard = () => {
  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "100px", marginBottom: "100px", fontFamily:"35px poppins,sans-serif",color: "#2d3954",fontSize:"35px"}}>
        RECENTLY ADDED PROPERTIES
      </h1>
      <div className="content grid3 mtop">
        {list.map((val, index) => {
          const { id, cover, category, location, name, price, type } = val;
          return (
            <div className="box shadow" key={index}>
              {/* Each property image is wrapped in a Link to navigate to its detail page */}
              <Link to={`/blog/${id}`} className="img">
                <img src={cover} alt={name} className="property-image" />
              </Link>
              <div className="text">
                <div className="category flex">
                  <span
                    style={{
                      background: category === "For Sale" ? "#25b5791a" : "#ff98001a",
                      color: category === "For Sale" ? "#25b579" : "#ff9800",
                    }}
                  >
                    {category}
                  </span>
                  <i className="fa fa-heart"></i>
                </div>
                <h4>{name}</h4>
                <p>
                  <i className="fa fa-location-dot"></i> {location}
                </p>
              </div>
              <div className="button flex">
                <div>
                  <Link to={`/blog/${id}`} className="btn2" >{price}</Link> <label htmlFor="">/sqft</label>
                </div>
                <span>{type}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RecentCard;
