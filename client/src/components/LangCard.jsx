import React from 'react'

function LangCard() {

    const [formData, setFormData] = useState({
        input_language: '',
        input_word: '',
        email: '',
      });
      const [formKey, setFormKey] = useState(Date.now());

    const handleChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value
        });
      }
      
      function handleSubmit(e) {
        e.preventDefault();
        // setIsLoading(true);
        fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }).then((r) => {
          setIsLoading(false);
          if (r.ok) {
            r.json().then((user) => onLogin(user));
          } else {
            r.json().then((err) => setErrors(err.errors));
          }
        });
      }

  return (
    <div>
        <div>
            <form key = {formKey} onSubmit = {handleSubmit}>
                <label>
                    Input Language:
                    <input type = "text" input_language = "input language" onChange={handleChange}/>
                </label>
                <label>
                    Text:
                    <input type = "text" input_word = "input word" onChange={handleChange}/>
                </label>
            </form>
        </div>
    </div>
  )
}

export default LangCard