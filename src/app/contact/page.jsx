"use client"

import React, { useState } from "react";
import { CircleAlert } from "lucide-react";
import Marquee from "../components/marquee";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";

const Page = () => {
  const [data, setData] = useState({
    fullName: '',
    email: '', 
    company: '', 
    phone: '',
    job: '',
    source: 'Google'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendEmail = async (formData) => {
    try {
      await axios.post('/api/send-email', {
        to: 'info@chatpandas.com',
        subject: 'New Contact Form Submission',
        text: `
          New contact form submission:
          Name: ${formData.fullName}
          Email: ${formData.email}
          Company: ${formData.company}
          Phone: ${formData.phone}
          Job Title: ${formData.job}
          Source: ${formData.source}
        `
      });
    } catch (error) {
      console.error('Email sending error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axios.post('/api/contact', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if(response.data.success) {
        await sendEmail(data);
        toast.success('Contact form submitted successfully!');
        setData({
          fullName: '',
          email: '', 
          company: '', 
          phone: '',
          job: '',
          source: 'Google'
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(error.response?.data?.message || 'Failed to submit contact form');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-full bg-[#191919] ">
      <NavBar/>
      <div className="w-full h-full pt-30">
        <Marquee />
        <div className="text-white w-full h-full pb-[2%] overflow-hidden bg-[#181818] pt-15">
          <div className="flex flex-col sm:flex-col md:flex-row xl:flex-row lg:flex-row 2xl:flex-row gap-[1%] justify-between">
            <div className="w-[55%] h-full mb-[10%] m-[4%]">
              <div className="flex gap-[8%]">
                <button className="p-5 py-3 text-lg md:text-sm font-semibold bg-red-500/20 text-white border border-red-500/30 rounded-md max-sm:hidden cursor-pointer backdrop-blur-lg hover:bg-red-500/30 transition-all duration-300 shadow-lg hover:shadow-red-500/20">
                  Book a Demo
                </button>
                <button className="p-5 py-3 text-lg font-semibold md:text-sm text-white bg-[#212121] border-white-50 outline-1 rounded-md max-sm:hidden cursor-pointer">
                  Careers
                </button>
              </div>
              <div className="w-55 mt-[15%]">
                <p>
                  We're here to help! Complete the form and our team will reach
                  out you soon.
                </p>
              </div>
              <div className="w-55 mt-[15%]">
                <p>Email: info@chatpandas.com</p>
              </div>
            </div>

            <div className="w-full h-full m-[4%] my-0">
              <form onSubmit={handleSubmit} className="flex flex-col gap-[15px]">
                <label htmlFor="fullName" className="text-xl sm:text-1xl 2xl:text-4xl md:text-1xl lg:text-2xl font-medium">
                  FULL NAME
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter Your Full Name"
                  className="p-5 w-[90%] sm:w-[90%] md:w-[100%] xl:w-[100%] lg:w-[100%] 2xl:w-[100%] text-lg font-semibold border-[1px] border-gray-100 rounded-md focus:outline-none placeholder-[rgb(107,107,107)] placeholder:text-sm sm:placeholder:text-lg md:placeholder:text-lg xl:placeholder:text-lg lg:placeholder:text-lg 2xl:placeholder:text-lg"
                  value={data.fullName}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="company" className="text-xl sm:text-1xl 2xl:text-4xl md:text-1xl lg:text-2xl font-medium">
                  COMPANY NAME
                </label>
                <input
                  type="text"
                  name="company"
                  placeholder="Your Company Name"
                  className="p-5 w-[90%] sm:w-[90%] md:w-[100%] xl:w-[100%] lg:w-[100%] 2xl:w-[100%] text-lg font-semibold border-[1px] border-gray-100 rounded-md focus:outline-none placeholder-[rgb(107,107,107)] placeholder:text-sm sm:placeholder:text-lg md:placeholder:text-lg xl:placeholder:text-lg lg:placeholder:text-lg 2xl:placeholder:text-lg"
                  value={data.company}
                  onChange={handleChange}
                />

                <label htmlFor="email" className="text-xl sm:text-1xl 2xl:text-4xl md:text-1xl lg:text-2xl font-medium">
                  BUSINESS EMAIL
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Business Email"
                  className="p-5 w-[90%] sm:w-[90%] md:w-[100%] xl:w-[100%] lg:w-[100%] 2xl:w-[100%] text-lg font-semibold border-[1px] border-gray-100 rounded-md focus:outline-none placeholder-[rgb(107,107,107)] placeholder:text-sm sm:placeholder:text-lg md:placeholder:text-lg xl:placeholder:text-lg lg:placeholder:text-lg 2xl:placeholder:text-lg"
                  value={data.email}
                  onChange={handleChange}
                  required
                />
                
                <label htmlFor="phone" className="text-xl sm:text-1xl 2xl:text-4xl md:text-1xl lg:text-2xl font-medium">
                  PHONE NUMBER
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter Your Phone Number"
                  className="p-5 w-[90%] sm:w-[90%] md:w-[100%] xl:w-[100%] lg:w-[100%] 2xl:w-[100%] text-lg font-semibold border-[1px] border-gray-100 rounded-md focus:outline-none placeholder-[rgb(107,107,107)] placeholder:text-sm sm:placeholder:text-lg md:placeholder:text-lg xl:placeholder:text-lg lg:placeholder:text-lg 2xl:placeholder:text-lg"
                  value={data.phone}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="job" className="text-xl sm:text-1xl 2xl:text-4xl md:text-1xl lg:text-2xl font-medium">
                  JOB TITLE
                </label>
                <input
                  type="text"
                  name="job"
                  placeholder="Enter Your Job Title"
                  className="p-5 w-[90%] sm:w-[90%] md:w-[100%] xl:w-[100%] lg:w-[100%] 2xl:w-[100%] text-lg font-semibold border-[1px] border-gray-100 rounded-md focus:outline-none placeholder-[rgb(107,107,107)] placeholder:text-sm sm:placeholder:text-lg md:placeholder:text-lg xl:placeholder:text-lg lg:placeholder:text-lg 2xl:placeholder:text-lg"
                  value={data.job}
                  onChange={handleChange}
                />

                <label htmlFor="source" className="text-xl sm:text-1xl 2xl:text-4xl md:text-1xl lg:text-2xl font-medium">
                  HOW DID YOU HEAR ABOUT US?
                </label>
                <select
                  name="source"
                  className="text-[rgb(114,114,114)] p-5 w-[90%] sm:w-[90%] md:w-[100%] xl:w-[100%] lg:w-[100%] 2xl:w-[100%] text-lg font-semibold border-1 border-gray-100 rounded-md bg-[rgb(34,34,34)]"
                  value={data.source}
                  onChange={handleChange}
                >
                  <option value="Google">Google</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Instagram">Instagram</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Email">Email</option>
                  <option value="Word of Mouth">Word of Mouth</option>
                </select>

                <div className="flex gap-[2%] mt-[3%]">
                  <CircleAlert size={60} className="-mt-1" />
                  <p className="m-0 pr-10 pt-1 text-justify mt-2">
                    Your privacy is important to us. All information submitted
                    through this form will be kept confidential and secure. We
                    will not share your details with third parties without your
                    consent.
                  </p>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="p-8 py-3 text-lg font-semibold md:text-sm text-white bg-[#212121] border-white-50 outline-1 rounded-md ml-[20%] mt-[8%] sm:mt-[4%] sm:ml-[0%] md:mt-[4%] md:ml-[0%] xl:mt-[4%] xl:ml-[0%] lg:mt-[4%] lg:ml-[0%] 2xl:ml-[0%] 2xl:mt-[4%] cursor-pointer hover:bg-[#333] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Get in Touch'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Page;