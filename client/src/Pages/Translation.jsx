import React, { useState, useEffect } from "react";
import LangCard from "../components/LangCard";
import image from "../assets/translateLogo.svg"

const TranslationComponent = ({ user }) => {
  const [text, setText] = useState("");
  const l1 = "en";
  const [l2, setL2] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  // const [languages, setLanguages] = useState([]);

  // useEffect(() => {
  //   const fetchLanguages = () => {
  //     const response =
  //     fetch('/translate',
  //     { method: 'GET' });
  //     const data = response.json();
  //     setLanguages(data);
  //   };

  //   fetchLanguages();
  // }, []);

  // const [secondSelectedLang, setSecondSelectedLang] = useState("")
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


  const saveTranslation = async () => {

    const object = {
      user_id: user.id,
      input_word: text,
      output_word: translatedText,
      }
      console.log(object)
    try {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          input_word: text,
          output_word: translatedText,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error translating text:", error);
    }
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  // const handleL2Change = (event) => {
  //   setL2(event.target.value);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, l1: l1, l2: l2 }),
      });
      const data = await response.json();
      setTranslatedText(data.translatedText);
    } catch (error) {
      console.error("Error translating text:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Text to translate:</label>
          <textarea value={text} onChange={handleTextChange} />
        </div>
        <div>
          <label>
            Select Translation Language:
          </label>
          <select className="languageSelection" value={l2} onChange={e => setL2(e.target.value)}>
            {secondOptions.map(secondOption => (
              <option key={secondOption.value} value={secondOption.value}>
                {secondOption.label}
              </option>
            ))}
        </select>
        </div>
        <button type="submit">Translate</button>
      </form>
      <div>
        { translatedText && (
          <div>
           <LangCard translatedText = {translatedText} secondSelectedLang = {l2} text = {text} /> 
          {user ? (
            <button onClick={saveTranslation}> Save Translation</button>
          ) : null}
          </div>
          )}

      </div>
    </div>
  );
}

export default TranslationComponent;
