import React from "react";
import { MdArrowRightAlt } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { formatDate } from "../helper";

const UserChannelProfile = ({ data }) => {
  console.log(data);
  return (
    <div className="w-full h-full max-w-screen-lg mx-auto p-4 flex flex-col items-start gap-10">
      {data?.map((curr, i) => (
        <div
          key={i}
          className="flex flex-col md:flex-row items-center md:items-start justify-between w-full border-b p-4 gap-4"
        >
          <div className="flex flex-col items-start justify-start p-4 w-full md:w-1/2 gap-1">
            <div className="flex flex-col items-left justify-center gap-2">
              <h1 className="font-bold text-3xl mb-2">{curr.username}</h1>
              <p className="text-sm text-gray-600  line-clamp-3">{curr.bio}</p>
              <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                  {" "}
                  <h1 className="text-md text-gray-400">
                    Followers:{curr.followerCount}
                  </h1>
                  <h1 className="text-md text-gray-400">
                    Following:{curr.followingToCount}
                  </h1>
                </div>
              </div>
            </div>

            <div>
              <NavLink
                to={`/channel/${curr.username}`}
                className="text-blue-500 text-sm flex items-center"
              >
                Read More <MdArrowRightAlt />
              </NavLink>
              <p className="text-gray-500  text-sm font-semibold flex items-center">
                {formatDate(curr.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <img
              src={curr.profileImage.url}
              alt={curr.name}
              className="w-full md:w-[150px] h-[150px] object-cover rounded-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserChannelProfile;
