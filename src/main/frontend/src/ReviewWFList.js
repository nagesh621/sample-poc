import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';

import { Link, withRouter } from 'react-router-dom';
import Modal from 'react-modal';

class ReviewWFList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reviewworkflows: []
        };
    }

    componentDidMount() {
            fetch('/workflow/reviewwf')
            .then(response => response.json())
            .then(data => this.setState({reviewworkflows: data}));           
    }
 
    
    render() {
        const {reviewworkflows, isLoading} = this.state;
    
        if (isLoading) {
            return <p>Loading...</p>;
        }

        const reviewworkflowList = reviewworkflows.map(reviewworkflows => {
            return <tr key={reviewworkflows.id}>
                <td>{reviewworkflows.id}</td>
                <td style={{whiteSpace: 'nowrap'}}>{reviewworkflows.workflowtype}</td>
                <td>{reviewworkflows.tradecenter}</td>
                <td>{reviewworkflows.branchcode}</td>
                <td>{reviewworkflows.refid}</td>
                <td>{reviewworkflows.queue}</td>
                <td>{reviewworkflows.productcode}</td>
                <td>{reviewworkflows.currency}{reviewworkflows.amount}</td>
                <td>{reviewworkflows.closuretype}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" href={"/workflow/" + reviewworkflows.id}>Edit</Button>
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
                        {reviewworkflowList}
                        </tbody>
                    </Table>      
                </Container>
            </div>
        );
    }
}


export default ReviewWFList;