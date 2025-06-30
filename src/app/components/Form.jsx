"use client";
import React, { useState } from "react";
import { CircleAlert } from "lucide-react";
import { toast } from "react-toastify";
import Link from "next/link";

const Form = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    job: "",
    source: "Google"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Form submitted successfully!");
        setFormData({
          fullName: "",
          company: "",
          email: "",
          phone: "",
          job: "",
          source: "Google"
        });
      } else {
        toast.error(data.message || "Failed to submit form");
      }
    } catch (error) {
      toast.error("An error occurred while submitting the form");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="text-white w-full h-full pb-[2%] overflow-hidden bg-[#181818]">
        <h1 className="text-center p-8 pb-0 mt-16 mb-[2%] text-4xl sm:text-5xl 2xl:text-9xl md:text-6xl lg:text-7xl font-bold ">
          Lets's Talk
        </h1>
        <div className="flex flex-col sm:flex-col md:flex-row xl:flex-row  lg:flex-row 2xl:flex-row gap-[1%] justify-between">
          <div className="w-[55%] h-full mb-[10%] m-[4%]">
            <div className="flex gap-[8%]">
              <button className="p-5 py-3 text-lg md:text-sm font-semibold bg-red-500/20 text-white border border-red-500/30 rounded-md max-sm:hidden cursor-pointer backdrop-blur-lg hover:bg-red-500/30 transition-all duration-300 shadow-lg hover:shadow-red-500/20">
                Book a Demo
              </button>
              <Link href={`/about`}>
              <button className="p-5 py-3 text-lg font-semibold md:text-sm text-white bg-[#212121] border-white-50 outline-1 rounded-md max-sm:hidden cursor-pointer">
                Careers
              </button>
              </Link>
            </div>
            <div className="w-55 mt-[15%]">
              <p>
                We're here to help! Complete the form and our team will reach
                out you soon.
              </p>
            </div>
            <div className="w-55 mt-[15%]">
              <p className="text-sm space-x-1"><span className="font-bold">Email </span>jwilliams01109@gmail.com</p>
            </div>
          </div>

          <div className="w-full h-full m-[4%] my-0">
            <form
              className="flex flex-col gap-[15px]"
              onSubmit={handleSubmit}
            >
              <label
                htmlFor="fullName"
                className="text-xl sm:text-1xl 2xl:text-4xl md:text-1xl lg:text-2xl font-medium"
              >
                FULL NAME
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter Your Full Name"
                className="p-5 w-[90%] sm:w-[90%] md:w-[100%] xl:w-[100%] lg:w-[100%] 2xl:w-[100%] text-lg font-semibold border-[1px] border-gray-100 rounded-md focus:outline-none placeholder-[rgb(107,107,107)] placeholder:text-sm sm:placeholder:text-lg md:placeholder:text-lg xl:placeholder:text-lg lg:placeholder:text-lg 2xl:placeholder:text-lg"
                required
              />

              <label
                htmlFor="company"
                className="text-xl sm:text-1xl 2xl:text-4xl md:text-1xl lg:text-2xl font-medium"
              >
                COMPANY NAME
              </label>
              <input
                type="text"
                name="company"
                id="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your Your Company Name"
                className="p-5 w-[90%] sm:w-[90%] md:w-[100%] xl:w-[100%] lg:w-[100%] 2xl:w-[100%] text-lg font-semibold border-[1px] border-gray-100 rounded-md focus:outline-none placeholder-[rgb(107,107,107)] placeholder:text-sm sm:placeholder:text-lg md:placeholder:text-lg xl:placeholder:text-lg lg:placeholder:text-lg 2xl:placeholder:text-lg"
              />
              <label
                htmlFor="email"
                className="text-xl sm:text-1xl 2xl:text-4xl md:text-1xl lg:text-2xl font-medium"
              >
                BUSINESS EMAIL
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Business Email"
                className="p-5 w-[90%] sm:w-[90%] md:w-[100%] xl:w-[100%] lg:w-[100%] 2xl:w-[100%] text-lg font-semibold border-[1px] border-gray-100 rounded-md focus:outline-none placeholder-[rgb(107,107,107)] placeholder:text-sm sm:placeholder:text-lg md:placeholder:text-lg xl:placeholder:text-lg lg:placeholder:text-lg 2xl:placeholder:text-lg"
                required
              />
              <label
                htmlFor="phone"
                className="text-xl sm:text-1xl 2xl:text-4xl md:text-1xl lg:text-2xl font-medium"
              >
                PHONE NUMBER
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter Your Phone Number"
                className="p-5 w-[90%] sm:w-[90%] md:w-[100%] xl:w-[100%] lg:w-[100%] 2xl:w-[100%] text-lg font-semibold border-[1px] border-gray-100 rounded-md focus:outline-none placeholder-[rgb(107,107,107)] placeholder:text-sm sm:placeholder:text-lg md:placeholder:text-lg xl:placeholder:text-lg lg:placeholder:text-lg 2xl:placeholder:text-lg"
                required
              />
              <label
                htmlFor="job"
                className="text-xl sm:text-1xl 2xl:text-4xl md:text-1xl lg:text-2xl font-medium"
              >
                JOB TITLE
              </label>
              <input
                type="text"
                name="job"
                id="job"
                value={formData.job}
                onChange={handleChange}
                placeholder="Enter Your Job Title"
                className="p-5 w-[90%] sm:w-[90%] md:w-[100%] xl:w-[100%] lg:w-[100%] 2xl:w-[100%] text-lg font-semibold border-[1px] border-gray-100 rounded-md focus:outline-none placeholder-[rgb(107,107,107)] placeholder:text-sm sm:placeholder:text-lg md:placeholder:text-lg xl:placeholder:text-lg lg:placeholder:text-lg 2xl:placeholder:text-lg"
                required
              />
              <label
                htmlFor="source"
                className="text-xl sm:text-1xl 2xl:text-4xl md:text-1xl lg:text-2xl font-medium"
              >
                HOW DID YOU HEAR ABOUT US?
              </label>
              <select
                name="source"
                id="source"
                value={formData.source}
                onChange={handleChange}
                className=" text-[rgb(114,114,114)] p-5 w-[90%] sm:w-[90%] md:w-[100%] xl:w-[100%] lg:w-[100%] 2xl:w-[100%] text-lg font-semibold border-1 border-gray-100 rounded-md bg-[rgb(34,34,34)]"
              >
                <option value="Google">Google</option>
                <option value="Facebook">Facebook</option>
                <option value="Instagram">Instagram</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Email">Email</option>
                <option value="Word of Mouth">Word of Mouth</option>
              </select>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="p-5 py-3 text-lg font-semibold bg-red-500/20 text-white border border-red-500/30 rounded-md cursor-pointer backdrop-blur-lg hover:bg-red-500/30 transition-all duration-300 shadow-lg hover:shadow-red-500/20"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
           
           <div className="flex gap-[2%] mt-[3%]">
              <CircleAlert size={60} className="-mt-1" />

              <p className="m-0 pr-10 pt-1 text-justify mt-2">
                Your privacy is important to us. All information submitted
                through this form will be kept confidential and secure. We will
                not share your details with third parties without your consent.
              </p>
            </div>
            <button className="p-8 py-3 text-lg font-semibold md:text-sm text-white bg-[#212121] border-white-50 outline-1 rounded-md ml-[20%] mt-[8%] sm:mt-[4%] sm:ml-[0%] md:mt-[4%] md:ml-[0%] xl:mt-[4%] xl:ml-[0%] lg:mt-[4%] lg:ml-[0%] 2xl:ml-[0%] 2xl:mt-[4%] cursor-pointer">
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;