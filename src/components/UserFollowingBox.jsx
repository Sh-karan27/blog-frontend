import React from 'react';
import { ImCross } from 'react-icons/im';
import { IoIosArrowBack } from 'react-icons/io';

const UserFollowingBox = ({ onClose, isOpen, following }) => {
  if (!isOpen) {
    return null;
  }
  console.log(following);
  return (
    <div className='fixed inset-0 flex flex-col items-center justify-center bg-opacity-70'>
      <div className='w-1/3 h-3/4   border bg-black bg-opacity-90 p-4 rounded-md'>
        <button
          className=' text-white hover:text-[#366AC4] flex items-center justify-center'
          onClick={() => onClose()}>
          <IoIosArrowBack />
          Go Back
        </button>
        <div className='p-4 flex flex-col  items-center justify-start w-full h-full'>
                  <h1 className=' text-3xl text-blue-500 font-semibold'>Following</h1>
                  <div></div>
        </div>
      </div>
    </div>
  );
};

export default UserFollowingBox;
