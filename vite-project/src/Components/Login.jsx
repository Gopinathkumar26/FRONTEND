import React, { useState } from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import API_Url from '../config/global';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();

    const initialValue = {
        email: '',
        password: ''
    }
    const [formData, setFormData] = useState(initialValue);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setFormData();
        try{
            const response = await axios.post(`${API_Url}/login`, formData);
            console.log(response);
            if(response.data === "Invalid Username or Password") {
                alert("Invalid Username or Password");
            } else if(response.data === "Server Busy") {
                alert("Verify your email");
            } else if(response?.status) {
                localStorage.setItem("userInfo", JSON.stringify(response.data));
                navigate("/home");
            }
        }
        catch (error) {
            console.log(error)
        }
        
    }

  return (
    <Container>
        <h1>Login Form</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' name='email' value={formData.email} onChange={handleChange} required/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' name='password' value={formData.password} onChange={handleChange} required/>
            </Form.Group>  
            <Button variant='primary' type='submit'>Login</Button>   
            <p>Don't have an account? <Link to='/'>Signup</Link></p>       
        </Form>
    </Container>
  )
}

export default Login;