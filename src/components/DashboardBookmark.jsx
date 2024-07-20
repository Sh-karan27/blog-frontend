import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userBookmarks } from '../store/slices/userSlice';
import { FaBookReader } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { RiEyeOffFill } from 'react-icons/ri';
import { MdArrowRightAlt } from 'react-icons/md';
const DashboardBookmark = ({ userId }) => {
  const dispatch = useDispatch();
  const { bookmarks, error, loading } = useSelector((state) => state.auth);

  const fetchUserBookmarks = useCallback(() => {
    if (!bookmarks || bookmarks.length === 0) {
      dispatch(userBookmarks({ userId }));
    }
  }, [dispatch, bookmarks, userId]);

  useEffect(() => {
    fetchUserBookmarks();
  }, [fetchUserBookmarks]);

  if (loading) {
    return <div>Loading......</div>;
  }
  if (!Array.isArray(bookmarks)) {
    return <div>No blogs available</div>;
  }

  if (error) {
    return <div>Loading......</div>;
  }
  console.log(bookmarks);

  return (
    <div className='w-[90%] h-full flex flex-col items-center justify-center p-4 '>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full h-full place-items-center gap-5 mt-5'>
        {bookmarks.map((curr, i) =>
          i % 2 === 0 ? (
            <div
              key={i}
              className='flex flex-col items-center justify-center overflow-hidden rounded-xl shadow-custom w-full sm:w-[300px]'>
              <img
                src={curr.coverImage.url}
                alt=''
                className='w-full h-[300px] object-cover'
              />
              <div className='flex flex-col items-start justify-start p-2'>
                <h1 className='font-bold text-xl'>{curr.title}</h1>
                <p className='text-wrap text-sm text-gray-400'>
                  {curr.description}
                </p>
              </div>
              <div className='w-full flex itmes-center justify-left p-2'>
                <h1 className='text-xl font-semibold flex items-center gap-1 text-gray-500'>
                  <FaBookReader className='text-blue-500' />
                  <span className='text-gray-500'>{curr.views}</span>
                </h1>
              </div>
              <div className='w-full flex items-center justify-between p-2'>
                <div className='flex items-center justify-center gap-1'>
                  <img
                    src={curr.author.profileImage.url}
                    className='w-10 rounded-full'
                    alt='profile'
                  />
                  <p className='underline text-md text-blue-500'>
                    {curr.author.username}
                  </p>
                </div>
                <NavLink to={`/blog/${curr._id}`}>
                  <span className='flex items-center justify-center text-sm text-gray-600'>
                    Read More <MdArrowRightAlt />
                  </span>
                </NavLink>
              </div>
            </div>
          ) : (
            <div
              key={i}
              className='flex flex-col items-center justify-center w-full sm:w-[300px] relative'>
              <img
                src={curr.coverImage.url}
                alt=''
                className='rounded-xl shadow-custom w-full h-[300px] object-cover'
              />

              <div className='w-full flex items-center justify-between p-2 bottom-0 absolute'>
                <div className='flex items-center justify-center gap-1'>
                  <img
                    src={curr.author.profileImage.url}
                    className='w-10 rounded-full'
                    alt='profile'
                  />
                  <p className='underline text-md text-blue-500'>
                    {curr.author.username}
                  </p>
                </div>
                <NavLink to={`/blog/${curr._id}`}>
                  <span className='flex items-center justify-center text-sm text-gray-600'>
                    Read More <MdArrowRightAlt />
                  </span>
                </NavLink>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default DashboardBookmark;
