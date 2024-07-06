import React, { useState } from "react";
import Contact from "../assets/ContactUs.jpg";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center p-4 mt-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg flex flex-col lg:flex-row overflow-hidden">
        <img
          src={Contact}
          alt="Contact"
          className="w-full lg:w-1/3 h-64 lg:h-auto object-cover"
        />
        <div className="w-full lg:w-2/3 p-8">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <label className="flex flex-col">
              Name
              <input
                type="text"
                name="name"
                placeholder="Enter your first name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md"
                required
              />
            </label>
            <label className="flex flex-col">
              Email
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md"
                required
              />
            </label>
            <label className="flex flex-col">
              Phone No.
              <input
                type="tel"
                name="phone"
                placeholder="Add your contact number"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md"
                required
              />
            </label>
            <label className="flex flex-col">
              Message
              <textarea
                name="message"
                placeholder="Add your message"
                value={formData.message}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md"
                required
              />
            </label>
            <button
              type="submit"
              className="bg-black text-white p-2 rounded-md hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </form>
          {submittedData && (
            <div className="mt-8 p-4 border rounded-md bg-gray-50">
              <h2 className="text-lg font-semibold mb-2">Submitted Data</h2>
              <p>
                <strong>Name:</strong> {submittedData.name}
              </p>
              <p>
                <strong>Email:</strong> {submittedData.email}
              </p>
              <p>
                <strong>Phone:</strong> {submittedData.phone}
              </p>
              <p>
                <strong>Message:</strong> {submittedData.message}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
