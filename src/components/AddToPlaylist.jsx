import React, { useEffect } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './Loading';
import {
  addBlogToPlaylist,
  getUserPlaylist,
} from '../store/slices/playlistSlice';

const AddToPlaylist = ({ toggleOpen, id, blogId }) => {
  const dispatch = useDispatch();

  const { loading, error, data } = useSelector((state) => state.playlist);

  useEffect(() => {
    dispatch(getUserPlaylist({ userId: id }));
  }, [dispatch, id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className='text-red-500'>{error.message}</div>;
  }

  // Check if data is an array, if not set it to an empty array
  const playlists = Array.isArray(data) ? data : [];

  const handleAddToPlaylist = async (playlistId, blogId) => {
    await dispatch(addBlogToPlaylist({ playlistId, blogId })).then(() => {
      toggleOpen();
    });
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 p-4'>
      <div className='w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 relative'>
        <button
          className='absolute top-4 left-4 text-gray-700 hover:text-blue-600 flex items-center'
          onClick={toggleOpen}>
          <IoIosArrowBack className='mr-2' />
          Go Back
        </button>
        <h1 className='text-3xl font-semibold mb-4 text-center'>
          Add to Playlists
        </h1>
        <div className='w-full max-h-80 overflow-y-auto space-y-4 flex flex-col items-center'>
          {playlists.map((curr) => (
            <div
              key={curr._id}
              className='w-3/4 flex items-center justify-between p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300'>
              <div className='flex flex-col w-full'>
                <h1 className='text-lg font-medium text-gray-800'>
                  {curr.name}
                </h1>
                <h3 className='text-sm text-gray-600'>{curr.description}</h3>
              </div>
              <button
                className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300'
                onClick={() => handleAddToPlaylist(curr._id, blogId)}>
                Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddToPlaylist;
