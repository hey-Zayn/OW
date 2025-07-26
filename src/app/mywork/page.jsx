'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Link from 'next/link'
import Head from 'next/head'

const THEME = {
  bg: 'var(--bg-color)',
  primary: 'var(--primary-color)',
  text: 'var(--text-color)',
};

const PortfolioImage = ({ src, alt, href }) => (
  <Link href={href} style={{ textDecoration: 'none' }}>
    <div
      className="portfolio-image-wrapper"
      style={{
        borderRadius: '1.2rem',
        overflow: 'hidden',
        background: '#fff',
        boxShadow: '0 2px 12px 0 rgba(0,0,0,0.07)',
        border: `1.5px solid ${THEME.bg}`,
        transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
        cursor: 'pointer',
        aspectRatio: '1/1',
        minHeight: 0,
        minWidth: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={src}
        alt={alt || 'Portfolio Image'}
        loading="lazy"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
          background: THEME.bg,
          transition: 'transform 0.4s cubic-bezier(.4,2,.6,1)',
        }}
        className="portfolio-image"
      />
      <style jsx>{`
        .portfolio-image-wrapper:hover {
          transform: scale(1.035) translateY(-2px);
          box-shadow: 0 6px 32px 0 ${THEME.primary}22;
          border-color: ${THEME.primary};
        }
        .portfolio-image-wrapper:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  </Link>
);

const ResponsiveGrid = ({ children }) => (
  <div
    className="portfolio-grid"
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '1.2rem',
      margin: '0 auto',
      maxWidth: 1200,
    }}
  >
    {children}
    <style jsx>{`
      @media (max-width: 1023px) {
        .portfolio-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      @media (max-width: 639px) {
        .portfolio-grid {
          grid-template-columns: 1fr;
        }
      }
    `}</style>
  </div>
);

const page = () => {
  const [works, setWorks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await axios.get('/api/work')
        const data = response?.data?.data
        const worksArray = Array.isArray(data) ? data : []
        if (!Array.isArray(data)) {
          setError('Invalid data format received from the server')
        } else if (worksArray.length === 0) {
          setError('No works found in the database')
        }
        setWorks(worksArray.slice(0, 27)) // Only show 27 images
      } catch (error) {
        setError('Failed to fetch works. Please try again later.')
        setWorks([])
      } finally {
        setLoading(false)
      }
    }
    fetchWorks()
  }, [])

  // SEO optimized keywords and meta tags
  const seoTitle = "Portfolio Gallery | Digital Transformation Projects, Leadership, Storytelling, Process Optimization"
  const seoDescription = "Explore a curated portfolio gallery featuring digital transformation projects, leadership case studies, storytelling campaigns, process optimization, vendor management, and advanced technology solutions. Discover business growth and operational excellence through real-world work."
  const seoKeywords = "Portfolio, Digital Transformation, Leadership, Storytelling, Campaigns, Process Optimization, Vendor Management, Technology, Business Growth, Operational Excellence, Analytics, CRM, Creative Tools, Project Gallery, Case Studies"

  if (loading) {
    return (
      <>
        <Head>
          <title>{seoTitle}</title>
          <meta name="description" content={seoDescription} />
          <meta name="keywords" content={seoKeywords} />
          <meta property="og:title" content={seoTitle} />
          <meta property="og:description" content={seoDescription} />
          <meta property="og:type" content="website" />
          <meta name="robots" content="index, follow" />
        </Head>
        <NavBar />
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: THEME.bg }}
        >
          <div className="text-center">
            <div className="animate-pulse flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full" style={{ background: THEME.primary, opacity: 0.15 }} />
              <p className="text-base" style={{ color: 'var(--muted-text-color, #525252)' }}>
                Loading...
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (error) {
    return (
      <>
        <Head>
          <title>{seoTitle}</title>
          <meta name="description" content={seoDescription} />
          <meta name="keywords" content={seoKeywords} />
          <meta property="og:title" content={seoTitle} />
          <meta property="og:description" content={seoDescription} />
          <meta property="og:type" content="website" />
          <meta name="robots" content="index, follow" />
        </Head>
        <NavBar />
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: THEME.bg }}
        >
          <div className="text-center">
            <p className="text-base font-semibold" style={{ color: 'red' }}>{error}</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
      </Head>
      <NavBar />
      <div className="min-h-screen" style={{ background: THEME.bg }}>
        <div className="mx-auto px-2 sm:px-4 py-10 mt-20" style={{ maxWidth: 1300 }}>
          <ResponsiveGrid>
            {Array.isArray(works) && works.length > 0 ? (
              works.map((work, idx) => (
                <PortfolioImage
                  key={work?._id || idx}
                  src={work?.image}
                  alt={work?.title || `Portfolio Image ${idx + 1}`}
                  href={work?._id ? `/mywork/${work._id}` : '#'}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-lg font-semibold" style={{ color: 'var(--muted-text-color, #525252)' }}>
                  No images to display.
                </p>
              </div>
            )}
          </ResponsiveGrid>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default page