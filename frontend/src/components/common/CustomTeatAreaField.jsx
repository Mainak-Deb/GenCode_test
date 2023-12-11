import React from 'react'

const CustomTextAreaField = (props) => {
    return (
        <>
            <span class={props.className+ " input opacity-80"}>
                <textarea
                    type="text"
                    placeholder={props.placeholder}
                    rows={props.rows}
                    className="bg-black text-green-100 p-4 font-serif text-lg"
                    value={props.value}
                    onChange={props.onChange}
                />
                <span></span>
            </span>
        </>

    )
}

export default CustomTextAreaField