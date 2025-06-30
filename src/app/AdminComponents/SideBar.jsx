"use client"
import { usePathname } from 'next/navigation'
import { Bell, FilePlus, LayoutDashboard, List } from 'lucide-react'
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
      icon: <LayoutDashboard className="text-red-100" size={18} />,
      label: 'Dashboard'
    },
    {
      path: '/admin/addProduct',
      icon: <FilePlus className="text-red-100" size={18} />,
      label: 'Add Blog'
    },
    {
      path: '/admin/blogList',
      icon: <List className="text-red-100" size={18} />,
      label: 'Blog List'
    },
    {
      path: '/admin/contacts',
      icon: <List className="text-red-100" size={18} />,
      label: 'Contact Data'
    },
    {
      path: '/admin/subscription',
      icon: <Bell className="text-red-100" size={18} />,
      label: 'Subscription'
    }
  ]

  return (
    <div className="flex">
      <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 p-5 sticky top-0 h-screen bg-red-500/10 backdrop-blur-sm border-r border-red-500/20">
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-4">
            <AccountToggle />
            <SearchBar />

            <div className="space-y-2">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <button
                    className={`flex items-center justify-start gap-3 w-full rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                      isActive(item.path)
                        ? 'bg-red-500/30 text-white'
                        : 'text-red-100 hover:bg-red-500/20'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                </Link>
              ))}
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