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
    <div className="w-full py-12 px-4 sm:px-8 lg:px-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171717] mb-8">
          Let's Connect
        </h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 bg-[#FDC435] text-[#171717] font-semibold rounded-md hover:bg-[#FDC435]/90 transition-all duration-300">
                Book a Consultation
              </button>
              <Link href="/about">
                <button className="px-6 py-3 border border-[#171717] text-[#171717] font-semibold rounded-md hover:bg-[#FDC435]/10 transition-all duration-300">
                  About Me
                </button>
              </Link>
            </div>
            
            <div className="space-y-4">
              <p className="text-[#525252]">
                I'd love to hear about your project or business needs. Fill out the form and I'll get back to you soon.
              </p>
              <div>
                <p className="text-[#171717] font-medium">
                  <span className="text-[#FDC435]">Email:</span> jwilliams01109@gmail.com
                </p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="fullName" className="block text-[#171717] font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full p-3 border border-[#E5E5E5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FDC435] text-black"
                  required
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="company" className="block text-[#171717] font-medium">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  id="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your Company"
                  className="w-full p-3 border border-[#E5E5E5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FDC435] text-black"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className="block text-[#171717] font-medium">
                  Business Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full p-3 border border-[#E5E5E5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FDC435] text-black"
                  required
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="phone" className="block text-[#171717] font-medium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(123) 456-7890"
                  className="w-full p-3 border border-[#E5E5E5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FDC435] text-black"
                  required
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="job" className="block text-[#171717] font-medium">
                  Job Title
                </label>
                <input
                  type="text"
                  name="job"
                  id="job"
                  value={formData.job}
                  onChange={handleChange}
                  placeholder="Your Position"
                  className="w-full p-3 border border-[#E5E5E5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FDC435] text-black"
                  required
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="source" className="block text-[#171717] font-medium">
                  How did you hear about me?
                </label>
                <select
                  name="source"
                  id="source"
                  value={formData.source}
                  onChange={handleChange}
                  className="w-full p-3 border border-[#E5E5E5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FDC435] bg-white text-black"
                >
                  <option value="Google">Google</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Instagram">Instagram</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Email">Email</option>
                  <option value="Word of Mouth">Word of Mouth</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#FDC435] text-[#171717] font-semibold rounded-md hover:bg-[#FDC435]/90 transition-all duration-300"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            <div className="flex items-start gap-3 mt-6 p-4 bg-[#FDC435]/10 rounded-md">
              <CircleAlert className="text-[#FDC435] mt-1 flex-shrink-0" />
              <p className="text-sm text-[#525252]">
                Your privacy is important. All information will be kept confidential and secure. I will not share your details without consent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;