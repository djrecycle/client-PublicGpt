import { useState } from "react";
import ChatBody from "./components/ChatBody";
import ChatInput from "./components/ChatInput";
import { useMutation } from "react-query";
import { fetchResponse } from "./api";
import TypeIt from "typeit-react";
import "./App.css"
import logo from "./assets/logo.png";

function App() {
  const [chat, setChat] = useState([]);

  const mutation = useMutation({
    mutationFn: () => {
      return fetchResponse(chat);
    },
    onSuccess: (data) =>
      setChat((prev) => [
        ...prev,
        { sender: "ai", message: data.message.replace(/^\n\n/, "") },
      ]),
  });

  const sendMessage = async (message) => {
    await Promise.resolve(setChat((prev) => [...prev, message]));
    mutation.mutate();
  };

  return (
    <div className="h-screen py-6 relative sm:px-16 px-12 text-white overflow-hidden flex flex-col justify-between  align-middle">
  
    {/* header */}
    <div className="flex justify-center pb-3">
       <img src={logo} className="App-logo pt w-[40px] h-[40px]" alt='logo' />
    </div>

    <div className="text-center">
        <TypeIt className="font-bold  text-2xl  mb-3"
          options={{ 
            strings: 'My Chat-GPT BETA',
            speed: 50,
            waitUntilVisible: true,
            cursor: false, 
          }}
        />
      </div>

    {/* body */}
    <div
      className="h-[90%] overflow-auto w-full max-w-4xl min-w-[20rem] py-8 px-4 self-center
    scrollbar-thumb-slate-400 scrollbar-thin scrollbar-track-gray-tranparent scrollbar-thumb-rounded-md
    "
    >
      <ChatBody chat={chat} />
    </div>

    {/* input */}
    <div className="w-full max-w-4xl min-w-[20rem] self-center">
      <ChatInput sendMessage={sendMessage} loading={mutation.isLoading} />
      <p className="mt-2 text-center text-slate-400 hover:text-sky-400 underline decoration-indigo-500">@My-ChatGPT-0.1</p>
    </div>
  </div>
);
}

export default App;
