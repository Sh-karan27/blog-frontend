import React from 'react';
import { MdArrowRightAlt } from 'react-icons/md';
import { CiShare2 } from 'react-icons/ci';
import { CiHeart } from 'react-icons/ci';

const BlogCard = ({ blog }) => {
  return (
    <div className='flex flex-col items-center justify-center overflow-hidden rounded-xl shadow-custom w-full sm:w-[300px]'>
      <img
        src={blog.covermage}
        alt={blog.title}
        className='w-full h-[300px] object-cover'
      />
      <div className='flex flex-col items-start justify-start p-2'>
        <h1 className='font-bold text-xl'>{blog.title}</h1>
        <p className='text-wrap text-sm text-gray-400'>{blog.description}</p>
      </div>
      <div className='w-full flex items-center justify-between p-2'>
        <span className='flex items-center justify-center text-xl text-gray-600'>
          Read More <MdArrowRightAlt />
        </span>
        <div className='flex items-center justify-center text-2xl text-gray-600'>
          <CiShare2 />
          <CiHeart />
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
