import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../common/header/Header";
import Home from "../home/Home";
import About from "../about/About";
import Blog from "../blog/Blog";
import BlogDetail from "../blog/BlogDetail"; // Import the BlogDetail component
import Services from "../services/Services";
import Location from "../home/location/Location";
import Profile from "../../components/Profile/ProfileModal"; 
import Footer from "../common/footer/Footer";

const Pages = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} /> 
          <Route path="/location" element={<Location />} />
          <Route path="/profile" element={<Profile />} /> 
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default Pages;
