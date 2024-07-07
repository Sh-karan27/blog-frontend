import React, { useState } from 'react';

const Blog = () => {
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState('');
  const [sortType, setSortType] = useState('');

  const handleSearch = () => {
    // Handle the search logic here
    console.log('Search Text:', searchText);
    console.log('Category:', category);
    console.log('Sort Type:', sortType);
  };

  return (
    <div className='h-screen w-full flex items-center justify-center p-4'>
      <div className='flex flex-col sm:flex-row gap-4 items-center p-4 border border-gray-300 rounded-md shadow-md bg-white w-full max-w-2xl'>
        <input
          type='text'
          placeholder='Search...'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className='w-full sm:w-auto p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500'
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className='w-full sm:w-auto p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500'>
          <option value=''>Select Category</option>
          <option value='technology'>Technology</option>
          <option value='health'>Health</option>
          <option value='finance'>Finance</option>
          <option value='education'>Education</option>
        </select>
        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className='w-full sm:w-auto p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500'>
          <option value=''>Sort By</option>
          <option value='date'>Date</option>
          <option value='popularity'>Popularity</option>
          <option value='relevance'>Relevance</option>
        </select>
        <button
          onClick={handleSearch}
          className='w-full sm:w-auto p-2 bg-white text-black border border-black rounded-md hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500'>
          Search
        </button>
      </div>
    </div>
  );
};

export default Blog;
