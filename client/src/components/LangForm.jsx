import { useLoaderData, useParams } from "react-router-dom"
import React, { useState } from "react"
import image from "../assets/translateLogo.svg"

function LangForm({ translatedText }) {

  const [translatedWord, setTranslatedWord] = useState('')

  const [firstSelectedLang, setFirstSelectedLang] = useState("")
  const firstOptions = [
    { value: "en", label: "English" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "it", label: "Italian" },
    { value: "es", label: "Spanish" }
  ]

  const [secondSelectedLang, setSecondSelectedLang] = useState("")
  const secondOptions = [
    { value: "en", label: "English" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "it", label: "Italian" },
    { value: "es", label: "Spanish" },
    { value: "ar", label: "Arabic" },
    { value: "ja", label: "Japanese" },
    { value: "zh", label: "Chinese" }
  ]


  const [langData, setLangData] = useState({
    // originalLang: "",
    originalWord: "",
    // translatedLang: "",
    translatedWord: ""
  })


  const jsonPost = function (event) {
    event.preventDefault();
    fetch("http://localhost:3000/words", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        originalLang: firstSelectedLang,
        originalWord: langData.originalWord,
        translatedLang: secondSelectedLang,
        translatedWord: langData.translatedWord
      })
    })
      .then(res => res.json())
      .then((langForm) => (langForm));
  }
  function handleChange(event) {
    setLangData({
      ...langData,
      [event.target.id]: event.target.value,
    });
  }



  // function handleSubmit(event) {
  //   event.preventDefault();
  //   fetch("http://localhost:5173/words", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(langData),
  //   })
  //   .then(res => res.json())
  //   .then((langForm)=> updateWords(langForm))
  // }

  function handleSubmit(event) {
    event.preventDefault();
    const tranObj = {
      q: langData.originalWord,
      source: firstSelectedLang,
      target: secondSelectedLang,
      format: "text",
      api_key: import.meta.env.VITE_APIKEY
    }
    console.log(tranObj)
    fetch("api/", {
      method: "POST",
      body: JSON.stringify(tranObj),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(data => {
        setTranslatedWord(data.translatedText);
        setLangData({
          ...langData,
          translatedWord: data.translatedText
        });
      })
  }

  return (
    <div>
      {/* <h1>Translation Form!</h1> */}
      <form onSubmit={handleSubmit} className="new-word-form">
        <select className="languageSelection" value={firstSelectedLang} onChange={e => setFirstSelectedLang(e.target.value)}>
          {firstOptions.map(firstOption => (
            <option key={firstOption.value} value={firstOption.value}>
              {firstOption.label}
            </option>
          ))}
        </select>

        <input
          placeholder="Word to be translated.."
          type="text"
          id="originalWord"
          value={langData.originalWord}
          onChange={handleChange} />

        <select className="languageSelection" value={secondSelectedLang} onChange={e => setSecondSelectedLang(e.target.value)}>
          {secondOptions.map(secondOption => (
            <option key={secondOption.value} value={secondOption.value}>
              {secondOption.label}
            </option>
          ))}
        </select>
        <button><img width='20' height='20' src={image} /></button>
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

export default LangForm