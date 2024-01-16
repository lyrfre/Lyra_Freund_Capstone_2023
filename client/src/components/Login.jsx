








import React from 'react'

const login = () => {
  const [showLogin, setShowLogin] = useState(true);

    const toggleForm = () => {
        setShowForm(!showForm);
      }

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
      });
      const [formKey, setFormKey] = useState(Date.now());
     
      const handleChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value
        });
      }
    const handleSignUp = (event) => {
        event.preventDefault();
        fetch('/users', {
            method: 'POST',
            headers:{
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(() => {
            setFormKey(Date.now());
        })
        // .then(() => toggleForm())
        .catch(error => {
            console.error('Error:', error);
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
        <div className='login'>
            {/* <button onClick={toggleForm}>Login</button> */}
            <div>
                {/* {showForm &&( */}
                    <form key={formKey} onSubmit={handleSubmit}>
                        <label>
                            Username:
                            <input type = "text" username = "username" onChange={handleChange}/>
                        </label>
                        <label>
                            Password:
                            <input type = "text" password = "password" onChange={handleChange}/>
                        </label>
                        <label>
                            Email:
                            <input type = "text" email = "email" onChange={handleChange}/>
                        </label>
                        <input type = "submit" value = "Submit"/>
                    </form>
                {/* )} */}
            </div>
        </div>
        {/* <div className='create_account_btn_frm'>
            <button onClick={toggleForm}>Create an Account</button>
            <div>
                {showForm && (
                    <form key={formKey} onSubmit={handleSignUp}>
                        <label>
                            Select Username:
                            <input type = "text" username = "username" onChange={handleChange}/>
                        </label>
                        <label>
                            Select Password:
                            <input type= "text" password = "password" onChange={handleChange}/>
                        </label>
                        <label>
                            Insert Email:
                            <input type = "text" email = "email" onChange={handleChange}/>
                        </label>
                        <input type = "submit" value = "Submit"/>
                    </form>
                    )}
            </div>
        </div> */}
    </div>
  )
}

export default login