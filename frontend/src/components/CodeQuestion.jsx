import React, { useState } from 'react'
import axios from 'axios';
import Markdown from 'react-markdown'

const CodeQuestion = ({ paltformname }) => {
    const [code, setCode] = useState('');
    const [query, setQuery] = useState('');
    const [content, setContent] = useState('# *Interra Ai:* code will be shown here!')
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const formData = {
          code,
          query,
        };
  
        const response = await axios.post('http://127.0.0.1:8080/codequery', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        console.log('Response:', response.data);
        setContent(response.data.content)

  
        // Reset form fields after successful submission
        setQuery('');
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    return (
      <div className="max-w-md mx-auto mt-8 p-6 border rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Query from code</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="code" className="block text-sm font-medium mb-1">
              Code
            </label>
            <textarea
              id="code"
              className="w-full border rounded-md p-2"
              rows="6"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="query" className="block text-sm font-medium mb-1">
              Query
            </label>
            <input
              type="text"
              id="query"
              placeholder="Enter query"
              className="w-full border rounded-md p-2"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        <div className='bg-white w-[90%] m-auto my-4 overflow-scroll'>
          <Markdown>{content}</Markdown>
        </div>
      </div>
    )
}

export default CodeQuestion