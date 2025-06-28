'use client'
import React from 'react'

const NavBar = () => {
    

    return (
        <div className='w-full fixed top-4 md:top-10 flex justify-center items-center bg-transparent z-20'>
            <div className='flex gap-1 md:gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 md:px-6 md:py-2 transition-all hover:bg-white/20'>
                <a href="#" className="px-2 py-1 md:px-4 md:py-2 text-white/90 hover:text-white rounded-full font-medium text-xs md:text-sm tracking-wide transition-all hover:bg-white/10">
                    Home
                </a>
                <a href="#services" className="px-2 py-1 md:px-4 md:py-2 text-white/90 hover:text-white rounded-full font-medium text-xs md:text-sm tracking-wide transition-all hover:bg-white/10">
                    Services
                </a>
                <a href="#portfolio" className="px-2 py-1 md:px-4 md:py-2 text-white/90 hover:text-white rounded-full font-medium text-xs md:text-sm tracking-wide transition-all hover:bg-white/10">
                    Portfolio
                </a>
                <a href="#contact" className="px-2 py-1 md:px-4 md:py-2 text-white/90 hover:text-white rounded-full font-medium text-xs md:text-sm tracking-wide transition-all hover:bg-white/10">
                    Contact
                </a>
            </div>
        </div>
    )
}

export default NavBar