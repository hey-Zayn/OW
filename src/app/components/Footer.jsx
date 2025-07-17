"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Twitter, Linkedin, Instagram, Dribbble } from 'lucide-react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const year = new Date().getFullYear();
  const [email, setEmail] = React.useState('');

  useEffect(() => {
    const footer = footerRef.current;

    gsap.fromTo(footer,
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
    gsap.fromTo(".footer-link",
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
      className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">About</h3>
            <p className="text-gray-600 text-sm">
              Professional creative offering innovative solutions to help businesses grow and succeed.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="footer-link text-gray-600 hover:text-[#FDC435] transition-colors duration-300 text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Connect</h3>
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
                  className="footer-link w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:bg-[#FDC435] hover:text-white transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Newsletter</h3>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="p-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#FDC435]"
                required
              />
              <button 
                type="submit" 
                className="text-sm bg-[#FDC435] text-gray-900 py-2 px-4 rounded hover:bg-[#FDC435]/90 transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-sm">
            © {year} All Rights Reserved. Crafted with <span className="text-[#FDC435]">care</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;