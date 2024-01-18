import React, { useState } from "react";
import Button from "react-bootstrap/Button";


const EditUser = ({ user, deleteUser, setUser }) => {
  const [form, setForm] = useState({
    username: !user ? ""  :user.username,
    email: !user ? ""  :user.email,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form)
    fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((r) => r.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // const handleSignUp = (event) => {
  //     event.preventDefault();
  //     fetch('/users', {
  //         method: 'POST',
  //         headers:{
  //         'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(formData),
  //     })
  //     .then(response => response.json())
  //     .then(() => {
  //         setFormKey(Date.now());
  //     })
  //     // .then(() => toggleForm())
  //     .catch(error => {
  //         console.error('Error:', error);
  //     });
  // }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </label>
        {/* <label>
          Password:
          <input
            type="text"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label> */}
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <Button variant="primary" type="submit">Submit</Button>
      </form>
        <Button onClick={() => deleteUser(user.id)} variant="danger">Delete The User Profile</Button>
    </div>
  );
};

export default EditUser;
