"use client";
import React from 'react'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const BlogSection = () => {
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        const wavyImages = gsap.utils.toArray("#wavy"); // here i select the images and convert them into NodeList..

        wavyImages.forEach((img, index) => {
            gsap.fromTo(
                img,
                {
                    x: window.innerWidth + index * -15, // Start off screen to the right
                    //   x: window.innerWidth
                },
                {
                    x: -window.innerWidth - 300,
                    ease: "none",
                    scrollTrigger: {
                        trigger: img,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                        // markers: false
                    },
                }
            );
        });
    }, []);
    return (
        <>
            <div className='w-full h-full bg-[#E5E5E5] '>
                <div className='relative w-full  h-full'>
                    {/* Imgages */}
                    <div className='absoulte top-0 h-[200px] max-sm:h-[100px]  overflow-hidden'>
                        <div className=" w-full  flex justify-center  object-cover max-sm:object-contain  overflow-x-hidden ">
                            <img
                                id="wavy"
                                src="/images/wavy.avif" 
                                alt=""
                                style={{ filter: "brightness(0.1)" }}
                                className="w-full  "
                            />
                            <img
                                id="wavy"
                                src="/images/wavy.avif" 
                                alt=""
                                style={{ filter: "brightness(0.1)" }}
                                className="w-full "
                            />
                            <img
                                id="wavy"
                                src="/images/wavy.avif" 
                                alt=""
                                style={{ filter: "brightness(0.1)" }}
                                className="w-full "
                            />
                            <img
                                id="wavy"
                                src="/images/wavy.avif" 
                                alt=""
                                style={{ filter: "brightness(0.1)" }}
                                className="w-full "
                            />
                            <img
                                id="wavy"
                                src="/images/wavy.avif" 
                                alt=""
                                style={{ filter: "brightness(0.1)" }}
                                className="w-full "
                            />
                            <img
                                id="wavy"
                                src="/images/wavy.avif" 
                                alt=""
                                style={{ filter: "brightness(0.1)" }}
                                className="w-full "
                            />
                            <img
                                id="wavy"
                                src="/images/wavy.avif" 
                                alt=""
                                style={{ filter: "brightness(0.1)" }}
                                className="w-full "
                            />
                            <img
                                id="wavy"
                                src="/images/wavy.avif" 
                                alt=""
                                style={{ filter: "brightness(0.1)" }}
                                className="w-full "
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className='w-full h-full  bg-[#181615] z-10 max-sm:-mt-20 '>
                        <div className=" w-full h-full  py-20 max-sm:pt-20  ">
                            <h1 className="text-white text-center text-7xl max-sm:text-4xl font-bold uppercase">
                                Insights
                            </h1>
                            <div className="flex max-sm:flex-col justify-between  hover:bg-[#ED97A8] group   duration-300 mt-20 max-sm:px-10 cursor-pointer">
                                <div className="w-[25%] max-sm:w-full opacity-0 max-sm:opacity-100 group-hover:opacity-100 transition-opacity duration-300">
                                    <img   src="/images/section8img1.png" alt="" />
                                </div>
                                <div className="w-[75%] max-sm:w-full  px-15 max-sm:px-0">
                                    <div className="w-full h-full flex max-sm:flex-col max-sm:gap-10 justify-between border-b border-white/30 py-4">
                                        <h2 className="text-2xl text-white font-semibold group-hover:text-black duration-300">
                                            Key Factors to Consider When Choosing a Technical <br className="max-sm:hidden" /> Support
                                            Outsourcing Company
                                        </h2>
                                        <h5 className="text-xl font-semibold text-white group-hover:text-black group-hover:font-medium duration-300">March 27,2025</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="flex max-sm:flex-col justify-between  hover:bg-[#ED97A8] group   duration-300 mt-20 max-sm:px-10 cursor-pointer">
                                <div className="w-[25%] max-sm:w-full opacity-0 max-sm:opacity-100 group-hover:opacity-100 transition-opacity duration-300">
                                    <img   src="/images/section8img1.png" alt="" />
                                </div>
                                <div className="w-[75%] max-sm:w-full  px-15 max-sm:px-0">
                                    <div className="w-full h-full flex max-sm:flex-col max-sm:gap-10 justify-between border-b border-white/30 py-4">
                                        <h2 className="text-2xl text-white font-semibold group-hover:text-black duration-300">
                                            Key Factors to Consider When Choosing a Technical <br className="max-sm:hidden" /> Support
                                            Outsourcing Company
                                        </h2>
                                        <h5 className="text-xl font-semibold text-white group-hover:text-black group-hover:font-medium duration-300">March 27,2025</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="flex max-sm:flex-col justify-between  hover:bg-[#ED97A8] group   duration-300 mt-20 max-sm:px-10 cursor-pointer ">
                                <div className="w-[25%] max-sm:w-full opacity-0 max-sm:opacity-100 group-hover:opacity-100 transition-opacity duration-300">
                                    <img   src="/images/section8img1.png" alt="" />
                                </div>
                                <div className="w-[75%] max-sm:w-full  px-15 max-sm:px-0">
                                    <div className="w-full h-full flex max-sm:flex-col max-sm:gap-10 justify-between border-b border-white/30 py-4">
                                        <h2 className="text-2xl text-white font-semibold group-hover:text-black duration-300">
                                            Key Factors to Consider When Choosing a Technical <br className="max-sm:hidden" /> Support
                                            Outsourcing Company
                                        </h2>
                                        <h5 className="text-xl font-semibold text-white group-hover:text-black group-hover:font-medium duration-300">March 27,2025</h5>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full py-10 max-sm:pt-20 ">
                                <button className="bg-transparent px-3 py-1 border rounded-full border-white text-white ml-[30%] max-sm:ml-[10%] cursor-pointer">View All</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default BlogSection