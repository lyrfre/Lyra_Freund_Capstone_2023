import React, { useState } from 'react'
import React from 'react'


const UserForm = ( { addUser, handlePostStatus }) => {

    const [form, setForm] = useState ({
        id: "",
        username: "",
        password: "",
        email: '',
    })

    const handleChange = (e) => {
        setForm({
            ...form,

            // id or name??
            [e.target.name]: e.target.value,
        })
    }

    const [formKey, setFormKey] = useState(Date.now());

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("/users", {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(form),
            })
            .then(r => r.json())
            .then(() =>{
                setFormKey(Date.now())
            })
            .then(newUser => {
                addUser(newUser)
                handlePostStatus()
            })
            .then(setForm({
                username: '',
                password: '',
                email: '',
            }))
            .catch(error => {
                console.error('Error:', error);
              })
            }

    
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
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type = "text" name = "username" value = {form.username} onChange={handleChange} required />
                </label>
                <label>
                    Password:
                    <input type = "text" name = "password" value = {form.password} onChange={handleChange} required />
                </label>
                <label>
                    Email:
                    <input type = "text" name = "email" value = {form.email} onChange={handleChange} required />
                </label>
                <button type = "submit">Submit</button>
            </form>

        </div>
    )

export default UserForm