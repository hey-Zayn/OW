// import React from 'react'



const SideBarBottom = () => {
  return (
    <div>
      <div className="flex sticky top-[calc(100vh_-_48px_-_16px)] flex-col h-12 border-t px-2 border-gray-300 dark:border-gray-700 justify-end text-xs">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-stone-950 dark:text-white">Zayn-Butt</p>
            <p className="text-stone-500 dark:text-stone-400">contact to support</p>
          </div>
          <button className="px-2 py-1.5 font-medium bg-stone-100 dark:bg-gray-800 hover:bg-stone-200 dark:hover:bg-gray-700 transition-colors rounded cursor-pointer">
            <div className="text-stone-950 dark:text-white">Support</div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SideBarBottom