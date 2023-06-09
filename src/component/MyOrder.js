import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import { useHistory, NavLink } from 'react-router-dom'
// import LoadingSpinners from './LoadingSpinners';
import { Axios } from './commonApi/commonApi';

const MyOrder = () => {
    const history = useHistory()
    const [lis, setlist] = useState([])
    // const [loading, setloading] = useState(true);



const token = localStorage.getItem('ecomJwt')

    const list = async () => {
        const payload={
            token
        }
        try {
            const res = await Axios.post('/payment/getdetails',payload)

            if (res.status === 200) {
                setlist(res?.data?.message)
            }
        } catch (err) {

            history.push('/login')
        }
    }


    const edit = async (_id) => {
        try {
            await Axios.post(`/admin/product/${_id}`)
            history.push(`/order/${_id}`)
        } catch {
            console.log('error')
        }
    }

    useEffect(() => {
       
        list()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // const p = { message: lis };
    // const ar = p.message?.map((product) => product);
  
   if (token) {
        return (
            <div className='container mt-5'>
                <table className="table caption-top">
                    <caption>List of Orders</caption>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Product Name</th>
                            <th scope='col'>Status</th>
                            <th scope="col">View-Product</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            lis?.map((item, key) => {
                                return (
                                    <tr key={key}>
                                        <th scope="row">{key + 1}</th>
                                        <td>{item?._id}</td>
                                        <td style={{ 'fontWeight': 'bold', 'color': '#a9559b' }}>{item?.status}</td>
                                        <td><Button className='btn btn-success' onClick={(e) => { edit(item?._id) }}><i className="fal fa-edit"></i></Button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    } else {
        return (
            <div className='w3-container'>
                <div className='w3-card-4 container user-detail'>
                    <NavLink to='/'><i className="fas fa-shopping-cart" style={{ 'fontSize': '100px', 'position': 'absolute', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%,-50%)', 'color': '#ff2f00d6' }}></i></NavLink>
                    <NavLink to='/'><h1 style={{ 'position': 'absolute', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%,-262%)', 'color': 'black', 'fontSize': '29.5px' }}>Shop Now</h1></NavLink>
                </div>
            </div>
        )
    }
}

export default MyOrder
