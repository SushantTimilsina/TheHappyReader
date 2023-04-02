import React, { useState, useEffect, useCallback } from "react";
import reviewData from "./reviewData";
import classes from "./ReviewSlider.module.css";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const ReviewSlider = () => {
  const [people] = useState(reviewData);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // checks the value of index if its smaller than 0 or greater than array length
    if (index === people.length) {
      //comparing value of index with length of images
      setIndex(0); //setting value of index as 0
    }
    if (index === -1) {
      setIndex(people.length - 1); //setting value of index as people length-1
    }
  }, [index, people]); //setting value in dependency array

  //adding auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
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
    <section className="bg-white p-4">
      <h2 className="text-center text-xl font-extrabold">
        <span className="text-red-500">/</span>Reviews
      </h2>

      <div className="my-0 m-auto mt-4 w-[80vw] lg:w-[50vw] relative h-[350px] m-w-[800px] text-center flex overflow-hidden">
        {people.map((person, personIndex) => {
          const { id, name, image, text } = person;

          let positionClass = classes["nextSlide"];

          if (personIndex === index) {
            positionClass = classes["activeSlide"];
          }
          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === people.length - 1)
          ) {
            positionClass = classes["lastSlide"];
          }
          return (
            <article
              key={id}
              className={`${positionClass} absolute top-0 left-0 w-full h-full opacity-0 transition duration-300  ease-linear`}
            >
              <span>
                <img
                  src={image}
                  alt="person"
                  className="rounded-full mb-4 w-40 h-40 object-cover border-4 border-solid border-[#bcccdc] my-0 mx-auto"
                />
              </span>
              <h4 className="font-bold">{name}</h4>
              <p>{text}</p>
            </article>
          );
        })}

        <button
          className="absolute top-[20%] -left-1 vsm:left-0 z-[2] translate-y-1/2 bg-primary text-white p-2 flex justify-center text-xl rounded-md cursor-pointer transition-all hover:bg-secondary"
          onClick={indexSubHandler}
        >
          <FiChevronLeft />
        </button>
        <button
          className="absolute -right-1 vsm:right-0 top-[20%] z-[2] translate-y-1/2 bg-primary text-white p-2 flex justify-center text-xl rounded-md cursor-pointer transition-all hover:bg-secondary"
          onClick={indexAddHandler}
        >
          <FiChevronRight />
        </button>
      </div>
      <div className="flex justify-center mb-4">
        {people.map((person, personIndex) => {
          return (
            <div
              key={personIndex}
              className={`w-3 h-3 rounded-full bg-[#617d98] relative mx-1 b-0 l-0 cursor-pointer hover:bg-black ${
                personIndex === index && "bg-[red]"
              }`}
              onClick={() => {
                dotClickHandler(personIndex);
              }}
            ></div>
          );
        })}
      </div>
    </section>
  );
};

export default ReviewSlider;
