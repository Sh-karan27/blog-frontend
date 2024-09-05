import React from 'react';
import { IoSearchOutline } from 'react-icons/io5';

const SearchUser = () => {
  return (
    <div className='w-full min-h-screen flex flex-col items-center mt-10'>
      <div className='w-3/4 flex items-center justify-center gap-5'>
        <input
          className='border-b-2 p-2 w-1/2 outline-none'
          type='text'
          placeholder='Username'
        />
        <button className='text-3xl'>
          <IoSearchOutline />
        </button>
      </div>
    </div>
  );
};

export default SearchUser;
