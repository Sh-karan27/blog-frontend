import React, { useState } from 'react';
import { ImCross } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { updateCoverImage } from '../store/slices/userSlice';
const Profile = ({ isOpen, onClose, onUpdate }) => {
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleClick = () => {
    onClose();
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
      <h2 className='text-lg font-semibold mb-2'>Update Cover Image</h2>
      <ImCross
        className='text-red-500 absolute top-0 left-0'
        onClick={() => handleClick()}
      />

      <form action='submit' onSubmit={handleSubmit}>
        <input
          type='file'
          accept='image/*'
          onChange={handleFileChange}
          className='border rounded p-2'
        />
        <button type='submit' className='text-white'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Profile;
