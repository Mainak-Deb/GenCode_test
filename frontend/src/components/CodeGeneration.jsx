import React, { useState } from 'react'
import axios from 'axios';
import Markdown from 'react-markdown'
import { CodeBlock } from "react-code-blocks";
import myCustomTheme from './theme';
import GlowButton from './common/GlowButton';
import SciFiDiv from './common/SciFiDiv';
import CustomInputField from './common/CustomInputField';
import CustomTextAreaField from './common/CustomTeatAreaField';



const CodeGeneration = ({paltformname,language}) => {
  const [functionName, setFunctionName] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('# *Interra Ai:* code will be shown here!')
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        language,
        functionName,
        description,
        paltformname
      };
      setLoading(true);
      console.log(formData)

      const response = await axios.post('http://127.0.0.1:8080/codegen', formData);
      console.log('Response:', response.data);
      setContent(removeFirstAndLastLine(response.data.content))

      console.log(response.data.content);
      setLoading(false);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  function removeFirstAndLastLine(str) {
    let regex = /```([^`]*)```/;
    let match = regex.exec(str);
    let result=null;
    if (match !== null) {
      console.log("Found:", match[1]); // match[1] contains the content within ```
      // Split the string by lines
      let lines = str.split('\n');
      // Remove the first and last lines
      lines = lines.slice(1, -1);
      // Join the remaining lines back together
      result = lines.join('\n');
    } else {
      result = str;
    }
    return result;
  }

  const handleCopyClick = () => {
    navigator.clipboard.writeText(content)
      .then(() => {
        alert('Copied to clipboard!');
      })
      .catch((error) => {
        console.error('Failed to copy:', error);
      });
  };

  return (
    <div>
      <SciFiDiv className="w-[90%] mx-auto mt-8 p-6 border rounded-md shadow-md ">
        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label htmlFor="functionName" className="block text-sm font-medium mb-1">
              Write Function Name
            </label>
            <CustomInputField
              type="text"
              id="functionName"
              placeholder="Write function name"
              className="w-full border rounded-md p-2"
              value={functionName}
              onChange={(e) => setFunctionName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description
            </label>
            <CustomTextAreaField
              id="description"
              className="w-full border rounded-md p-2"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></CustomTextAreaField>
          </div>
          {/* <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button> */}
          <GlowButton onClick={handleSubmit}  >Generate</GlowButton>
        </form>

      </SciFiDiv>

      {loading && (
        <div className="flex justify-center items-center h-[200px]">
          {/* Loader or spinner component */}
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      {!loading && (
      <div className="w-[90%] m-auto my-4 p-2 text-left flex flex-col justify-center bg-black">
          <CodeBlock
              text={content}
              language={language}
              showLineNumbers={true}
              theme={myCustomTheme}
              startingLineNumber={1}
              codeBlock={{  wrapLines: true }}
        />
         <button className='w-[50%]  m-auto p-2  my-2 bg-gray-700 text-white rounded-md'  onClick={handleCopyClick}>Copy to Clipboard</button>
      </div>
      )}
      
      {/* <div className='bg-black text-white w-[90%] m-auto my-4 overflow-scroll text-left p-2'>
          <Markdown>{content}</Markdown>
      </div> */}
    </div>
  )
}

export default CodeGeneration;