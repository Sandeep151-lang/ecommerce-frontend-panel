import React, { useState, useContext } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { useHistory } from 'react-router'

import { MyContext } from '../App'
import { Axios } from './commonApi/commonApi'

const Login = () => {

    const { dispatch,setNav } = useContext(MyContext)
    
    const history = useHistory();
    const [register, setregister] = useState({
        email: '',
        password: ''
    })

    const onchange = (e) => {
        const name = e.target.id;
        setregister({ ...register, [name]: e.target.value });
    }

    const onclick = async (e) => {
        e.preventDefault();
        try {
            const res = await Axios.post('/user/log', register);
            const { token,email,name } = res?.data;
            if (res.status === 200) {
                localStorage.setItem('ecomJwt', token)
                setNav(false)
                dispatch({ type: 'USER', payload: true })
                sessionStorage.setItem('email',email)
                sessionStorage.setItem('name',name)
                setregister(res?.data)
                window.alert('Login successfull')
                history.push('/home',{replace:true})
                // history.push('/login', { replace: true })
            }
        } catch (error) {

            window.alert(error?.response?.data?.message)
        }
    }

    return (
        <div className="container">
            <h2 className="text-center mt-5">Login User</h2>
            <hr />
            <Form inline className="mt-5 ml-5">
                <FormGroup className="mb-3 mr-sm-2 mb-sm-0">
                    <Label for="examplePassword" className="mr-sm-2">Enter email</Label>
                    <Input type="email" id="email" placeholder="Enter email" value={register.email} onChange={onchange} />
                </FormGroup>
                <FormGroup className="mb-3 mr-sm-2 mb-sm-0">
                    <Label for="exampleEmail" className="mr-sm-2">Enter Password</Label>
                    <Input type="password" id="password" placeholder="Enter password" value={register.password} onChange={onchange} />
                </FormGroup>
                <Button className='btn my-5  btn-success btn-login' onClick={onclick}>submit</Button>

            </Form >
        </div>
    )
}

export default Login;
