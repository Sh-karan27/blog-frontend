import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userProfile } from '../store/slices/userSlice';
import {
  userProfileFollower,
  userProfileFollowing,
} from '../store/slices/followerSlice';
import { userProfileNav } from '../constants';
import DashboardBlog from '../components/DashboardBlog';

const Dashboard = () => {
  const [selectComponent, setSelectComponent] = useState('Blogs');

  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const { follower, following } = useSelector((state) => state.userProfile);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(userProfile());
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (user && user._id) {
      dispatch(userProfileFollower({ id: user._id }));
      dispatch(userProfileFollowing({ id: user._id }));
    }
  }, [user, dispatch]);

  const renderComponent = () => {
    switch (selectComponent) {
      case 'Blogs':
        return user ? <DashboardBlog id={user._id} /> : <div>Loading...</div>;
      // case 'Playlists':
      //   return <Playlists />;
      // case 'Bookmark':
      //   return <Bookmark />;
      // case 'WatchHistory':
      //   return <WatchHistory />;
      default:
        return <Blogs />;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='w-full min-h-screen flex flex-col items-center'>
      <div className='w-full sm:w-3/4 mt-10 px-4 sm:px-0'>
        <img
          src={user?.coverImage?.url}
          alt='YouTube Channel Banner'
          className='w-full h-[30vw] sm:h-[15vw] object-cover rounded-xl'
        />
      </div>
      <div className='flex flex-col sm:flex-row items-center sm:items-start w-full sm:w-3/4 mt-4 px-4 sm:px-0'>
        <div className='flex flex-col sm:flex-row items-center justify-center gap-5'>
          <img
            src={user?.profileImage?.url}
            alt='Profile'
            className='w-[150px] sm:w-[200px] h-[150px] sm:h-[200px] rounded-full'
          />
          <div className='flex flex-col items-center sm:items-start justify-center text-center sm:text-left'>
            <h1 className='text-2xl sm:text-3xl font-bold'>{user?.username}</h1>
            <h3 className='text-lg sm:text-xl font-semibold'>{user?.email}</h3>
            <p className='text-base sm:text-lg text-gray-500'>{user?.bio}</p>
            <div className='flex gap-2'>
              <h1 className='text-gray-500 text-lg'>
                Followers: {follower?.followerCount}
              </h1>
              <h1 className='text-gray-500 text-lg'>
                Following: {following?.followingCount}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full sm:w-3/4 border-b flex items-center justify-center sm:justify-start mt-10 px-4 sm:px-0 p-2'>
        <ul className='flex items-center justify-between w-full sm:w-1/2'>
          {userProfileNav.map((curr, i) => (
            <li key={i}>
              <button
                className='text-lg font-semibold'
                onClick={() => setSelectComponent(curr.name)}>
                {curr.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className='w-full sm:w-3/4 mt-10 flex items-center justify-center px-4 sm:px-0'>
        {renderComponent()}
      </div>
    </div>
  );
};

export default Dashboard;
