import { ChevronDown, ChevronUp } from "lucide-react"



const AccountToggle = () => {

  return (
     <>
        {/* Account Toggle */}
    
     <div className="border-b mb-4 mt-2 pb-4 border-gray-300 dark:border-gray-700">
          <button className="flex p-0.5 hover:bg-stone-100 dark:hover:bg-gray-800 rounded transition-colors relative gap-2 w-full items-center cursor-pointer">
            <img
              src={ "https://api.dicebear.com/9.x/notionists/svg"}
              alt="avatar"
              className="size-8 rounded shrink-0 bg-violet-500 shadow object-cover"
            />
            <div className="text-start">
              <span className="text-sm font-bold block text-stone-950 dark:text-white">Olivier Williams</span>
              <span className="text-xs block text-stone-500 dark:text-stone-400">
               admin@gmail.com
              </span>
            </div>

            <ChevronDown
              className="absolute right-2 top-1/2 translate-y-[calc(-50%+4px)] text-xs text-stone-500 dark:text-stone-400"
              size={15}
            />

            <ChevronUp
              className="absolute right-2 top-1/2 translate-y-[calc(-50%-4px)] text-xs text-stone-500 dark:text-stone-400"
              size={15}
            />
          </button>
        </div>
     
     </>
  )
}

export default AccountToggle