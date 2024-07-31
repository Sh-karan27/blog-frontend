import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBlogById } from "../store/slices/blogSlice";
import { formatDate } from "../helper";

const SingleBlog = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.blog);
  const { blogId } = useParams();

  useEffect(() => {
    dispatch(getBlogById({ blogId }));
  }, [blogId, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data || !data.data) {
    return <div>No data available</div>;
  }
  console.log(data);

  return (
    <div className="w-full flex items-center justify-center p-4 mt-10 min-h-screen">
      <div className="w-full flex flex-col  items-center r justify-center gap-5 ">
        <div className="p-4 flex flex-col items-center justify-center gap-5 w-full md:w-1/2 overflow-y-auto">
          <h1 className="text-3xl font-bold md:text-5xl">{data.data.title}</h1>
          <h3 className="text-lg">
            <span className="text-gray-400">{formatDate(data.data.createdAt)} By - </span>
            <span>{data.data.author?.username}</span>
          </h3>
        </div>
        {data.data.coverImage && (
          <img
            src={data.data.coverImage.url}
            alt="Cover"
            className="w-1/2 object-cover"
          />
        )}
        <div className="p-4 flex shadow-xl  flex-col items-center justify-center gap-5 w-1/2 ">
          <h3 className="text-xl md:text-3xl text-gray-500">
            {data.data.description}
          </h3>
          <p className="text-base md:text-lg">{data.data.content}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
