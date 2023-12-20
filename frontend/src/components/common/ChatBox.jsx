import React from 'react'
import MarkdownPreview from '@uiw/react-markdown-preview';


const ChatBox = (props) => {
    if (props.author == "user") {
        return (<div className='w-[100%] px-2 h-auto flex flex-row  justify-end my-2'>
            <div className="bg-blue-600 text-white py-2 px-4 max-w-[80%] rounded-md text-right dark-shadow"> {props.children}</div>
        </div>)
    } else if (props.author == "system") {
        return (<div className='w-[100%] px-2 h-auto flex flex-row  justify-start my-2'>
            <div className="bg-white text-slate-800 py-2 px-4 max-w-[80%] rounded-md text-left dark-shadow">
                <MarkdownPreview
                    source={props.children}
                    className="w-full m-auto  overflow-x-hidden overflow-y-auto text-left"
                    wrapperElement={{
                        "data-color-mode": "light"
                    }}
                />
            </div>
        </div>)
    } else if (props.author == "loading") {
        return (<div className='w-[100%]  px-2 h-auto flex flex-row  justify-start my-2'>
            <div className="bg-white text-slate-700 py-2 px-4 max-w-[80%] rounded-md text-right dark-shadow"> Generating <span className="jumping-dots">  <span className="dot-1"></span>  <span className="dot-2"></span>  <span className="dot-3"></span>  </span></div>
            
        </div>)
    }

}

export default ChatBox