'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Link from 'next/link';

const WorkDetails = ({ params }) => {
    const [work, setWork] = useState(null);
    const [loading, setLoading] = useState(true);
    const unwrappedParams = React.use(params);
    const id = unwrappedParams.id;

    const fetchWork = async () => {
        try {
            const res = await axios.get(`/api/work?id=${id}`);
            if (res.data && res.data.data) {
                setWork(res.data.data);
            }
        } catch (error) {
            console.error('Error fetching work:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let isMounted = true;
        
        if (isMounted) {
            fetchWork();
        }

        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
            </div>
        );
    }

    if (!work) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl">Work not found</p>
            </div>
        );
    }

    return (
        <>
        <NavBar />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 space-y-16">
          {/* Hero Image Section */}
          <div className="relative group rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 h-[400px] md:h-[550px] w-full">
            <img 
              src={work.image} 
              alt={work.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="eager"
            />
          </div>
      
          {/* Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Project Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Project Content */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">{work.title}</h1>
                <div className="prose prose-lg max-w-none text-gray-700">
                  <p className="text-lg">{work.description}</p>
                </div>
              </div>
      
              {/* Gallery Section (if you have multiple images) */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="aspect-video bg-gray-100 rounded-xl overflow-hidden">
                      <img 
                        src={`https://source.unsplash.com/random/600x400?work=${item}`} 
                        alt={`Project screenshot ${item}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
      
            {/* Right Column - Project Meta */}
            <div className="space-y-8">
              {/* Project Details Card */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 sticky top-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Details</h2>
                
                {/* Technologies */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-yellow-50 mr-4">
                      <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Technologies</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {work.technologies.map((tech, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1.5 bg-yellow-50 text-yellow-700 rounded-full text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Categories */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-blue-50 mr-4">
                      <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Categories</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {work.categories.map((category, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Company */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-purple-50 mr-4">
                      <svg className="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Company</h3>
                      <p className="text-gray-600 mt-1">{work.company}</p>
                    </div>
                  </div>
                </div>
                
                {/* Completion Date */}
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-green-50 mr-4">
                      <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Completion Date</h3>
                      <p className="text-gray-600 mt-1">
                        {new Date(work.completionDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
      
                {/* CTA Button */}
                <Link 
                  href="/contact" 
                  className="w-full mt-8 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-medium rounded-lg hover:from-yellow-600 hover:to-yellow-500 transition-all shadow-md hover:shadow-lg flex items-center justify-center"
                >
                  Contact Me
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
};

export default WorkDetails;
