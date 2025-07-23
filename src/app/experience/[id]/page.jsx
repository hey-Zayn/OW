'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

// Theme constants from globals.css
// Theme constants from globals.css
const THEME = {
  bg: 'var(--bg-color)',
  primary: 'var(--primary-color)',
  text: 'var(--text-color)',
};

const ExperienceDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [experience, setExperience] = useState({
    company: '',
    position: '',
    location: '',
    duration: '',
    description: '',
    skills: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await axios.get(`/api/experience/${id}`);
        if (res.data?.success) {
          setExperience({
            company: res.data.data.company || '',
            position: res.data.data.position || '',
            location: res.data.data.location || '',
            duration: res.data.data.duration || '',
            description: res.data.data.description || '',
            skills: res.data.data.skills || []
          });
        } else {
          setError('Experience not found');
        }
      } catch (err) {
        console.error('Error fetching experience:', err);
        setError(err.response?.data?.message || 'Failed to load experience. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchExperience();
    } else {
      setError('Invalid experience ID');
      setLoading(false);
    }
  }, [id]);

  if (loading) return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: `linear-gradient(135deg, ${THEME.primary}11 0%, ${THEME.bg} 100%)`
      }}
    >
      <div className="text-center space-y-4">
        <div
          className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto"
          style={{
            borderColor: `${THEME.primary}`,
            borderTopColor: 'transparent'
          }}
        ></div>
        <h3 className="text-xl font-medium" style={{ color: THEME.text }}>Loading experience details...</h3>
      </div>
    </div>
  );

  if (error) return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 text-center"
      style={{
        background: `${THEME.bg}`
      }}
    >
      <div
        className="max-w-md p-8 rounded-2xl shadow-lg"
        style={{ background: THEME.bg }}
      >
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#ef4444' }}>Error Loading Experience</h2>
        <p className="mb-6" style={{ color: '#525252' }}>{error}</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
            style={{
              background: `linear-gradient(90deg, ${THEME.primary} 0%, #ffd966 100%)`,
              color: THEME.primary,
              fontWeight: 500
            }}
          >
            Try Again
          </button>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 rounded-lg hover:bg-gray-300 transition-all duration-300"
            style={{
              background: '#f3f4f6',
              color: THEME.text,
              fontWeight: 500
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );

  if (!experience) return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 text-center"
      style={{
        background: `linear-gradient(135deg, ${THEME.primary}11 0%, ${THEME.bg} 100%)`
      }}
    >
      <div
        className="max-w-md p-8 rounded-2xl shadow-lg"
        style={{ background: THEME.bg }}
      >
        <h2 className="text-2xl font-bold mb-4" style={{ color: THEME.text }}>Experience Not Found</h2>
        <p className="mb-6" style={{ color: THEME.text }}>The requested experience could not be found in our records.</p>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-2 rounded-lg hover:bg-gray-300 transition-all duration-300"
          style={{
            background: '#f3f4f6',
            color: THEME.text,
            fontWeight: 500
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      style={{
        background: `linear-gradient(135deg, ${THEME.primary}11 0%, ${THEME.bg} 100%)`
      }}
    >
      <div
        className="rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl"
        style={{ background: THEME.bg }}
      >
        <div className="p-8 sm:p-10">
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 transition-colors duration-300"
              style={{
                color: '#525252'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              <span style={{ fontWeight: 500 }}>Back to Timeline</span>
            </button>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <h1
                className="text-3xl md:text-4xl font-bold"
                style={{
                  color: THEME.text,
                  // background: `linear-gradient(90deg, ${THEME.primary} 0%, #ffd966 100%)`,
                  // WebkitBackgroundClip: 'text',
                  // WebkitTextFillColor: 'transparent',
                  // backgroundClip: 'text'
                }}
              >
                {experience.position}
              </h1>
              <span
                className="text-lg px-4 py-2 font-medium rounded-full"
                style={{
                  background: `${THEME.primary}22`,
                  color: THEME.primary
                }}
              >
                {experience.duration}
              </span>
            </div>
          </div>

          <div
            className="mb-8 p-6 rounded-xl"
            style={{ background: `${THEME.primary}15` }}
          >
            <h2 className="text-2xl font-semibold mb-2" style={{ color: THEME.text }}>{experience.company}</h2>
            <p className="flex items-center gap-2" style={{ color: '#525252' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {experience.location}
            </p>
          </div>

          <div
            className="prose max-w-none mb-10 p-6 rounded-xl"
            style={{ background: THEME.bg}}
          >
            <p
              className="whitespace-pre-line leading-relaxed"
              style={{ color: THEME.text }}
            >
              {experience.description}
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4" style={{ color: THEME.text }}>Skills & Technologies</h3>
            <div className="flex flex-wrap gap-3">
              {experience.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 text-sm font-medium rounded-full border hover:scale-105 transition-transform duration-300"
                  style={{
                    background: `${THEME.primary}22`,
                    borderColor: `${THEME.primary}44`,
                    color: THEME.primary
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetailPage;
