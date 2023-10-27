import React, { useState } from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import API_Url from '../config/global';
import './SignUp.css';

const SignUp = () => {
    const navigate = useNavigate()
    const initialValue = {
        name: '',
        email: '',
        password: ''
    }
    const [formData, setFormData] = useState(initialValue)

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try{
            const response = await axios.post(`${API_Url}/signin/verify`, formData);
            console.log(response);
            if(response.data === true) {
                alert("Registration link sent to your mail")
            } else if(response.data === false) {
                alert("Users already exist")
            } else if(response?.status) {
                navigate("/login");
            }
        }
        catch (error) {
            console.log("Error during registration", error)
        }
        
    }

  return (
    <Container>
        <h1>Registration Form</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' name='name' value={formData.name} onChange={handleChange} required/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' name='email' value={formData.email} onChange={handleChange} required/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' name='password' value={formData.password} onChange={handleChange} required/>
            </Form.Group>  
            <Button variant='primary' type='submit'>Register</Button>   
            <p>Already have an account? <Link to='/login'>Login</Link></p>       
        </Form>
    </Container>
  )
}

export default SignUp;