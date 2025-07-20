'use client'

const DownloadCVButton = () => {
  const handleDownload = async () => {
    try {
      const response = await fetch('./documents/my-cv.pdf')
      if (!response.ok) {
        throw new Error('Failed to fetch PDF file')
      }
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const fileName = 'Olivier-Williams-CV.pdf'
      
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Download error:', error)
      alert('Failed to download resume. Please try again later.')
    }
  }

  return (
    <button 
      onClick={handleDownload}
      className="px-8 py-3 bg-[#FDC435] text-[#171717] font-medium rounded-lg hover:bg-[#fdc435cc] transition-all duration-300 shadow-lg hover:shadow-[#FDC435]/50"
    >
      Download Resume
    </button>
  )
}

export default DownloadCVButton