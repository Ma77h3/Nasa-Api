import React from 'react'
import { useState } from 'react'
import "../css/LikeButton.css"

export default function LikeButton() {

    //initialize the text for the buttin
    const [buttonText, setButtonText] = useState("Like");

    //when the button is click change the text based on what it was before
    const handleClick = () =>{
        if (buttonText === "Like") setButtonText("Unlike")
        else setButtonText("Like");
    }

    return (
        <div>
            <button id="btn" onClick={handleClick}>{buttonText}</button>
        </div>
    )
}
