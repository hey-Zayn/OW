'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const LazyImage = dynamic(() => import('next/image'), { ssr: false });

const quotes = [
  {
    text: "I believe in marrying data with creativity—transforming insights into actionable strategies that scale businesses while empowering teams.",
    author: "Olivier Williams",
    role: "Business Development & Strategy Executive"
  },
  {
    text: "Strategic planning is the compass that guides businesses through turbulent markets to sustainable growth.",
    author: "Olivier Williams",
    role: "Business Development & Strategy Executive"
  },
  {
    text: "The most successful businesses are built on a foundation of clear vision, disciplined execution, and continuous innovation.",
    author: "Olivier Williams",
    role: "Business Development & Strategy Executive"
  }
];

const Quote = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-16 px-6 sm:px-12 lg:px-20 bg-white">
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
                <div className="bg-[#FDC435]/10 p-8 md:p-12 rounded-xl">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-4 border-[#FDC435]">
                      <LazyImage
                        src="/images/hero.png"
                        alt={quote.author}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-lg md:text-xl lg:text-2xl font-medium text-[#171717] mb-6">
                      "{quote.text}"
                    </p>
                    <div>
                      <h4 className="text-[#FDC435] font-bold text-lg">{quote.author}</h4>
                      <p className="text-[#525252] text-sm">{quote.role}</p>
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
              className={`w-3 h-3 rounded-full ${currentQuote === index ? 'bg-[#FDC435]' : 'bg-[#FDC435]/30'}`}
              aria-label={`Go to quote ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Quote);