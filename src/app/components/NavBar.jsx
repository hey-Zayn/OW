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
        <nav className='w-full fixed top-0 bg-white shadow-md z-50'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>
                    {/* Logo */}
                    <div className='flex-shrink-0'>
                        <span className='text-xl font-bold text-[#171717]'>OLIVIER</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className='hidden md:flex items-center space-x-8'>
                        <div className='flex items-center space-x-4'>
                            {navLinks.slice(0, -1).map((link) => (
                                <Link 
                                    key={link.name}
                                    href={link.href}
                                    className='text-[#171717] hover:text-[#FDC435] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300'
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        <Link
                            href={navLinks[navLinks.length - 1].href}
                            className='px-4 py-2 bg-[#FDC435] text-[#171717] rounded-md text-sm font-medium hover:bg-[#fdc435cc] transition-colors duration-300'
                        >
                            {navLinks[navLinks.length - 1].name}
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className='md:hidden flex items-center'>
                        <button
                            onClick={toggleMenu}
                            className='inline-flex items-center justify-center p-2 rounded-md text-[#171717] hover:text-[#FDC435] focus:outline-none'
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className='md:hidden bg-white shadow-lg'>
                    <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className='block px-3 py-2 rounded-md text-base font-medium text-[#171717] hover:text-[#FDC435] hover:bg-[#FDC435]/10'
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