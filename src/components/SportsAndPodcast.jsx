import React from "react";
import sports1 from "../assets/sports1.jpg";
import sports2 from "../assets/sports2.jpg";
import sports3 from "../assets/sports3.jpg";
import sports4 from "../assets/sports4.jpg";
import { MdArrowRightAlt } from "react-icons/md";
const SportsAndPodcast = () => {
  return (
    <div className=" h-full flex items-center justify-center ">
      <div className="w-[90%] h-full flex flex-col items-center justify-center p-4">
        <div className="w-full flex flex-col items-start justify-start ">
          <h3 className=" text-[#FEAD6E] font-semibold text-xl">
            SPORTS & PODCAST
          </h3>
          <h2 className="text-3xl font-semibold">Game Changers Unleashed:</h2>
          <h2 className="text-3xl font-semibold">
            The Ultimate Sports Prodcast
          </h2>
        </div>
        <div className="w-3/4 h-[700px] bg-black mt-10">
          <div className="flex  items-center justify-evenly  w-full h-full">
            <div className=" flex flex-col  items-start justify-center">
              <h1 className="text-white font-bold text-[4rem]">Match</h1>
              <h1 className="text-white font-bold text-[4rem]">Of the year</h1>
              <h1 className="text-white font-bold text-[4rem]">is coming</h1>
            </div>
            <div className=" flex flex-col gap-5  items-center justify-evenly ">
              <img src={sports1} alt="" className="w-[400px]" />
              <div className=" flex flex-col items-start justify-start gap-5">
                <p className="text-gray-500 text-lg w-[400px] ">
                  Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit.Vivamus lacinia odio vitae vestibulum vestibulum.Cras
                  venenatis euismod malesuada.Etiam feugiat dolor sit amet felis
                  aliquet, sit amet aliquam elit facilisis.
                </p>
                <span className="text-white flex items-center justify-left">
                  CONTINUE READING <MdArrowRightAlt />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-3/4 h-[700px]  z-10 bg-white"></div>
      </div>
    </div>
  );
};

export default SportsAndPodcast;
