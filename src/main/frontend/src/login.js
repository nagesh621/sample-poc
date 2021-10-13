import React, { Component } from "react";
import "./login.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from "react-router-dom";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogged: false,
      loginParams: {
        user_id: "",
        user_password: ""
      }
    };
  }
  handleFormChange = event => {
    let loginParamsNew = { ...this.state.loginParams };
    let val = event.target.value;
    loginParamsNew[event.target.name] = val;
    this.setState({
      loginParams: loginParamsNew
    });
  };
 
  login = event => {
    let user_id = this.state.loginParams.user_id;
    let user_password = this.state.loginParams.user_password;
    if ((user_id === "branchuser" && user_password === "branchuser")||(user_id === "nocuser" && user_password === "nocuser")) {
      localStorage.setItem("token", "T");
      localStorage.setItem("uname",user_id);
      this.setState({
        islogged: true
      });
    }
    event.preventDefault();
  };
  render() {
    if (localStorage.getItem("token")) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container" align="center">
        <form onSubmit={this.login} className="form-signin">
        <h2 className="col-sm-4">Workflow</h2>
        <br/>
          <h3 className="col-sm-4">Login</h3>
          <div className="row">
            <div className="col">
              <input
                type="text"
                name="user_id"
                onChange={this.handleFormChange}
                placeholder="Enter Username"
              />
              <br/>
              
              <input
                type="password"
                name="user_password"
                onChange={this.handleFormChange}
                placeholder="Enter Password"
              />
              <br/>
              <br/>
              <input color="Success" type="submit" value="Login" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default Login;