import React from 'react'

function LangCard({translatedText, secondSelectedLang, text}) {

    // const [formData, setFormData] = useState({
    //     input_language: '',
    //     input_word: '',
    //     email: '',
    //   });
    //   const [formKey, setFormKey] = useState(Date.now());

    // const handleChange = (event) => {
    //     setFormData({
    //       ...formData,
    //       [event.target.name]: event.target.value
    //     });
    //   }

  return (
    <div>
        <div id="wordCard">
          <h4 id="originalWord">Original Text: {text}</h4>
          <h4 id="translatedWord">Translated Text: {translatedText} </h4>
          {/* <div className="details">
            {isFavorite ? (
              <button className="emoji-button favorite active" onClick={handleFavorite}>★</button>
            ) : (
              <button className="emoji-button favorite" onClick={handleFavorite}>☆</button>
            )}
          </div> */}
      </div>
    </div>
  )
}

export default LangCard