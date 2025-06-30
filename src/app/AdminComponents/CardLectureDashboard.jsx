'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingDown, TrendingUp } from "lucide-react";

const CardLectureDashboard = () => {
  const [blogCount, setBlogCount] = useState(0);
  const [subscriptionCount, setSubscriptionCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogsRes, subscriptionsRes, contactsRes] = await Promise.all([
          axios.get('/api/blog'),
          axios.get('/api/email'),
          axios.get('/api/contact')
        ]);
        setBlogCount(blogsRes.data.blogs?.length || 0);
        setSubscriptionCount(subscriptionsRes.data.emails?.length || 0);
        // Check if contacts data is in different format
        const contactsData = contactsRes.data;
        setContactCount(
          contactsData?.contacts?.length || 
          contactsData?.length || 
          (Array.isArray(contactsData) ? contactsData.length : 0)
        );
      } catch (error) {
        console.error('Error fetching data:', error);
        // Add error state for contacts specifically
        if (error.config?.url === '/api/contact') {
          console.error('Contact API error:', error.response?.data);
        }
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
        title="Email Subscribers"
        value={subscriptionCount}
        pillText="0%"
        trend="up"
        period="All time"
      />
      <Card
        title="Contact Form Submissions"
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
      <div className="flex items-center gap-6 w-full p-4 rounded-lg bg-red-500/10 backdrop-blur-sm border border-red-500/20">
        <div className="flex-1">
          <h3 className="text-red-100/80 mb-2 text-sm">{title}</h3>
          <p className="text-3xl font-semibold text-white">{value}</p>
          <p className="text-xs text-red-100/60 mt-2">{period}</p>
        </div>

        <span
          className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded-full ${
            trend === "up"
              ? "bg-red-400/20 text-red-100"
              : "bg-red-600/30 text-red-200"
          }`}
        >
          {trend === "up" ? <TrendingUp size={14} /> : <TrendingDown size={14} />}{" "}
          {pillText}
        </span>
      </div>
    );
  };