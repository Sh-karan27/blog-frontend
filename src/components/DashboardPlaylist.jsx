import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPlaylist } from '../store/slices/playlistSlice';
import Loading from './Loading';
import { FaBookReader } from 'react-icons/fa';
import { formatDate } from '../helper';
import { TbLogs } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';
import { MdArrowRightAlt } from 'react-icons/md';
const DashboardPlaylist = ({ id }) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.playlist);

  useEffect(() => {
    if (id) {
      dispatch(getUserPlaylist({ userId: id }));
    }
  }, [id, dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className='text-red-500 text-center'>{error}</div>;
  }

  if (Array.isArray(data) && data.length === 0) {
    return <div>No playlist yet</div>;
  }
  console.log(data);
  return (
    <div className='w-full p-4'>
      <div className='flex flex-wrap justify-center gap-4'>
        {data?.map((curr, i) => (
          <div
            key={i}
            className='flex flex-col md:flex-row items-center md:items-start justify-between w-full border-b p-2 gap-4'>
            <div className='flex flex-col items-start justify-start p-2 w-full md:w-1/2 gap-2'>
              <h1 className='font-bold text-3xl mb-2'>{curr.name}</h1>
              <p className='text-xl text-gray-500 mb-4 line-clamp-3'>
                {curr.description}
              </p>
              <div className='flex items-center justify-between w-full'>
                <h1 className='text-sm text-gray-500 flex items-center gap-1'>
                  <FaBookReader className='text-blue-500' />
                  <span>{curr.totalViews}</span>
                </h1>
              </div>
              <div className='flex items-center justify-between w-full'>
                <h1 className='text-sm text-gray-500 flex items-center gap-1'>
                  <span className='text-gray-500'>Total Blogs</span>
                  <span className='text-gray-500'>{curr.totalBlogs}</span>
                </h1>
              </div>

              <p className='text-gray-500  text-sm font-semibold flex items-center'>
                {formatDate(curr.createdAt)}
              </p>
              <NavLink
                to={`/playlist/${curr._id}`}
                className='text-blue-500 text-sm flex items-center'>
                Read More <MdArrowRightAlt />
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPlaylist;
