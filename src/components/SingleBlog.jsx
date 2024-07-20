import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBlogById } from '../store/slices/blogSlice';

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
  console.log(data);

  return (
    <div className='w-full flex items-center justify-center p-4 mt-10 h-screen'>
      <div className='w-full flex items-left justify-center gap-5 h-3/4'>
        {data.data.coverImage && (
          <img src={data.data.coverImage.url} alt='' className='w-1/4 ' />
        )}
        <div className='p-4 flex flex-col items-left justify-left gap-5 w-1/2 overflow-y-scroll'>
          <h1 className='text-5xl'>{data.data.title}</h1>
          <h3 className='text-3xl text-gray-500'>{data.data.description}</h3>
          <p>{data.data.content}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
