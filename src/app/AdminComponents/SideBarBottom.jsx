"use client"
import { useState } from 'react';
import { Mail, MessageSquare } from 'lucide-react';

const SideBarBottom = () => {
  const [showSupport, setShowSupport] = useState(false);

  const handleSupportClick = () => {
    setShowSupport(!showSupport);
  };

  return (
    <div className="relative">
      <div className="flex sticky bottom-0 flex-col h-14 border-t px-4 border-yellow-500/30 justify-end text-xs bg-white/90 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-[#171717]">Zayn</p>
            <p className="text-[#525252]">Need help? Contact support</p>
          </div>
          <button 
            onClick={handleSupportClick}
            className="px-3 py-1.5 font-medium bg-yellow-500 hover:bg-yellow-600 transition-all rounded-lg cursor-pointer shadow-sm hover:shadow-md"
          >
            <div className="text-[#171717] flex items-center gap-1">
              <span>Support</span>
              {showSupport ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m18 15-6-6-6 6"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              )}
            </div>
          </button>
        </div>
      </div>

      {showSupport && (
        <div className="absolute bottom-16 right-0 w-56 p-3 rounded-lg bg-white/95 backdrop-blur-sm border border-yellow-500/30 shadow-lg">
          <div className="space-y-2">
            <a 
              href="mailto:zaynobusiness@gmail.com" 
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-yellow-500/20 transition-all text-[#171717]"
            >
              <Mail size={18} className="text-yellow-500" />
              <span className="font-medium">Email Support</span>
            </a>
            <a 
              href="https://wa.me/923003636186" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-yellow-500/20 transition-all text-[#171717]"
            >
              <MessageSquare size={18} className="text-yellow-500" />
              <span className="font-medium">WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default SideBarBottom