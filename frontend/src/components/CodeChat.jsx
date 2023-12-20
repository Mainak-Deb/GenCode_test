import React, { useState, useRef, useEffect } from "react";
import SciFiDiv from "./common/SciFiDiv";
import CustomTextAreaField from "./common/CustomTeatAreaField";
import ChatBox from "./common/ChatBox";
import axios from 'axios';



const CodeChat = ({ platformname }) => {
  const scrollRef = useRef(null);


  const [history, sethistory] = useState([
    {
      author: "user",
      content: "Hello !!"
    },
    {
      author: "system",
      content: "Hiii! I am your coding asistant ! How can i help you?!"
    }
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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(msg.trim()===""){return}

    try {
      const formData = {
        history:history.slice(),
        messege: msg,
        platformname
      }

      
      const mymsg={ author: "user", content: msg.slice() };
      const loadermsg={ author: "loading", content: null };
      sethistory([...history,mymsg,loadermsg]);


      console.log("generating history",history)

      setmsg("");


      const response = await axios.post('http://127.0.0.1:8080/codechat', formData);
      
      const newchat= { author: "system", content: response.data.content };

      sethistory([...history,mymsg,newchat]);
      console.log("updated history",history)


    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="h-[100%] flex flex-col justify-between">
      <SciFiDiv className="w-[97%] h-[80%]  mx-auto mt-2 p-1 border rounded-md shadow-md ">
        <div ref={scrollRef} className="h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-40 rounded-md">
          {history.map((item, index) => (
            <ChatBox author={item.author} key={index} >{item.content}</ChatBox>
          ))}
        </div>
      </SciFiDiv>
      <div className=" w-[97%] mx-auto h-[18%]  flex flex-row justify-between items-center ">
        <CustomTextAreaField
          className=" w-[90%] h-[90%]  my-2 rounded-md"
          value={msg}
          onChange={(e) => setmsg(e.target.value)}
        ></CustomTextAreaField>
        <button
          className="w-[10%] h-[90%] bg-red-500 px-4 py-2 ml-1 cursor-pointer rounded-md hover:bg-red-950 hover:text-slate-300 "
          onClick={handleSubmit}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default CodeChat;
