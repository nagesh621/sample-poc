import React, { Component } from 'react';
import './App.css';
import AppNavBar from './AppNavBar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <div>
                <br/>
                <AppNavBar/>
                <Container fluid>
                    <br/>
                    <Button color="primary" tag={Link} to="/workflow">Workflow List</Button>
                </Container>
            </div>
        );
    }
}
export default Home;