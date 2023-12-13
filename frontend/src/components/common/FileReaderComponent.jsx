import React, { useState } from 'react';

const FileReaderComponent = ({setFileContent,setLanguage}) => {

    const fileExtensions = {
        'py': 'Python',
        'js': 'JavaScript',
        'c': 'C',
        'cpp': 'C++',
        'java': 'Java',
        'html': 'HTML',
        'css': 'CSS',
        'php': 'PHP',
        'rb': 'Ruby',
        'swift': 'Swift',
        'go': 'Go',
      };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if(file!=null){
            const reader = new FileReader();

            reader.onload = (e) => {
                const content = e.target.result;
                setFileContent(content);
            };

            reader.readAsText(file);

            const extension = getFileExtension(file.name);
            setLanguage(fileExtensions[extension]);
        }else{
            setFileContent("");
            setLanguage("python");
        }
        
    };

    const getFileExtension = (fileName) => {
        return fileName.split('.').pop();
    };

    return (
        <div className='w-auto text-white  flex flex-row justify-center items-center'>
            <input type="file" className='bg-black rounded-lg dark-shadow'  onChange={handleFileChange} />
        </div>
    );
};

export default FileReaderComponent;
