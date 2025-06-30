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
      <div className="border-b px-4 mb-4 mt-2 pb-4 border-gray-300 dark:border-gray-700">
        <div className="flex items-center justify-between p-0.5">
          <div>
            <span className="text-sm font-bold block text-stone-950 dark:text-white">
              🚀 Welcome Back, Olivier!
            </span>
            <span className="text-xs block text-stone-500 dark:text-stone-400">
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

          <div className="flex items-center gap-2">
            <Link href={'/'}>
            <button className="flex text-sm items-center gap-2 bg-red-50/10 border border-red-200/30 transition-colors hover:bg-red-50/20 hover:border-red-300/50 px-3 py-1.5 rounded">
              <span className="text-red-100 hover:text-white">Back to Home</span>
            </button>
            </Link>
            
            <button 
              onClick={handleLogout}
              className="flex text-sm items-center gap-2 bg-red-100 dark:bg-red-900/20 transition-colors hover:bg-red-200 dark:hover:bg-red-900/40 px-3 py-1.5 rounded text-red-700 dark:text-red-400"
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