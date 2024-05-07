import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./updateuser.css";
import Header from "../header/header"; 

const Updateuser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        gender: "",
        salary: ""
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/user/${id}`);
                const data = await response.json();
                setFormData(data);
            } catch (err) {
                console.error("error while fetching users:", err.message);
            }
        };
        fetchUser();
    }, [id]);

    const validateEmail = (email) => {
        // Regular expression for basic email validation
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const validatePhone = (phone) => {
        // Regular expression for basic phone number validation (10 digits)
        const re = /^\d{10}$/;
        return re.test(phone);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

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
            const response = await fetch(`http://localhost:5000/api/user/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json(response);
            console.log(data);
            navigate("/manage"); //manage page
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <>
        <Header />
            <div className="center-form">
                <h1>Update User</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label><br />
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.name && <p className="error-msg">{errors.name}</p>}
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label><br />
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.email && <p className="error-msg">{errors.email}</p>}
                    </Form.Group>

                    <Form.Group controlId="formBasicPhone">
                        <Form.Label>Phone</Form.Label><br />
                        <Form.Control
                            type="text"
                            name="phone"
                            placeholder="Enter phone number"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.phone && <p className="error-msg">{errors.phone}</p>}
                    </Form.Group>

                    <Form.Group controlId="formBasicGender">
                        <Form.Label>Gender</Form.Label><br />
                        <Form.Control
                            type="text"
                            name="gender"
                            placeholder="Enter your gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.gender && <p className="error-msg">{errors.gender}</p>}
                    </Form.Group>

                    <Form.Group controlId="formBasicSalary">
                        <Form.Label>Salary</Form.Label><br />
                        <Form.Control
                            type="text"
                            name="salary"
                            placeholder="Enter the salary"
                            value={formData.salary}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.salary && <p className="error-msg">{errors.salary}</p>}
                    </Form.Group>

                    <Button variant="dark" type="submit" className="w-100">
                        Update User
                    </Button>
                </Form>
            </div>
        </>
    );
};

export default Updateuser;
