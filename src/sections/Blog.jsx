import React, { useEffect, useState } from 'react';
import { searchBlogs } from '../store/slices/blogSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import { NavLink } from 'react-router-dom';
import { MdArrowRightAlt } from 'react-icons/md';
import { FaBookReader } from 'react-icons/fa';
import { formatDate } from '../helper';

const Blog = () => {
  // State to manage search query and filters
  const [searchQuery, setSearchQuery] = useState({
    query: 'batman',
    sortBy: 'views',
    sortType: 'dsc',
    limit: 10,
    page: 1,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchBlogs(searchQuery));
  }, [dispatch]);

  const { loading, error, searchBlogData } = useSelector((state) => state.blog);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return { error };
  }

  // Handle change for inputs and selects
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Dummy search function to simulate search operation
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchBlogs(searchQuery));
  };

  // if (Array.isArray(searchBlogData) && searchBlogData.length === 0) {
  //   return <div>Blog not found</div>;
  // }

  console.log(searchBlogData);

  return (
    <div className='h-full w-full flex flex-col items-center justify-center p-4'>
      <div className='flex flex-col sm:flex-row gap-4 items-center justify-center p-4    '>
        <input
          type='text'
          name='query'
          placeholder='Search...'
          value={searchQuery.query}
          onChange={handleInputChange}
          className='w-full sm:w-auto p-2 border-b border-gray-300 outline-none focus:border-blue-500 '
        />
        <select
          name='sortBy'
          value={searchQuery.sortBy}
          onChange={handleInputChange}
          className='w-full sm:w-auto p-2 border-b border-gray-300 bg-transparent outline-none focus:border-blue-500 '>
          <option value='views'>Views</option>
          <option value='date'>createdAt</option>
          <option value='popularity'>commentCount</option>
          <option value='relevance'>likeCount</option>
        </select>
        <select
          name='sortType'
          value={searchQuery.sortType}
          onChange={handleInputChange}
          className='w-full sm:w-auto p-2 border-b border-gray-300 bg-transparent outline-none focus:border-blue-500 '>
          <option value='asc'>Ascending</option>
          <option value='desc'>Descending</option>
        </select>
        <input
          type='number'
          name='limit'
          placeholder='Limit'
          value={searchQuery.limit}
          onChange={handleInputChange}
          className='w-full sm:w-auto p-2 border-b border-gray-300 outline-none focus:border-blue-500'
        />
        <input
          type='number'
          name='page'
          placeholder='Page'
          value={searchQuery.page}
          onChange={handleInputChange}
          className='w-full sm:w-auto p-2 border-b border-gray-300 outline-none focus:border-blue-500'
        />
        <button
          onClick={handleSearch}
          className='px-4 py-2 bg-blue-500 text-white rounded-md'>
          Search
        </button>
      </div>

      <div className='w-3/4 h-full flex flex-col items-center justify-center'>
        {searchBlogData && searchBlogData.length > 0 ? (
          searchBlogData.map((curr, i) => (
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
                </div>
                <NavLink
                  to={`/blog/${curr._id}`}
                  className='text-blue-500 text-sm flex items-center'>
                  Read More <MdArrowRightAlt />
                </NavLink>
                <p className='text-gray-500  text-sm font-semibold flex items-center'>
                  {formatDate(curr.createdAt)}
                </p>
              </div>
              <img
                src={curr.coverImage.url}
                alt={curr.title}
                className='w-full md:w-[300px] h-[200px] object-cover rounded-lg'
              />
            </div>
          ))
        ) : (
          <div>No blogs yet</div>
        )}
      </div>
    </div>
  );
};

export default Blog;
