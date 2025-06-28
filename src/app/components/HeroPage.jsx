import React from "react";
import PortfolioHero from "./PortolioHero";
import About from "./About";
import Section3 from "./Section3";
import BlogSection from "./BlogSection";
import Form from "./Form";
import PandaScroll from "./PandaScroll";


const Heropage = () => {
  return (
   <>
    
      <PortfolioHero/>
    <About/>
    <Section3/>
    <BlogSection/>
    <Form/>
    <PandaScroll/>
   </>
  );
};

export default Heropage;
