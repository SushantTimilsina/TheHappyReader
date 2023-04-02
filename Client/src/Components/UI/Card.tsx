import React from "react";

interface CardProps {
  className?: string;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <div
      className={`p-2 bg-white box-border rounded-sm shadow-2xl  ${props.className}`}
    >
      {props.children}
    </div>
  );
};

export default Card;
