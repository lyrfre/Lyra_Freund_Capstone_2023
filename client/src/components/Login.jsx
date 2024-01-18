import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Login = ({ onLogin }) => {
  const [showLogin, setShowLogin] = useState(true);
  const [errors, setErrors] = useState("");

  const navigate = useNavigate();

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [formKey, setFormKey] = useState(Date.now());

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  // const handleSignUp = (event) => {
  //   event.preventDefault();
  //   fetch("/api/users", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(formData),
  //   })
  //     .then((response) => response.json())
  //     .then(() => {
  //       setFormKey(Date.now());
  //     })
  //     // .then(() => toggleForm())
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  function handleSubmit(e) {
    e.preventDefault();
    // setIsLoading(true);
    const userObj = {
      username: formData.username,
      password: formData.password,
    };
    console.log(userObj);
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    }).then((r) => {
      // setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => {
          console.log(user)
          onLogin(user);
          navigate("/home");
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <div>
      <div className="login">
        {/* <button onClick={toggleForm}>Login</button> */}
        <div>
          {/* {showForm &&( */}
          {/* <Form key={formKey} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="username" placeholder="Enter username" onChange={handleChange}/>
              <Form.Text className="text-muted">
                We'll never share your username with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form> */}
          
          <form key={formKey} onSubmit={handleSubmit}>
            <label>
              Username:
              <input type="text" name="username" onChange={handleChange} />
            </label>
            <label>
              Password:
              <input type="text" name="password" onChange={handleChange} />
            </label>
            {/* <label>
                            Email:
                            <input type = "text" email = "email" onChange={handleChange}/>
                        </label>
            <input type="submit" value="Submit" />
          </form> 
          {/* )} */}
          <input type="submit" value="Submit" />

          </form>
                    <h1>Don't have a login?</h1>
          <Button onClick={()=> navigate('/createUser')} variant="info">Click Here to Sign up!</Button>

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
  );
};

export default Login;
