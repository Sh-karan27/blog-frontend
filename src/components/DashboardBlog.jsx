import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userBlog, toggleBlogPublished } from '../store/slices/blogSlice';
import { FaBookReader } from 'react-icons/fa';
import { BsEyeFill } from 'react-icons/bs';
import { RiEyeOffFill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import { MdArrowRightAlt } from 'react-icons/md';
import { MdDeleteForever } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import EditBlogBox from './EditBlogBox';
import loadingImg from '../assets/loading.gif';

const DashboardBlog = ({ id }) => {
  const [blogSelectedForEdit, setBlogSelectedForEdit] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    return <img src={loadingImg} alt='..loading' />;
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

  return (
    <div className='w-[90%] h-full flex flex-col items-center justify-center p-4 '>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full h-full place-items-center gap-5 mt-5'>
        {data.map((curr, i) => (
          <div
            key={i}
            className='flex flex-col items-center justify-center overflow-hidden rounded-xl shadow-custom w-full sm:w-[300px]'>
            <img
              src={curr.coverImage.url}
              alt=''
              className='w-full h-[300px] object-cover'
            />
            <div className='flex flex-col items-start justify-start p-2'>
              <h1 className='font-bold text-xl'>{curr.title}</h1>
              <p className='text-wrap text-sm text-gray-400'>
                {curr.description}
              </p>
            </div>
            <div className='w-full flex items-center justify-left gap-5 p-2'>
              <button>
                <MdDeleteForever className='text-2xl text-gray-500 font-semibold flex' />
              </button>
              <button onClick={() => handleEditClick(curr)}>
                <CiEdit className='text-2xl text-gray-500 font-semibold ' />
              </button>
              <button onClick={() => handleToggleBlogStatus(curr._id)}>
                {curr.published ? (
                  <BsEyeFill className='text-gray-500 text-2xl' />
                ) : (
                  <RiEyeOffFill className='text-red-500 text-2xl' />
                )}
              </button>
            </div>
            <div className='w-full flex items-center justify-between p-2'>
              <h1 className='text-xl font-semibold flex items-center gap-1 text-gray-500'>
                <FaBookReader className='text-blue-500' />
                <span className='text-gray-500'>{curr.views}</span>
              </h1>
              <NavLink to={`/blog/${curr._id}`}>
                <span className='flex items-center justify-center text-md text-gray-600'>
                  Read More <MdArrowRightAlt />
                </span>
              </NavLink>
            </div>
          </div>
        ))}
      </div>
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
