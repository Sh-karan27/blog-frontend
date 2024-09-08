import React, { useState } from "react";
import { FaEllipsisV, FaEye, FaEyeSlash } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

const ThreeDotsMenu = ({ onEdit, onToggleStatus, onDelete, isPublished }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="p-2 rounded-full hover:bg-gray-200"
      >
        <FaEllipsisV className="text-gray-500 text-lg" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10">
          <ul className="py-1">
            <li
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
              onClick={() => {
                onEdit();
                setIsOpen(false);
              }}
            >
              <CiEdit className="text-gray-500" />
              Edit
            </li>
            <li
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
              onClick={() => {
                onToggleStatus();
                setIsOpen(false);
              }}
            >
              {isPublished ? (
                <>
                  <FaEyeSlash className="text-red-500" />
                  Unpublish
                </>
              ) : (
                <>
                  <FaEye className="text-blue-500" />
                  Publish
                </>
              )}
            </li>
            <li
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
              onClick={() => {
                onDelete();
                setIsOpen(false);
              }}
            >
              <MdDeleteForever className="text-red-500" />
              Delete
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ThreeDotsMenu;
