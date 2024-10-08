import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import {
  addBlogToPlaylist,
  getPlaylistById,
  removeBlogToPlaylist,
} from '../store/slices/playlistSlice';
import Loading from './Loading';
import { FaBookReader } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { MdArrowRightAlt } from 'react-icons/md';
import { formatDate } from '../helper';

const PlaylistPage = () => {
  const { playlistId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (playlistId) {
      dispatch(getPlaylistById(playlistId));
    }
  }, [dispatch, playlistId]);

  const { loading, error, data } = useSelector((state) => state.playlist);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleRemoveBlog = async (playlistId, blogId) => {
    await dispatch(removeBlogToPlaylist({ playlistId, blogId })).then(() => [
      dispatch(getPlaylistById(playlistId)),
    ]);
  };

  // Ensure that 'data' and required nested properties exist
  const playlist = data || {};
  const owner = playlist.owner || {};
  const blogs = playlist.blogs || [];

  return (
    <div className='w-full h-full flex flex-col items-center justify-center p-4'>
      <div className='w-full flex flex-col items-left justify-center mt-10 gap-5 border-b p-2'>
        <div className='flex items-center justify-left gap-2'>
          {owner.profileImage?.url && (
            <img
              src={owner.profileImage.url}
              alt='profileImage'
              className='w-[4rem] h-[4rem] rounded-full'
            />
          )}
          <h1 className='text-3xl text-gray-500'>
            {owner.username || 'Unknown User'}
          </h1>
        </div>
        <h1 className='text-5xl'>{playlist.name || 'Untitled Playlist'}</h1>
        <h3 className='text-3xl text-gray-500'>
          {playlist.description || 'No description available.'}
        </h3>
      </div>
      <div className='w-full h-full p-4 flex flex-col items-center gap-10'>
        {blogs.map((curr, i) => (
          <div
            key={i}
            className='flex flex-col md:flex-row items-center md:items-start justify-center w-full border-b p-4 gap-4'>
            <div className='flex flex-col items-start justify-start p-4 w-full md:w-1/2 gap-2'>
              <h1 className='font-bold text-lg mb-2'>{curr.title}</h1>
              <p className='text-sm text-gray-600 mb-4 line-clamp-3'>
                {curr.description}
              </p>
              <div className='flex items-center justify-between w-full'>
                <h1 className='text-sm text-gray-500 flex items-center gap-1'>
                  <FaBookReader className='text-blue-500' />
                  <span>{curr.views}</span>
                </h1>
                <div className='flex items-center gap-4'>
                  <button
                    onClick={() => handleRemoveBlog(playlist?._id, curr._id)}>
                    <MdDeleteForever className='text-gray-500 hover:text-red-500 text-xl' />
                  </button>
                </div>
              </div>
              <NavLink
                to={`/blog/${curr._id}`}
                className='text-blue-500 text-sm flex items-center'>
                Read More <MdArrowRightAlt />
              </NavLink>
              <p className='text-gray-500 text-sm font-semibold flex items-center'>
                {formatDate(curr.createdAt)}
              </p>
            </div>
            {curr.coverImage?.url && (
              <img
                src={curr.coverImage.url}
                alt={curr.title}
                className='w-full md:w-[300px] h-[200px] object-cover rounded-lg'
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistPage;
