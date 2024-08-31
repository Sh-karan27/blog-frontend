import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateProfileImage } from '../store/slices/userSlice';
import { ImCross } from 'react-icons/im';
import { IoIosArrowBack } from 'react-icons/io';

const UserImage = ({ isOpen, onClose, onUpdate }) => {
  const [profile, setProfile] = useState();
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setProfile(e.target.files[0]);
  };

  const handleClick = () => {
    onClose();
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('profileImage', profile);

    dispatch(updateProfileImage(formData))
      .then(() => onUpdate())
      .then(() => onClose());
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className='fixed inset-0 flex flex-col items-center justify-center bg-opacity-70 bg-black p-4'>
      <div className='w-1/3 h-[15rem] flex flex-col items-center justify-evenly border bg-white p-4 rounded-md'>
        <div className='w-full'>
          <button
            className='text-blue-500 hover:text-[#366AC4] flex items-center justify-center'
            onClick={handleClick}>
            <IoIosArrowBack />
            Go Back
          </button>
        </div>

        <div className='w-full flex flex-col items-center justify-center gap-5'>
          <h2 className='text-lg font-semibold mb-2'>Update Profile Image</h2>
          {/* Hidden file input */}
          <input
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
          {/* Custom styled button for file input */}
          <button
            type='button'
            onClick={handleFileInputClick}
            className='bg-gray-200 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'>
            Choose File
          </button>
          {/* Submit button */}
          <button
            onClick={handleSubmit}
            type='submit'
            className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserImage;
