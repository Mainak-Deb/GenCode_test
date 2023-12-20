import React, { useState, useRef } from 'react'
import axios from 'axios';
import Markdown from 'react-markdown';
import CodeEditor from '@uiw/react-textarea-code-editor';
import myCustomTheme from './theme';
import GlowButton from './common/GlowButton';


const CodeCompletion = ({ platformname, language }) => {
  const [functionBody, setfunctionBody] = useState('');
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef(null);

  const getCursorPosition = () => {
    if (textareaRef.current) {
      const cursorStart = textareaRef.current.selectionStart;
      const cursorEnd = textareaRef.current.selectionEnd;

      console.log(`Cursor start position: ${cursorStart}`);
      console.log(`Cursor end position: ${cursorEnd}`);
      return {
        "prefix": functionBody.slice(0, cursorEnd),
        "suffix": functionBody.slice(cursorEnd, functionBody.length)
      }

    }
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(functionBody)
      .then(() => {
        alert('Copied to clipboard!');
      })
      .catch((error) => {
        console.error('Failed to copy:', error);
      });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let cursorbreak = getCursorPosition()
      setLoading(true)
      console.log(cursorbreak.prefix)
      console.log(cursorbreak.suffix)
      const formData = {
        prefix: cursorbreak.prefix,
        suffix: cursorbreak.suffix,
        platformname:platformname
      };

      const response = await axios.post('http://127.0.0.1:8080/codecompletion', formData);

      console.log('Response:', response.data);
      if(platformname=="Google"){
        setfunctionBody(cursorbreak.prefix + response.data.content + cursorbreak.suffix)
      }else if(platformname=="OpenAi"){
        setfunctionBody(response.data.content)
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div>
      <label htmlFor="description" className="block text-sm font-medium mb-1 my-2 text-white">
        Provide your incomplete code here
      </label>
      <div className="mb-4 ">

        <CodeEditor
          value={functionBody}
          language={language}
          className="w-[90%] m-auto dark-shadow font-orbitron  border-x-2 border-t-2 border-gray-500 rounded-tr-lg rounded-tl-lg"
          placeholder="Enter your code Here"
          onChange={(evn) => setfunctionBody(evn.target.value)}
          padding={15}
          data-color-mode="dark"
          ref={textareaRef}
          style={{
            backgroundColor: "#161A30",
            minHeight: "300px",
            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          }}
        />
        
        <button
          type="submit"
          className="w-[90%] bg-black  dark-shadow  text-white px-4 py-2 border-x-2 border-b-2 border-gray-500 rounded-br-lg rounded-bl-lg hover:bg-gray-900"
          onClick={handleCopyClick}
        >
          Copy To Clipboard
        </button>
      </div>
      {!loading && (functionBody.length != 0) && (<GlowButton
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Complete
      </GlowButton>)}
      {loading && (<button
        disabled="true"
        className="bg-slate-400 text-white px-4 py-2 rounded-md"
      >
        Generating
      </button>)
      }

    </div>
  )
}

export default CodeCompletion
