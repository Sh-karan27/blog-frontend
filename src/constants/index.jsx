import hero1 from '../assets/hero1.jpeg';
import hero2 from '../assets/hero2.jpeg';
import hero3 from '../assets/hero3.jpeg';
import hero4 from '../assets/hero4.jpeg';
import food1 from '../assets/food1.jpeg';
import food2 from '../assets/food2.jpeg';
import food3 from '../assets/food3.jpeg';
import food4 from '../assets/food4.jpeg';
import travel1 from '../assets/travel1.jpeg';
import travel2 from '../assets/travel2.jpeg';
import travel3 from '../assets/travel3.jpeg';
import travel4 from '../assets/travel4.jpeg';

import sports1 from '../assets/sports1.jpg';
import sports2 from '../assets/sports2.jpg';
import sports3 from '../assets/sports3.jpg';

export const heroImage = [hero1, hero2, hero3, hero4];

export const foodAndTravel = [
  {
    title: 'Blissful Bites',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Vivamus lacinia odio vitae vestibulum vestibulum.Cras venenatis euismod malesuada.Etiam feugiat dolor sit amet felis aliquet, sit amet aliquam elit facilisis.',
    image: food1,
  },
  {
    image: travel1,
  },
  {
    title: 'Creamy Shake',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Vivamus lacinia odio vitae vestibulum vestibulum.Cras venenatis euismod malesuada.Etiam feugiat dolor sit amet felis aliquet, sit amet aliquam elit facilisis.',
    image: food2,
  },
  {
    image: travel2,
  },
  {
    image: travel3,
  },
  {
    title: 'SavorMelt Pizzas',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Vivamus lacinia odio vitae vestibulum vestibulum.Cras venenatis euismod malesuada.Etiam feugiat dolor sit amet felis aliquet, sit amet aliquam elit facilisis.',
    image: food3,
  },
  {
    image: travel4,
  },
  {
    title: 'Fluffly Stacks',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Vivamus lacinia odio vitae vestibulum vestibulum.Cras venenatis euismod malesuada.Etiam feugiat dolor sit amet felis aliquet, sit amet aliquam elit facilisis.',
    image: food4,
  },
];

export const content = [
  {
    title: 'Real time changes',
    description:
      'See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.',
    content: (
      <div className='h-full w-full  flex items-center justify-center text-white'>
        <img
          src={sports1}
          width={300}
          height={300}
          className='h-full w-full object-cover'
          alt='linear board demo'
        />
      </div>
    ),
  },
  {
    title: 'Real time changes',
    description:
      'See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.',
    content: (
      <div className='h-full w-full  flex items-center justify-center text-white'>
        <img
          src={sports2}
          width={300}
          height={300}
          className='h-full w-full object-cover'
          alt='linear board demo'
        />
      </div>
    ),
  },
  {
    title: 'Real time changes',
    description:
      'See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.',
    content: (
      <div className='h-full w-full  flex items-center justify-center text-white'>
        <img
          src={sports3}
          width={300}
          height={300}
          className='h-full w-full object-cover'
          alt='linear board demo'
        />
      </div>
    ),
  },
];

export const explorMore = [
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

export const explorMor2 = [
  {
    title: 'Possibility To Watch',
    description:
      'Participating in sports is instrumental in advancing physical health, nurturing collaboration, and instilling crucial virtues such as discipline, resilience, and a spirit of sportsmanship.',
  },
  {
    title: 'Central Text',
    description:
      'Sports play a significant role in promoting physical fitness, fostering teamwork, and instilling values such as discipline, perseverance.',
  },
  {
    title: 'Ability To Share With Friends',
    description:
      'Engaging in sports plays a pivotal role in enhancing physical well being, nurturing teamwork, and cultivating essential values like discipline, persistence, and sportsmanship.',
  },
];
