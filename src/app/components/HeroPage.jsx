import React from "react";
import PortfolioHero from "./PortolioHero";
import About from "./About";
import BlogSection from "./BlogSection";
import Form from "./Form";

import NavBar from "./NavBar";
import Footer from "./Footer";
import Myexperties from "./Myexperties";
import Mywork from "./Mywork";
// import MyExper from "./MyExper";
import Quote from "./Quote";
import InteractiveTimeline from "./InteractiveTimeline";


const Heropage = () => {
  return (
   <>
     <NavBar/>
      <PortfolioHero/>
    <About/>
    <Myexperties/>
    {/* <MyExper/> */}
    <InteractiveTimeline />
    {/* <Mywork/> */}
   
    <BlogSection/>
    <Quote/>
    <Form/>
    
    <Footer/>
   </>
  );
};

export default Heropage;
