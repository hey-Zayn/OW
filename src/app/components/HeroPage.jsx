import React from "react";
import PortfolioHero from "./PortolioHero";
import About from "./About";
import Section3 from "./Section3";
import BlogSection from "./BlogSection";
import Form from "./Form";
import PandaScroll from "./PandaScroll";
import NavBar from "./NavBar";
import Footer from "./Footer";


const Heropage = () => {
  return (
   <>
     <NavBar/>
      <PortfolioHero/>
    <About/>
    <Section3/>
    <BlogSection/>
    <Form/>
    <PandaScroll/>
    <Footer/>
   </>
  );
};

export default Heropage;
