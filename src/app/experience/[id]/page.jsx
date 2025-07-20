'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-white">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <h3 className="text-xl font-medium text-gray-700">Loading experience details...</h3>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-yellow-50 to-white">
      <div className="max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Error Loading Experience</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <div className="flex gap-4 justify-center">
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
          >
            Try Again
          </button>
          <button 
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );

  if (!experience) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-yellow-50 to-white">
      <div className="max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Experience Not Found</h2>
        <p className="text-gray-600 mb-6">The requested experience could not be found in our records.</p>
        <button 
          onClick={() => router.push('/')}
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-br from-yellow-50 to-white">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl">
        <div className="p-8 sm:p-10">
          <div className="flex justify-between items-center mb-8">
            <button 
              onClick={() => router.push('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Timeline
            </button>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                {experience.position}
              </h1>
              <span className="text-lg px-4 py-2 bg-yellow-100 text-yellow-800 font-medium rounded-full">
                {experience.duration}
              </span>
            </div>
          </div>
          
          <div className="mb-8 p-6 bg-yellow-50 rounded-xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{experience.company}</h2>
            <p className="text-gray-600 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {experience.location}
            </p>
          </div>

          <div className="prose max-w-none mb-10 p-6 bg-gray-50 rounded-xl">
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {experience.description}
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Skills & Technologies</h3>
            <div className="flex flex-wrap gap-3">
              {experience.skills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-yellow-100 to-yellow-200 border border-yellow-200 text-yellow-800 hover:scale-105 transition-transform duration-300"
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
