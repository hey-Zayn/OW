import { Command, Search } from 'lucide-react'



const SearchBar = () => {

  return (
  
      <>
      <div className="bg-white mb-4 relative rounded-lg flex items-center px-3 py-2 text-sm border border-yellow-500/30 transition-all hover:shadow-md focus-within:ring-2 focus-within:ring-yellow-500/50">
          <Search className="mr-2 text-yellow-500" size={16} />
          <input
            type="text"
            placeholder="Search dashboard..."
            className="w-full bg-transparent placeholder:text-gray-400 focus:outline-none text-gray-900"
          />
          <span className="px-2 py-1 text-xs flex gap-1 items-center bg-yellow-500/10 rounded-md absolute right-2 top-1/2 -translate-y-1/2 text-yellow-600 font-medium">
            <Command size={14} className="text-yellow-500" />K
          </span>
        </div>
      </>
    
  )
}

export default SearchBar