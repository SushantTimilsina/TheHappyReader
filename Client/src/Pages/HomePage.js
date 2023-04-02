import React from "react";
import ReviewSlider from "../Components/Home/ReviewSlider/ReviewSlider";
import MainSlider from "../Components/Home/MainSlider/MainSlider";
import FeaturedProducts from "Components/Home/FeaturedProducts";
import About from "Components/Home/About";

const HomePage = () => {
  return (
    <section>
      <MainSlider />
      <FeaturedProducts />
      <About />
      <ReviewSlider />
    </section>
  );
};

export default React.memo(HomePage);
