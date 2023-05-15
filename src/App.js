import React, { useState, useEffect, useReducer } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import HomePage from './component/HomePage'
import 'bootstrap/dist/css/bootstrap.css';
import Register from './component/Register';
import Login from './component/Login';
// import CreaProduct from './component/CreateProduct';
import Navs from './component/Navs';
import About from './component/About';
import Cart from './component/Cart';
import Logout from './component/Logout';
import Order from './component/Order';
import { initialState, reducer } from './reducer/reducer';
import MyOrder from './component/MyOrder';
import UserOrder from './component/UserOrder';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Axios } from './component/commonApi/commonApi';







export const MyContext = React.createContext();


const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState)

  const carts = JSON.parse(localStorage.getItem('cart') || "[]")
  const [loading, setloading] = useState(true);
  const [data, setdata] = useState([]);
  const [cartItems, setCartItems] = useState(carts);
  const [pageNumbers, setPageNumber] = useState(0);
  const [numberofPages, setnumberofPages] = useState(0)
  const [nav,setNav] = useState(false)



const token = localStorage.getItem('jwt')

  const onAdd = async (product) => {
    setCartItems([...cartItems, product])
  }

  const url = `product/getproduct?page=${pageNumbers}`;
  const userdata = async () => {
    
    try {
      const res = await Axios.post(url);
      if (res.status === 200) {
        setdata(res.data.message);
        setnumberofPages(res.data.totalPages);

        setloading(false);
      }
    } catch (err) {
      window.alert(`error`)
    }
  }

  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumbers - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(numberofPages - 1, pageNumbers + 1));
  };

  const onRemove = async (product) => {
    setCartItems(cartItems.filter((x) => x._id !== product._id))
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems])

  useEffect(() => {
    userdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumbers])

  function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          token ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          )
        }
      />
    );
  }
  function LoginPrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          !token ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          )
        }
      />
    );
  }

  return <>
    <Router>
      <MyContext.Provider value={{setNav,nav, userdata, onRemove, onAdd, data, cartItems, loading, state, dispatch, gotoNext, gotoPrevious, setPageNumber, pageNumbers }}>
        <Navs setNav={setNav} nav={nav}/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path="/cart" component={Cart} />
          <LoginPrivateRoute path='/login' component={Login} />
          <LoginPrivateRoute path='/register' component={Register} />
          <PrivateRoute path="/about" component={About} />
          <PrivateRoute path="/logout" component={Logout} />
          <PrivateRoute path="/product/:_id" component={Order} />
          <PrivateRoute path='/my-order' component={MyOrder} />
          <PrivateRoute path='/order/:_id' component={UserOrder} />
          <Redirect to="/" />
        </Switch>
      </MyContext.Provider>
    </Router>
  </>
}

export default App
