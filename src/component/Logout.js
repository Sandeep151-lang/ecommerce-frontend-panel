import React, { useEffect, useContext } from 'react'
// import axios from 'axios'
import { useHistory } from 'react-router'
import { MyContext } from '../App'
import { Axios } from './commonApi/commonApi'

const Logout = () => {
    const { dispatch,nav} = useContext(MyContext)
    const history = useHistory();
    useEffect(() => {
        Axios.post('/user/logout').then((res) => {
            if(res){
                localStorage.removeItem('ecomJwt')
                dispatch({ type: 'USER', payload: false })
                history.push('/login', { replace: true })
            }
            
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            <h1>Logout page</h1>
        </div>
    )
}

export default Logout
