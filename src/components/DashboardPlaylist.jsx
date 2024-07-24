import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPlaylist } from '../store/slices/playlistSlice';
import Loading from './Loading';

const DashboardPlaylist = ({ id }) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.playlist);
  const [expandedPlaylists, setExpandedPlaylists] = useState({});

  useEffect(() => {
    if (id) {
      dispatch(getUserPlaylist({ userId: id }));
    }
  }, [id, dispatch]);

  const toggleBlogs = (index) => {
    setExpandedPlaylists((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className='text-red-500 text-center'>{error}</div>;
  }

  return (
    <div className='w-full p-4'>
      <div className='flex flex-wrap justify-center gap-4'>
        {data?.map((playlist, index) => (
          <div
            key={index}
            className='w-full sm:w-80 border rounded-lg shadow-lg overflow-hidden'>
            <div className='bg-gray-200 p-4 flex justify-between items-center'>
              <div>
                <h2 className='text-xl font-bold'>{playlist.name}</h2>
                <p className='text-gray-600'>{playlist.description}</p>
              </div>
              <button
                onClick={() => toggleBlogs(index)}
                className='bg-blue-500 text-white px-3 py-1 rounded-lg focus:outline-none'>
                {expandedPlaylists[index] ? 'Hide Blogs' : 'Show Blogs'}
              </button>
            </div>
            {expandedPlaylists[index] && (
              <div className='p-4'>
                {playlist.blogs.map((blog, blogIndex) => (
                  <div key={blogIndex} className='mb-4'>
                    <h3 className='text-lg font-semibold'>{blog.title}</h3>
                    <p className='text-gray-700'>{blog.description}</p>
                    <img
                      src={blog.coverImage.url}
                      alt={blog.title}
                      className='w-full h-48 object-cover mt-2 rounded-lg'
                    />
                    <p className='text-sm text-gray-500 mt-2'>
                      Views: {blog.views}
                    </p>
                    <button className='bg-red-500 text-white px-3 py-1 mt-2 rounded-lg focus:outline-none'>
                      Red Button
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPlaylist;
