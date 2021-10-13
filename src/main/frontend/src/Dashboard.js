import React, { Component } from 'react';
import './App.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';
import AppNavBar from './AppNavBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WorkflowList from './WorkflowList';
import WorkflowEdit from "./WorkflowEdit";
import WorkflowClose from "./WorkflowClose";
import ActiveWFList from "./ActiveWFList";
import ReviewWFList from "./ReviewWFList";
import 'bootstrap/dist/css/bootstrap.min.css';

class Dashboard extends Component {
  handleEdit(){
    this.props.history.push('/workflow/new');
  }

  signOut = () => {
    localStorage.removeItem("token");
    this.setState({
      islogout: true
    });
  };

  render() {
    return (
      <><div>
        <AppNavBar />
      </div>
      <Router>
          <Switch>
          <Route path='/workflow/close/:id' component={WorkflowClose} />
          <Route path='/workflow/:id' component={WorkflowEdit} />
          </Switch>
        </Router>
        <br />
        <div className="float-right">
          <Button color="success" href="/workflow/new" style={{ float: "right", marginRight: "30px" }}>New Workflow</Button>
        </div>
        <br />
        <div>
          <Tabs>
            <TabList>
              <Tab>Active</Tab>
              <Tab>Review</Tab>
              <Tab>Closed</Tab>
            </TabList>

            <TabPanel>
              <div>
                <ActiveWFList />
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                <ReviewWFList />
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                <WorkflowList />
              </div>
            </TabPanel>
          </Tabs>
        </div>
        </>
    );
  }
}

export default withRouter(Dashboard);