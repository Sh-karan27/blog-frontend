import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { toggleFollow } from '../store/slices/followerSlice';

const UserFollowerBox = ({ onClose, isOpen, follower, onUpdate }) => {
  const dispatch = useDispatch();

  if (!isOpen) {
    return null;
  }

  const handleUnFollow = (id) => {
    dispatch(toggleFollow({ id }));
    onUpdate();
    onClose();
  };

  return (
    <div className='fixed inset-0 flex flex-col items-center justify-center bg-opacity-70'>
      <div className='w-1/3 h-3/4   border bg-white  p-4 rounded-md'>
        <button
          className=' text-blue-500 hover:text-[#366AC4] flex items-center justify-center'
          onClick={() => onClose()}>
          <IoIosArrowBack />
          Go Back
        </button>
        <div className=' flex flex-col  items-center justify-start w-full h-full gap-5'>
          <h1 className=' text-3xl text-blue-500 font-semibold'>Follower</h1>
          <div className='w-full flex flex-col items-center justify-center gap-5'>
            {follower.map((curr, i) => (
              <div
                className=' w-full border p-2 rounded-md flex items-center justify-between'
                key={curr._id}>
                <div className='flex items-center justify-center gap-2'>
                  <img
                    src={curr.profileImage.url}
                    alt='profile'
                    className='w-[3rem] h-[3rem] rounded-full'
                  />
                  <div className='flex flex-col items-left justify-center '>
                    <h1 className=' font-semibold'>{curr.username}</h1>
                    {curr.followedToFollower ? (
                      <h1 className=' text-sm text-gray-500'>
                        you are following
                      </h1>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <button
                  className='border p-1 text-sm border-blue-500 rounded-md text-blue-500'
                  onClick={() => handleUnFollow(curr._id)}>
                  {curr.followedToFollower ? 'following' : 'follow'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFollowerBox;
