import React, { useEffect } from 'react';
import {
  deleteCommentById,
  getBlogComments,
} from '../store/slices/commentSlice';
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../helper';
import { SlLike } from 'react-icons/sl';
import Loading from './Loading';

const Comments = ({ blogId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogComments({ blogId }));
  }, [blogId, dispatch]);

  const { loading, error, comment } = useSelector((state) => state.comment);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return { error };
  }

  if (!Array.isArray(comment) || comment.length === 0) {
    return <div>No comments available</div>;
  }

  const handleDeleteComment = async (commentId) => {
    await dispatch(deleteCommentById({ commentId }));
    dispatch(getBlogComments({ blogId }));
  };

  console.log(comment);
  return (
    <div className='h-screen w-3/4  flex flex-col items-start justify-start p-4  gap-5'>
      <h1 className='text-3xl text-[#366AC4] font-semibold'>Comments</h1>
      <div className='h-full flex flex-col items-center justify-start w-full gap-5  overflow-y-scroll'>
        {comment.map((curr, i) => {
          return (
            <div
              key={i}
              className='w-full flex-col items-center justify-center gap-5 border p-4 rounded-md'>
              <div className='flex items-center justify-left w-full gap-2'>
                <img
                  src={curr.user.profileImage.url}
                  alt=''
                  className='w-10 h-10 rounded-full'
                />
                <p className='font-bold'>{curr.user.username}</p>
                <p className='text-gray-400'>{formatDate(curr.createdAt)}</p>
              </div>
              <div className='w-full flex flex-col items-start justify-center gap-2'>
                <p className='w-full'>{curr.content}</p>

                <div className='flex items-center justify-center gap-2'>
                  <button className='text-gray-500'>
                    <SlLike />
                  </button>

                  <button
                    onClick={() => handleDeleteComment(curr._id)}
                    className=' text-gray-500 hover:text-red-500 text-xl'>
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
