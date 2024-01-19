import React, { useState, useEffect } from 'react'
import LangCard from "../components/LangCard"
import image from "../assets/translateLogo.svg"

function Favorites({ user, users }) {
  const [data, setData] = useState([])
  const [filterByUser, setFilterByUser] = useState([])
  const [filteredData, setFilteredData] = useState([])

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

  //const [words, setWords] = useState ([])

  useEffect(() => {
    fetch("/api/favorites")
      .then(response => response.json())
      .then(data => setData(data));
      console.log(data)
  }, []);


  // useEffect(() => {
  //   const user_favorites = data.filer(item => item.user_id === user.id)
  //   setFilterByUser(user_favorites)

  //   // user_favorites ?   useEffect(() => {
  //   //   const result = data.filter(item => item.translatedLang === secondSelectedLang)
  //   //   setFilteredData(result);
  //   //   }, [secondSelectedLang, data]) : null

  // })


  //console.log(result)

  // const onSearch


  return (
    <div>
      {/* <div id="language-focus-card">
      <h2>Focus on a specific language!</h2>
      <select className="languageSelection" value={secondSelectedLang} onChange={e => setSecondSelectedLang(e.target.value)}>
        {secondOptions.map(secondOption => (
          <option key={secondOption.value} value={secondOption.value}>
            {secondOption.label}
          </option>
        ))}
      </select>
      <button><img width='20' height='20' src={image} /></button>
      </div> */}
      {data.map(item => (
        <div key ={item.id}>
          <LangCard
          key = {item.id}
          text={item.input_word} 
          // secondSelectedLang={unknown}
          translatedText= {item.output_word}
          />
        </div>
      ))}
    </div>
  )
}

export default Favorites