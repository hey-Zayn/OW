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
      <div className="flex sticky bottom-0 flex-col h-12 border-t px-2 border-red-500/20 justify-end text-xs backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-white">Zayn-Butt</p>
            <p className="text-red-100/80">contact to support</p>
          </div>
          <button 
            onClick={handleSupportClick}
            className="px-2 py-1.5 font-medium bg-red-500/20 hover:bg-red-500/30 transition-colors rounded cursor-pointer"
          >
            <div className="text-white">Support</div>
          </button>
        </div>
      </div>

      {showSupport && (
        <div className="absolute bottom-14 right-0 w-48 p-3 rounded-lg bg-red-500/20 backdrop-blur-sm border border-red-500/30 shadow-lg">
          <div className="space-y-2">
            <a 
              href="mailto:zaynobusiness@gmail.com" 
              className="flex items-center gap-2 p-2 rounded hover:bg-red-500/30 transition-colors text-white"
            >
              <Mail size={16} />
              <span>Email Support</span>
            </a>
            <a 
              href="https://wa.me/923003636186" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 rounded hover:bg-red-500/30 transition-colors text-white"
            >
              <MessageSquare size={16} />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default SideBarBottom