import React from "react";

const Message = ({ text, sender }) => {
  const bubbleClass = sender === "user" ? "bg-blue-500" : "bg-gray-100";
  const textColor = sender === "user" ? "text-white" : "text-gray-900";
  const justifyStyle = sender === "user" ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' };
  const maxWidth = sender === "user" ? 'max-w-lg' : 'max-w-xl';

  return (
    <div style={justifyStyle} className="flex">
      <div className={`${maxWidth} rounded-lg px-4 py-2 ${bubbleClass}`}>
        <p className={`text-sm ${textColor}`}>{text}</p>
      </div>
    </div>
  );
};

export default Message;
