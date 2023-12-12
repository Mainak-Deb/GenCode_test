import React from 'react'
import { CodeBlock } from "react-code-blocks";
import myCustomTheme from '../theme';
import RainbowButton from './RainbowButton';



const CodeSection = ({content,language,handleCopyClick}) => {
    return (
        <div className="w-[90%] dark-gradient  m-auto my-4 p-2 text-left flex flex-col justify-center ">
            <CodeBlock
                text={content}
                language={language}
                showLineNumbers={true}
                theme={myCustomTheme}
                startingLineNumber={1}
                codeBlock={{ wrapLines: true }}
            />
            <RainbowButton onClick={handleCopyClick} className="w-[50%] m-auto mt-4 mb-2 text-center" >Copy to Clipboard</RainbowButton>
        </div>
    )
}

export default CodeSection