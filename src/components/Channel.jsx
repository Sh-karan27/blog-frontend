import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserProfile } from '../store/slices/userSlice';
import Loading from './Loading';

const Channel = () => {
  const { username } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (username) {
      dispatch(getUserProfile({ username }));
    }
  }, [dispatch, username]);

  const { loading, error, data } = useSelector((state) => state.auth);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  // Check if data is an array and has at least one element
  if (!data || data.length === 0) {
    return <div>No user profile found.</div>;
  }

  const user = data[0];

  return (
    <div className='w-full min-h-screen flex flex-col items-center'>
      <div className='relative w-full sm:w-3/4 mt-10 px-4 sm:px-0 group'>
        <img
          src={user?.coverImage?.url}
          alt='YouTube Channel Banner'
          className='w-full h-[30vw] sm:h-[15vw] object-cover rounded-xl'
        />
        
      </div>

      <div className='flex flex-col sm:flex-row items-center sm:items-start w-full sm:w-3/4 mt-4 px-4 sm:px-0'>
        <div className='flex flex-col sm:flex-row items-center justify-center gap-5'>
          <div className='relative w-[150px] sm:w-[200px] h-[150px] sm:h-[200px]'>
            <img
              src={user?.profileImage?.url}
              alt='Profile'
              className='w-full h-full rounded-full object-cover'
            />
          </div>
          <div className='flex flex-col items-center sm:items-start justify-center text-center sm:text-left'>
            <h1 className='text-2xl sm:text-3xl font-bold'>{user?.username}</h1>
            <h3 className='text-lg sm:text-xl font-semibold'>{user?.email}</h3>
            <p className='text-base sm:text-lg text-gray-500'>{user?.bio}</p>
            <div className='flex gap-2'>
              <h1 className='text-gray-500 text-lg'>
                Followers: {user?.followerCount}
              </h1>
              <h1 className='text-gray-500 text-lg'>
                Following: {user?.followingToCount}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Channel;
