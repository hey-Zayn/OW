'use client'
import { ChevronDown, ChevronUp } from "lucide-react"



const AccountToggle = () => {

  return (
     <>
        {/* Account Toggle */}
    
     <div className="border-b mb-6 pb-4 border-yellow-500/30">
          <button className="flex p-2 hover:bg-yellow-500/10 rounded-lg transition-all relative gap-3 w-full items-center cursor-pointer group">
            <div className="relative">
              <img
                src={"https://api.dicebear.com/9.x/notionists/svg?backgroundType=gradientLinear&backgroundColor=b6e3f4,c0aede,d1d4f9"}
                alt="avatar"
                className="size-10 rounded-full ring-2 ring-yellow-500/50 group-hover:ring-yellow-500 transition-all object-cover"
              />
              <div className="absolute -bottom-1 -right-1 size-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="text-start">
              <span className="text-sm font-bold block text-[#171717] group-hover:text-yellow-600 transition-colors">Olivier Williams</span>
              <span className="text-xs block text-[#525252] group-hover:text-yellow-500/80 transition-colors">
                admin@gmail.com
              </span>
            </div>

            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#525252] group-hover:text-yellow-500 transition-colors"
              size={16}
            />

         
          </button>
        </div>
     
     </>
  )
}

export default AccountToggle