import React from 'react'
import './style/Index.css'
import myCustomTheme from './theme';
import { CodeBlock } from "react-code-blocks";


const Index = () => {

    const testcode=`import hashlib

                    def hash_file(filename):
                    """"This function returns the SHA-1 hash
                    of the file passed into it"""  
                    # make a hash object
                    h = hashlib.sha1()
                    # open file for reading in binary mode
                    with open(filename,'rb') as file:
                        # loop till the end of the file
                        chunk = 0
                        while chunk != b'':
                            # read only 1024 bytes at a time
                            chunk = file.read(1024)
                            h.update(chunk)
                    # return the hex representation of digest
                    return h.hexdigest()
                    message = hash_file("track1.mp3")
                    print(message)`
    const language="python"


    return (
        <div className='gradient bg-black w-screen h-screen p-0 m-0 top-0 overflow-hidden'  >
            {/* <div class="text-gradient bg-gradient-to-r from-blue-500 to-green-500">
                Gradient Text
            </div> */}
            <div className='glow w-[80%] h-[80px] m-auto my-4 bg-black rounded-full bg-opacity-20 font-serif text-white flex justify-center items-center  text-5xl opacity-80 ' >
                <span>InterraBot</span>   <span className='mx-2 font-extrabold  text-pink-700 text-7xl'>X</span>
            </div>

            <div className='flex flex-row px-32 py-16'>
                <div className='w-[50%] text-8xl p-4 px-4 text-slate-300 font-serif  text-right b' >
                    <span className="text-6xl opacity-60 hover:opacity-80  ">Your Personal<br /> </span>
                    <span className='text-gradient bg-gradient-to-r from-blue-500 to-green-500' >
                        AI Coding 
                    </span>
                    <br /> 
                    <span className='text-gradient bg-gradient-to-r from-blue-500 to-green-500' >Assistant</span> <br />
                </div>
                <div className='w-[50%] p-4 px-4 border border-white rounded-lg bg-blue-200 bg-opacity-60 pt-4 text-left opacity-60'> 
                <CodeBlock
                        text={testcode}
                        language={language}
                        showLineNumbers={true}
                        theme={myCustomTheme}
                        startingLineNumber={1}
                        codeBlock={{ wrapLines: true }}
                        style={{
                            borderRadius: "10px",
                            height:"200px",
                            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                            
                        }}
                    />
                </div>
            </div>

        </div>
    )
}

export default Index