import React from 'react'

const GlitchText = ({ children, className }) => {
    return (
        <div className={className +" text-3d"}>
            {children}
        </div>
    )
}

export default GlitchText