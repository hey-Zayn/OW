import Heropage from './components/HeroPage.jsx'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Digital Transformation Expert | Leadership | Storytelling | Process Optimization</title>
        <meta
          name="description"
          content="Unlock business growth with a digital transformation expert skilled in leadership, storytelling, process optimization, vendor management, and advanced tools & technology."
        />
        <meta
          name="keywords"
          content="Digital Transformation, Leadership, Storytelling, Campaigns, Process Optimization, Vendor Management, Tools, Technology, Business Growth, Operational Excellence, Analytics, CRM, Creative Tools"
        />
      </Head>
      <div>
        <Heropage />
      </div>
    </>
  );
}
