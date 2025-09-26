import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Testimonials from "../components/Testimonials";
import Hero from "./Hero";
import WhyChooseUs from "./WhyChooseUs";
import ElegantAccordion from "./Accordion";
import BookingForm from "../components/BookingForm";
import Banner from "./Banner";
import OffersPage from "./OffersPage";


export default function Home() {
  
  return (
    <div className="">
      <Helmet>
        <title>Northeast Travels | Explore Tours & Car Rentals</title>
        <meta
          name="description"
          content="Book tours and car rentals easily with Northest Travels."
        />
        <meta
          name="keywords"
          content="tours, travel, cars, rentals, holiday packages, guwahati, meghalaya tour, cherapunjee"
        />
      </Helmet>

      {/* Hero Section */}
      <Banner />
      <OffersPage />
      
      <Hero />

      <WhyChooseUs />

      <ElegantAccordion />
    </div>
  );
}
