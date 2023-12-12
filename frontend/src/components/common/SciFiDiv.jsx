import React from 'react'

const SciFiDiv = (props) => {
  return (
    <div className={props.className+' braced-corners dark-shadow'}>
        {props.children}
    </div>
  )
}

export default SciFiDiv