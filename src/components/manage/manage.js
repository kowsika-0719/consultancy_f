import { useEffect, useState } from "react";
import {Col, Table, Row, Container, Button} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import "react-bootstrap";
import "./manage.css";
import Header from '../header/header';

const Manage = () => {    
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try{
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user`);
            const data = await response.json();
            setUsers(data);
        }
        catch(err){
            console.error("error while fetching users:",err.message);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleUpdate = (userId) => {
        navigate(`/user/${userId}`);
    }

    const handleDelete = async (userId) => {
        try{
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/${userId}`, {
                method: "DELETE"
            });
            console.log(response);
            if(response.ok){
                fetchUsers();
            }
        }
        catch(err){
            console.error("Error while deleting users:",err.message);
        }
    }

    return (
        <>
        <Header/>
            <Container className="mt-5" align="center">
            <Row>
                <Col>
                    <h1 className="text-center" align="center">Employee Details</h1><br></br>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Gender</th>
                                <th>Salary</th>
                                <th colSpan="2"></th>

                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.salary}</td>
                                    <td>
                                            <Button
                                                variant="black"
                                                onClick={() => handleUpdate(user._id)}
                                            > 
                                                Update
                                            </Button>{" "}
                                            <Button
                                                variant="danger"
                                                onClick={() => handleDelete(user._id)}
                                            > Delete
                                            </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            </Container>
            {/* <h1>Manage component</h1> */}
        </>
    )
}

export default Manage;