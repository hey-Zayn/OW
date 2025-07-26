'use client'
import React, { useEffect, useState } from 'react';

const THEME = {
  bg: 'var(--bg-color)',
  primary: 'var(--primary-color)',
  text: 'var(--text-color)',
};

const WorkDetails = ({ params }) => {
  const [work, setWork] = useState(null);
  const [loading, setLoading] = useState(true);
  const id = params.id;

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const res = await fetch(`/api/work?id=${id}`);
        const data = await res.json();
        if (data && data.data) {
          setWork(data.data);
        }
      } catch (error) {
        // ignore
      } finally {
        setLoading(false);
      }
    };
    fetchWork();
  }, [id]);

  if (loading) return null;
  if (!work) return null;

  return (
    <div style={{ background: THEME.bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img
        src={work.image}
        alt=""
        style={{
          maxWidth: '100%',
          maxHeight: '80vh',
          borderRadius: '2rem',
          border: `2px solid ${THEME.primary}`,
          background: '#f3f3f3',
          boxShadow: `0 4px 32px 0 ${THEME.primary}22`
        }}
      />
    </div>
  );
};

export default WorkDetails;
