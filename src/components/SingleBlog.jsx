import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBlogById } from "../store/slices/blogSlice";
import { formatDate } from "../helper";
import { TfiComment } from "react-icons/tfi";
import { SlLike } from "react-icons/sl";
import { CiShare1 } from "react-icons/ci";
import { getBlogComments } from "../store/slices/commentSlice";

const SingleBlog = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.blog);
  const { comment } = useSelector((state) => state.comment);
  const { blogId } = useParams();

  useEffect(() => {
    dispatch(getBlogById({ blogId }));
    dispatch(getBlogComments({ blogId }));
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
  console.log(comment);

  return (
    <div className="w-full flex items-center justify-center p-4 mt-10 min-h-screen">
      <div className="w-full flex flex-col  items-center r justify-center gap-5 ">
        <div className="p-4 flex flex-col items-center justify-center gap-5 w-full md:w-1/2 overflow-y-auto">
          <h1 className="text-3xl font-bold md:text-5xl">{data.data.title}</h1>
          <div className="  flex items-center justify-center gap-2">
            <div className=" text-xl flex items-center justify-center gap-2">
              <span className="text-gray-400">
                {formatDate(data.data.createdAt)} By -{" "}
              </span>
              <div className="flex items-center justify-center gap-2 ">
                <img
                  src={data.data.author?.profileImage.url}
                  alt=""
                  className=" w-10 h-10 rounded-full"
                />
                <span className="font-semibold">
                  {data.data.author?.username}
                </span>
                <button className="bg-[#366AC4] text-sm px-2 py-1 rounded-md text-white">
                  Follow
                </button>
              </div>
            </div>
          </div>
        </div>
        {data.data.coverImage && (
          <img
            src={data.data.coverImage.url}
            alt="Cover"
            className="w-1/2 object-cover"
          />
        )}

        <div className="flex items-left justify-left gap-5 w-1/2 text-2xl p-4">
          <h1 className="text-gray-400">
            <SlLike />
          </h1>
          <h1 className="text-gray-400">
            <TfiComment />
          </h1>
          <h1 className="text-gray-400">
            <CiShare1 />
          </h1>
        </div>
        <div className="p-4 flex shadow-xl  flex-col items-center justify-center gap-5 w-1/2 ">
          <h3 className="text-xl md:text-xl text-gray-500">
            {data.data.description}
          </h3>
          <p className="text-md md:text-md">{data.data.content}</p>
        </div>
      </div>
      <div className="h-screen w-1/3 border flex flex-col items-center justify-between p-4 overflow-y-scroll">
        <h1 className="text-3xl text-[#366AC4] font-semibold">Comments</h1>
        <div></div>
      </div>
    </div>
  );
};

export default SingleBlog;
