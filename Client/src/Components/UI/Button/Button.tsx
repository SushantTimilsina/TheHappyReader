import React from "react";

const Button: React.FC<{
  type?: any;
  className?: string;
  disabled?: any;
  onClick?: any;
}> = (props) => {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      type={props?.type || "button"}
      {...props}
      className={`bg-primary py-2 px-3 text-sm min-w-[7rem] text-white hover:bg-secondary border-2 border-solid border-secondary uppercase transition  duration-300 ease-in-out ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
