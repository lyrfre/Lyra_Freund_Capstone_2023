import React, { useState } from 'react'

function TryTranslate() {

    const [text, setText] = useState("")
    const l1 = "en"
    // const [l1, setL1] = useState("en")
    const [l2, setL2] = useState("")
    const [translation, setTranslation] = useState("")

    // const [form, setForm] = useState({
    //     text: "",
    //     l1: "en",
    //     l2: "",
    // })


    // const handleChange = (e) => {
    //     setL2(e.target.value);
    //   };
    const handleTranslate= (event) =>{
        event.preventDefault()
        fetch("")
    }


  return (
    <div>
        <h1>Try Translate</h1>
        <form onSubmit={handleTranslate} className="new-word-form">
        <input
          placeholder="Word to be translated.."
          type="text"
          id="originalWord"
          value={text}
          onChange={handleChange} />
        <input 
        placeholder='Language to Translate to'
        type='text'
        value={l2}
        onChange={e => setL2(e.target.value)}/>
        <button><img width='20' height='20' src={image}/></button>
      </form>
      {translatedWord &&
        <div id="translated-word-card">
          <p id="translated-word">Your translation: {translatedWord}</p>
          <div>
            <button id="save-button" onClick={jsonPost}>Save Translation!</button>
          </div>
        </div>
      }
    </div>
  )
}

export default TryTranslate