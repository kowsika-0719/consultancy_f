import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import "./adduser.css";
import { useNavigate } from 'react-router-dom';
import Header from '../header/header';

const Adduser = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        gender: "",
        salary: ""
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateEmail = (email) => {
        // Regular expression for basic email validation
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const validatePhone = (phone) => {
        // Regular expression for basic phone number validation (10 digits)
        const re = /^\d{10}$/;
        return re.test(phone);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = {};

        if (!formData.name) {
            errors.name = "Name is required";
        }

        if (!formData.email || !validateEmail(formData.email)) {
            errors.email = "Valid email is required";
        }

        if (!formData.phone || !validatePhone(formData.phone)) {
            errors.phone = "Valid phone number is required";
        }

        if (!formData.gender) {
            errors.gender = "Gender is required";
        }

        if (!formData.salary) {
            errors.salary = "Salary is required";
        }

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        try {
            const response = await fetch('REACT_APP_API_URL/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            const data = await response.json(response);
            console.log(data);
            navigate('/manage'); //manage page

        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <>
        <Header/>
            <div className='center-form' align="center">
                <h1>Add New User</h1>
                <Form onSubmit={handleSubmit} align="center" border="solid black 2px" >
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label><br></br>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label><br></br>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                    </Form.Group>

                    <Form.Group controlId="formBasicPhone">
                        <Form.Label>Phone</Form.Label><br></br>
                        <Form.Control
                            type="text"
                            name="phone"
                            placeholder="Enter phone number"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
                    </Form.Group>

                    <Form.Group controlId="formBasicGender">
                        <Form.Label>Gender</Form.Label><br></br>
                        <Form.Control
                            type="text"
                            name="gender"
                            placeholder="Enter your gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.gender && <p style={{ color: 'red' }}>{errors.gender}</p>}
                    </Form.Group>

                    <Form.Group controlId="formBasicSalary">
                        <Form.Label>Salary</Form.Label><br></br>
                        <Form.Control
                            type="text"
                            name="salary"
                            placeholder="Enter the salary"
                            value={formData.salary}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.salary && <p style={{ color: 'red' }}>{errors.salary}</p>}
                    </Form.Group>

                    <Button variant="dark" type="submit" className="w-100">Add User</Button>
                </Form>
            </div>
        </>
    );
};

export default Adduser;
