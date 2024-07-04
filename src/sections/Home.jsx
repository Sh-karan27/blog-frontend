import React from "react";
import Hero from "../components/Hero";
import FoodAndTravel from "../components/FoodAndTravel";
import SportsAndPodcast from "../components/SportsAndPodcast";
import NewsAndTrend from "../components/NewsAndTrend";

const Home = () => {
  return (
    <>
      <Hero />
      <FoodAndTravel />
      <SportsAndPodcast />
      <NewsAndTrend />
    </>
  );
};

export default Home;
