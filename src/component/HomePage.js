import React, { useContext } from 'react'
import { MyContext } from '../App';
import { Card, Button, CardText, Row, Col } from 'reactstrap';
import LoadingSpinners from './LoadingSpinners';
import Footer from './Footer';
// import Navs from './Navs';
//import { useHistory } from 'react-router-dom';

const HomePage = () => {
    // const history = useHistory();
    const context = useContext(MyContext);
    const pages = new Array(context?.pageNumbers + 1).fill(null).map((v, i) => i)


    const load = context.loading;
    const token = localStorage.getItem('jwt')
 
    const login = () => {
        window.alert('please login')
    }
   

    if (load) {
        return <LoadingSpinners />
    } else {
        return <>
       
            <div className='background-img'>

            </div>
            <div className='w3-container mt-5'>
                <div className="w3-card-4  container-fluid">
                    <Row>
                        {
                            context?.data.map((product, key) => {
                                //destructuring the products 
                                const { product_image, product_price, product_name } = product;
                                return (
                                    <Col sm="3" key={key} className="py-3 ">
                                        <Card body style={{ 'min-width': '20rem' }}>
                                            <img src={product_image} className="card-img-top" alt=".." style={{ 'height': "15rem", }} />
                                            <CardText className="text-center mt-2" style={{ 'fontWeight': 'bolder' }}>{product_name}</CardText>
                                            {/* <CardText className="text-center " style={{ 'fontWeight': 'bold' }}>{product_description}</CardText> */}
                                            <CardText className="text-center bold text-bolder" style={{ 'color': '#c78d8d', 'fontWeight': 'bolder' }}>&#8377;{product_price}<span className="text-bolder">/-</span></CardText>
                                            {
                                                token ? <Button className={"btn my-2 mx-5 btn-success " + (context?.cartItems.find((x) => x._id === product._id) ? "disabled" : "btn-success")} onClick={() => context.onAdd(product)}>Add to Cart</Button> : <Button className="btn my-4 mx-5 btn-success" onClick={login}>Add to Cart</Button>
                                            }
                                            {/* <Button className={"btn my-4 mx-5 btn-success " + (cartItems.find((x) => x.id === product.id) ? "disabled" : "btn-success")} onClick={() => onAdd(product)}>Add to Cart</Button> */}
                                            {/* <Button className={"btn my-4 mx-5 btn-success " + (context.cartItems.find((x) => x._id === product._id) ? "disabled" : "btn-success")} onClick={() => context.onAdd(product)}>Add to Cart</Button> */}
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                    </Row>

                </div>
                <div className='pagination my-2'>

                    <button onClick={context.gotoPrevious} className='prv-button btn-primary btn'>Previous</button>
                    {pages.map((index, key) => (

                        <button key={key} onClick={() => context.setPageNumber(index)} className='btn-button btn-success btn mx-2'>{index + 1}</button>
                    ))}
                    <button onClick={context.gotoNext} className='next-button btn-primary btn'>Next</button>
                </div>

            </div>
            <Footer />
        </>
    }
}

export default HomePage
