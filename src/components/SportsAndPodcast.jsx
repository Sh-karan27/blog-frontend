import React from 'react';
import { MdArrowRightAlt } from 'react-icons/md';
import { StickyScroll } from '../components/ui/sticky-scroll-reveal';
import { content } from '../constants/index.jsx';
import { InfiniteMovingCards } from './ui/infinite-moving-cards.tsx';
import sports1 from '../assets/sports1.jpg';
import sports2 from '../assets/sports2.jpg';
import sports3 from '../assets/sports3.jpg';

const testimonials = [
  {
    quote:
      'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.',
    name: 'Charles Dickens',
    title: 'A Tale of Two Cities',
    image: sports1,
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: 'William Shakespeare',
    title: 'Hamlet',
    image: sports2,
  },
  {
    quote: 'All that we see or seem is but a dream within a dream.',
    name: 'Edgar Allan Poe',
    title: 'A Dream Within a Dream',
    image: sports3,
  },
  {
    quote:
      'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.',
    name: 'Jane Austen',
    title: 'Pride and Prejudice',
    image: sports1,
  },
  {
    quote:
      'Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.',
    name: 'Herman Melville',
    title: 'Moby-Dick',
    image: sports2,
  },
];

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
          <div className='w-3/4'>
            <h1 className=' font-bold text-3xl'>Explore More</h1>
          </div>
          <InfiniteMovingCards
            items={testimonials}
            direction='right'
            speed='slow'
          />
        </div>
      </div>
    </div>
  );
};

export default SportsAndPodcast;
