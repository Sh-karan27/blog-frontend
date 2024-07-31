import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  userBlog,
  toggleBlogPublished,
  deleteBlogById,
} from '../store/slices/blogSlice';
import { FaBookReader } from 'react-icons/fa';
import { BsEyeFill } from 'react-icons/bs';
import { RiEyeOffFill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import { MdArrowRightAlt } from 'react-icons/md';
import { MdDeleteForever } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import EditBlogBox from './EditBlogBox';
import { CiBookmark } from 'react-icons/ci';
import { toggleBookmark } from '../store/slices/userSlice';
import Loading from './Loading';

const DashboardBlog = ({ id }) => {
  const [blogSelectedForEdit, setBlogSelectedForEdit] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.blog);

  const onClose = () => {
    setIsModalOpen(false);
    setBlogSelectedForEdit(null);
  };

  const onUpdate = () => {
    if (id) {
      dispatch(userBlog({ userId: id }));
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(userBlog({ userId: id }));
    }
  }, [id, dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!Array.isArray(data)) {
    return <div>No blogs available</div>;
  }

  const handleToggleBlogStatus = async (blogId) => {
    await dispatch(toggleBlogPublished({ blogId }));
    dispatch(userBlog({ userId: id }));
  };

  const handleEditClick = (blog) => {
    setIsModalOpen(!isModalOpen);
    setBlogSelectedForEdit(blog);
  };
  const handleDelete = async (blogId) => {
    await dispatch(deleteBlogById({ blogId }));
    dispatch(userBlog({ userId: id }));
  };

  const handleBookmarkClick = async (blogId) => {
    await dispatch(toggleBookmark({ blogId }));
    dispatch(userBlog({ userId: id }));
    setBookmark(true);
  };

  return (
    <div className='w-full max-w-screen-lg mx-auto p-4 flex flex-col items-center gap-10'>
      {data.map((curr, i) => (
        <div
          key={i}
          className='flex flex-col md:flex-row items-center md:items-start justify-between w-full border-b p-4 gap-4'>
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
                <button onClick={() => handleEditClick(curr)}>
                  <CiEdit className='text-gray-500 text-xl' />
                </button>
                <button onClick={() => handleToggleBlogStatus(curr._id)}>
                  {curr.published ? (
                    <BsEyeFill className='text-blue-500 text-xl' />
                  ) : (
                    <RiEyeOffFill className='text-red-500 text-xl' />
                  )}
                </button>
                <button onClick={() => handleDelete(curr._id)}>
                  <MdDeleteForever className='text-gray-500 text-xl hover:text-red-500' />
                </button>
              </div>
            </div>
            <NavLink
              to={`/blog/${curr._id}`}
              className='text-blue-500 text-sm flex items-center'>
              Read More <MdArrowRightAlt />
            </NavLink>
          </div>
          <img
            src={curr.coverImage.url}
            alt={curr.title}
            className='w-full md:w-[300px] h-[200px] object-cover rounded-lg'
          />
          <CiBookmark
            className={` text-xl cursor-pointer ${
              bookmark ? 'text-blue-500' : 'text-gray-500'
            } `}
            onClick={() => handleBookmarkClick(curr._id)}
          />
        </div>
      ))}

      {blogSelectedForEdit && (
        <EditBlogBox
          blog={blogSelectedForEdit}
          isOpen={isModalOpen}
          onClose={onClose}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
};

export default DashboardBlog;
