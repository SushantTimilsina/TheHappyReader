import React, { useState, useEffect, useCallback } from "react";
import mainSliderData from "./mainSliderData";
import classes from "./MainSlider.module.css";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { VscArrowRight } from "react-icons/vsc";
import { Link } from "react-router-dom";
import MainSliderDots from "./MainSliderDots";
import Button from "Components/UI/Button/Button";

const MainSlider = () => {
  const [images] = useState(mainSliderData); //setting value of images
  const [index, setIndex] = useState(0); //setting default value for index

  useEffect(() => {
    // checks the value of index if its smaller than 0 or greater than array length
    if (index === images.length) {
      //comparing value of index with length of images
      setIndex(0); //setting value of index as 0
    }
    if (index === -1) {
      setIndex(images.length - 1); //setting value of index as images length-1
    }
  }, [index, images]); //setting value in dependency array

  //adding auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1); //setting value for index
    }, 4000);
    return () => {
      clearInterval(interval);
    };
  }, [index]);

  const indexAddHandler = useCallback(() => {
    //is executed while clicking next favicon
    setIndex((prev) => prev + 1);
  }, []);
  const indexSubHandler = useCallback(() => {
    //is executed while clicking prev favicon
    setIndex((prev) => prev - 1);
  }, []);

  const dotClickHandler = useCallback((newIndex: number) => {
    setIndex(newIndex);
  }, []);

  return (
    <>
      <div className="w-full h-[40vh] min-w-[280] overflow-hidden flex relative vsm:h-[60vh]  md:h-[82vh] px-8">
        {images.map((img, imgIndex) => {
          const { id, image } = img;

          let positionClass = classes["main-slider__center__nextSlide"];

          if (imgIndex === index) {
            positionClass = classes["main-slider__center__activeSlide"];
          }
          if (
            imgIndex === index - 1 ||
            (index === 0 && imgIndex === images.length - 1)
          ) {
            positionClass = classes["main-slider__center__lastSlide"];
          }
          return (
            <article
              key={id}
              className={`${positionClass} absolute left-0 top-0 w-full h-full transition duration-300 ease-linear bg-white`}
            >
              <div className=" bg-gradient-to-tl from-[#00000080] to-[#000000b3] absolute top-0 left-0  w-full h-full opacity-100"></div>
              <img src={image} alt="person" className="w-full h-full" />
            </article>
          );
        })}

        <button
          className="absolute left-0 vsm:left-3 top-[40%] z-[2] translate-y-1/2 bg-primary text-white p-2 flex justify-center text-xl rounded-md cursor-pointer transition-all hover:bg-secondary"
          onClick={indexSubHandler}
        >
          <FiChevronLeft />
        </button>
        <button
          className="absolute right-0 vsm:right-3 top-[40%] z-[2] translate-y-1/2 bg-primary text-white p-2 flex justify-center text-xl rounded-md cursor-pointer transition-all hover:bg-secondary"
          onClick={indexAddHandler}
        >
          <FiChevronRight />
        </button>
        <div className="absolute top-[42%]  left-[15%] text-white">
          <p className="text-xl md:text-3xl w-56 mb-6 font-bold">
            Here To buy Some Books ?
          </p>
          <Link to="/shop">
            <Button>
              <span className="flex">
                <span>Go Shopping</span>
                <span className="text-base pl-1 relative top-[2px]">
                  <VscArrowRight />
                </span>
              </span>
            </Button>
          </Link>
        </div>
      </div>
      <MainSliderDots
        onDotClick={dotClickHandler}
        images={images}
        index={index}
      />
    </>
  );
};

export default React.memo(MainSlider);
