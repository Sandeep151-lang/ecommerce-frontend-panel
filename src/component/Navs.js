import React, { useContext } from 'react'
import { MyContext } from '../App';
import { NavLink } from 'react-router-dom';


const Navs = () => {

    const context = useContext(MyContext);
 
  const logout = ()=>{
    context.setNav(false)
  }

  const token = localStorage.getItem('ecomJwt')
    if (token) {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light w3-card-4">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <NavLink className="navbar-brand" to='/'>Home</NavLink>

                        </ul>
                        <span className="navbar-text">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className='nav-link' to="/about">About</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className='nav-link' to="/my-order">My-Order</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className='nav-link' to="/logout" onClick={logout}>logout</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/cart"><i className="nav-link far fa-2x fa-shopping-cart">
                                        <span className='cart'
                                            style={{ 'position': 'relative', 'bottom': '25px', 'right': '15px', 'zIndex': '1', 'color': 'red', 'fontSize': '70%', 'fontWeight': 'bolder' }}>{context.cartItems.length}</span>
                                    </i></NavLink>
                                </li>
                            </ul>

                        </span>
                    </div>

                </div>
            </nav>
        )
    } else {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light container-fluid  w3-card-4">
                <div className="container-fluid">

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <NavLink className="navbar-brand" to='/'>Home</NavLink>

                        </ul>
                        <span className="navbar-text">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className='nav-link' to="/login">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className='nav-link ' to="/register">Register</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/cart"><i className="nav-link far fa-2x fa-shopping-cart"><span className='cart text-bolder' style={{ 'position': 'relative', 'bottom': '25px', 'right': '15px', 'zIndex': '1', 'color': 'red', 'fontSize': '70%', 'fontWeight': 'bolder' }}>{context.cartItems.length}</span></i></NavLink>
                                </li>
                            </ul>

                        </span>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navs
