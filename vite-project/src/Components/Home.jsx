import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import axios from 'axios';
import API_Url from '../config/global';
import './Home.css'

const Home = () => {
  const [res, setRes] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if(user && user.token) {
      getData(user.token)
    }
  },[])

  const getData = async(token) => {
    try{
        const config = {
          headers: {
            Authorization: token
          }
        }
        const response = await axios.get(`${API_Url}/home`, config);
        console.log(response);
        if(response.data === "Invalid Token") {
          alert("Login again");
      } else if(response.data === "Server Busy") {
          alert("unauthorized access");
      } else if(response?.status) {
          setRes(response.data);
      }   
    }
    catch (error) {
        console.log(error)
    }   
}
  return (
    <Container>
        <h1>Welcome, {res.name}</h1>
       
        <p>We are here to serve</p>
        <Button variant='primary' type='submit'>Get Started</Button>
    </Container>
  )
}

export default Home;