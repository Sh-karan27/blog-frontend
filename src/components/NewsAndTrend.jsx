import React from 'react';
import { newAndTrend } from '../constants';
import { TbArrowWaveRightDown } from 'react-icons/tb';
import shoes from '../assets/shoes.jpg';
const NewsAndTrend = () => {
  return (
    <div className='h-full mt-5 w-full flex flex-col items-center justify-center relative p-4'>
      <div className='w-[90%]  h-full flex flex-col items-center justify-center'>
        <div className='w-full flex flex-col items-start justify-start mb-4'>
          <h3 className='text-[#FEAD6E] font-semibold text-xl'>
            NEWS & TRENDS
          </h3>
          <h2 className='text-2xl md:text-3xl font-semibold'>
            Game Changers Unleashed:
          </h2>
          <h2 className='text-2xl md:text-3xl font-semibold'>
            The Ultimate Sports Podcast
          </h2>
        </div>
        <div className='w-full flex flex-wrap items-center justify-evenly mt-5 gap-4'>
          {newAndTrend.map((curr, i) => (
            <div
              className='flex flex-col items-center justify-start w-full md:w-[300px] h-auto'
              key={i}>
              <div className='relative flex flex-col items-start justify-start mb-4'>
                <img
                  src={curr.image}
                  alt='image'
                  className='w-full md:w-[300px] h-[400px] rounded-3xl rounded-br-[11rem]'
                />
                <div className='p-2 flex items-center justify-center rounded-tl-[2rem] absolute right-0 bg-white bottom-0'>
                  <button
                    style={{ backgroundColor: curr.color }}
                    className='text-3xl md:text-5xl p-2 text-white rounded-full delay-300 transition-transform duration-300'>
                    <TbArrowWaveRightDown className='rotate-12 hover:rotate-45 delay-300 transition-transform duration-300' />
                  </button>
                </div>
              </div>
              <div className='w-full md:w-[300px] flex flex-col items-start justify-between h-full'>
                <h1
                  className='font-bold underline text-xl md:text-2xl'
                  style={{
                    textDecorationColor: curr.color,
                    textDecorationThickness: '10px',
                  }}>
                  {curr.title}
                </h1>
                <p className='text-gray-600 text-md md:text-lg'>
                  {curr.description}
                </p>
                <div className='flex items-center justify-start gap-2 md:gap-5 text-white mt-2'>
                  <button
                    style={{ backgroundColor: curr.color }}
                    className='rounded-md p-1 md:p-2'>
                    {curr.link1}
                  </button>
                  <button
                    style={{ backgroundColor: curr.color }}
                    className='rounded-md p-1 md:p-2'>
                    {curr.link2}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='w-full flex flex-col md:flex-row items-center justify-evenly mt-10 p-4'>
          <div className='w-full md:w-1/2 flex flex-col items-start justify-start gap-4 mb-4 md:mb-0'>
            <h1 className='text-3xl md:text-5xl font-bold'>Stride Supreme:</h1>
            <h1 className='text-3xl md:text-5xl font-bold'>
              Unleashing Nike's
            </h1>
            <h1 className='text-3xl md:text-5xl font-bold text-[#8791e0]'>
              Footwear Elegance
            </h1>
            <p className='w-full md:w-3/4 text-md md:text-xl text-gray-500'>
              Step into style and comfort with our trendsetting footwear
              collection, where every stride is a fashionable indulgence.
            </p>
            <div>
              <button className='p-2 md:p-4 text-white bg-[#393939] rounded-xl'>
                Shop Now
              </button>
            </div>
          </div>
          <img
            src={shoes}
            alt='Shoes'
            className='w-full md:w-[60%] rounded-3xl'
          />
        </div>
      </div>
    </div>
  );
};

export default NewsAndTrend;
