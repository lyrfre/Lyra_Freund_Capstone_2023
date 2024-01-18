import React, { useState, useEffect } from "react";

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

  const handleL2Change = (event) => {
    setL2(event.target.value);
  };

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
          <label>Target Language (example: 'es'):</label>
          <input type="text" value={l2} onChange={handleL2Change} />
        </div>
        <button type="submit">Translate</button>
      </form>
      {translatedText && (
        <div>
          <h3>Translated Text:</h3>
          <p>{translatedText}</p>
          {user ? (
            <button onClick={saveTranslation}> Save Translation</button>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default TranslationComponent;
