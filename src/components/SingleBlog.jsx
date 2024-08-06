import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBlogById } from '../store/slices/blogSlice';
import { formatDate } from '../helper';
import { TfiComment } from 'react-icons/tfi';
import { CiShare1 } from 'react-icons/ci';
import Comments from './Comments';

import { BiSolidLike } from 'react-icons/bi';
import { toggleBlogLike } from '../store/slices/likeSlice';

const SingleBlog = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.blog);

  const { blogId } = useParams();

  useEffect(() => {
    dispatch(getBlogById({ blogId }));
  }, [blogId, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data || !data.data) {
    return <div>No data available</div>;
  }

  const handleLike = (currBlogId) => {
    dispatch(toggleBlogLike({ blogId: currBlogId })).then(() => {
      dispatch(getBlogById({ blogId }));

      console.log(currBlogId);
      console.log(blogId);
    });
  };

  console.log(data);

  return (
    <div className='w-full flex flex-col items-center justify-center p-4 mt-10 min-h-screen'>
      <div className=' flex flex-col  items-center justify-center gap-5 '>
        <div className='p-4 flex flex-col items-center justify-center gap-5 w-full md:w-1/2 overflow-y-auto'>
          <h1 className='text-3xl font-bold md:text-5xl'>{data.data.title}</h1>
          <div className='flex items-center justify-center gap-2'>
            <div className='text-xl flex items-center justify-center gap-2'>
              <span className='text-gray-400'>
                {formatDate(data.data.createdAt)} By -{' '}
              </span>
              <div className='flex items-center justify-center gap-2 '>
                <img
                  src={data.data.author?.profileImage.url}
                  alt=''
                  className='w-10 h-10 rounded-full'
                />
                <span className='font-semibold'>
                  {data.data.author?.username}
                </span>
                <button className='bg-[#366AC4] text-sm px-2 py-1 rounded-md text-white'>
                  {data.data.author.isFollowing === true
                    ? 'Following'
                    : 'Follow'}
                </button>
              </div>
            </div>
          </div>
        </div>
        {data.data.coverImage && (
          <img
            src={data.data.coverImage.url}
            alt='Cover'
            className='w-1/2 object-cover'
          />
        )}

        <div className='flex items-left justify-left gap-5 w-1/2 text-2xl p-4'>
          <button
            className={`${
              data.data.isLiked ? 'text-blue-500' : 'text-gray-500'
            } flex items-center justify-center`}
            onClick={() => handleLike(data.data._id)}>
            <BiSolidLike />
            {data.data.likeCount > 0 && <span className='text-sm'>{data.data.likeCount}</span>}
          </button>
          <button className='text-gray-400 flex items-center justify-center gap-2'>
            <TfiComment />
            <span className='text-sm'>{data.data.comments.length}</span>
          </button>
          <button className='text-gray-400'>
            <CiShare1 />
          </button>
        </div>
        <div className='p-4 flex shadow-xl  flex-col items-center justify-center gap-5 w-1/2 '>
          <h3 className='text-xl md:text-xl text-gray-500'>
            {data.data.description}
          </h3>
          <p className='text-md md:text-md'>{data.data.content}</p>
        </div>
      </div>
      <Comments blogId={blogId} />
    </div>
  );
};

export default SingleBlog;
