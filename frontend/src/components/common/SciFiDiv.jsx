import React from 'react'

const SciFiDiv = (props) => {
  return (
    <div className={props.className+' braced-corners'}>
        {props.children}
    </div>
  )
}

export default SciFiDiv