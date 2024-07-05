import React from 'react';
import { FlipWords } from './ui/flip-words';
import { heroImage } from '../constants';
const Hero = () => {
  const words = ['thoughts', 'stories', 'ideas'];

  return (
    <div className='h-screen flex items-center justify-center relative overflow-hidden'>
      <div className='w-[90%] h-full flex flex-col items-center justify-evenly p-5'>
        <div className='w-full flex items-start justify-start'>
          <div className='text-black text-5xl font-semibold w-full sm:w-[700px]'>
            Step into the world of Blogxpress, where our
            <FlipWords words={words} />
            come to life.
          </div>
        </div>
        <div className='w-full flex flex-wrap items-center justify-evenly'>
          {heroImage.map((curr, i) => (
            <div
              key={i}
              className={`w-full sm:w-[400px] h-[400px] flex flex-col items-center ${
                i % 2 !== 0 ? 'justify-start' : 'justify-center'
              }`}>
              <img
                src={curr}
                alt='hero'
                className='w-[300px] h-[300px] rounded-3xl'
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
