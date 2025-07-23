'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import axios from 'axios';

const THEME = {
  bg: 'var(--bg-color)',
  primary: 'var(--primary-color)',
  text: 'var(--text-color)',
};

const Quote = () => {
  const [quotes, setQuotes] = useState([]);
  const [currentQuote, setCurrentQuote] = useState(0);
  const sliderRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchQuotes = async () => {
      setLoading(true);
      try {
        // Use simple GET and res.data.data
        const res = await axios.get('/api/quotes');
        
        if (isMounted) {
          setQuotes(Array.isArray(res.data?.data) ? res.data.data : []);
        }
      } catch (error) {
        if (isMounted) setQuotes([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchQuotes();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    if (!quotes.length) return;
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [quotes]);

  if (loading) {
    // Show a loading spinner or skeleton
    return (
      <section
        className="w-full py-16 px-6 sm:px-12 lg:px-20"
        style={{ background: THEME.bg }}
      >
        <div className="max-w-7xl mx-auto flex justify-center items-center min-h-[200px]">
          <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-400"></span>
        </div>
      </section>
    );
  }

  if (!quotes.length) {
    // Show a fallback message if no quotes
    return (
      <section
        className="w-full py-16 px-6 sm:px-12 lg:px-20"
        style={{ background: THEME.bg }}
      >
        <div className="max-w-7xl mx-auto flex justify-center items-center min-h-[200px]">
          <span className="text-gray-500" style={{ color: THEME.text }}>No quotes available.</span>
        </div>
      </section>
    );
  }

  return (
    <section
      className="w-full py-16 px-6 sm:px-12 lg:px-20"
      style={{ background: THEME.bg }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden">
          <div
            ref={sliderRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentQuote * 100}%)` }}
          >
            {quotes.map((quote, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 px-4"
              >
                <div
                  className="p-8 md:p-12 rounded-xl"
                  style={{
                    background: `rgba(253, 196, 53, 0.08)`,
                    border: `1.5px solid ${THEME.primary}`,
                    boxShadow: `0 2px 12px 0 rgba(0,0,0,0.03)`
                  }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div
                      className="w-24 h-24 rounded-full overflow-hidden mb-6"
                      style={{
                        border: `4px solid ${THEME.primary}`,
                        background: THEME.bg
                      }}
                    >
                      <Image
                        src={quote.image || "/images/hero.png"}
                        alt={quote.author || "Quote author"}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        style={{
                          background: THEME.bg
                        }}
                        unoptimized
                      />
                    </div>
                    <p
                      className="text-lg md:text-xl lg:text-2xl font-medium mb-6"
                      style={{
                        color: THEME.text,
                        lineHeight: 1.5
                      }}
                    >
                      {quote.quote ? `“${quote.quote}”` : ""}
                    </p>
                    <div>
                      <h4
                        className="font-bold text-lg"
                        style={{ color: THEME.primary }}
                      >
                        {quote.author}
                      </h4>
                      <p
                        className="text-sm"
                        style={{ color: 'rgba(0,0,0,0.5)' }}
                      >
                        {quote.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {quotes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuote(index)}
              className="w-3 h-3 rounded-full border"
              style={{
                background: currentQuote === index
                  ? THEME.primary
                  : 'rgba(253,196,53,0.25)',
                borderColor: currentQuote === index
                  ? THEME.primary
                  : 'rgba(253,196,53,0.25)',
                transition: 'background 0.2s, border-color 0.2s'
              }}
              aria-label={`Go to quote ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Quote);