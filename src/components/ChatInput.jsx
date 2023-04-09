import React from "react";
import { useState } from "react";

const ChatInput = ({ sendMessage, loading }) => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (value === "") return;
    sendMessage({ sender: "user", message: value });
    setValue("");
  };
  return (
    <div
      className="w-full bg-white bg-opacity-10 rounded-lg px-1
    py-1 overflow-auto relative"
    >
      {loading ? (
         <p className="m-auto rounded-lg text-center bg-transparent outline-none w-11/12">
         <span className="animate-spin bg-transparent h-full w-full">.....</span>
       </p>
        // <p className="m-auto order-0 rounded-lg ms-2 bg-transparent outline-none w-11/12">Sedang Berpikir</p>
      ) : (
        <>
         <input
            onKeyDown={(e) => {
            e.keyCode === 13 && e.shiftKey === false && handleSubmit();
            }}
            rows={1}
            className="border-0 rounded-lg ms-2 bg-transparent outline-none  md:w-11/12"
            value={value}
            type="text"
            onChange={(e) => setValue(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            width={20}
            alt="send-button"
            className="send-button bg-slate-600 h-10 w-12 text-center rounded-md hover:bg-slate-800 ms-4"
          >Send</button>
        </>
      )}
    </div>
  );
};

export default ChatInput;