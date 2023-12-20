import React, { useState } from 'react'
import CodeGeneration from './CodeGeneration';
import CodeCompletion from './CodeCompletion';
import CodeChat from './CodeChat';
import TestCaseGen from './TestCaseGen';
import CodeQuestion from './CodeQuestion';
import GlitchText from './common/GlitchText';


const Home = () => {

  const [isPlatformDropdownOpen, setPlatformDropdownOpen] = useState(false);
  const [isFunctionDropdownOpen, setFunctionDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);

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
      <div className='white-shadow w-[90%] h-[50px] m-auto pl-4 my-4 bg-slate-900 rounded-md bg-opacity-20 font-serif text-white flex justify-left items-center  text-4xl opacity-80 glitch' >
        <GlitchText className="text-3xl"  >InterraBot</GlitchText>   <GlitchText className='mx-2 font-extrabold  text-pink-700 text-5xl'>X</GlitchText>
      </div>
      <div className="main white-shadow w-[90%] m-auto glow h-[80%] rounded-md flex flex-row  justify-between items-center bg-slate-900">
        <div className="w-[29%] h-[90%] border-r border-gray-600 flex flex-col  justify-between items-center">
          <div className="common w-[90%] h-[50%]  flex flex-col  justify-around items-center">
            <div className='w-[90%] bg-slate-800 text-gray-200 rounded-lg text-center p-2 bg-opacity-60 dark-shadow' >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label className='p-2 text-green-700 font-bold' htmlFor="platformSelect">Choose Platform</label>
                <div style={{ position: 'relative' }}>
                  <select
                    id="platformSelect"
                    value={selectedPlatform}
                    onChange={handlePlatformChange}
                    onClick={() => setPlatformDropdownOpen(!isPlatformDropdownOpen)}
                    onBlur={() => setPlatformDropdownOpen(false)}
                  >
                    <option value="OpenAi">OpenAi</option>
                    <option value="Google">Google</option>
                  </select><span style={{
                    position: 'absolute',
                    right: '8px', // Adjust the right position as needed
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                  }}>{isPlatformDropdownOpen ? '▲' : '▼'}</span>
                </div>
              </div>
            </div>

            <div className='w-[90%] rounded-lg p-2 mt-4 mb-0 flex flex-col bg-slate-800 text-gray-200 dark-shadow justify-around bg-opacity-60 drop-shadow-sm'>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label className='p-2 text-green-700 font-bold' htmlFor="platformSelect">Choose Function</label>
                <div style={{ position: 'relative' }}>
                  <select
                    id="platformSelect"
                    value={workfunction}
                    onChange={handleFunctionChange}
                    onClick={() => setFunctionDropdownOpen(!isFunctionDropdownOpen)}
                    onBlur={() => setFunctionDropdownOpen(false)}
                  >
                    <option className='text-center p-2' value="Code_Generation">Code Generation</option>
                    <option className='text-center p-2' value="Code_Completion">Code Completion</option>
                    <option className='text-center p-2' value="Code_Chat">Code Chat</option>
                    <option className='text-center p-2' value="Testcase_Generation">Testcase Generation</option>
                  </select>
                  <span style={{
                    position: 'absolute',
                    right: '8px', // Adjust the right position as needed
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                  }}>{isFunctionDropdownOpen ? '▲' : '▼'}</span>
                </div>
              </div>
              </div>

          </div>
          
            <div className="w-[100%] h-[50%]  flex flex-col  justify-start items-center">
            {workfunction != 'Code_Chat' && <div className='w-[83%] bg-slate-800 text-gray-200 rounded-lg text-center my-5 p-2 bg-opacity-60 dark-shadow' >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="language" className="text-green-700 font-bold">
                  Choose Language
                </label>
                <div style={{ position: 'relative' }}>
                  <select
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    onClick={() => setLanguageDropdownOpen(!isLanguageDropdownOpen)}
                    onBlur={() => setLanguageDropdownOpen(false)}
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
                    <option value="cobol">COBOL</option>
                    <option value="Rust">Rust</option>
                    <option value="Perl">Perl</option>
                    <option value="C">C</option>
                    <option value="Assembly">Assembly</option>
                    <option value="Solidity">Solidity</option>
                  </select>
                  <span style={{
                    position: 'absolute',
                    right: '8px', // Adjust the right position as needed
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                  }}>{isLanguageDropdownOpen ? '▲' : '▼'}</span>
                </div>
              </div>
              </div>}

            </div>
          
        </div>
        <div className="w-[80%] h-[90%]  flex flex-row  justify-center items-center">
          <div className=' w-[95%] h-[95%] functional-area  overflow-y-auto overflow-x-hidden border border-gray-700 rounded-md dark-shadow bg-slate-800 '>

            {workfunction === 'Code_Generation' && <CodeGeneration platformname={selectedPlatform} language={language} />}
            {workfunction === 'Testcase_Generation' && <TestCaseGen platformname={selectedPlatform}  language={language}  setLanguage={setLanguage}/>}
            {workfunction === 'Code_Completion' && <CodeCompletion platformname={selectedPlatform} language={language}/>}
            {workfunction === 'Code_Chat' && <CodeChat platformname={selectedPlatform} />}
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