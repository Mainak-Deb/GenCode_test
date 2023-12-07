import React, { useState, useRef } from 'react'
import axios from 'axios';
import Markdown from 'react-markdown';
import CodeEditor from '@uiw/react-textarea-code-editor';
import myCustomTheme from './theme';


const CodeCompletion = ({ paltformname }) => {
  const [functionBody, setfunctionBody] = useState('');
  const [language, setLanguage] = useState('');
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef(null);

  const getCursorPosition = () => {
    if (textareaRef.current) {
      const cursorStart = textareaRef.current.selectionStart;
      const cursorEnd = textareaRef.current.selectionEnd;

      console.log(`Cursor start position: ${cursorStart}`);
      console.log(`Cursor end position: ${cursorEnd}`);
      return {
        "prefix":functionBody.slice(0,cursorEnd),
        "suffix":functionBody.slice(cursorEnd,functionBody.length)
      }
      
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let cursorbreak=getCursorPosition()
      setLoading(true)
      console.log(cursorbreak.prefix)
      console.log(cursorbreak.suffix)
      const formData = {
        prefix:cursorbreak.prefix,
        suffix:cursorbreak.suffix
      };

      const response = await axios.post('http://127.0.0.1:8080/codecompletion', formData);

      console.log('Response:', response.data);
      setfunctionBody(cursorbreak.prefix+response.data.content+cursorbreak.suffix)
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div>
      <div className="mb-4">
        <label htmlFor="language" className="block text-sm font-medium mb-1">
          Select Language
        </label>
        <select
          id="language"
          className="w-full border rounded-md p-2"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="">Select a language</option>
          <option value="Python">Python</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Java">Java</option>
          <option value="C++">C++</option>
          <option value="C#">C#</option>
          <option value="Ruby">Ruby</option>
          <option value="PHP">PHP</option>
          <option value="Swift">Swift</option>
          <option value="Kotlin">Kotlin</option>
          <option value="TypeScript">TypeScript</option>
          <option value="Go">Go</option>
          <option value="Rust">Rust</option>
          <option value="Perl">Perl</option>
          <option value="C">C</option>
          <option value="Assembly">Assembly</option>
          <option value="Solidity">Solidity</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Write the function for unit test
        </label>
        <CodeEditor
          value={functionBody}
          language={language}
          placeholder="Enter your code Here"
          onChange={(evn) => setfunctionBody(evn.target.value)}
          padding={15}
          data-color-mode="dark"
          ref={textareaRef}
          style={{
            backgroundColor: "#161A30",
            borderRadius: "10px",
            minHeight: "200px",
            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          }}
        />
      </div>
      {!loading && (<button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Complete
      </button>)}
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
