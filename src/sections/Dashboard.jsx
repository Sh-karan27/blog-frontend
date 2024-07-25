import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userProfile } from '../store/slices/userSlice';
import {
  userProfileFollower,
  userProfileFollowing,
} from '../store/slices/followerSlice';
import { userProfileNav } from '../constants';
import DashboardBlog from '../components/DashboardBlog';
import DashboardPlaylist from '../components/DashboardPlaylist';
import DashboardBookmark from '../components/DashboardBookmark';
import WatchHistory from '../components/WatchHistory';
import Profile from '../components/Profile';
import UserImage from '../components/UserImage';
import Loading from '../components/Loading';

const Dashboard = () => {
  const [selectComponent, setSelectComponent] = useState('Blogs');
  const [editCoverImage, setEditCoverImage] = useState(false);
  const [editUserProfileImage, setEditUserProfileImage] = useState(false);

  const onCloseForCoverImage = () => {
    setEditCoverImage(!editCoverImage);
  };

  const onCloseForProfile = () => {
    setEditUserProfileImage(!editUserProfileImage);
  };

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
        return user ? <DashboardBlog id={user._id} /> : <Loading />;
      case 'Playlists':
        return user ? <DashboardPlaylist id={user._id} /> : <Loading />;
      case 'Bookmark':
        return user ? <DashboardBookmark userId={user._id} /> : <Loading />;
      case 'WatchHistory':
        return user ? <WatchHistory history={user._id} /> : <Loading />;
      default:
        return <DashboardBlog />;
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleCoverImageEidtClick = () => {
    setEditCoverImage(!editCoverImage);
  };

  const handleuserProfileImageEdit = () => {
    setEditUserProfileImage(!editUserProfileImage);
  };

  const onUpdate = async () => {
    await dispatch(userProfile());
  };

  return (
    <div className='w-full min-h-screen flex flex-col items-center'>
      <div className='relative w-full sm:w-3/4 mt-10 px-4 sm:px-0 group'>
        <img
          src={user?.coverImage?.url}
          alt='YouTube Channel Banner'
          className='w-full h-[30vw] sm:h-[15vw] object-cover rounded-xl'
        />
        <div className='absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
          <button
            className='p-2 bg-gray-500 text-white rounded-full'
            onClick={() => handleCoverImageEidtClick()}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              className='w-6 h-6'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.232 5.232l3.536 3.536m-2.036-7.036a2.5 2.5 0 113.536 3.536L7.5 18.036H4v-3.536L16.732 3.232z'
              />
            </svg>
          </button>
        </div>
      </div>

      <div className='flex flex-col sm:flex-row items-center sm:items-start w-full sm:w-3/4 mt-4 px-4 sm:px-0'>
        <div className='flex flex-col sm:flex-row items-center justify-center gap-5'>
          <div className='relative w-[150px] sm:w-[200px] h-[150px] sm:h-[200px]'>
            <img
              src={user?.profileImage?.url}
              alt='Profile'
              className='w-full h-full rounded-full object-cover'
            />
            <div className='absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300'>
              <button
                className='p-2 bg-gray-500 text-white rounded-full'
                onClick={() => handleuserProfileImageEdit()}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  stroke='currentColor'
                  className='w-6 h-6'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.232 5.232l3.536 3.536m-2.036-7.036a2.5 2.5 0 113.536 3.536L7.5 18.036H4v-3.536L16.732 3.232z'
                  />
                </svg>
              </button>
            </div>
          </div>
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
        <ul className='flex flex-wrap items-center justify-center sm:justify-start w-full gap-4'>
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
      <div className='w-full h-full sm:w-3/4 mt-10 flex items-center justify-center  sm:px-0'>
        {renderComponent()}
      </div>
      {editCoverImage && (
        <Profile
          isOpen={editCoverImage}
          onClose={onCloseForCoverImage}
          onUpdate={onUpdate}
        />
      )}
      {editUserProfileImage && (
        <UserImage
          isOpen={editUserProfileImage}
          onClose={onCloseForProfile}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
};

export default Dashboard;
