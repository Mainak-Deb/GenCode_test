import React from 'react'

const ChatBox = (props) => {
    if (props.author == "user") {
        return (<div  className='w-[100%] h-auto flex flex-row  justify-end my-2 px-2'>
                <div className="bg-blue-600 text-white py-2 px-4 max-w-[70%] rounded-md"> {props.children}</div>
        </div>)
    } else if (props.author =="system" ) {
        return (<div className='w-[100%] h-auto flex flex-row  justify-start my-2'>
                  <div className="bg-white text-slate-800 py-2 px-4 max-w-[70%] rounded-md"> {props.children}</div>
        </div>)
    } else if (props.author == "loading") {
        return (<div>
            loading
        </div>)
    }

}

export default ChatBox