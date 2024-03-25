import React from "react";
import Footer from "../footer/Footer";
import HeaderLandingPage from "../header/HeaderLandingPage";
import LandingPageAppBar from "../navbar/Navbar";
import ServiceSection from "./ServiceSection";
import "./LandingPage.css";
import HeaderQuote from "../../services/images/HeaderQuote.png";

function LandingPage() {
  return (
    <div>
      <LandingPageAppBar inHome={true} />
      <HeaderLandingPage />
      <img src={HeaderQuote} style={{ maxWidth: "100%" }} />
      <ServiceSection />
      <Footer />
    </div>
  );
}

export default LandingPage;
