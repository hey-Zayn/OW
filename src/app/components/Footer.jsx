"use client";
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Twitter, Linkedin, Instagram, Dribbble } from 'lucide-react';

// Theme colors using CSS variables
const THEME = {
  bg: 'var(--bg-color)',
  primary: 'var(--primary-color)',
  text: 'var(--text-color)',
};

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const year = new Date().getFullYear();
  const [email, setEmail] = useState('');

  useEffect(() => {
    const footer = footerRef.current;

    gsap.fromTo(
      footer,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    // Animate the links
    gsap.fromTo(
      ".footer-link",
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: footer,
          start: "top 80%",
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Subscribed with:', email);
    setEmail('');
  };

  return (
    <footer
      ref={footerRef}
      className="w-full py-12 px-4 sm:px-6 lg:px-8 border-t"
      style={{
        background: THEME.bg,
        borderColor: 'rgba(0,0,0,0.08)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div className="space-y-4">
            <h3
              className="text-lg font-semibold"
              style={{ color: THEME.text }}
            >
              About
            </h3>
            <p
              className="text-sm"
              style={{ color: 'var(--muted-text-color, #525252)' }}
            >
              Professional creative offering innovative solutions to help businesses grow and succeed.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3
              className="text-lg font-semibold"
              style={{ color: THEME.text }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="footer-link text-sm transition-colors duration-300"
                    style={{
                      color: 'var(--muted-text-color, #525252)',
                    }}
                    onMouseOver={e => (e.currentTarget.style.color = THEME.primary)}
                    onMouseOut={e => (e.currentTarget.style.color = 'var(--muted-text-color, #525252)')}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3
              className="text-lg font-semibold"
              style={{ color: THEME.text }}
            >
              Connect
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                { name: 'Twitter', icon: <Twitter size={18} /> },
                { name: 'LinkedIn', icon: <Linkedin size={18} /> },
                { name: 'Instagram', icon: <Instagram size={18} /> },
                { name: 'Dribbble', icon: <Dribbble size={18} /> }
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="footer-link w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                  aria-label={social.name}
                  style={{
                    background: THEME.primary,
                    color: THEME.bg,
                    boxShadow: `0 2px 8px 0 ${THEME.primary}22`
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.background = THEME.text;
                    e.currentTarget.style.color = THEME.primary;
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.background = THEME.primary;
                    e.currentTarget.style.color = THEME.bg;
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3
              className="text-lg font-semibold"
              style={{ color: THEME.text }}
            >
              Newsletter
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="p-2 text-sm border rounded focus:outline-none"
                style={{
                  borderColor: 'rgba(0,0,0,0.12)',
                  color: THEME.text,
                  background: THEME.bg,
                  boxShadow: `0 1px 2px 0 ${THEME.primary}11`
                }}
                required
              />
              <button
                type="submit"
                className="text-sm py-2 px-4 rounded transition-colors duration-300 font-semibold"
                style={{
                  background: THEME.primary,
                  color: THEME.bg,
                  boxShadow: `0 2px 8px 0 ${THEME.primary}22`
                }}
                onMouseOver={e => (e.currentTarget.style.background = THEME.text)}
                onMouseOut={e => (e.currentTarget.style.background = THEME.primary)}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div
          className="pt-8 border-t text-center"
          style={{
            borderColor: 'rgba(0,0,0,0.08)'
          }}
        >
          <p
            className="text-sm"
            style={{ color: 'var(--muted-text-color, #525252)' }}
          >
            © {year} All Rights Reserved. powered by{' '}
            <span style={{ color: THEME.primary, fontWeight: 600 }}>Zayn</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;