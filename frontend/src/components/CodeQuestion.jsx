import React, { useState } from 'react'
import axios from 'axios';
import SciFiDiv from './common/SciFiDiv';
import CustomInputField from './common/CustomInputField';
import CustomTextAreaField from './common/CustomTeatAreaField';
import RainbowButton from './common/RainbowButton';
import CodeEditor from '@uiw/react-textarea-code-editor';
import FileReaderComponent from './common/FileReaderComponent';
import GlowButton from './common/GlowButton';
import MarkdownPreview from '@uiw/react-markdown-preview';



const CodeQuestion = ({ paltformname, language, setLanguage }) => {
  const [code, setCode] = useState('');
  const [query, setQuery] = useState('');
  const [content, setContent] = useState('# *Interra Ai:* code will be shown here!')
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        code,
        query,
      };
      setLoading(true)
      const response = await axios.post('http://127.0.0.1:8080/codequery', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response:', response.data);
      setContent(response.data.content)



      // Reset form fields after successful submission
      setQuery('');
      setLoading(false)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <SciFiDiv className="w-[90%] mx-auto mt-8 mb-8 p-6 border rounded-md shadow-md ">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="code" className="block text-sm font-medium mb-1 text-white">
              Code
            </label>
            <CodeEditor
              value={code}
              language={language}
              placeholder="Enter your code Here"
              onChange={(evn) => setCode(evn.target.value)}
              padding={15}
              data-color-mode="dark"
              style={{
                backgroundColor: "#161A30",
                borderRadius: "10px",
                minHeight: "200px",
                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
              }}
            />
          </div>
          <div className="mb-4">
            <FileReaderComponent setLanguage={setLanguage} setFileContent={setCode} ></FileReaderComponent>
          </div>
          <div className="mb-4">
            <label htmlFor="functionName" className="block text-sm font-medium mb-1 font-orbitron text-white ">
              Write your Query
            </label>
            <CustomInputField
              type="text"
              id="functionName"
              placeholder="Enter query"
              className="w-full border rounded-md p-2"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <GlowButton onClick={handleSubmit}  >Ask Query</GlowButton>
        </form>
      </SciFiDiv>
      {
        loading && (
          <div className="flex justify-center items-center h-[200px]">
            {/* Loader or spinner component */}
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        )
      }
      {
        !loading && (
          <div className="w-[90%] m-auto mb-8  rounded-md bg-[#0d1117] py-2 dark-shadow text-left">
            <MarkdownPreview
              source={content}
              className="w-[95%] m-auto  overflow-x-hidden overflow-y-auto "
              wrapperElement={{
                "data-color-mode": "dark"
              }}
            />
          </div>


        )
      }
    </>
  )




  // return (
  //   <div className="max-w-md mx-auto mt-8 p-6 border rounded-md shadow-md bg-slate-400">
  //     <h2 className="text-xl font-semibold mb-4">Query from code</h2>
  //     <form onSubmit={handleSubmit}>
  //       <div className="mb-4">
  //         <label htmlFor="language" className="block text-sm font-medium mb-1">
  //           Select Language
  //         </label>
  //         <select
  //           id="language"
  //           className="w-full border rounded-md p-2"
  //           value={language}
  //           onChange={(e) => setLanguage(e.target.value)}
  //         >
  //           <option value="">Select a language</option>
  //           <option value="Python">Python</option>
  //           <option value="JavaScript">JavaScript</option>
  //           <option value="Java">Java</option>
  //           <option value="C++">C++</option>
  //           <option value="C#">C#</option>
  //           <option value="Ruby">Ruby</option>
  //           <option value="PHP">PHP</option>
  //           <option value="Swift">Swift</option>
  //           <option value="Kotlin">Kotlin</option>
  //           <option value="TypeScript">TypeScript</option>
  //           <option value="Go">Go</option>
  //           <option value="Rust">Rust</option>
  //           <option value="Perl">Perl</option>
  //           <option value="C">C</option>
  //           <option value="Assembly">Assembly</option>
  //           <option value="Solidity">Solidity</option>
  //         </select>
  //       </div>
  //       <div className="mb-4">
  //         <label htmlFor="code" className="block text-sm font-medium mb-1">
  //           Code
  //         </label>
  //         <CodeEditor
  //           value={code}
  //           language={language}
  //           placeholder="Enter your code Here"
  //           onChange={(evn) => setCode(evn.target.value)}
  //           padding={15}
  //           data-color-mode="dark"
  //           style={{
  //             backgroundColor: "#161A30",
  //             borderRadius: "10px",
  //             minHeight:"200px",
  //             fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
  //           }}
  //         />
  //       </div>
  //       <div className="mb-4">
  //         <label htmlFor="query" className="block text-sm font-medium mb-1">
  //           Query
  //         </label>
  //         <input
  //           type="text"
  //           id="query"
  //           placeholder="Enter query"
  //           className="w-full border rounded-md p-2"
  //           value={query}
  //           onChange={(e) => setQuery(e.target.value)}
  //         />
  //       </div>
  //       <button
  //         type="submit"
  //         className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
  //       >
  //         Submit
  //       </button>
  //     </form>
  //     {loading && (
  //       <div className="flex justify-center items-center h-[200px]">
  //         {/* Loader or spinner component */}
  //         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
  //       </div>
  //     )}
  //     {!loading && (
  //       <div className='bg-white w-[90%] m-auto my-4 overflow-scroll text-left'>
  //         {/* <Markdown>{content}</Markdown> */}
  //         <MarkdownPreview source={content} />
  //       </div>
  //     )}
  //   </div>
  // )
}

export default CodeQuestion