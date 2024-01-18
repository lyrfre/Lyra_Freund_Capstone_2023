import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Login from "./Login";

function NavBar({ user, onLogin, handleLogOut }) {
    console.log(user)
  return (
    <div>
      <h1>
        <div className="container">
          <div className="navbar">
            <NavLink to="/"></NavLink>
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/translation">Translation</NavLink>
            {user ? <NavLink to="/favorites">Favorites</NavLink> : null}
            {user ? <NavLink to="/home" onClick={() =>handleLogOut()}>Sign out</NavLink> : <NavLink to="/Login">Login</NavLink> }
            {user ? <NavLink to="/editUser">Edit User</NavLink> : null }

          </div>
        </div>
        <main>
          <Outlet />
        </main>
      </h1>
    </div>
  );
}

export default NavBar;
