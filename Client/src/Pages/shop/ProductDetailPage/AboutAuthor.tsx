import React from "react";
import Card from "../../../Components/UI/Card";

const AboutAuthor: React.FC<{ aboutAuthor: string }> = (props) => {
  return (
    <div className="w-full sm:w-3/4 my-8 mx-auto">
      <Card>
        <h4 className="bg-[#fafafa] p-4 text-xl">About Author</h4>
        <p className="pl-2 pt-8 pr-4 pb-4 leading-6 text-gray-600">
          {props.aboutAuthor}
        </p>
      </Card>
    </div>
  );
};

export default React.memo(AboutAuthor);
