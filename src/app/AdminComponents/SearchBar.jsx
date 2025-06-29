import { Command, Search } from 'lucide-react'



const SearchBar = () => {

  return (
    <div>
      <>
      <div className="bg-stone-100 dark:bg-gray-800 mb-4 relative rounded flex items-center px-2 py-1.5 text-sm transition-colors hover:bg-stone-200 dark:hover:bg-gray-700">
          <Search className="mr-2 text-stone-500 dark:text-stone-400" size={15} />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent placeholder:text-stone-500 dark:placeholder:text-stone-400 focus:outline-none text-stone-950 dark:text-white"
          />
          <span className="p-1 text-xs flex gap-0.5 items-center shadow bg-stone-200 dark:bg-gray-700 rounded absolute right-1.5 top-1/2 -translate-y-1/2 text-stone-500 dark:text-stone-400">
            <Command size={15} />K
          </span>
        </div>
      </>
    </div>
  )
}

export default SearchBar