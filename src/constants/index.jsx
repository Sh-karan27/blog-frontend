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


export const explore = [
  
]