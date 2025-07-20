'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'My Work', href: '/mywork' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' }
    ]

    return (
        <nav className='w-full fixed top-0 bg-white/50 backdrop-blur-md z-50 border-b border-white/10'>
            <div className='max-w-7xl mx-auto px-6 sm:px-8 lg:px-10'>
                <div className='flex items-center justify-between h-16'>
                    {/* Logo */}
                    <div className='flex-shrink-0'>
                        <span className='text-2xl font-bold text-[#171717] tracking-widest font-serif italic'>OLIVIER</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className='hidden md:flex items-center space-x-8'>
                        <div className='flex items-center space-x-6'>
                            {navLinks.slice(0, -1).map((link) => (
                                <Link 
                                    key={link.name}
                                    href={link.href}
                                    className='text-[#171717] hover:text-[#FDC435] px-3 py-1.5 text-sm font-medium transition-all duration-500 relative group'
                                >
                                    {link.name}
                                    <span className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-px bg-[#FDC435] transition-all duration-500 group-hover:w-4/5'></span>
                                </Link>
                            ))}
                        </div>
                        <Link
                            href={navLinks[navLinks.length - 1].href}
                            className='px-5 py-2 bg-[#FDC435] text-[#171717] rounded-sm text-sm font-medium hover:bg-[#fdc435cc] transition-all duration-500 shadow-md hover:shadow-[#FDC435]/40 hover:translate-y-[-1px]'
                        >
                            {navLinks[navLinks.length - 1].name}
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className='md:hidden flex items-center'>
                        <button
                            onClick={toggleMenu}
                            className='inline-flex items-center justify-center p-2 rounded-sm text-[#171717] hover:text-[#FDC435] focus:outline-none transition-all duration-300'
                        >
                            {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className='md:hidden bg-white/95 backdrop-blur-md shadow-xl'>
                    <div className='px-4 pt-3 pb-5 space-y-2'>
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className='block px-4 py-2.5 rounded-sm text-sm font-medium text-[#171717] hover:text-[#FDC435] hover:bg-[#FDC435]/5 transition-all duration-300 border-l-2 border-transparent hover:border-[#FDC435]'
                                onClick={toggleMenu}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default NavBar