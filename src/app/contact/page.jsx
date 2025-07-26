"use client"

import React, { useState } from "react";
import { CircleAlert } from "lucide-react";
import Marquee from "../components/marquee";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import Head from "next/head";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send data to both APIs simultaneously
      const [mailResponse, contactResponse] = await Promise.all([
        axios.post('/api/sendMail', data),
        axios.post('/api/contact', data)
      ]);
      
      if(mailResponse.data.success && contactResponse.data.success) {
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
    <div className="w-full min-h-screen bg-white">
      <Head>
        <title>Contact | Digital Transformation Expert | Business Growth | Consultation</title>
        <meta
          name="description"
          content="Contact a digital transformation expert for business growth, leadership, process optimization, and technology consultation. Get in touch for tailored solutions and expert advice."
        />
        <meta
          name="keywords"
          content="Contact, Digital Transformation, Business Growth, Consultation, Leadership, Process Optimization, Technology, Vendor Management, CRM, Analytics, Creative Tools, Business Solutions, Expert Advice, Book a Demo, Careers"
        />
        <meta property="og:title" content="Contact | Digital Transformation Expert | Business Growth | Consultation" />
        <meta property="og:description" content="Contact a digital transformation expert for business growth, leadership, process optimization, and technology consultation. Get in touch for tailored solutions and expert advice." />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Digital Transformation Expert" />
      </Head>
      <NavBar/>
      <div className="w-full pt-20">
        <Marquee />
        <div className="w-full pb-12 overflow-hidden bg-white pt-10">
          <div className="flex flex-col md:flex-row gap-8 justify-between max-w-6xl mx-auto px-4">
            <div className="w-full md:w-1/2">
              <div className="flex gap-4 mb-8">
                <button className="px-6 py-3 text-lg font-semibold bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors duration-300 shadow-lg hover:shadow-yellow-500/30">
                  Book a Demo
                </button>
                <Link href={'/about'}>
                  <button className="px-6 py-3 text-lg font-semibold text-gray-800 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors duration-300">
                    Careers
                  </button>
                </Link>
              </div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h2>
                <p className="text-lg text-gray-600">
                  We're here to help! Complete the form and our team will reach out to you soon.
                </p>
              </div>
              <div className="text-lg text-gray-600">
                <p>Email: jwilliams01109@gmail.com</p>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-lg font-medium text-gray-800 mb-2">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter Your Full Name"
                    className="w-full p-4 text-lg font-medium text-black border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent placeholder-gray-400"
                    value={data.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-lg font-medium text-gray-800 mb-2">
                    COMPANY NAME
                  </label>
                  <input
                    type="text"
                    name="company"
                    placeholder="Your Company Name"
                    className="w-full p-4 text-lg font-medium text-black border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent placeholder-gray-400"
                    value={data.company}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-lg font-medium text-gray-800 mb-2">
                    BUSINESS EMAIL
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Business Email"
                    className="w-full p-4 text-lg font-medium text-black border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent placeholder-gray-400"
                    value={data.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-lg font-medium text-gray-800 mb-2">
                    PHONE NUMBER
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter Your Phone Number"
                    className="w-full p-4 text-lg font-medium text-black border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent placeholder-gray-400"
                    value={data.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="job" className="block text-lg font-medium text-gray-800 mb-2">
                    JOB TITLE
                  </label>
                  <input
                    type="text"
                    name="job"
                    placeholder="Enter Your Job Title"
                    className="w-full p-4 text-lg font-medium text-black border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent placeholder-gray-400"
                    value={data.job}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="source" className="block text-lg font-medium text-gray-800 mb-2">
                    HOW DID YOU HEAR ABOUT US?
                  </label>
                  <select
                    name="source"
                    className="w-full p-4 text-lg font-medium text-black border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white"
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
                </div>

                <div className="flex gap-4 mt-4 p-4 bg-yellow-50 rounded-lg">
                  <CircleAlert className="text-yellow-500 mt-1 flex-shrink-0" size={24} />
                  <p className="text-gray-600">
                    Your privacy is important to us. All information submitted
                    through this form will be kept confidential and secure. We
                    will not share your details with third parties without your
                    consent.
                  </p>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 text-lg font-semibold text-white bg-yellow-500 rounded-md hover:bg-yellow-600 transition-colors duration-300 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
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