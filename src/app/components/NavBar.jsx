'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { Menu, X, Settings, Mail } from 'lucide-react'

const THEME = {
  bg: 'var(--bg-color)',
  primary: 'var(--primary-color)',
  text: 'var(--text-color)',
};

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [themeHover, setThemeHover] = useState(false)
  const [contactHover, setContactHover] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Portfolio', href: '/mywork' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' }
  ]

  return (
    <nav
      className="w-full fixed top-0 z-50 border-b backdrop-blur-lg"
      style={{
        background: 'rgba(var(--bg-color-rgb,255,255,255),0.80)',
        borderColor: 'var(--primary-color, #FDC435)',
        boxShadow: `0 2px 12px 0 rgba(var(--primary-color-rgb,253,196,53),0.08)`
      }}
    >
      <div className='max-w-7xl mx-auto px-6 sm:px-8 lg:px-10'>
        <div className='flex items-center justify-between h-20'>
          
          {/* Logo */}
          <Link href="/" className='flex-shrink-0 flex items-center gap-2 group'>
            <span
              className='text-2xl font-bold tracking-wider font-sans italic select-none'
              style={{
                color: THEME.primary,
                letterSpacing: '0.1em',
              }}
            >
              Olivier Williams
            </span>
            
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-6'>
            <div className='flex items-center space-x-6'>
              {navLinks.slice(0, -1).map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className='px-2 py-1 text-sm font-medium transition-all duration-300 relative group tracking-wider'
                  style={{
                    color: THEME.text,
                    letterSpacing: '0.03em',
                  }}
                >
                  {link.name}
                  <span
                    className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-[2px] transition-all duration-300 group-hover:w-full'
                    style={{
                      background: THEME.primary,
                      borderRadius: 2,
                    }}
                  ></span>
                </Link>
              ))}
            </div>
            
            {/* Action Buttons Container */}
            <div className="flex items-center gap-3 ml-4">
              {/* Theme Button */}
              <Link href="/theme">
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-md"
                  style={{
                    background: themeHover ? THEME.primary : `${THEME.primary}10`,
                    color: themeHover ? THEME.bg : THEME.primary,
                    border: `1px solid ${THEME.primary}${themeHover ? '00' : '30'}`,
                  }}
                  onMouseOver={() => setThemeHover(true)}
                  onMouseOut={() => setThemeHover(false)}
                >
                  <Settings
                    size={18}
                    strokeWidth={2.2}
                    className={`transition-transform ${themeHover ? 'rotate-45' : ''}`}
                  />
                  <span className="text-sm">Theme</span>
                </button>
              </Link>

              {/* Contact Button */}
              <Link href={navLinks[navLinks.length - 1].href}>
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300"
                  style={{
                    background: contactHover ? THEME.primary : "transparent",
                    color: contactHover ? THEME.bg : THEME.primary,
                    border: `2px solid ${THEME.primary}`,
                    boxShadow: contactHover 
                      ? `0 4px 12px ${THEME.primary}30` 
                      : 'none'
                  }}
                  onMouseOver={() => setContactHover(true)}
                  onMouseOut={() => setContactHover(false)}
                >
                  <Mail size={18} strokeWidth={2.2} />
                  <span className="text-sm">Contact</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden flex items-center'>
            <button
              onClick={toggleMenu}
              className='inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-all duration-300'
              style={{
                color: THEME.text,
              }}
            >
              {isOpen ? (
                <X size={24} strokeWidth={2.5} />
              ) : (
                <Menu size={24} strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div
          className='md:hidden'
          style={{
            background: 'rgba(var(--bg-color-rgb,255,255,255),0.98)',
            borderTop: `1px solid ${THEME.primary}20`,
          }}
        >
          <div className='px-4 pt-2 pb-6 space-y-2'>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className='block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300'
                style={{
                  color: THEME.text,
                }}
                onClick={toggleMenu}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile Theme Button */}
            <div className="pt-2">
              <Link href="/theme">
                <button
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium"
                  style={{
                    background: `${THEME.primary}10`,
                    color: THEME.primary,
                    border: `1px solid ${THEME.primary}30`,
                  }}
                  onClick={toggleMenu}
                >
                  <Settings size={18} strokeWidth={2.2} />
                  <span>Theme Settings</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default NavBar