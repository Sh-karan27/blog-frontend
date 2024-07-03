import React from 'react';
import { foodAndTravel } from '../constants';
import { MdArrowRightAlt } from 'react-icons/md';
import { CiShare2 } from 'react-icons/ci';
import { CiHeart } from 'react-icons/ci';

const FoodAndTravel = () => {
  return (
    <div className='h-full flex items-center justify-center'>
      <div className='w-[90%] h-full flex flex-col items-center justify-center p-4'>
        <div className='w-full flex flex-col items-start justify-start '>
          <h3 className=' text-[#FEAD6E] font-semibold text-xl'>
            FOOD & TRAVEL BLOG
          </h3>
          <h2 className='text-3xl font-semibold'>
            Read all things about Food &
          </h2>
          <h2 className='text-3xl font-semibold'>
            Travel in the simple article.
          </h2>
        </div>
        <div className='grid grid-cols-4  w-[65%] h-full  place-items-center  gap-5 mt-5'>
          {foodAndTravel.map((curr, i) =>
            curr.description ? (
              <div
                key={i}
                className=' flex flex-col items-center justify-center  overflow-hidden rounded-xl shadow-custom '>
                <img src={curr.image} alt='' className='w-[300px] h-[300px]' />
                <div className='flex flex-col items-start justify-start p-2'>
                  <h1 className='font-bold text-xl'>{curr.title}</h1>
                  <p className=' text-wrap text-sm text-gray-400'>
                    {curr.description}
                  </p>
                </div>
                <div className='w-full flex items-center justify-between p-2'>
                  <span className='flex items-center justify-center  text-xl text-gray-600'>
                    Read More <MdArrowRightAlt />
                  </span>
                  <div className='flex items-center justify-center text-2xl text-gray-600'>
                    <CiShare2 />
                    <CiHeart />
                  </div>
                </div>
              </div>
            ) : (
              <div
                key={i}
                className='flex flex-col items-center justify-center'>
                <img
                  src={curr.image}
                  alt=''
                  className='rounded-xl shadow-custom'
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodAndTravel;
