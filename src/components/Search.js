import React from 'react';
import { SearchIcon } from '@heroicons/react/solid'


const Search = ({ ideasResponded, setSearchList }) => {
    
    const handleChange = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        if(e.target.value.length > 0) {
            const filterIdeas = ideasResponded.filter(idea => idea.name.toLowerCase().includes(searchTerm))
            filterIdeas.length ? setSearchList(filterIdeas) : setSearchList(null);
        } else {
            setSearchList([]);
        }
    }

  return (
  <article className="mb-4 p-3 rounded-lg sm:flex sm:items-center bg-gray-200">
    <section className="text-center sm:flex-1 sm:text-left">
        <div className='flex p-4 items-center bg-white rounded-lg'>
            <label for="search">Buscar:</label>
            <input onChange={handleChange} className='w-full px-2 mx-2 border-2 border-blue-500 rounded' id="search"/>
            <SearchIcon className="w-8 cursor-pointer text-gray-500 hover:text-gray-700"/>        
        </div>
    </section>
  </article>)
};

export default Search;
