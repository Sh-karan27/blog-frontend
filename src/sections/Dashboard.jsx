import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Correct import for useSelector
import { userProfile } from '../store/slices/userSlice'; // Adjust the import path as needed
import {
  userProfileFollower,
  userProfileFollowing,
} from '../store/slices/followerSlice';
import { userProfileNav } from '../constants';

const Dashboard = () => {
  const [selectComponent, setSelectComponent] = useState('Blogs');

  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  // console.log(user)
  const { follower, following } = useSelector((state) => state.userProfile);

  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user && user._id) {
      dispatch(userProfileFollower({ id: user._id }));
      dispatch(userProfileFollowing({ id: user._id }));
    }
  }, [user, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const renderComponent = () => {
    switch (selectComponent) {
      case 'Blogs':
        return <Blogs />;
      case 'Playlists':
        return <Playlists />;
      case 'Bookmark':
        return <Bookmark />;
      case 'WatchHistory':
        return <WatchHistory />;
      default:
        return <Blogs />;
    }
  };

  // dispatch(userProfileFollower({ id: user?._id }));

  return (
    <div className='w-full h-screen flex flex-col items-center'>
      <div className='w-3/4 mt-10'>
        <img
          src={user?.coverImage.url}
          alt='YouTube Channel Banner'
          className='w-full h-[15vw] object-cover rounded-xl'
        />
      </div>
      <div className='flex items-center w-3/4 '>
        <div className='flex flex-col sm:flex-row items-center justify-center gap-5 mt-4'>
          <img
            src={user?.profileImage.url}
            alt='Profile'
            className='w-[200px] h-[200px] rounded-full'
          />
          <div className='flex flex-col items-center sm:items-start justify-center'>
            <h1 className='text-2xl sm:text-3xl font-bold'>{user?.username}</h1>
            <h3 className='text-lg sm:text-xl font-semibold'>{user?.email}</h3>
            <p className='text-base sm:text-lg text-gray-500 text-center sm:text-left'>
              {user?.bio}
            </p>
            <div className='flex gap-2'>
              <h1 className='text-gray-500 text-lg'>
                Followers:{follower?.followerCount}
              </h1>
              <h1 className='text-gray-500 text-lg'>
                Following:{following?.followingCount}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className='w-3/4 border-b flex items-left justify-left mt-10 p-2'>
        <ul className='  flex items-center justify-between  w-1/2'>
          {userProfileNav.map((curr, i) => (
            <li>
              <button onClick={() => setSelectComponent(curr.name)}>
                {curr.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
