import React from 'react'

const AboutAPI = () => {
  return (
    <section className="w-full bg-white py-16">
          <div className="container mx-auto flex gap-8 px-5 max-sm:px-4 py-12 md:flex-row flex-col items-center rounded-xl shadow-lg">
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 overflow-hidden rounded-xl border-4 border-yellow-400 shadow-lg">
              <video
                src="https://cdn.prod.website-files.com/660b9ff56cc1437adb553c40%2F66a3956e49d8a96e28ec7e12_111-transcode.mp4"
                className="object-cover object-center w-full h-full"
                muted
                autoPlay
                loop
                playsInline
              />
            </div>
            <div className="lg:flex-grow md:w-1/2 lg:pl-12 md:pl-8 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center max-sm:text-left max-sm:px-4">
              <h1 className="max-sm:text-2xl text-3xl mb-6 font-bold text-gray-800">
                <span className="bg-yellow-400 px-2 py-1 rounded-md">Business Development</span> & <span className="bg-yellow-400 px-2 py-1 rounded-md">Digital Strategy</span> Executive
              </h1>
              <p className="mb-8 leading-relaxed text-gray-700 bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400">
                As a dynamic and results-driven Business Development & Digital
                Strategy Executive, I specialize in elevating organizational
                digital capabilities and driving sustainable, data-informed
                growth. With a passion for operational excellence and
                transformative leadership, I bring a unique combination of
                business acumen, creative strategy, and process improvement
                expertise to every project I undertake. My experience spans
                creative project management, strategic content development, and
                leading high-performing teams across departments. I excel in
                fostering cross-functional collaboration to launch impactful
                initiatives, streamline workflows, and align messaging with
                brand objectives. Whether I'm developing integrated marketing
                campaigns, refining internal processes, or managing diverse
                teams, I'm committed to delivering meaningful, measurable
                outcomes.
              </p>
            </div>
          </div>
        </section>
  )
}

export default AboutAPI