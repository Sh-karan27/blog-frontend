import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLikedBlogs } from '../store/slices/likeSlice';
import Loading from './Loading';
import { FaBookReader } from 'react-icons/fa';
import { formatDate } from '../helper';
import { NavLink } from 'react-router-dom';
import { MdArrowRightAlt } from 'react-icons/md';

const DashboardLikedBlogs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLikedBlogs());
  }, [dispatch]);

  const { loading, data, error } = useSelector((state) => state.like);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }
  console.log(data);
 return (
   <div className='w-full max-w-screen-lg mx-auto p-4 flex flex-col items-center gap-10'>
     <div className='w-full'>
       <h1 className='text-3xl text-gray-400'>
         Liked Blogs: {data?.likedBlogsCount}
       </h1>
     </div>
     {data?.likedBlogList?.map(
       (curr, i) =>
         // Check if `curr` exists before rendering the blog details
         curr && (
           <div
             key={i}
             className='flex flex-col md:flex-row items-center md:items-start justify-between w-full border-b p-4 gap-4'>
             <div className='flex flex-col items-start justify-start p-4 w-full md:w-1/2 gap-2'>
               <h1 className='font-bold text-lg mb-2'>
                 {curr?.title || 'No Title'}
               </h1>
               <p className='text-sm text-gray-600 mb-4 line-clamp-3'>
                 {curr?.description || 'No description available.'}
               </p>
               <div className='flex items-center justify-between w-full'>
                 <h1 className='text-sm text-gray-500 flex items-center gap-1'>
                   <FaBookReader className='text-blue-500' />
                   <span>{curr?.views || 0}</span>
                 </h1>
               </div>
               <NavLink
                 to={`/blog/${curr?._id}`}
                 className='text-blue-500 text-sm flex items-center'>
                 Read More <MdArrowRightAlt />
               </NavLink>
               <p className='text-gray-500 text-sm font-semibold flex items-center'>
                 {formatDate(curr?.createdAt)}
               </p>
             </div>
             {curr?.coverImage?.url && (
               <img
                 src={curr.coverImage.url}
                 alt={curr.title || 'Blog Image'}
                 className='w-full md:w-[300px] h-[200px] object-cover rounded-lg'
               />
             )}
           </div>
         )
     )}
   </div>
 );

};

export default DashboardLikedBlogs;
