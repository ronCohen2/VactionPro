import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { stat } from "fs";
import { stringify } from "querystring";
import { connect } from "react-redux";
import { login } from "../../store/action/authAction";
import {
  Container,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert
} from "reactstrap";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      user: null
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
  };
  connectionUser = () => {
    const credentials = {
      user_name: this.state.username,
      password: this.state.password
    };
    if (!credentials.user_name || !credentials.password) {
      this.props.empty();
    } else {
      this.props.login(credentials);
    }
  };
  componentWillUnmount() {
    this.props.clean();
  }

  render() {
    const { userConnected } = this.props.user;
    const { admin } = this.props.user;
    const { username, user } = this.state;
    const { loginErr } = this.props.user;

    if (admin == "true") {
      this.props.history.push("/dashbord");
    }
    if (userConnected == true) {
      this.props.history.push("/home");
    }
    return (
      <div className="container">
        {userConnected && admin == "false" ? <Redirect to="/home" /> : null}
        {userConnected && admin == "true" ? <Redirect to="/Dashbord" /> : null}
        <Container className="mt-5 border">
          <Row>
            <Col>
              <h1>Sign In</h1>
              <FormGroup>
                <Label>User Name</Label>
                <Input type="text" id="username" onChange={this.handleChange} />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label>Password</Label>
                <Input
                  type="passwordgi"
                  id="password"
                  onChange={this.handleChange}
                />
              </FormGroup>

              <Col>
                {loginErr ? (
                  <Alert color="danger">{this.props.user.loginErr} </Alert>
                ) : null}
              </Col>

              <Col>
                <Label onClick={() => this.props.history.push("/register")}>
                  Not Register ? Click Here
                </Label>
              </Col>

              <Button type="submit" onClick={() => this.connectionUser()}>
                Submit
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    login: credentials => dispatch(login(credentials)),
    empty: () => dispatch({ type: "LOGIN_ERROR_EMPTY" }),
    clean: () => dispatch({ type: "LOGIN_CLEAN" })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
