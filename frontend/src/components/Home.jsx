import React, { useState } from 'react'
import CodeGeneration from './CodeGeneration';
import CodeCompletion from './CodeCompletion';
import CodeChat from './CodeChat';
import TestCaseGen from './TestCaseGen';
import CodeQuestion from './CodeQuestion';

const Home = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('Google');
  const [workfunction, setworkfunction] = useState('Code_Generation');
  const [language, setLanguage] = useState('python');

  const handlePlatformChange = (event) => {
    setSelectedPlatform(event.target.value);
  };

  const handleFunctionChange = (event) => {

    setworkfunction(event.target.value);
    console.log(workfunction)
  };

  return (
    <div className=' bg-slate-900 w-screen h-screen p-0 m-0 top-0 overflow-hidden'  >
      <div className='white-shadow w-[90%] h-[50px] m-auto pl-4 my-4 bg-slate-900 rounded-md bg-opacity-20 font-serif text-white flex justify-left items-center  text-4xl opacity-80 ' >
        <span>InterraBot</span>   <span className='mx-2 font-extrabold  text-pink-700 text-5xl'>X</span>
      </div>
      <div className="main white-shadow w-[90%] m-auto glow h-[80%] rounded-md flex flex-row  justify-between items-center bg-slate-900">
        <div className="w-[20%] h-[90%] border-r border-gray-600 flex flex-col  justify-between items-center">
          <div className="common w-[90%] h-[50%] border-b border-gray-800 flex flex-col  justify-around items-center">
            <div className='w-[90%] bg-slate-800 text-gray-200 rounded-lg text-center p-2 bg-opacity-60 dark-shadow' >
              <label className='p-2 text-black font-bold' htmlFor="platformSelect">Choose Platform</label>
              <select
                id="platformSelect"
                value={selectedPlatform}
                onChange={handlePlatformChange}
              >
                <option value="OpenAI">OpenAI</option>
                <option value="Google">Google</option>
              </select>
            </div>

            <div className='w-[90%] rounded-lg p-2 mt-4 mb-0 flex flex-col bg-slate-800 text-gray-200 dark-shadow justify-around bg-opacity-60 drop-shadow-sm'>
              <label className='p-2 text-black font-bold' htmlFor="platformSelect">Choose Function</label>

              <select
                id="platformSelect"
                value={workfunction}
                onChange={handleFunctionChange}
              >
                <option className='text-center p-2' value="Code_Generation">Code Generation</option>
                <option className='text-center p-2' value="Code_Completion">Code Completion</option>
                <option className='text-center p-2' value="Code_Chat">Code Chat</option>
                <option className='text-center p-2' value="Code_Question">Code Query</option>
                <option className='text-center p-2' value="Testcase_Generation">Testcase_Generation</option>
              </select>
            </div>

          </div>
          
            <div className="w-[100%] h-[50%]  flex flex-col  justify-around items-center">
              <div className='w-[90%] bg-slate-800 text-gray-200 rounded-lg text-center p-2 bg-opacity-60 dark-shadow' >
                <label htmlFor="language" className="text-black font-bold">
                  Select Language
                </label>
                <select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
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

            </div>
          
        </div>
        <div className="w-[80%] h-[90%]  flex flex-row  justify-center items-center">
          <div className=' w-[95%] h-[95%] functional-area  overflow-y-auto overflow-x-hidden border border-gray-700 rounded-md dark-shadow bg-slate-800 '>

            {workfunction === 'Code_Generation' && <CodeGeneration paltformname={selectedPlatform} language={language} />}
            {workfunction === 'Testcase_Generation' && <TestCaseGen paltformname={selectedPlatform} />}
            {workfunction === 'Code_Completion' && <CodeCompletion paltformname={selectedPlatform} />}
            {workfunction === 'Code_Chat' && <CodeChat paltformname={selectedPlatform} />}
            {workfunction === 'Code_Question' && <CodeQuestion paltformname={selectedPlatform} />}
            {!(workfunction === 'Testcase_Generation' || workfunction === 'Code_Question' || workfunction === 'Code_Generation' || workfunction === 'Code_Completion' || workfunction === 'Code_Chat') && (
              <div>Component not found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )

}

export default Home;