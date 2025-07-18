'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingDown, TrendingUp } from "lucide-react";

const CardLectureDashboard = () => {
  const [blogCount, setBlogCount] = useState(0);
  const [workCount, setWorkCount] = useState(0);
  const [experienceCount, setExperienceCount] = useState(0);
  const [subscriptionCount, setSubscriptionCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogsRes, worksRes, experiencesRes, subscriptionsRes, contactsRes] = await Promise.all([
          axios.get('/api/blog'),
          axios.get('/api/work'),
          axios.get('/api/experience'),
          axios.get('/api/email'),
          axios.get('/api/contact')
        ]);
        setBlogCount(blogsRes.data.blogs?.length || 0);
        setWorkCount(worksRes.data.works?.length || 0);
        setExperienceCount(experiencesRes.data.experiences?.length || 0);
        setSubscriptionCount(subscriptionsRes.data.emails?.length || 0);
        setContactCount(
          contactsRes.data?.contacts?.length || 
          contactsRes.data?.length || 
          (Array.isArray(contactsRes.data) ? contactsRes.data.length : 0)
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <Card
        title="Total Blog Posts"
        value={blogCount}
        pillText="0%"
        trend="up"
        period="All time"
      />
      <Card
        title="Work Projects"
        value={workCount}
        pillText="0%"
        trend="up"
        period="All time"
      />
      <Card
        title="Experiences"
        value={experienceCount}
        pillText="0%"
        trend="up"
        period="All time"
      />
      <Card
        title="Email Subscribers"
        value={subscriptionCount}
        pillText="0%"
        trend="up"
        period="All time"
      />
      <Card
        title="Contact Submissions"
        value={contactCount}
        pillText="0%"
        trend="up"
        period="All time"
      />
    </>
  );
}

export default CardLectureDashboard;

const Card = ({ title, value, pillText, trend, period }) => {
    return (
      <div className="flex items-center gap-6 w-full p-6 rounded-xl bg-white shadow-sm border border-yellow-500 hover:shadow-md transition-all duration-200">
        <div className="flex-1">
          <h3 className="text-gray-500 mb-2 text-sm font-medium tracking-wide">{title}</h3>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          <p className="text-xs text-gray-400 mt-2 font-medium">{period}</p>
        </div>

        <span
          className={`text-xs flex items-center gap-1 font-semibold px-3 py-1.5 rounded-full ${
            trend === "up"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {trend === "up" ? (
            <TrendingUp size={14} className="text-green-500" />
          ) : (
            <TrendingDown size={14} className="text-red-500" />
          )}
          {pillText}
        </span>
      </div>
    );
  };