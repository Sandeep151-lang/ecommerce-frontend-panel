import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
// import axios from 'axios';
import { Col, Row } from 'reactstrap'
// import LoadingSpinners from './LoadingSpinners';
import { Axios } from './commonApi/commonApi';


const UserOrder = () => {
    const { _id } = useParams();

    const [address, setaddress] = useState([])
    const [items, setitem] = useState([])
    // const [loading, setloading] = useState(true);
    const [data, setdata] = useState([])

    // const history = useHistory()
  

    const loaduser = async () => {
        try {
            const res = await Axios.post(`/admin/product/${_id}`)
            setaddress(res?.data?.item?.shippingAddress)
            setitem(res?.data?.item)
            setdata(res?.data?.item?.cartItems)
           
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
       
        loaduser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

        return (
            <div className='container'>
                <h1 className='text-center mt-5 mb-3'>Details</h1>
                <Row>
                    <Col sm={6}>
                        <div className='w3-container'>
                            <div className='w3-card-4 container'>
                                <div className='d-flex flex justify-content-between'>
                                    <caption>Products List</caption>
                                    <caption>Total:<span style={{ 'fontWeight': 'bold', 'color': 'red' }}>  &#8377;{items?.total}/-</span></caption>
                                </div>
                                <hr />
                                {
                                    data.map((item, key) => {
                                        return (
                                            <div className=''>
                                                <div key={key} className='d-flex justify-content-between '>
                                                    <div className='mb-1'>
                                                        <img src={item?.product_image} alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{ "width": "70px" }} />
                                                    </div>
                                                    <div>
                                                        <p className='tex-center' style={{ 'fontWeight': 'bold' }}>{item?.product_name}</p>
                                                    </div>
                                                    <div>
                                                        <p className='text-center' style={{ 'fontWeight': 'bold', 'color': 'green' }}> &#8377;{item?.product_price}/- </p>
                                                    </div>
                                                </div>
                                                <hr />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="w3-container">
                            <div className="w3-card-4" style={{ "width": "80%" }}>
                                <header className="w3-container w3-light-grey">
                                    <h3>{address.name}</h3>
                                </header>
                                <div className="w3-container">
                                    <br />
                                    <p><span style={{ 'fontWeight': 'bold' }}>Country:-</span> {address.country}</p>
                                    <p><span style={{ 'fontWeight': 'bold' }}>City:-</span> {address.city}</p>
                                    <p><span style={{ 'fontWeight': 'bold' }}>Address:- </span>{address.address}</p>
                                    <p><span style={{ 'fontWeight': 'bold' }}>Pincode:-</span> {address.pincode}</p>
                                </div>
                                <hr />
                                <p className='m-3'><span style={{ 'fontWeight': 'bold' }}>Status:-</span> <span style={{ 'fontWeight': 'bold', 'color': 'green' }}>{items.status}</span></p>
                            </div>
                        </div>
                    </Col>

                </Row>
            </div >
        )

    
}

export default UserOrder
