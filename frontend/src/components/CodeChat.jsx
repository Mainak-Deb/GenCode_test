import React, { useState,useRef,useEffect } from "react";
import SciFiDiv from "./common/SciFiDiv";
import CustomTextAreaField from "./common/CustomTeatAreaField";
import ChatBox from "./common/ChatBox";

const CodeChat = ({ platformname }) => {
  const scrollRef = useRef(null);

  const [history, sethistory] = useState([
    {
      author: "user",
      content: "Hola!",
    },
    {
      author: "system",
      content: "Hi, How can i help you in code ??",
    },
  ]);

  const [msg, setmsg] = useState("");

  // Function to scroll to the end of the div
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      sethistory([...history, { author: "user", content: msg }]);
      setmsg("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="h-[100%] flex flex-col justify-between">
      <SciFiDiv className="w-[97%] h-[80%]  mx-auto mt-2 p-6 border rounded-md shadow-md ">
        <div  ref={scrollRef} className="h-full overflow-y-auto overflow-x-hidden">
          {history.map((key, index) => (
            <ChatBox author={key.author}>{key.content}</ChatBox>
          ))}
        </div>
      </SciFiDiv>
      <div className=" w-[98%] mx-auto h-[18%]  flex flex-row justify-between items-center ">
        <CustomTextAreaField
          className=" w-[90%] h-[90%]  my-2 rounded-md"
          value={msg}
          onChange={(e) => setmsg(e.target.value)}
        ></CustomTextAreaField>
        <button
          className="w-[10%] h-[90%] bg-red-500 px-4 py-2 ml-1 cursor-pointer rounded-md hover:bg-red-950 hover:text-slate-300 "
          onClick={handleSubmit}
        >
          {" "}
          Send
        </button>
      </div>
    </div>
  );
};

export default CodeChat;
