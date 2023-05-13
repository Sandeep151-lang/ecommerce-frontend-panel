import React from 'react';
// import axios from 'axios';
// import { useHistory } from 'react-router'
import { Card } from 'reactstrap'
// import LoadingSpinners from './LoadingSpinners';


const About = () => {
    // const [loading, setloading] = useState(true);
    // const history = useHistory();
    
 const email= sessionStorage.getItem('email')
 const name = sessionStorage.getItem('name')
   
        return (
            <div>
                <h1 className="text-center">User Details</h1>

                <div className="container mt-5" style={{ "width": "80%", "height": "70%" }}>
                    <Card>
                        <p className="font-weight-bold py-2 mx-3"><span style={{ 'fontWeight': 'bold', 'fontSize': '25px' }}>Name :</span> <span className="text-center text-dark" style={{ 'fontSize': '19px' }}>{name}</span></p>
                        <p className="font-weight-bold py-2 mx-3"><span style={{ 'fontWeight': 'bold', 'fontSize': '25px' }}>Email_id :</span> <span className="text-dark" style={{ 'fontSize': '19px' }}>{email}</span></p>
                        {/* <p className="font-weight-bold py-2 mx-3"><span style={{ 'fontWeight': 'bold', 'fontSize': '25px' }}>Role : </span><span className="text-dark" style={{ 'fontSize': '19px' }}>{data?.role}</span></p> */}
                    </Card>
                </div>
            </div>
        )
    
}

export default About
