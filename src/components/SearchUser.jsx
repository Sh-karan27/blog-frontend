import React, { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './Loading';
import { getUserProfile } from '../store/slices/userSlice';
import UserChannelProfile from './UserChannelProfile';

const SearchUser = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.auth);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return alert(`${error.message}`);
  }
  console.log(data);

  const handleSubmit = async () => {
    await dispatch(getUserProfile({ username: query }));
    console.log('click');
  };

  return (
    <div className='w-full h-screen flex flex-col items-center mt-10 gap-5'>
      <div className='w-3/4 flex items-center justify-center gap-5'>
        <input
          className='border-b-2 p-2 w-1/2 outline-none'
          type='text'
          placeholder='Username'
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className='text-3xl' onClick={() => handleSubmit()}>
          <IoSearchOutline />
        </button>
      </div>
      <div className='w-full h-full sm:w-3/4 mt-10 flex items-center justify-center  sm:px-0 overflow-y-scroll'>
        {data ? <UserChannelProfile data={data} /> : <div>Not found</div>}
      </div>
    </div>
  );
};

export default SearchUser;
