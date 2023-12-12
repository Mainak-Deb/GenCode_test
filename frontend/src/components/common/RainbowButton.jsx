import React from 'react'

const RainbowButton = ({children,className,onClick}) => {
  return (
    <div className={className+' bn30'} onClick={onClick}  >{children}</div>
  )
}  

export default RainbowButton