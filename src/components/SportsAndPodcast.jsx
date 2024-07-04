import React from 'react';
import { MdArrowRightAlt } from 'react-icons/md';
import { StickyScroll } from '../components/ui/sticky-scroll-reveal';
import { content } from '../constants/index.jsx';
import { InfiniteMovingCards } from './ui/infinite-moving-cards.tsx';
import { explorMore } from '../constants/index.jsx';
import { explorMor2 } from '../constants/index.jsx';

const SportsAndPodcast = () => {
  return (
    <div className=' h-full flex items-center justify-center '>
      <div className='w-full h-full flex flex-col items-center justify-center p-4'>
        <div className='w-full flex flex-col items-start justify-start '>
          <h3 className=' text-[#FEAD6E] font-semibold text-xl'>
            SPORTS & PODCAST
          </h3>
          <h2 className='text-3xl font-semibold'>Game Changers Unleashed:</h2>
          <h2 className='text-3xl font-semibold'>
            The Ultimate Sports Prodcast
          </h2>
        </div>
        <div className='p-10'>
          <StickyScroll content={content} />
        </div>
        <div className='h-[40rem] w-full rounded-md flex flex-col antialiased   items-center justify-center relative overflow-hidden text-start p-4'>
          <div className='w-3/4 flex items-center'>
            <h1 className=' font-bold text-3xl '>Explore More</h1>
            <MdArrowRightAlt className='text-3xl' />
          </div>
          <InfiniteMovingCards
            items={explorMore}
            direction='right'
            speed='slow'
          />
        </div>
        <div className='w-full h-[400px] flex items-center justify-center gap-10'>
          {explorMor2.map((curr, i) => (
            <div
              className={` ${
                i === 1 ? 'bg-black rounded-3xl ' : 'bg-[#A192f3]'
              } ${
                i === 0 ? 'rounded-r-3xl ' : 'rounded-l-3xl'
              }  h-full p-4 text-white flex flex-col items-left text-wrap justify-center`}>
              <h1 className='text-3xl font-semibold'>{curr.title}</h1>
              <p className='text-md'>{curr.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SportsAndPodcast;
