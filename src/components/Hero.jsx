import React from 'react';
import { FlipWords } from './ui/flip-words';
import { heroImage } from '../constants';
const Hero = () => {
  const words = ['thoughts', 'stories', 'ideas'];

  return (
    <div className='h-screen flex items-center justify-center relative'>
      <div className='w-full h-full flex flex-col items-center justify-center gap-10 overflow-hidden p-5'>
        <div className=' text-black text-5xl font-semibold w-[700px]'>
          Step into the world of Blogxpress, where our
          <FlipWords words={words} />
          come to life.
        </div>
        <div className='w-full flex items-center justify-center gap-10'>
          {heroImage.map((curr) => (
            <img
              src={curr}
              alt='hero'
              className='w-[300px] h-[300px] rounded-3xl'
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
