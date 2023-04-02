import React from "react";
import Card from "../../../Components/UI/Card";

/* -------------------------------------------------------------------------- */
/*                              Interfaces Starts                             */
/* -------------------------------------------------------------------------- */
interface AboutProductInterface {
  name: string;
  pages: number;
  description: string;
  language: string;
  genre: string;
}
/* -------------------------------------------------------------------------- */
/*                              Interfaces ends                               */
/* -------------------------------------------------------------------------- */

const AboutProduct: React.FC<{ aboutProduct: AboutProductInterface }> = (
  props
) => {
  return (
    <div className="w-full sm:w-3/4 my-0 mx-auto">
      <Card>
        <h4 className="bg-[#fafafa] py-4 px-4 text-xl">
          Product details of {props.aboutProduct.name}
        </h4>
        <div className="p-4">
          <ul className="text-gray-700">
            <li className="leading-7 font-bold">{props.aboutProduct.name}</li>
            <li className="leading-7">
              <span className="font-bold">Language: </span>

              <span className="text-gray-500">
                {props.aboutProduct.language}
              </span>
            </li>
            <li className="leading-7">
              <span className="font-bold">Pages: </span>
              <span className="text-gray-500">{props.aboutProduct.pages}</span>
            </li>
            <li className="leading-7">
              <span className="font-bold">Genre: </span>
              <span className="text-gray-500"> {props.aboutProduct.genre}</span>
            </li>
          </ul>
        </div>
        <hr />
        <p className="p-4 leading-7 text-gray-700">
          {props.aboutProduct.description}
        </p>
      </Card>
    </div>
  );
};

export default React.memo(AboutProduct);
