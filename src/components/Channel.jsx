import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../store/slices/userSlice";
import Loading from "./Loading";
import DashboardBlog from "./DashboardBlog";
import DashboardPlaylist from "./DashboardPlaylist";
import {
  toggleFollow,
  userProfileFollower,
  userProfileFollowing,
} from "../store/slices/followerSlice";
import UserFollowerBox from "./UserFollowerBox";
import UserFollowingBox from "./UserFollowingBox";

const userProfileNav = [{ name: "Blogs" }, { name: "Playlists" }];

const Channel = () => {
  const [selectComponent, setSelectComponent] = useState("Blogs");
  const [followingBox, setFollowingBox] = useState(false);
  const [followerBox, setFollowerBox] = useState(false);
  const { username } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (username) {
      dispatch(getUserProfile({ username }));
    }
  }, [dispatch, username]);

  const { loading, error, data } = useSelector((state) => state.auth);

  const { follower, following } = useSelector((state) => state.userProfile);
  const user = Array.isArray(data) && data.length > 0 ? data[0] : null;

  useEffect(() => {
    if (user && user._id) {
      dispatch(userProfileFollower({ id: user._id }));
      dispatch(userProfileFollowing({ id: user._id }));
    }
  }, [user, dispatch]);

  const renderComponent = () => {
    if (!user) return <Loading />;

    switch (selectComponent) {
      case "Blogs":
        return <DashboardBlog id={user._id} />;
      case "Playlists":
        return <DashboardPlaylist id={user._id} />;
      default:
        return <DashboardBlog id={user._id} />;
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!user) {
    return <div>No user profile found.</div>;
  }

  const handleFollowingBox = () => {
    setFollowingBox(!followingBox);
  };
  const handleFollowerBox = () => {
    setFollowerBox(!followerBox);
  };
  const onUpdate = async () => {
    await dispatch(getUserProfile({ username }));
    await dispatch(userProfileFollowing({ id: user._id }));
    await dispatch(userProfileFollower({ id: user._id }));
  };

  const handleFollowToggle = (id) => {
    dispatch(toggleFollow({ id })).then(() => {
      
      onUpdate();
    })
  };
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="relative w-full sm:w-3/4 mt-10 px-4 sm:px-0 group">
        <img
          src={user?.coverImage?.url}
          alt="YouTube Channel Banner"
          className="w-full h-[30vw] sm:h-[15vw] object-cover rounded-xl"
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center sm:items-start w-full sm:w-3/4 mt-4 px-4 sm:px-0">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <div className="relative w-[150px] sm:w-[200px] h-[150px] sm:h-[200px]">
            <img
              src={user?.profileImage?.url}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col items-center sm:items-start justify-center text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold">{user?.username}</h1>
            <h3 className="text-lg sm:text-xl font-semibold">{user?.email}</h3>
            <p className="text-base sm:text-lg text-gray-500">{user?.bio}</p>
            <div className="flex gap-2">
              <h1
                className="text-gray-500 text-lg"
                onClick={() => handleFollowerBox()}
              >
                Followers: {user?.followerCount}
              </h1>
              <h1
                className="text-gray-500 text-lg"
                onClick={() => handleFollowingBox()}
              >
                Following: {user?.followingToCount}
              </h1>
            </div>
            <button
              className="text-white bg-blue-500 p-2 rounded-md mt-2"
              onClick={() => handleFollowToggle(user?._id)}
            >
              {user?.isFollowing ? "following" : "follow"}
            </button>
          </div>
        </div>
      </div>

      <div className="w-full sm:w-3/4 border-b flex items-center justify-center sm:justify-start mt-10 px-4 sm:px-0 p-2">
        <ul className="flex flex-wrap items-center justify-center sm:justify-start w-full gap-4">
          {userProfileNav.map((curr, i) => (
            <li key={i}>
              <button
                className="text-lg font-semibold"
                onClick={() => setSelectComponent(curr.name)}
              >
                {curr.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full h-full sm:w-3/4 mt-10 flex items-center justify-center sm:px-0">
        {renderComponent()}
      </div>
      {followingBox && (
        <UserFollowingBox
          isOpen={followingBox}
          onUpdate={onUpdate}
          following={following?.followingList}
          onClose={handleFollowingBox}
        />
      )}
      {followerBox && (
        <UserFollowerBox
          isOpen={followerBox}
          onUpdate={onUpdate}
          follower={follower?.followerList}
          onClose={handleFollowerBox}
        />
      )}
    </div>
  );
};

export default Channel;
