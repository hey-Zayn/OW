"use client"
import { Calendar, LogOut } from "lucide-react";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import Link from "next/link";

// import React from "react";

const TopBarDashboard = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      toast.success('Logged out successfully!');
      router.push('/login');
    } catch (error) {
      toast.error('Logout failed');
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <div className="border-b px-4 mb-4 mt-2 pb-4 border-yellow-500/30 bg-white shadow-sm">
        <div className="flex items-center justify-between p-0.5">
          <div>
            <span className="text-lg font-bold block text-[#171717]">
              🚀 Welcome Back, <span className="text-yellow-500">Olivier!</span>
            </span>
            <span className="text-sm block text-[#525252] flex items-center gap-1">
              <Calendar className="h-4 w-4 text-yellow-500" />
              {
                new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })
              }
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link href={'/'}>
              <button className="flex text-sm items-center gap-2 bg-white border border-yellow-500/30 transition-all hover:bg-yellow-500/10 hover:shadow-md px-4 py-2 rounded-lg">
                <span className="text-[#171717] font-medium">Back to Home</span>
              </button>
            </Link>
            
            <button 
              onClick={handleLogout}
              className="flex text-sm items-center gap-2 bg-yellow-500 text-[#171717] transition-all hover:bg-yellow-600 hover:shadow-lg px-4 py-2 rounded-lg font-medium"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBarDashboard;