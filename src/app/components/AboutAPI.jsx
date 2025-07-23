'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const THEME = {
  bg: 'var(--bg-color)',
  primary: 'var(--primary-color)',
  text: 'var(--text-color)',
};

const AboutAPI = () => {
  const [aboutList, setAboutList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await axios.get('/api/about');
        // The API returns an array of about objects directly
        setAboutList(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setError('Failed to load about information.');
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  if (loading) {
    return (
      <section className="w-full py-16" style={{ background: THEME.bg }}>
        <div className="container mx-auto flex gap-8 px-5 max-sm:px-4 py-12 md:flex-row flex-col items-center rounded-xl shadow-lg"
          style={{
            background: THEME.bg,
            boxShadow: `0 4px 32px 0 ${THEME.primary}22`,
          }}>
          <div className="text-lg w-full text-center" style={{ color: THEME.text }}>Loading...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full py-16" style={{ background: THEME.bg }}>
        <div className="container mx-auto flex gap-8 px-5 max-sm:px-4 py-12 md:flex-row flex-col items-center rounded-xl shadow-lg"
          style={{
            background: THEME.bg,
            boxShadow: `0 4px 32px 0 ${THEME.primary}22`,
          }}>
          <div className="text-lg w-full text-center" style={{ color: 'red' }}>{error}</div>
        </div>
      </section>
    );
  }

  // If no data, show nothing
  if (!aboutList || aboutList.length === 0) return null;

  return (
    <>
      {aboutList.map((aboutData, idx) => {
        // For the first one, keep the original layout (image left, text right)
        // For the second one, swap (text left, image right)
        const isEven = idx % 2 === 0;
        return (
          <section
            key={aboutData._id || idx}
            className="w-full py-16"
            style={{ background: THEME.bg }}
          >
            <div
              className={`container mx-auto flex gap-8 px-5 max-sm:px-4 py-12 md:flex-row flex-col items-center rounded-xl shadow-lg
                ${!isEven ? 'md:flex-row-reverse' : ''}`}
              style={{
                background: THEME.bg,
                boxShadow: `0 4px 32px 0 ${THEME.primary}22`,
              }}
            >
              <div
                className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 overflow-hidden rounded-xl shadow-lg"
                style={{
                  border: `4px solid ${THEME.primary}`,
                  boxShadow: `0 2px 16px 0 ${THEME.primary}22`,
                }}
              >
                {/* Show image from API if available, otherwise fallback to video */}
                {aboutData?.image ? (
                  <img
                    src={aboutData.image}
                    alt={aboutData.heading || 'About Image'}
                    className="object-cover object-center w-full h-full"
                    style={{
                      background: THEME.bg,
                      width: '100%',
                      height: '100%',
                      display: 'block',
                    }}
                  />
                ) : (
                  <video
                    src={aboutData?.videoUrl || "https://cdn.prod.website-files.com/660b9ff56cc1437adb553c40%2F66a3956e49d8a96e28ec7e12_111-transcode.mp4"}
                    className="object-cover object-center w-full h-full"
                    muted
                    autoPlay
                    loop
                    playsInline
                    style={{
                      background: THEME.bg,
                    }}
                  />
                )}
              </div>
              <div className="lg:flex-grow md:w-1/2 lg:pl-12 md:pl-8 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center max-sm:text-left max-sm:px-4">
                <h1
                  className="max-sm:text-2xl text-3xl mb-6 font-bold"
                  style={{ color: THEME.text }}
                >
                  <span
                    className="px-2 py-1 rounded-md"
                    style={{
                      background: THEME.primary,
                      color: THEME.bg,
                      marginRight: 4,
                    }}
                  >
                    {aboutData?.heading || 'Business Development'}
                  </span>
                </h1>
                <p
                  className="mb-8 leading-relaxed p-6 rounded-lg border-l-4"
                  style={{
                    color: 'var(--muted-text-color, #525252)',
                    background: `rgba(253, 196, 53, 0.08)`,
                    borderLeft: `4px solid ${THEME.primary}`,
                  }}
                >
                  {aboutData?.details ||
                    `As a dynamic and results-driven Business Development & Digital
                    Strategy Executive, I specialize in elevating organizational
                    digital capabilities and driving sustainable, data-informed
                    growth. With a passion for operational excellence and
                    transformative leadership, I bring a unique combination of
                    business acumen, creative strategy, and process improvement
                    expertise to every project I undertake. My experience spans
                    creative project management, strategic content development, and
                    leading high-performing teams across departments. I excel in
                    fostering cross-functional collaboration to launch impactful
                    initiatives, streamline workflows, and align messaging with
                    brand objectives. Whether I'm developing integrated marketing
                    campaigns, refining internal processes, or managing diverse
                    teams, I'm committed to delivering meaningful, measurable
                    outcomes.`}
                </p>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}

export default AboutAPI