import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';

class PendingWFList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            workflows: []
        };
    }

    componentDidMount() {
        fetch('/workflow')
            .then(response => response.json())
            .then(data => this.setState({workflows: data}));
    }
 
    
    render() {
        const {workflows, isLoading} = this.state;
    
        if (isLoading) {
            return <p>Loading...</p>;
        }
    
        const workflowList = workflows.map(workflows => {
            return <tr key={workflows.id}>
                <td>{workflows.id}</td>
                <td style={{whiteSpace: 'nowrap'}}>{workflows.workflowtype}</td>
                <td>{workflows.tradecenter}</td>
                <td>{workflows.branchcode}</td>
                <td>{workflows.refid}</td>
                <td>{workflows.queue}</td>
                <td>{workflows.productcode}</td>
                <td>{workflows.currency}{workflows.amount}</td>
                <td>{workflows.closuretype}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" href={"/workflow/" + workflows.id}>Edit</Button>
                        <Button size="sm" color="danger" href={"/workflow/close/" + workflows.id}>Close</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });
    
        return (
            <div>
                <Container fluid>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="10%">Won ID</th>
                            <th width="10%">Workflow Type</th>
                            <th width="10%">Trade Center</th>
                            <th width="10%">Branch Code</th>
                            <th width="10%">Ref ID</th>
                            <th width="10%">Queue</th>
                            <th width="10%">Product Code</th>
                            <th width="10%">Event Type</th>
                            <th width="10%">Transaction Amt</th>
                            <th width="10%">Closure Type</th>
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


export default PendingWFList;