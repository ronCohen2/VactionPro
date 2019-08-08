import React, { Component } from "react";
import { Alert } from "reactstrap";
import { connect } from "react-redux";
import { register } from "../../store/action/authAction";
import { Redirect } from "react-router-dom";
import {
  Container,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      lastname: null,
      username: null,
      password: null,
      passwordMatch: null,
      error: null
    };
  }
  handleChange = e => {
    e.preventDefault();

    this.setState({
      [e.target.id]: e.target.value
    });
  };

  addUser = e => {
    e.preventDefault();
    console.log(this.state);
    this.props.Register(this.state);
  };
  componentWillUnmount() {
    this.props.clean();
  }
  render() {
    const { userConnected } = this.props.user;
    const { err } = this.props.user;
    const { admin } = this.props.user;
    if (admin == "true") {
      this.props.history.push("/dashbord");
    }
    if (userConnected == true) {
      this.props.history.push("/home");
    }
    return (
      <Container className="mt-5 border">
        <Row>
          <Col>
            <h1>Register</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label>Fisrt Name</Label>
              <Input type="text" id="name" onChange={this.handleChange} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label>Last Name</Label>
              <Input type="text" id="lastname" onChange={this.handleChange} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
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
                type="password"
                id="password"
                onChange={this.handleChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label>Password Confirmation</Label>
              <Input
                type="password"
                id="passwordMatch"
                onChange={this.handleChange}
              />
            </FormGroup>
            <Button onClick={this.addUser}>Register Now!</Button>
          </Col>
        </Row>
        <Alert color="danger" className="mt-2 mb-4">
          {err
            ? err.map((err, index) => (
                <div className="border">
                  {index + 1}.{err.msg}
                </div>
              ))
            : null}
        </Alert>
        {userConnected ? <Redirect to="/home" /> : null}
      </Container>
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
    Register: user => dispatch(register(user)),
    clean: () => dispatch({ type: "REGISTER_CLEAN" })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
