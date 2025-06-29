import { Calendar } from "lucide-react";

// import React from "react";

const TopBarDashboard = () => {

  return (
    <>
      <div className="border-b px-4 mb-4 mt-2 pb-4 border-gray-300 dark:border-gray-700">
        <div className="flex items-center justify-between p-0.5">
          <div>
            <span className="text-sm font-bold block text-stone-950 dark:text-white">
              🚀 Good morning, Zain!
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

          <button className="flex text-sm items-center gap-2 bg-stone-100 dark:bg-gray-800 transition-colors hover:bg-stone-200 dark:hover:bg-gray-700 px-3 py-1.5 rounded">
            <span className="text-stone-950 dark:text-white">Prev 6 Months</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default TopBarDashboard;