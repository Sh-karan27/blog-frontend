import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPlaylist } from '../store/slices/playlistSlice';

const DashboardPlaylist = ({ id }) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.playlist);

  useEffect(() => {
    if (id) {
      dispatch(getUserPlaylist({ userId: id }));
    }
  }, [id, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  console.log(data);
  return <div className='w-full flex items-center justify-center p-4'></div>;
};

export default DashboardPlaylist;
