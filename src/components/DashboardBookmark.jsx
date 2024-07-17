import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userBookmarks } from '../store/slices/userSlice';

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

  if (error) {
    return <div>Loading......</div>;
  }
  console.log(bookmarks);

  return (
    <div className='w-full p-4'>
      <div className='flex flex-wrap justify-center gap-4'>
        {bookmarks.map((blog, index) => (
          <div
            key={index}
            className='w-full sm:w-80 border rounded-lg shadow-lg overflow-hidden'>
            <img
              src={blog.coverImage.url}
              alt={blog.title}
              className='w-full  object-cover  '
            />

            <div className=' p-4 flex flex-col items-left justify-left gap-2'>
              <h2 className='text-xl font-bold'>{blog.title}</h2>
              <p className='text-sm text-gray-500 mt-2'>Views: {blog.views}</p>
              <div className='flex items-left justify-between gap-2'>
                <div className='flex items-center justify-center gap-1'>
                  <img
                    src={blog.author.profileImage.url}
                    className='w-10 rounded-full'
                    alt='profile'
                  />
                  <p className='underline text-blue-500'>
                    {blog.author.username}
                  </p>
                </div>
                <button>Read</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardBookmark;
