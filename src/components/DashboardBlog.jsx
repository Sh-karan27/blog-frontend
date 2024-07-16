import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userBlog, toggleBlogPublished } from '../store/slices/blogSlice';
import { FaBookReader } from 'react-icons/fa';
import { BsEyeFill } from 'react-icons/bs';
import { RiEyeOffFill } from 'react-icons/ri';

const DashboardBlog = ({ id }) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.blog);

  useEffect(() => {
    if (id) {
      dispatch(userBlog({ userId: id }));
    }
  }, [id, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleToggleBlogStatus = async (blogId) => {
    await dispatch(toggleBlogPublished({ blogId }));
    dispatch(userBlog({ userId: id }));
  };

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  };

  return (
    <div className='w-full flex flex-wrap justify-center'>
      {data?.map((curr, i) => (
        <div
          key={i}
          className='flex flex-col items-start justify-start gap-1 my-4 mx-2 w-full sm:w-[20rem] h-auto border rounded-lg overflow-hidden'>
          <img
            src={curr.coverImage.url}
            alt=''
            className='w-full h-48 object-cover'
          />
          <div className='flex flex-col items-start justify-start p-4'>
            <div className='w-full flex flex-col items-start justify-start '>
              <h1 className='text-xl font-semibold'>{curr.title}</h1>
              {/* <p>{truncateDescription(curr.description, 50)}</p> */}
            </div>
            <div className='w-full flex flex-col items-start justify-start  gap-5'>
              <div className='flex items-center justify-between w-full'>
                <h1 className='text-xl font-semibold flex items-center gap-1 text-gray-500'>
                  <FaBookReader />
                  <span className='text-gray-500'>{curr.views}</span>
                </h1>
                <button onClick={() => handleToggleBlogStatus(curr._id)}>
                  {curr.published ? (
                    <BsEyeFill className='text-blue-500 text-2xl' />
                  ) : (
                    <RiEyeOffFill className='text-red-500 text-2xl' />
                  )}
                </button>
              </div>
              <div>
                <button className='text-blue-500 underline'>Read</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardBlog;
