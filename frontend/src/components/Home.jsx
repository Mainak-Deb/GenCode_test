import React, { useState } from 'react'
import CodeGeneration from './CodeGeneration';
import CodeCompletion from './CodeCompletion';
import CodeChat from './CodeChat';
import TestCaseGen from './TestCaseGen';
import CodeQuestion from './CodeQuestion';

const Home = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('Google');
  const [workfunction, setworkfunction] = useState('Code_Generation');

  const handlePlatformChange = (event) => {
    setSelectedPlatform(event.target.value);
  };

  const handleFunctionChange = (event) => {
    
    setworkfunction(event.target.value);
    console.log(workfunction)
  };

  return (
    <div>
      <h1  className='text-4xl m-4 border-4 text-white bg-black border-blue-400 rounded-lg'>INTERRA AI</h1>
      <div className='w-[80vw] m-[10vw] bg-gray-300 rounded-lg p-2 mt-4 mb-0 flex flex-col  justify-around'>
      <label htmlFor="platformSelect">Choose platform:</label>
      <div className='w-[90%] m-auto border bordder-black rounded-lg p-2 mb-4 mt-0 flex flex-row font-bold justify-center'>
          {selectedPlatform}
          </div>
          <select
            className='p-2 bg-white text-black rounded-lg text-center'
            id="platformSelect"
            value={selectedPlatform}
            onChange={handlePlatformChange}
          >
            <option value="OpenAI">OpenAI</option>
            <option value="Google">Google</option>
          </select>
          
      </div>
      
      <div className='w-[80vw] m-[10vw] bg-blue-200 rounded-lg p-2 mt-4 mb-0 flex flex-col  justify-around'>
      <label className='p-2'  htmlFor="platformSelect">Choose Function</label>
        
          <select
            id="platformSelect"
            className='p-2 bg-black text-white rounded-lg'
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

      <div className="w-[90%] m-auto my-4 bg-gray-300 p-2 rounded-lg">
        
      {workfunction === 'Code_Generation' && <CodeGeneration paltformname={selectedPlatform}/>}
      {workfunction === 'Testcase_Generation' && <TestCaseGen paltformname={selectedPlatform}/>}
      {workfunction === 'Code_Completion' && <CodeCompletion paltformname={selectedPlatform}/>}
      {workfunction === 'Code_Chat' && <CodeChat paltformname={selectedPlatform}/>}
      {workfunction === 'Code_Question' && <CodeQuestion paltformname={selectedPlatform}/>}

      {!(workfunction === 'Testcase_Generation' ||workfunction === 'Code_Question'|| workfunction === 'Code_Generation' || workfunction === 'Code_Completion' || workfunction === 'Code_Chat') && (
        <div>Component not found</div>
      )}
      </div>
    </div>
  )
}

export default Home;