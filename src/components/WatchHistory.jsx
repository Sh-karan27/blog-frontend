import React, { useEffect, useCallback } from 'react';
import { userWatchHistory } from '../store/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FaBookReader } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { MdArrowRightAlt } from 'react-icons/md';
import Loading from './Loading';

const WatchHistory = () => {
  const dispatch = useDispatch();
  const { watchHistory, loading, error } = useSelector((state) => state.auth);

  const fetchWatchHistory = useCallback(() => {
    if (!watchHistory.length) {
      dispatch(userWatchHistory());
    }
  }, [dispatch, watchHistory]);

  useEffect(() => {
    fetchWatchHistory();
  }, [fetchWatchHistory]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className='text-red-500 text-center'>{error.message}</div>;
  }
// console.log(watchHistory)
  return (
    <div className='w-full max-w-screen-lg mx-auto p-4 flex flex-col items-center gap-10'>
      {watchHistory.map((curr, i) => (
        <div
          key={i}
          className='flex flex-col md:flex-row items-center md:items-start justify-between w-full border-b p-4 gap-4'>
          <div className='flex flex-col items-start justify-start p-4 w-full md:w-1/2 gap-2'>
            <h1 className='font-bold text-lg mb-2'>{curr.title}</h1>
            <div className='w-full flex items-center justify-left gap-2'>
              <img
                src={curr.author.profileImage.url}
                alt=''
                className='w-10 h-10 rounded-full'
              />
              <h1 className='text-blue-500 font-semibold'>
                {curr.author.username}
              </h1>
            </div>
            <p className='text-sm text-gray-600 mb-4 line-clamp-3'>
              {curr.description}
            </p>
            <div className='flex items-center justify-between w-full'>
              <h1 className='text-sm text-gray-500 flex items-center gap-1'>
                <FaBookReader className='text-blue-500' />
                <span>{curr.views}</span>
              </h1>
            </div>
            <NavLink
              to={`/blog/${curr._id}`}
              className='text-blue-500 text-sm flex items-center'>
              Read More<MdArrowRightAlt />
            </NavLink>
          </div>
          <img
            src={curr.coverImage.url}
            alt={curr.title}
            className='w-full md:w-[300px] h-[200px] object-cover rounded-lg'
          />
        </div>
      ))}
    </div>
  );
};

export default WatchHistory;
