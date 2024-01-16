import React, {useState, useEffect } from 'react'
import UserForm from "./UserForm"

const ManageUser = () => {
    const [users, setUsers] = useState([])
    const [formStatus, setFormStatus] = useState(false)
    const [postStatus, setPostStatus] = useState(false)

    const toggleForm = () => {
        setShowForm(!showForm);
      }

    useEffect (() =>{
        fetch('/users')
        .then((r) => r.json())
        .then((data) => setUsers(data))
    }, [postStatus])

    function handlePostStatus() {
        setPostStatus(!postStatus)
    }

    function handleFormStatus() {
        setFormStatus(!formStatus)
    }

    function addUser(newUser) {
        setUsers([... users, newUser])
    }

    const signUpButton = formStatus ? "Cancel" : "SignUp"
    const loginButton = formStatus ? "Cancel" : "Login"

  return (
    <div>
        <h1>Sign Up or Login!</h1>
        <button onClick={toggleForm && handleFormStatus}>{signUpButton}</button>
        <div>
            {formStatus ? 
                showForm &&(
                    <UserForm addUser={addUser} handlePostStatus={handlePostStatus}/>
                ) : null
            }
            {/* {showForm &&(
                <UserForm addUser={addUser} handlePostStatus={handlePostStatus}/>
            )} */}

        </div>
        <button onclick={toggleForm && handleFormStatus}>{loginButton}</button>
        <div>
            {formStatus ? 
                showForm &&(
                    <Login />
            ) :null
            }
        </div>
    </div>
  )
}

export default ManageUser