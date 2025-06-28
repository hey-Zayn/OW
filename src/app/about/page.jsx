import React from 'react'

const page = () => {
  return (
    <>
       <div  className="w-full h-full bg-[#191919]">
        {/* --------------------------------  { Hero }  ------------------------------------------ */}
        <div className="w-full h-full">
          <div
            id="seo-hero"
            className="w-full h-screen relative flex flex-col justify-center items-center bg-gradient-to-b from-[#520ADE] via-[#520ADE] to-[#191919] overflow-hidden"
          >
            <span className="size-200 absolute -top-50 -left-50  rounded-full bg-[radial-gradient(circle_at_center,#a8288f_20%,transparent_70%)] blur-[90px]"></span>
            <h1
             
              className="text-white text-center text-8xl max-sm:text-4xl font-bold z-10"
            >
             360 Lead Nurture
            </h1>
          </div>
        </div>
    </div>
    </>
  )
}

export default page