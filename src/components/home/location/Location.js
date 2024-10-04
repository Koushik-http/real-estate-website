import React from "react";
import Heading from "../../common/Heading";
import { location } from "../../data/Data";
import "./style.css";

const locationsCoordinates = {
  Hyderabad: [
    { lat: 17.385, lng: 78.4867 },
    { lat: 17.4126, lng: 78.4747 },
    { lat: 17.4298, lng: 78.4992 },
  ],
  Chennai: [
    { lat: 13.0827, lng: 80.2707 },
    { lat: 13.0524, lng: 80.2508 },
    { lat: 13.0411, lng: 80.2333 },
  ],
  Bangalore: [
    { lat: 12.9716, lng: 77.5946 },
    { lat: 12.9982, lng: 77.5947 },
    { lat: 13.0108, lng: 77.5522 },
  ],
  Mumbai: [
    { lat: 19.076, lng: 72.8777 },
    { lat: 19.1001, lng: 72.8798 },
    { lat: 19.1314, lng: 72.9172 },
  ],
  Goa: [
    { lat: 15.2993, lng: 74.124 },
    { lat: 15.3367, lng: 74.0866 },
    { lat: 15.2674, lng: 73.9589 },
  ],
};

// Function to generate a Google Maps URL with multiple markers
const generateGoogleMapsURL = (name) => {
  const coordinates = locationsCoordinates[name] || [];
  const markers = coordinates.map((coord) => `${coord.lat},${coord.lng}`).join("|");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}&zoom=12&markers=${markers}`;
};

const Location = () => {
  return (
    <>
      <section className="location padding">
        <div className="container">
          <Heading
            title="Explore By Location"
            subtitle={
              <>
                Here Are Some Locations Where You Can Search For Some Really Good E-states
                <br />
                (CLICK ON THE IMAGES TO SHOW THE LOCATION)
              </>
            }
          />

          <div className="content grid3 mtop">
            {location.map((item, index) => (
              <div className="box" key={index}>
                <a
                  href={generateGoogleMapsURL(item.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={item.cover} alt={item.name} />
                  <div className="overlay">
                    <h5>{item.name}</h5>
                    <p>
                      <label>{item.Villas}</label>
                      <label>{item.Offices}</label>
                      <label>{item.Apartments}</label>
                    </p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Location;
