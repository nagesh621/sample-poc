import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Col, Container, Form, FormGroup, Input, Label,  Row } from 'reactstrap';
import Modal  from 'react-modal';
import AppNavbar from './AppNavBar';
import './App.js';

class WorkflowClose extends Component {

    emptyItem = {
        workflowtype: '',
        tradecenter: '',
        branchcode: '',
        refid: '',
        queue: '',
        productcode: '',
        eventtype: '',
        currency: '',
        amount: '',
        closuretype: '',
        comments: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReview = this.handleReview.bind(this);
    }

    async componentDidMount(){
        if(this.props.match.params.id !== 'new'){
            const workflow = await (await fetch(`/workflow/${this.props.match.params.id}`)).json();
            this.setState({item: workflow});
        }
            let userid='';

            await fetch(`/workflow/canClose/${this.props.match.params.id}`)
            .then(res => res.json())
            .then(
                (data) => {userid = data.userId;}
            )
            if(userid === localStorage.getItem('uname')){
            window.alert('Work Order cannot be closed by same user group');
            this.props.history.push('/workflow');
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
    
        await fetch('/workflow/close/' + item.id, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/workflow');
    }

    async handleReview(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/workflow/review/' +item.id, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/workflow');
    }

    render() {
        const {item} = this.state;
        const title = <h3 style={{ fontWeight: 'bold', color: 'blue'}}>{'Work Order Details'}</h3>;
    
        return (<div>
            <AppNavbar/>
            <Container>
                <div>
                    <Modal
                        isOpen="true"
                        contentLabel="Close Modal">
                            {title}

                            <Form onSubmit={this.handleSubmit}>
                                <Row>
                                    <Col xs="2">
                                        <Label for="workflowtype">Workflow Type</Label>
                                    </Col>
                                    <Col xs="10">
                                        {item.workflowtype}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="2">
                                        <Label for="tradecenter">Trade Center</Label>
                                    </Col>
                                    <Col xs="10">
                                        {item.tradecenter}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="2">
                                        <Label for="branchcode">Branch Code</Label>
                                    </Col>
                                    <Col xs="10">
                                        {item.branchcode}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="2">
                                        <Label for="productcode">Product Code</Label>
                                    </Col>
                                    <Col xs="10">
                                        {item.productcode}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="2">
                                        <Label for="refid">Ref ID</Label>
                                    </Col>
                                    <Col xs="10">
                                        {item.refid}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="2">
                                        <Label for="queue">Queue</Label>
                                    </Col>
                                    <Col xs="10">
                                        {item.queue}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="2">
                                        <Label for="eventtype">Event Type</Label>
                                    </Col>
                                    <Col xs="10">
                                        {item.eventtype}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="2">
                                        <Label for="currency">Currency</Label>
                                    </Col>
                                    <Col xs="10">
                                        {item.currency}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="2">
                                        <Label for="amount">Transaction Amount</Label>
                                    </Col>
                                    <Col xs="10">
                                        {item.amount}
                                    </Col>
                                </Row>
                                <Button color="primary" type="submit">Close Won</Button>
                                <Button color="warning" tag={Link} to="/workflow" onClick={this.handleReview}>Review</Button>
                                <Button color="danger" tag={Link} to="/workflow" >Cancel</Button>
                            </Form>
                    </Modal>
                </div>
            </Container>
        </div>
        );
    }
}
export default withRouter(WorkflowClose);