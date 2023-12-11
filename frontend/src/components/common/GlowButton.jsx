import React from 'react'
import brainIcon from '../images/icons8-creativity-96.png';


const GlowButton = (props) => {
  return (
    <button className="button-85  w-[50%] m-auto flex flex-row items-center justify-evenly" onClick={props.onClick}  >
      <img src={brainIcon} alt="" className='icon-container w-[25px] h-[25px] mx-2 ' />
        <span className='text-gradient bg-gradient-to-r from-blue-500 to-green-500 font-bold hover:font-extrabold'>{props.children}</span> 
        <img src={brainIcon} alt="" className='icon-container w-[25px] h-[25px] mx-2 ' />
    </button>
  )
}

export default GlowButton