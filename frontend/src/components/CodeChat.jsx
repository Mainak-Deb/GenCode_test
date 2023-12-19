import React, { useState } from 'react'
import SciFiDiv from './common/SciFiDiv';
import CustomTextAreaField from './common/CustomTeatAreaField';
import ChatBox from './common/ChatBox';


const CodeChat = ({ platformname }) => {

  const [history, sethistory] = useState([
    {
      author: "system",
      content: "Hiiii!"
    },
    {
      author: "user",
      content: "Hi, how are you??"
    }
  ])

  const [msg, setmsg] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      sethistory([...history,{author:"user",content:msg}])
      setmsg("")
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div className='flex flex-col justify-center items-center'>
      <SciFiDiv className="relative w-[98%] h-[80%]  mx-auto mt-2 p-6 border rounded-md shadow-md ">
        <div className='h-[280px] overflow-y-auto overflow-x-hidden'>
          {
            history.map((key, index) => (
               <ChatBox author={key.author} >{key.content}</ChatBox>
            ))
          }
        </div>

      </SciFiDiv>
      <div className=' w-[98%]  flex flex-row justify-between items-center '>
        <CustomTextAreaField className=" w-[90%] h-[20%]  mx-auto my-2 rounded-md" value={msg}  onChange={(e) => setmsg(e.target.value)}  ></CustomTextAreaField>
        <button className="w-[10%] h-[90%] bg-red-500 px-4 py-2 ml-1 cursor-pointer rounded-md hover:bg-red-950 hover:text-slate-300 " onClick={handleSubmit} >  Send</button>
      </div>

    </div>
  )
}

export default CodeChat