import React from 'react';

const Footer = () => {
  return (
    <div className='w-full flex flex-col md:flex-row items-start justify-evenly p-4 text-gray-500 mt-10 space-y-8 md:space-y-0'>
      <div className='w-full md:w-[30%] flex flex-col items-start space-y-2'>
        <h1 className='text-black text-3xl font-bold'>Blogxpress</h1>
        <p>
          Express insight, industry trends, and inspiring stories that help you
          live and work on your own terms. Expert insights, industry trends.
        </p>
      </div>
      <div className='w-full md:w-auto flex flex-col items-start space-y-2'>
        <h1 className='text-black text-xl font-bold'>Home</h1>
        <h3>Company</h3>
        <h3>Quality Guarantee</h3>
        <h3>Store Locations</h3>
        <h3>Sustainability</h3>
      </div>
      <div className='w-full md:w-auto flex flex-col items-start space-y-2'>
        <h1 className='text-black text-xl font-bold'>PAGE</h1>
        <h3>Foods & Trends</h3>
        <h3>Top Creator</h3>
        <h3>News & Trends</h3>
        <h3>Sports & Podcast</h3>
      </div>
      <div className='w-full md:w-auto flex flex-col items-start space-y-2'>
        <h1 className='text-black text-xl font-bold'>Contact</h1>
        <h3>+123456789</h3>
        <h3>blogxpress@gmail.com</h3>
      </div>
    </div>
  );
};

export default Footer;
