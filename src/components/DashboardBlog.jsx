import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userBlog } from '../store/slices/blogSlice';
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

  console.log(data);

  return (
    <div className='w-full flex flex-wrap justify-center'>
      {data?.data.map((curr, i) => (
        <div
          key={i}
          className='flex flex-col items-left justify-left gap-1 my-4 mx-2 w-[20rem] h-full border rounded-lg overflow-hidden'>
          <img src={curr.coverImage.url} alt='' className='w-full h-1/2' />
          <div className='w-full flex flex-col items-left justify-left p-2'>
            <h1 className='text-xl font-semibold'>{curr.title}</h1>
            <p>{curr.description}</p>
          </div>
          <div className='w-full flex items-center justify-between p-2'>
            <h1 className='text-xl semibold flex items-center justify-center gap-1 text-gray-500'>
              <FaBookReader />
              <span className='text-gray-500'>{curr.views}</span>
            </h1>
            <h1 className='text-xl semibold flex items-center justify-center gap-1'>
              {curr.published === true ? (
                <BsEyeFill className=' text-blue-500' />
              ) : (
                <RiEyeOffFill className='text-red-500' />
              )}
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardBlog;
