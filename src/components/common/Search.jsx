import { Input } from "../ui/input";
import React from 'react'

const Search = ({search, setSearch}) => {
  return (
    <div className="w-full">
        <Input
            type="text"
            name="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search"
        />
    </div>
  )
}

export default Search