import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateCoverImage } from '../store/slices/userSlice';
import { IoIosArrowBack } from 'react-icons/io';

const Profile = ({ isOpen, onClose, onUpdate }) => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
    formData.append('coverImage', file);
    dispatch(updateCoverImage(formData))
      .then(() => onUpdate())
      .then(() => onClose());
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className='fixed inset-0 flex flex-col items-center justify-center bg-opacity-70 bg-black'>
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
          <h2 className='text-lg font-semibold mb-2'>Update Cover Image</h2>

          {/* Hidden file input */}
          <input
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />

          {/* Custom styled button */}
          <button
            type='button'
            onClick={handleFileInputClick}
            className='bg-gray-200 text-gray-500 border border-gray-300  py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'>
            Choose File
          </button>

          {/* Submit button */}
          <button
            type='submit'
            className='bg-blue-500 text-white p-2 rounded-md'
            onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
