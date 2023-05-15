// import React from 'react'
import axios from 'axios'

const token = localStorage.getItem("ecomJwt")
//  const local="http://localhost:5000"
const server="https://ecommerce-node-sooty.vercel.app"
 export const Axios = axios.create({
        baseURL:server,
        headers: {'Authorization':  `Bearer ${token}`
      }
      })
      
