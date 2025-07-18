"use client"
import { usePathname } from 'next/navigation'
import { Bell, Briefcase, Contact, FileEdit, FilePlus, Folder, FolderPlus, LayoutDashboard, List, ListChecks, MessageSquarePlus, MessagesSquare, Newspaper, User2, Users } from 'lucide-react'
import AccountToggle from '../AdminComponents/AccountToggle'
import SearchBar from '../AdminComponents/SearchBar'
import SideBarBottom from '../AdminComponents/SideBarBottom'
import Link from 'next/link'

const SideBar = () => {
  const pathname = usePathname()

  const isActive = (path) => {
    return pathname === path
  }

  const navItems = [
    {
      path: '/admin',
      icon: <LayoutDashboard className="text-black" size={20} />,
      label: 'Dashboard'
    },
    {
      path: '/admin/addabout',
      icon: <User2 className="text-black" size={20} />,
      label: 'Add About'
    },
    {
      path: '/admin/aboutList',
      icon: <Users className="text-black" size={20} />,
      label: 'About List'
    },
    {
      path: '/admin/addexperience',
      icon: <Briefcase className="text-black" size={20} />,
      label: 'Add Experience'
    },
    {
      path: '/admin/experienceList',
      icon: <ListChecks className="text-black" size={20} />,
      label: 'Experience List'
    },
    {
      path: '/admin/addwork',
      icon: <FolderPlus className="text-black" size={20} />,
      label: 'Add Work'
    },
    {
      path: '/admin/workList',
      icon: <Folder className="text-black" size={20} />,
      label: 'Work List'
    },
    {
      path: '/admin/addquote',
      icon: <MessageSquarePlus className="text-black" size={20} />,
      label: 'Add Quote'
    },
    {
      path: '/admin/quoteList',
      icon: <MessagesSquare className="text-black" size={20} />,
      label: 'Quote List'
    },
    {
      path: '/admin/addProduct',
      icon: <FileEdit className="text-black" size={20} />,
      label: 'Add Blog'
    },
    {
      path: '/admin/blogList',
      icon: <Newspaper className="text-black" size={20} />,
      label: 'Blog List'
    },
    {
      path: '/admin/contacts',
      icon: <Contact className="text-black" size={20} />,
      label: 'Contact Data'
    },
    {
      path: '/admin/subscription',
      icon: <Bell className="text-black" size={20} />,
      label: 'Subscription'
    }
  ]

  return (
    <div className="flex">
      <div className="hidden lg:block w-[280px] p-6 sticky top-0 h-screen bg-gradient-to-b from-yellow-50 to-white backdrop-blur-sm border-r border-yellow-200 shadow-lg">
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-6">
            <AccountToggle />
            <SearchBar />

            <div className="overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <button
                    className={`flex items-center justify-start gap-4 w-full rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 transform hover:scale-[1.02] ${
                      isActive(item.path)
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-md'
                        : 'text-gray-700 hover:bg-yellow-100 hover:text-yellow-700'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${isActive(item.path) ? 'bg-white/20' : 'bg-yellow-50'}`}>
                      {item.icon}
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </button>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-0">
            <SideBarBottom />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideBar