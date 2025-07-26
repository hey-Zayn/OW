import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from './ThemeContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Olivier Williams | Chief Strategy Officer Portfolio | Digital Transformation & Business Excellence",
  description:
    "Explore the portfolio of Olivier Williams, Chief Strategy Officer and Customer-Centric Innovation Leader. Discover expertise in digital transformation, business development, creative storytelling, AI software, and operational excellence. View case studies in healthcare, nonprofit, consulting, and more.",
  keywords: [
    "Chief Strategy Officer",
    "Olivier Williams",
    "digital transformation",
    "business development",
    "AI software",
    "customer-centric innovation",
    "operational excellence",
    "creative storytelling",
    "portfolio website",
    "strategic planning",
    "process optimization",
    "Lean Six Sigma",
    "CRM implementation",
    "brand strategy",
    "marketing campaigns",
    "testimonials",
    "vendor management",
    "leadership",
    "data-driven growth",
    "digital strategy",
    "UI design",
    "modern portfolio",
    "professional experience",
    "case studies",
    "healthcare innovation",
    "nonprofit consulting",
    "business consulting",
    "SaaS solutions",
    "AI-powered automation",
    "SharePoint dashboards",
    "Monday.com workboards",
    "Google Analytics",
    "HubSpot CRM",
    "Salesforce",
    "Tableau",
    "Adobe Creative Suite"
  ].join(", "),
  openGraph: {
    title: "Olivier Williams | Chief Strategy Officer Portfolio",
    description:
      "Showcasing digital transformation, business development, creative leadership, and AI software solutions. Explore Olivier Williams' experience, case studies, and client testimonials.",
    type: "website",
    url: "https://ow-ten.vercel.app/",
    images: [
      {
        url: "https://ow-ten.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Olivier Williams Chief Strategy Officer Portfolio"
      }
    ]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content="Explore the portfolio of Olivier Williams, Chief Strategy Officer and Customer-Centric Innovation Leader. Discover expertise in digital transformation, business development, creative storytelling, AI software, and operational excellence. View case studies in healthcare, nonprofit, consulting, and more." />
        <meta name="keywords" content="Chief Strategy Officer, Olivier Williams, digital transformation, business development, AI software, customer-centric innovation, operational excellence, creative storytelling, portfolio website, strategic planning, process optimization, Lean Six Sigma, CRM implementation, brand strategy, marketing campaigns, testimonials, vendor management, leadership, data-driven growth, digital strategy, UI design, modern portfolio, professional experience, case studies, healthcare innovation, nonprofit consulting, business consulting, SaaS solutions, AI-powered automation, SharePoint dashboards, Monday.com workboards, Google Analytics, HubSpot CRM, Salesforce, Tableau, Adobe Creative Suite" />
        <meta name="author" content="Olivier Williams" />
        <meta property="og:title" content="Olivier Williams | Chief Strategy Officer Portfolio" />
        <meta property="og:description" content="Showcasing digital transformation, business development, creative leadership, and AI software solutions. Explore Olivier Williams' experience, case studies, and client testimonials." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ow-ten.vercel.app/" />
        <meta property="og:image" content="https://ow-ten.vercel.app/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Olivier Williams | Chief Strategy Officer Portfolio" />
        <meta name="twitter:description" content="Showcasing digital transformation, business development, creative leadership, and AI software solutions. Explore Olivier Williams' experience, case studies, and client testimonials." />
        <meta name="twitter:image" content="https://ow-ten.vercel.app/og-image.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Favicon and theme color for modern UI */}
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#6366F1" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} bg-white text-gray-900`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <ToastContainer
         position="top-right"
         autoClose={5000}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
         theme="light"
       />
      </body>
    </html>
  );
}
