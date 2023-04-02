import React from "react";
import { Link } from "react-router-dom";
import Button from "Components/UI/Button";
import book from "../../../assets/book1.jpg";

const About = () => {
  return (
    <div className="overflow-hidden relative my-8">
      <div className="h-64 w-full relative md:absolute z-[-1] md:h-full">
        <div className="opacity-0 absolute w-full h-full bg-black md:opacity-50"></div>
        <img src={book} alt="" className="h-full w-full" />
      </div>
      <div className="bg-secondary py-8 md:bg-transparent md:py-24 ">
        <h2 className="text-white text-4xl font-bold my-4 mx-auto w-11/12 md:w-1/2 lg:w-1/3">
          Welcome to The Book Store
        </h2>
        <p className="text-white w-11/12 my-4 mx-auto md:w-2/3 lg:w-1/2 md:my-8">
          Providing Students with the Tools to Learn for Over 20 Years! We offer
          you the books you need with the highest quality and most trusted
          brands with reliable and dedicated personal service. Lorem ipsum
          dolor, sit amet consectetur adipisicing elit. Non impedit excepturi
          delectus iure rem molestiae ducimus sapiente molestias modi illo
          dolores dicta labore ipsa nihil totam, vero eum debitis consequuntur
          amet facilis, accusantium quaerat voluptate exercitationem obcaecati?
          Dolores dolorem voluptates ab nemo, doloribus ratione iste tempora
          quis ut est modi!
        </p>
        <Link to="/about" className="flex justify-center">
          <Button className="hover:border-primary">Know More</Button>
        </Link>
      </div>
    </div>
  );
};

export default React.memo(About);
