import React, { useRef, useEffect } from "react";
import TypeIt from "typeit-react";
import autoAnimate from "@formkit/auto-animate";

const ChatBody = ({ chat }) => {
  const aiStyle = "border-red-500 mr-auto";

  const parent = useRef(null);
  const bottomRef = useRef(null);

  // only for aut animations
  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  //for scrolling bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="flex flex-col gap-4" ref={parent}>
    {chat.map((message, i) => {
      return (
        <div
          key={i}
          className={`border-[#999999] break-words border-2 rounded-xl self-end px-3 py-3 max-w-[80%] ${
            message.sender === "ai" && aiStyle
          }`}
        >
          {message.sender === "ai" ? (
            <TypeIt
              options={{
                speed: 25,
                cursor: false,  
              }}>
                {message.message}
            </TypeIt>
          ) : (
            <pre className="whitespace-pre-wrap">{message.message}</pre>
          )}
        </div>
      );
    })}

    <div ref={bottomRef} className="h-3"></div>
  </div>
  );
};

export default ChatBody;
