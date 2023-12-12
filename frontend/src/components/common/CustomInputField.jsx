import React from 'react'

const CustomInputField = (props) => {
    return (
        <>
            <span className={props.className+ " input opacity-80"}>
                <input
                    type="text"
                    placeholder={props.placeholder}
                    className="bg-black text-green-100 py-2 px-4  text-lg"
                    value={props.value}
                    onChange={props.onChange}
                />
                <span></span>
            </span>
        </>

    )
}

export default CustomInputField