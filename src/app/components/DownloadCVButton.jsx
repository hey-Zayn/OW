'use client'

const THEME = {
  bg: 'var(--bg-color)',
  primary: 'var(--primary-color)',
  text: 'var(--text-color)',
};

const DownloadCVButton = () => {
  const handleDownload = async () => {
    try {
      const response = await fetch('./documents/my-cv.pdf');
      if (!response.ok) {
        throw new Error('Failed to fetch PDF file');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const fileName = 'Olivier-Williams-CV.pdf';

      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download resume. Please try again later.');
    }
  };

  return (
    <button
      onClick={handleDownload}
      style={{
        background: THEME.primary,
        color: THEME.text,
        fontWeight: 500,
        borderRadius: '0.5rem',
        padding: '0.75rem 2rem',
        boxShadow: `0 4px 24px 0 ${THEME.primary}80`,
        transition: 'all 0.3s',
        cursor: 'pointer',
      }}
      onMouseOver={e => {
        e.currentTarget.style.background = `${THEME.primary}cc`;
        e.currentTarget.style.boxShadow = `0 4px 24px 0 ${THEME.primary}80`;
      }}
      onMouseOut={e => {
        e.currentTarget.style.background = THEME.primary;
        e.currentTarget.style.boxShadow = `0 4px 24px 0 ${THEME.primary}80`;
      }}
    >
      Download Resume
    </button>
  );
};

export default DownloadCVButton;