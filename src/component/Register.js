import React, { useState } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { useHistory } from 'react-router'
import { Axios } from './commonApi/commonApi'


const Register = () => {
    const history = useHistory();
    const [register, setregister] = useState({
        name: '',
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
            const url = `user/register`;
            const d = await Axios.post(url, register);
            setregister(d?.data);
            window.alert(d?.data?.message)
            history.push('/login')
        } catch (error) {
            window.alert(error?.response?.data?.message)
        }
    }


    return (
        <div className="container">
            <h2 className="text-center mt-5">Register User</h2>
            <hr />
            <Form inline className="mt-5 ml-5">
                <FormGroup className="mb-3 mr-sm-2 mb-sm-0">
                    <Label for="examplePassword" className="mr-sm-2">Enter Name</Label>
                    <Input type="text" id="name" placeholder='Enter name' value={register.name} onChange={onchange} />
                </FormGroup>
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

export default Register
