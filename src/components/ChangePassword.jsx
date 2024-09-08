import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ImCross } from "react-icons/im";
import { IoIosArrowBack } from "react-icons/io";
import { changePassword } from "../store/slices/userSlice";
const ChangePassword = ({ isOpen, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirmChange = async () => {
    await dispatch(changePassword({ formData }));
    onUpdate();
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-70 bg-black p-4">
      <div className="relative w-full max-w-lg bg-white rounded-lg shadow-md p-6">
        <div className="w-full">
          <button
            className="text-blue-500 hover:text-[#366AC4] flex items-center justify-center"
            onClick={onClose}
          >
            <IoIosArrowBack />
            Go Back
          </button>
        </div>
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
          Change Your Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="oldPassword"
            >
              Old Password
            </label>
            <input
              className="w-full px-4 py-2 text-sm bg-gray-50 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="oldPassword"
              type={showPassword ? "text" : "password"}
              name="oldPassword"
              placeholder="Old Password"
              value={formData.oldPassword}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="newPassword"
            >
              New Password
            </label>
            <input
              className="w-full px-4 py-2 text-sm bg-gray-50 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="newPassword"
              type={showPassword ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </div>

          <button
            type="button"
            className="text-blue-500 hover:text-blue-700 underline"
            onClick={toggleShowPassword}
          >
            {showPassword ? "Hide" : "Show"} Passwords
          </button>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>

        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-opacity-70 bg-black p-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-center text-gray-800">
                Are you sure you want to change your password?
              </h3>
              <div className="flex justify-center gap-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  onClick={handleConfirmChange}
                >
                  Confirm
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
