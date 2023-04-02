import React from "react";

interface MessageProps {
  type?: "error" | "success";
  message: string;
  className?: string;
}

const Message: React.FC<MessageProps> = (props) => {
  const { type, message } = props;
  return (
    <div>
      <p
        className={`text-sm capitalize ${
          type === "error" ? "text-red-500" : "text-green-500"
        } ${props.className}`}
      >
        {message}
      </p>
    </div>
  );
};

export default Message;

Message.defaultProps = {
  type: "error",
};
