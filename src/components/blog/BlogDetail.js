import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";

// Import images
import image1 from "../../images2/image1.png";
import image2 from "../../images2/image2.png";
import image3 from "../../images2/image3.png";
import image4 from "../../images2/image4.png";
import image5 from "../../images2/image5.png";
import image6 from "../../images2/image6.png";

// Define your map container style
const mapContainerStyle = {
  height: "400px",
  width: "100%",
};

// Define default center for the map
const defaultCenter = {
  lat: 17.385044, // Default center (Hyderabad latitude)
  lng: 78.486671, // Default center (Hyderabad longitude)
};

// Your Google Maps API key
const GOOGLE_MAPS_API_KEY = "AIzaSyCWA4dZ2dYbEqL8cvCxWYs3Oy6QeJqRXyU";

// Function to fetch coordinates from an address
const getCoordinatesFromAddress = async (address) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          address,
          key: GOOGLE_MAPS_API_KEY,
        },
      }
    );
    const location = response.data.results[0]?.geometry?.location;
    return location ? { lat: location.lat, lng: location.lng } : null;
  } catch (error) {
    console.error("Error fetching coordinates", error);
    return null;
  }
};

const BlogDetail = () => {
  const { id } = useParams(); // Get the blog ID from the URL parameters
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [loading, setLoading] = useState(true); // Loading state for fetching coordinates

  // Sample data with real estate information
  const properties = [
    {
      id: 1,
      title: "Luxurious 3-Bedroom Apartment in Hyderabad",
      image: image1,
      description:
        "A stunning 3-bedroom apartment located in Hyderabad. The apartment features modern amenities, high ceilings, and large windows with a view of the lake.",
      location: "Hyderabad, Telangana",
      price: "20,000 Rs",
      size: "1,200 sqft",
      bedrooms: 3,
      bathrooms: 2,
      features: ["Gym Access", "Swimming Pool", "24/7 Security", "Underground Parking"],
    },
    {
      id: 2,
      title: "Spacious Family Home with Garden in Chennai",
      image: image2,
      description:
        "A beautiful family home with a spacious backyard garden. Perfect for those who love nature and tranquility. The property is located in Chennai with easy access to schools and parks.",
      location: "Chennai, Tamil Nadu",
      price: "1.5 Cr",
      size: "2,500 sqft",
      bedrooms: 4,
      bathrooms: 3,
      features: ["Large Garden", "2-Car Garage", "Modern Kitchen", "Fireplace"],
    },
    {
      id: 3,
      title: "The Real Estate Corner in Bangalore",
      image: image3,
      description:
        "A modern and cozy studio apartment perfect for singles or couples, featuring an open-plan layout, a fully equipped kitchen, and a balcony with a great view.",
      location: "Bangalore, Karnataka",
      price: "30k Rs",
      size: "500 sqft",
      bedrooms: 1,
      bathrooms: 1,
      features: ["Balcony", "City View", "24/7 Concierge Service"],
    },
    {
      id: 4,
      title: "Herringbone Realty in Mumbai",
      image: image4,
      description:
        "A modern and cozy studio apartment perfect for singles or couples, featuring an open-plan layout, a fully equipped kitchen, and a balcony with a great view.",
      location: "Mumbai, Maharashtra",
      price: "1.5 Cr",
      size: "500 sqft",
      bedrooms: 1,
      bathrooms: 1,
      features: ["Balcony", "City View", "24/7 Concierge Service"],
    },
    {
      id: 5,
      title: "Brick Lane Realty in Goa",
      image: image5,
      description:
        "A modern and cozy studio apartment perfect for singles or couples, featuring an open-plan layout, a fully equipped kitchen, and a balcony with a great view.",
      location: "Goa",
      price: "40k Rs",
      size: "500 sqft",
      bedrooms: 1,
      bathrooms: 1,
      features: ["Balcony", "City View", "24/7 Concierge Service"],
    },
    {
      id: 6,
      title: "Banyon Tree Realty",
      image: image6,
      description:
        "A modern and cozy studio apartment perfect for singles or couples, featuring an open-plan layout, a fully equipped kitchen, and a balcony with a great view.",
      location: "Hyderabad, Telangana",
      price: "2Cr",
      size: "500 sqft",
      bedrooms: 1,
      bathrooms: 1,
      features: ["Balcony", "City View", "24/7 Concierge Service"],
    },
  ];

  // Find the property by ID
  const property = properties.find((p) => p.id === parseInt(id));

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (property) {
        setLoading(true); // Set loading state to true before fetching
        const coordinates = await getCoordinatesFromAddress(property.location);
        setMapCenter(coordinates);
        setLoading(false); // Set loading state to false after fetching
      }
    };

    fetchCoordinates();
  }, [property]);

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <div className="blog-detail">
      <h1>{property.title}</h1>
      <img src={property.image} alt={property.title} />
      <p>{property.description}</p>
      <div className="property-details">
        <h2>Property Details</h2>
        <ul>
          <li>
            <strong>Location:</strong> {property.location}
          </li>
          <li>
            <strong>Price:</strong> {property.price}
          </li>
          <li>
            <strong>Size:</strong> {property.size}
          </li>
          <li>
            <strong>Bedrooms:</strong> {property.bedrooms}
          </li>
          <li>
            <strong>Bathrooms:</strong> {property.bathrooms}
          </li>
          <li>
            <strong>Features:</strong> {property.features.join(", ")}
          </li>
        </ul>
      </div>
      <div className="property-map">
        <h2>Property Location</h2>
        {loading ? (
          <p>Loading map...</p>
        ) : (
          <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={mapCenter}
              zoom={15}
            >
              {mapCenter !== defaultCenter && <Marker position={mapCenter} />}
            </GoogleMap>
          </LoadScript>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
