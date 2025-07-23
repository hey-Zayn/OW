'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Link from 'next/link';

const THEME = {
  bg: 'var(--bg-color)',
  primary: 'var(--primary-color)',
  text: 'var(--text-color)',
};

const WorkDetails = ({ params }) => {
    const [work, setWork] = useState(null);
    const [loading, setLoading] = useState(true);
    // Fix: params is already an object, no need to "unwrap"
    const id = params.id;

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
            <div className="min-h-screen flex items-center justify-center" style={{ background: THEME.bg }}>
                <div
                  className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
                  style={{
                    borderColor: `${THEME.primary} ${THEME.primary} transparent transparent`
                  }}
                ></div>
            </div>
        );
    }

    if (!work) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: THEME.bg }}>
                <p className="text-xl" style={{ color: THEME.text }}>Work not found</p>
            </div>
        );
    }

    return (
        <>
        <NavBar />
        <div
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 space-y-16 mt-10"
          style={{ background: THEME.bg }}
        >
          {/* Hero Image Section */}
          <div
            className="relative group rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 h-[400px] md:h-[550px] w-full"
            style={{
              border: `2px solid ${THEME.primary}`,
              boxShadow: `0 4px 32px 0 ${THEME.primary}22`
            }}
          >
            <img 
              src={work.image} 
              alt={work.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="eager"
              style={{
                background: '#f3f3f3'
              }}
            />
          </div>
      
          {/* Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Project Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Project Content */}
              <div
                className="rounded-2xl p-8 shadow-sm border"
                style={{
                  background: THEME.bg,
                  borderColor: `${THEME.primary}33`,
                  color: THEME.text,
                  boxShadow: `0 2px 8px 0 ${THEME.primary}11`
                }}
              >
                <h1
                  className="text-4xl font-bold mb-6"
                  style={{ color: THEME.primary }}
                >
                  {work.title}
                </h1>
                <div className="prose prose-lg max-w-none" style={{ color: THEME.text }}>
                  <p className="text-lg">{work.description}</p>
                </div>
              </div>
      
              {/* Gallery Section (if you have multiple images) */}
              <div
                className="rounded-2xl p-8 shadow-sm border"
                style={{
                  background: THEME.bg,
                  borderColor: `${THEME.primary}33`,
                  color: THEME.text,
                  boxShadow: `0 2px 8px 0 ${THEME.primary}11`
                }}
              >
                <h2
                  className="text-2xl font-bold mb-6"
                  style={{ color: THEME.primary }}
                >
                  Project Gallery
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="aspect-video rounded-xl overflow-hidden"
                      style={{
                        background: `${THEME.primary}11`,
                        border: `1.5px solid ${THEME.primary}33`
                      }}
                    >
                      <img 
                        src={`https://source.unsplash.com/random/600x400?work=${item}`} 
                        alt={`Project screenshot ${item}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        style={{
                          background: THEME.bg
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
      
            {/* Right Column - Project Meta */}
            <div className="space-y-8">
              {/* Project Details Card */}
              <div
                className="rounded-2xl p-8 shadow-sm border sticky top-8"
                style={{
                  background: THEME.bg,
                  borderColor: `${THEME.primary}33`,
                  color: THEME.text,
                  boxShadow: `0 2px 8px 0 ${THEME.primary}11`
                }}
              >
                <h2
                  className="text-2xl font-bold mb-6"
                  style={{ color: THEME.primary }}
                >
                  Project Details
                </h2>
                
                {/* Technologies */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <div
                      className="p-2 rounded-lg mr-4"
                      style={{
                        background: `${THEME.primary}15`
                      }}
                    >
                      <svg className="w-6 h-6" fill="currentColor" style={{ color: THEME.primary }} viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold" style={{ color: THEME.text }}>Technologies</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {work.technologies.map((tech, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1.5 rounded-full text-xs font-medium"
                            style={{
                              background: `${THEME.primary}18`,
                              color: THEME.primary,
                              border: `1px solid ${THEME.primary}33`
                            }}
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
                    <div
                      className="p-2 rounded-lg mr-4"
                      style={{
                        background: `${THEME.primary}10`
                      }}
                    >
                      <svg className="w-6 h-6" fill="currentColor" style={{ color: THEME.primary }} viewBox="0 0 20 20">
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold" style={{ color: THEME.text }}>Categories</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {work.categories.map((category, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1.5 rounded-full text-xs font-medium"
                            style={{
                              background: `${THEME.primary}10`,
                              color: THEME.primary,
                              border: `1px solid ${THEME.primary}33`
                            }}
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
                    <div
                      className="p-2 rounded-lg mr-4"
                      style={{
                        background: `${THEME.primary}12`
                      }}
                    >
                      <svg className="w-6 h-6" fill="currentColor" style={{ color: THEME.primary }} viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold" style={{ color: THEME.text }}>Company</h3>
                      <p className="mt-1" style={{ color: THEME.text }}>{work.company}</p>
                    </div>
                  </div>
                </div>
                
                {/* Completion Date */}
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div
                      className="p-2 rounded-lg mr-4"
                      style={{
                        background: `${THEME.primary}13`
                      }}
                    >
                      <svg className="w-6 h-6" fill="currentColor" style={{ color: THEME.primary }} viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold" style={{ color: THEME.text }}>Completion Date</h3>
                      <p className="mt-1" style={{ color: THEME.text }}>
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
                  className="w-full mt-8 px-6 py-3 font-medium rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center"
                  style={{
                    background: THEME.primary,
                    color: THEME.bg,
                    border: `2px solid ${THEME.primary}`,
                    boxShadow: `0 2px 8px 0 ${THEME.primary}22`
                  }}
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
