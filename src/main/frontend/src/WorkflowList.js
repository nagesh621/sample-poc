import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavBar from './AppNavBar';
import { Link } from 'react-router-dom';

class WorkflowList extends Component {

    constructor(props) {
        super(props);
        this.state = {workflows: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/workflow')
            .then(response => response.json())
            .then(data => this.setState({workflows: data}));
    }

    async remove(id) {
        await fetch(`/workflow/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedworkflows = [...this.state.workflows].filter(i => i.id !== id);
            this.setState({workflows: updatedworkflows});
        });
    }
    
    render() {
        const {workflows, isLoading} = this.state;
    
        if (isLoading) {
            return <p>Loading...</p>;
        }
    
        const workflowList = workflows.map(workflow => {
            return <tr key={workflow.id}>
                <td style={{whiteSpace: 'nowrap'}}>{workflow.name}</td>
                <td>{workflow.email}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/workflow/" + workflow.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(workflow.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });
    
        return (
            <div>
                <AppNavBar/>
                <Container fluid>
                    <br/>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/workflow/new">New Workflow</Button>
                    </div>
                    <br/>
                    <h3>Workflows</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Name</th>
                            <th width="30%">Email</th>
                            <th width="40%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {workflowList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}


export default WorkflowList;