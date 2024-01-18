import React, { useState, useEffect } from 'react';

const TranslationComponent = () => {
  const [text, setText] = useState('');
  const l1 = "en"
  const [l2, setL2] = useState("")
  const [translatedText, setTranslatedText] = useState('');
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

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleL2Change = (event) => {
    setL2(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      const response =  
      fetch('/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, l1: l1, l2: l2 }),
      });
      const data = response.json();
      setTranslatedText(data.translatedText);
    } catch (error) {
      console.error('Error translating text:', error);
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
        </div>
      )}
    </div>
  );
};

export default TranslationComponent;
