import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import  Modal  from 'react-modal';
import AppNavbar from './AppNavBar';
import './App.js';

class WorkflowEdit extends Component {

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
        this.handleChange = this.handleChange.bind(this);
        this.handleToggleChange = this.handleToggleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const workflow = await (await fetch(`/workflow/${this.props.match.params.id}`)).json();
            this.setState({item: workflow});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    handleToggleChange(event){
        const target = event.target;
        const value = target.id;
        const name = target.name;
        let item = {...this.state.item};
        item[name]=value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
    
        await fetch('/workflow' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/workflow');
        window.location.reload();
    }

    render() {
        const {item} = this.state;
        const title = <h3 style={{ fontWeight: 'bold', color: 'blue'}}>{item.id ? 'Edit Work Order':'New Work Order'}</h3>;
    
        return( <div>
            <AppNavbar/>
            <Container>
                <div>
                    <Modal
                        isOpen="true"
                        contentLabel="Workflow Modal">
                            {title}
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Row>
                                        <Col xs="3">
                                            <Label for="workflowtype">Workflow Type</Label>
                                            <select class="form-select" style={{width: "100%"}}
                                                onChange={(e) => {this.handleChange(e)}}>
                                                    <option name="workflowtype" id="ASIASPWF" value="ASIASPWF"> ASIASPWF</option>
                                                    <option name="workflowtype" id="ASIALIWF" value="ASIALIWF"> ASIALIWF</option>
                                                    <option name="workflowtype" id="ASIASRIWF" value="ASIASRIWF"> ASIASRIWF</option>
                                            </select>
                                        </Col>
                                        <Col xs="9">
                                            <Label for="tradecenter">Trade Center</Label>
                                            <Input type="text" name="tradecenter" id="tradecenter" value={item.tradecenter || ''}
                                                onChange={this.handleChange} autoComplete="tradecenter"/>
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Col xs="2">
                                            <Label for="branchcode">Branch Code</Label>
                                            <select name="branchcode" class="form-select" style={{width:"100%"}} onChange={(e) =>{this.handleChange(e)}}>
                                                <option name="branchcode" id="100" value="100">100</option>
                                                <option name="branchcode" id="615" value="615">615</option>
                                                <option name="branchcode" id="781" value="781">781</option>
                                            </select>
                                        </Col>
                                        <Col xs="9">
                                            <Label for="productcode">Product Code</Label>
                                            <select name="productcode" class="form-select" style={{width:"20%"}} onChange={(e) =>{this.handleChange(e)}}>
                                                <option name="productcode" id="bg" value="BG">BG</option>
                                                <option name="productcode" id="lc" value="LC">LC</option>
                                            </select>
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Col>
                                            <Label for="refid">Ref ID</Label>
                                            <Input type="text" name="refid" id="refid" value={item.refid || ''}
                                                onChange={this.handleChange} autoComplete="refid" />
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Col xs="3">
                                            <Label for="queue">Queue</Label>
                                            <select name="queue" class="form-select" style={{width:"100%"}} onChange={(e) =>{this.handleChange(e)}}>
                                                <option name="queue" id="scandesk" value="Scan Desk Queue">Scan Desk Queue</option>
                                                <option name="queue" id="doccheck" value="Doc Check Queue">Doc Check Queue</option>
                                                <option name="queue" id="terminate" value="Terminate">Terminate</option>
                                            </select>
                                        </Col>
                                        <Col xs="9">
                                            <Label for="evenettype">Event Type</Label>
                                            <select name="evenettype" class="form-select" style={{width:"25%"}} onChange={(e) =>{this.handleChange(e)}}>
                                                <option name="evenettype" id="New" value="New">New</option>
                                                <option name="evenettype" id="Update" value="Update">Update</option>
                                                <option name="evenettype" id="cancel" value="Cancel">Cancel</option>
                                            </select>
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                    <Col xs="2">
                                            <Label for="currency">Currency</Label>
                                            <select name="currency" class="form-select" style={{width:"100%"}} onChange={(e) =>{this.handleChange(e)}}>
                                                <option name="currency" id="inr" value="INR">INR</option>
                                                <option name="currency" id="eur" value="EUR">EUR</option>
                                                <option name="currency" id="usd" value="USD">USD</option>
                                            </select>
                                    </Col>
                                    <Col xs="10">
                                            <Label for="amount">Transaction Amount</Label>
                                            <Input type="text" style={{width:"33%"}} name="amount" id="refid" value={item.amount || ''}
                                                onChange={this.handleChange} autoComplete="amount" />
                                    </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Col xs="6">
                                            <Label for="comments">Comments</Label>
                                            <Input type="text" style={{width: "90%"}} name="comments" id="comments" value={item.comments || ''}
                                                onChange={this.handleChange} autoComplete="comments" />
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="closuretype">Closure Type</Label>
                                    <br/>
                                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                        <label class={this.state.item.closuretype==="Manual"?"btn btn-success":"btn btn-light"}>
                                            <Input type="radio" name="closuretype" id="Manual"
                                                onChange={(e) => this.handleToggleChange(e)} /> Manual
                                        </label>
                                        <label class={this.state.item.closuretype==="Auto"?"btn btn-success":"btn btn-light"}>
                                            <Input type="radio" name="closuretype" id="Auto"
                                                onChange={(e) => this.handleToggleChange(e)} /> Auto
                                        </label>
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <br/>
                                    <Button color="primary" type="submit">Save</Button>{' '}
                                    <Button color="danger" tag={Link} to="/workflow">Cancel</Button>
                                </FormGroup>
                            </Form>
                        </Modal>
                </div>
            </Container>
        </div>
        );
    }
}
export default withRouter(WorkflowEdit);