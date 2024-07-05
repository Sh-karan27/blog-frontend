import React from 'react';
import { newAndTrend } from '../constants';
import { TbArrowWaveRightDown } from 'react-icons/tb';
import shoes from '../assets/shoes.jpg';
const NewsAndTrend = () => {
  return (
    <div className=' h-full flex items-center justify-center relative'>
      <div className='w-[90%] h-full flex flex-col items-center justify-center p-4'>
        <div className='w-full flex flex-col items-start justify-start '>
          <h3 className=' text-[#FEAD6E] font-semibold text-xl'>
            NEWS & TRENDS
          </h3>
          <h2 className='text-3xl font-semibold'>Game Changers Unleashed:</h2>
          <h2 className='text-3xl font-semibold'>
            The Ultimate Sports Prodcast
          </h2>
        </div>
        <div className='w-full flex items-center justify-evenly mt-5'>
          {newAndTrend.map((curr, i) => (
            <div
              className='flex flex-col items-center justify-start w-full h-[600px]'
              key={i}>
              <div className=' relative flex flex-col items-start justify-start'>
                <img
                  src={curr.image}
                  alt='image'
                  className=' w-[300px] h-[400px] rounded-3xl rounded-br-[11rem]    '
                />
                <div className='p-2 flex items-center justify-center rounded-tl-[2rem] absolute right-0 bg-white bottom-0'>
                  <button
                    style={{
                      backgroundColor: curr.color,
                    }}
                    className={`text-5xl p-2 text-white rounded-full delay-300 transition-transform duration-300  `}>
                    <TbArrowWaveRightDown className='rotate-12 hover:rotate-45 delay-300 transition-transform duration-300' />
                  </button>
                </div>
              </div>
              <div className='w-[300px] flex flex-col items-left justify-between h-full '>
                <h1
                  className=' font-bold underline text-2xl'
                  style={{
                    textDecorationColor: curr.color,
                    textDecorationThickness: '10px',
                  }}>
                  {curr.title}
                </h1>
                <p className=' text-gray-600 text-lg'>{curr.description}</p>
                <div className=' flex items-center justify-left gap-5 text-white '>
                  <button
                    style={{ backgroundColor: curr.color }}
                    className=' rounded-md p-1'>
                    {curr.link1}
                  </button>
                  <button
                    style={{ backgroundColor: curr.color }}
                    className='rounded-md p-1'>
                    {curr.link2}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='w-3/4 h-full flex items-center justify-evenly  mt-10 p-4'>
          <div className=' w-1/2 flex flex-col items-left justify-left gap-4'>
            <h1 className='text-5xl font-bold'>Stride Supreme:</h1>
            <h1 className='text-5xl font-bold'>Unleashing Nike's</h1>
            <h1 className='text-5xl font-bold text-[#8791e0]'>
              Footwear Elegance
            </h1>
            <p className='w-3/4 text-xl text-gray-500'>
              Step into styled and comfort with our trendsetting footwear
              collection, where every stride is a fashionable indulgence.
            </p>
            <div>
              <button className='p-4 text-white bg-[#393939] rounded-xl'>
                Shop Now
              </button>
            </div>
          </div>
          <img src={shoes} alt='' className='w-[60%] rounded-3xl' />
        </div>
      </div>
    </div>
  );
};

export default NewsAndTrend;
