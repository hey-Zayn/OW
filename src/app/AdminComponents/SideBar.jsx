import React from 'react'

import { Bell, FilePlus, LayoutDashboard, List, UserPlus } from 'lucide-react'
import AccountToggle from '../AdminComponents/AccountToggle'
import SearchBar from '../AdminComponents/SearchBar'
import SideBarBottom from '../AdminComponents/SideBarBottom'
import Link from 'next/link'

const SideBar = () => {
  return (
    <div className="flex">
      <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-gray-300 dark:border-gray-700 p-5 sticky top-0 h-screen bg-white dark:bg-gray-900">
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-2">
            <AccountToggle />

            {/* Search Bar */}
            <SearchBar />

            <div className="space-y-1.5">
              <Link href='/admin'>
                <button
                  variant="ghost"
                  className="flex items-center justify-start gap-3 w-full rounded-lg px-3 py-2 text-sm font-medium transition-all bg-gray-100/80 dark:bg-gray-800/90 text-stone-900 dark:text-white hover:bg-gray-200/80 dark:hover:bg-gray-700/90"
                >
                  <LayoutDashboard className="text-stone-600 dark:text-gray-300" size={18} />
                  <span>Dashboard</span>
                </button>
              </Link>
              
              <Link href="/admin/addProduct">
                <button variant="ghost" className="flex items-center justify-start gap-3 w-full rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-gray-200/80 dark:hover:bg-gray-700/90 bg-transparent text-stone-600 dark:text-gray-300">
                  <FilePlus className="text-stone-600 dark:text-gray-300" size={18} />
                  <span>Add Blog</span>
                </button>
              </Link>
              
              <Link href='/admin/blogList'>
                <button variant="ghost" className="flex items-center justify-start gap-3 w-full rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-gray-200/80 dark:hover:bg-gray-700/90 bg-transparent text-stone-600 dark:text-gray-300">
                  <List className="text-stone-600 dark:text-gray-300" size={18} />
                  <span>Blog List</span>
                </button>
              </Link>
             
             
              <Link href='/admin/blogList'>
                <button variant="ghost" className="flex items-center justify-start gap-3 w-full rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-gray-200/80 dark:hover:bg-gray-700/90 bg-transparent text-stone-600 dark:text-gray-300">
                  <List className="text-stone-600 dark:text-gray-300" size={18} />
                  <span>Contact Data</span>
                </button>
              </Link>
             
              
              
              
              
              <Link href='/admin/subscription'>
                <button variant="ghost" className="flex items-center justify-start gap-3 w-full rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-gray-200/80 dark:hover:bg-gray-700/90 bg-transparent text-stone-600 dark:text-gray-300">
                  <Bell className="text-stone-600 dark:text-gray-300" size={18} />
                  <span>Subscription</span>
                </button>
              </Link>
            </div>
          </div>

          <div>
            <SideBarBottom />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideBar