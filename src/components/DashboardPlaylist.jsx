import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePLaylist, getUserPlaylist } from "../store/slices/playlistSlice";
import Loading from "./Loading";
import { FaBookReader } from "react-icons/fa";
import { formatDate } from "../helper";
import { NavLink } from "react-router-dom";
import { MdArrowRightAlt, MdDeleteForever } from "react-icons/md";
import { CiEdit, CiTrash } from "react-icons/ci";
import EditBlogBox from "./EditBlogBox";
import EditPlaylistBox from "./EditPlaylistBox";

const DashboardPlaylist = ({ id }) => {
  const [playlistForEdit, setPlaylistForEdit] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { data = [], loading, error } = useSelector((state) => state.playlist); // defaulting data to an empty array

  useEffect(() => {
    if (id) {
      dispatch(getUserPlaylist({ userId: id }));
    }
  }, [id, dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (Array.isArray(data) && data.length === 0) {
    return <div>No playlist yet</div>;
  }

  const handlePlaylistEdit = (playlist) => {
    setIsOpen(!isOpen);
    setPlaylistForEdit(playlist);
  };

  const onClose = () => {
    setIsOpen(!isOpen);
    setPlaylistForEdit(null);
  };

  const onUpdate = () => {
    if (id) {
      dispatch(getUserPlaylist({ userId: id }));
    }
  };

  const handleDelete = (id) => {
    dispatch(deletePLaylist({ id })).then(() => {
      onUpdate();
    });
  };

  // console.log(data);

  return (
    <div className="w-full max-w-screen-lg mx-auto p-4 flex flex-col items-center gap-10">
      <div className="flex flex-wrap justify-center gap-4">
        {Array.isArray(data) &&
          data.map((curr, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row items-center md:items-start justify-between w-full border-b p-2 gap-4"
            >
              <div className="flex flex-col items-start justify-start p-2 w-full md:w-1/2 gap-2">
                <h1 className="font-bold text-5xl mb-2">{curr.name}</h1>
                <p className="text-3xl text-gray-500 mb-4 line-clamp-3">
                  {curr.description}
                </p>
                <div className="flex items-center justify-between w-full">
                  <h1 className="text-sm text-gray-500 flex items-center gap-1">
                    <FaBookReader className="text-blue-500" />
                    <span>{curr.totalViews}</span>
                  </h1>
                  <div>
                    {" "}
                    <button>
                      <CiEdit
                        className="text-gray-500 text-xl"
                        onClick={() => handlePlaylistEdit(curr)}
                      />
                    </button>
                    <button onClick={() => handleDelete(curr._id)}>
                      <MdDeleteForever className="text-gray-500 text-xl hover:text-red-500" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full">
                  <h1 className="text-sm text-gray-500 flex items-center gap-1">
                    <span className="text-gray-500">Total Blogs</span>
                    <span className="text-gray-500">{curr.totalBlogs}</span>
                  </h1>
                </div>

                <p className="text-gray-500 text-sm font-semibold flex items-center">
                  {formatDate(curr.createdAt)}
                </p>
                <NavLink
                  to={`/playlist/${curr._id}`}
                  className="text-blue-500 text-sm flex items-center"
                >
                  Read More <MdArrowRightAlt />
                </NavLink>
              </div>
            </div>
          ))}
      </div>
      {playlistForEdit && (
        <EditPlaylistBox
          isOpen={isOpen}
          onClose={onClose}
          onUpdate={onUpdate}
          playlist={playlistForEdit}
        />
      )}
    </div>
  );
};

export default DashboardPlaylist;
