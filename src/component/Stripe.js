
import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { useHistory } from 'react-router-dom';

import { Button } from 'reactstrap';
import { Axios } from './commonApi/commonApi';


const Stripe = (props) => {
    console.log(props)
    const {   cart, total } = props;
    const jwtToken = localStorage.getItem('ecomJwt')
    const name = sessionStorage.getItem('name')
    const email = sessionStorage.getItem('email')

    const history = useHistory();
    const login = () => {
        history.push('/login')
        window.alert('please login to buy')
    }

    const handleToken = async (token) => {
       
        
        try {
            await Axios.post(`/payment/list`, {
                token: token,
                total,
                cart,
                name,
                email,
                
                address: token?.card
            });
            window.alert('order successfull')
        } catch (error) {
            
            window.alert('order not success')
        }
    }

    if (jwtToken) {
        return (
            <StripeCheckout
                email={email}
                name={name}
                amount={total * 100}
                currency="INR"
                token={handleToken}
                shippingAddress
                stripeKey="pk_test_51K1p90SJsqVvBs7npny7nMtvteAWloxVwaITgnSKRh3gTXqoRHWThem1HW7bQpl0ldekn1jJJJJZU6cEjm6SANfw00EdhkkMey"
            >
                <Button className="btn btn-danger">Buy</Button>
            </StripeCheckout>
        )
    } else {
        return <Button className="btn btn-danger" onClick={login} style={{ 'width': '50px' }}> Buy</Button>
    }

}

export default Stripe
