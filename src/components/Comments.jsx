import React, { useEffect, useState } from 'react';
import {
  addComment,
  deleteCommentById,
  getBlogComments,
} from '../store/slices/commentSlice';
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../helper';
import { SlLike } from 'react-icons/sl';
import Loading from './Loading';

const Comments = ({ blogId }) => {
  const [formData, setFormData] = useState({
    content: '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogComments({ blogId }));
  }, [blogId, dispatch]);

  const { loading, error, comment } = useSelector((state) => state.comment);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className='text-red-500'>
        Error: {error.message || 'An error occurred'}
      </div>
    );
  }

  const handleDeleteComment = async (commentId) => {
    await dispatch(deleteCommentById({ commentId }));
    dispatch(getBlogComments({ blogId }));
  };

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      content: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addComment({ formData, blogId }));
    await dispatch(getBlogComments({ blogId }));
    setFormData({
      content: '',
    });
  };

  return (
    <div className='flex flex-col items-start justify-start w-full p-4 gap-5 lg:w-3/4'>
      <h1 className='text-3xl text-[#366AC4] font-semibold'>Comments</h1>
      <div className='w-full flex flex-col sm:flex-row items-center justify-between gap-3'>
        <input
          type='text'
          placeholder='Add comment'
          onChange={handleOnChange}
          className='border w-full sm:w-3/4 rounded-lg border-r-0 sm:rounded-r-none p-3 sm:p-4'
          value={formData.content}
        />
        <button
          onClick={handleSubmit}
          className='p-3 sm:p-4 rounded-lg w-full sm:w-1/4 sm:rounded-l-none border-l-0 bg-blue-500 text-white hover:bg-blue-600 transition-colors'>
          Add
        </button>
      </div>
      {!Array.isArray(comment) || comment.length === 0 ? (
        <div className='text-gray-600'>No comments yet</div>
      ) : (
        <div className='flex flex-col items-center justify-start w-full gap-5 overflow-y-auto max-h-[500px]'>
          {comment.map((curr, i) => {
            return (
              <div
                key={i}
                className='w-full flex flex-col items-start justify-center gap-3 border p-4 rounded-md shadow-md bg-white'>
                <div className='flex items-center justify-start w-full gap-3'>
                  <img
                    src={curr.user.profileImage.url}
                    alt={`${curr.user.username}'s profile`}
                    className='w-10 h-10 rounded-full object-cover'
                  />
                  <div>
                    <p className='font-bold'>{curr.user.username}</p>
                    <p className='text-gray-400 text-sm'>
                      {formatDate(curr.createdAt)}
                    </p>
                  </div>
                </div>
                <div className='w-full flex flex-col items-start justify-center gap-2'>
                  <p className='w-full text-gray-800'>{curr.content}</p>

                  <div className='flex items-center justify-start gap-2'>
                    <button className='text-gray-500 hover:text-blue-500 transition-colors'>
                      <SlLike />
                    </button>

                    <button
                      onClick={() => handleDeleteComment(curr._id)}
                      className='text-gray-500 hover:text-red-500 text-xl transition-colors'>
                      <MdDelete />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Comments;
