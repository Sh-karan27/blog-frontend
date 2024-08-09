import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBookmark, userBookmarks } from '../store/slices/userSlice';
import { FaBookReader } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { MdArrowRightAlt } from 'react-icons/md';
import { CiBookmark } from 'react-icons/ci';
import Loading from './Loading';

const DashboardBookmark = ({ userId }) => {
  const dispatch = useDispatch();
  const { bookmarks, error, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(userBookmarks({ userId }));
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error</div>;
  }

  if (Array.isArray(bookmarks) && bookmarks.length === 0) {
    return <div>No bookmarks available</div>;
  }

  console.log(bookmarks);

  return (
    <div className='w-full max-w-screen-lg mx-auto p-4 flex flex-col items-center gap-10'>
      {bookmarks.map((curr, i) => (
        <div
          key={i}
          className='flex flex-col md:flex-row items-center md:items-start justify-between w-full border-b p-4 gap-2'>
          <div className='flex flex-col items-start justify-start p-4 w-full md:w-1/2 gap-2'>
            <h1 className='font-bold text-lg mb-2'>{curr.title}</h1>
            <div className='w-full flex items-center justify-left gap-2'>
              <img
                src={curr.author.profileImage.url}
                alt=''
                className='w-10 rounded-full'
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
              Read More <MdArrowRightAlt />
            </NavLink>
          </div>
          <img
            src={curr.coverImage.url}
            alt={curr.title}
            className='w-full md:w-[300px] h-[200px] object-cover rounded-lg'
          />
          <CiBookmark
            // onClick={() => handleClick(curr._id)}
            className='text-blue-500 text-xl cursor-pointer'
          />
        </div>
      ))}
    </div>
  );
};

export default DashboardBookmark;
