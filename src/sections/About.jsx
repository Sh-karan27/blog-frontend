import React from 'react';
import AboutSection from '../assets/AboutSection.jpg';
const About = () => {
  return (
    <div className='h-screen w-full flex items-center justify-center'>
      <div className='w-full flex items-center justify-center p-4'>
        <div className='flex flex-col md:flex-row items-center justify-between w-full md:w-3/4 gap-5 md:gap-10'>
          <div className='flex flex-col items-start justify-start gap-5 w-full md:w-1/2 text-center md:text-left'>
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-semibold'>
              Welcome to Blogexpree{' '}
            </h1>
            <p className='text-base md:text-lg lg:text-xl'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
              ab tempore, quidem nostrum similique quasi doloremque in dolorem
              earum possimus praesentium saepe nihil, laborum blanditiis. Cumque
              perferendis libero cupiditate officia.
            </p>
            <div>
              <button className='bg-black text-white rounded-lg p-2 md:p-3 lg:p-4'>
                Start Now
              </button>
            </div>
          </div>
          <img
            src={AboutSection}
            alt='About'
            className='rounded-3xl w-full md:w-1/2 object-cover'
          />
        </div>
      </div>
    </div>
  );
};

export default About;
