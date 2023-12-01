import React, { useState } from 'react'
import axios from 'axios';
import Markdown from 'react-markdown';
import CodeEditor from '@uiw/react-textarea-code-editor';

const TestCaseGen = ({paltformname}) => {
  const [functionBody, setfunctionBody] = useState('');
  const [language, setLanguage] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('# *Interra Ai:* code will be shown here!')

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        language,
        functionBody,
        description
      };
      console.log(formData)
      const response = await axios.post('http://127.0.0.1:8080/testcasegen', formData);
      console.log('Response:', response.data);
      
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div>
      <div className="w-[90%] mx-auto mt-8 p-6 border rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">UnitTest Generation</h2>
        <form onSubmit={handleSubmit}>
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
                style={{
                  backgroundColor: "#161A30",
                  borderRadius:"10px",
                  height:"200px",
                  maxHeight:"500px",
                  overflowY:"scroll",
                  fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                }}
              />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className=" block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              id="description"
              className="w-full border rounded-md p-2"
              rows="2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>

      </div>
      <div className="w-[90%] m-4 p-2"></div>
      <div className='bg-black text-white w-[90%] m-auto my-4 overflow-scroll text-left p-2'>
          <Markdown>{content}</Markdown>
      </div>
    </div>
    )
}

export default TestCaseGen