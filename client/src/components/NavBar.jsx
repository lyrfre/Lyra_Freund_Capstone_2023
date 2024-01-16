import React from 'react'

function NavBar() {
  return (
    <div>
        <h1>
            <div className='container'>
                <div className='navbar'>
                    <NavLink exact to="/" activeClassName="active-link">
                    </NavLink>
                    <NavLink to="/home" activeClassName="active-link">
                    </NavLink>
                    <NavLink to="/translation" activeClassName="active-link">
                    </NavLink>
                    <NavLink to="/favorites" activeClassName="active-link">
                    </NavLink>
                </div>
            </div>
            <main>
                <Outlet />
            </main>
        </h1>
    </div>
  )
}

export default NavBar