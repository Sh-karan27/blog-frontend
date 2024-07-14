import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { userBlog } from "../store/slices/blogSlice";
const DashboardBlog = (props) => {
  const dispacth = useDispatch();
  const { data } = useSelector((state) => state.blog);

  useEffect(() => {
    dispacth(userBlog({ userId: "6673e9def8cc332b93206916" }));
  }, [dispacth]);

  console.log(data);

  return <div>DashboardBlog</div>;
};

export default DashboardBlog;
