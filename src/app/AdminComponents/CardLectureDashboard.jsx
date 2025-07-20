"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { TrendingDown, TrendingUp } from "lucide-react";

const CardLectureDashboard = () => {
  const [blogCount, setBlogCount] = useState(0);
  const [workCount, setWorkCount] = useState(0);
  const [experienceCount, setExperienceCount] = useState(0);
  const [subscriptionCount, setSubscriptionCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);
  const [quoteCount, setQuoteCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Store previous counts to compare trends
  const prevCounts = useRef({
    blogCount: 0,
    workCount: 0,
    experienceCount: 0,
    subscriptionCount: 0,
    contactCount: 0,
    quoteCount: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          blogsRes,
          quotesRes,
          worksRes,
          experiencesRes,
          subscriptionsRes,
          contactsRes,
        ] = await Promise.all([
          axios.get("/api/blog"),
          axios.get("/api/quotes"),
          axios.get("/api/work"),
          axios.get("/api/experience"),
          axios.get("/api/email"),
          axios.get("/api/contact"),
        ]);

        // Update previous counts before setting new ones
        const newPrevCounts = {
          blogCount: blogCount,
          workCount: workCount,
          experienceCount: experienceCount,
          subscriptionCount: subscriptionCount,
          contactCount: contactCount,
          quoteCount: quoteCount
        };

        // Enhanced blog data handling
        const blogData = blogsRes.data;
        const blogCountValue = blogData?.blogs?.length || (Array.isArray(blogData) ? blogData.length : 0);
        setBlogCount(blogCountValue);

        setQuoteCount(quotesRes.data?.data?.length || quotesRes.data?.length || 0);
        setWorkCount(worksRes.data?.data?.length || worksRes.data?.length || 0);
        setExperienceCount(experiencesRes.data?.data?.length || experiencesRes.data?.length || 0);
        setSubscriptionCount(subscriptionsRes.data?.data?.length || subscriptionsRes.data?.length || 0);
        setContactCount(contactsRes.data?.data?.length || contactsRes.data?.length || (Array.isArray(contactsRes.data) ? contactsRes.data.length : 0));

        // Update previous counts after state updates
        prevCounts.current = newPrevCounts;
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getTrend = (current, previous) => {
    if (current > previous) return "up";
    if (current < previous) return "down";
    return "neutral";
  };

  const getPercentageChange = (current, previous) => {
    if (previous === 0) return "100%";
    const change = ((current - previous) / previous) * 100;
    return `${Math.round(change)}%`;
  };

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
        pillText={getPercentageChange(blogCount, prevCounts.current.blogCount)}
        trend={getTrend(blogCount, prevCounts.current.blogCount)}
        period="All time"
      />
      <Card
        title="Quotes"
        value={quoteCount}
        pillText={getPercentageChange(quoteCount, prevCounts.current.quoteCount)}
        trend={getTrend(quoteCount, prevCounts.current.quoteCount)}
        period="All time"
      />
      <Card
        title="Work Projects"
        value={workCount}
        pillText={getPercentageChange(workCount, prevCounts.current.workCount)}
        trend={getTrend(workCount, prevCounts.current.workCount)}
        period="All time"
      />
      <Card
        title="Experiences"
        value={experienceCount}
        pillText={getPercentageChange(experienceCount, prevCounts.current.experienceCount)}
        trend={getTrend(experienceCount, prevCounts.current.experienceCount)}
        period="All time"
      />
      <Card
        title="Email Subscribers"
        value={subscriptionCount}
        pillText={getPercentageChange(subscriptionCount, prevCounts.current.subscriptionCount)}
        trend={getTrend(subscriptionCount, prevCounts.current.subscriptionCount)}
        period="All time"
      />
      <Card
        title="Contact Submissions"
        value={contactCount}
        pillText={getPercentageChange(contactCount, prevCounts.current.contactCount)}
        trend={getTrend(contactCount, prevCounts.current.contactCount)}
        period="All time"
      />
    </>
  );
};

export default CardLectureDashboard;

const Card = ({ title, value, pillText, trend, period }) => {
  return (
    <div className="flex items-center gap-6 w-full p-6 rounded-xl bg-white shadow-sm border border-yellow-500 hover:shadow-md transition-all duration-200">
      <div className="flex-1">
        <h3 className="text-gray-500 mb-2 text-sm font-medium tracking-wide">
          {title}
        </h3>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-400 mt-2 font-medium">{period}</p>
      </div>

      <span
        className={`text-xs flex items-center gap-1 font-semibold px-3 py-1.5 rounded-full ${
          trend === "up"
            ? "bg-green-100 text-green-800"
            : trend === "down"
            ? "bg-red-100 text-red-800"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {trend === "up" ? (
          <TrendingUp size={14} className="text-green-500" />
        ) : trend === "down" ? (
          <TrendingDown size={14} className="text-red-500" />
        ) : null}
        {pillText}
      </span>
    </div>
  );
};
