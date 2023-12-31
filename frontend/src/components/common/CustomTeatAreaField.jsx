import React from 'react'

const CustomTextAreaField = (props) => {
    return (
        <>
            <span className={props.className+ " input opacity-80"}>
                <textarea
                    type="text"
                    placeholder={props.placeholder}
                    rows={props.rows}
                    className="bg-black text-green-100 p-4 text-lg"
                    value={props.value}
                    onChange={props.onChange}
                    style={{
                        resize:"none",
                        height:"100%"
                    }}
                />
                <span></span>
            </span>
        </>

    )
}

export default CustomTextAreaField