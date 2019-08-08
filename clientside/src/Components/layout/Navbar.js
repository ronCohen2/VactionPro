import React, { Component } from "react";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Container
} from "reactstrap";
import SignInLink from "./SignInLink";
import SignOutLink from "./SignOutLInk";
import AdminLink from "./AdminLink";
import { connect } from "react-redux";

class Example extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const { userConnected } = this.props.user;
    const { admin } = this.props.user;
    return (
      <div>
        <Navbar className="navbar-dark bg-dark" light expand="md">
          <Container>
            <NavbarBrand className="display-5 text-muted">
              <span className="display-5"> Vacation</span>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <div>
              <Collapse isOpen={this.state.isOpen} navbar>
                {/* {(userConnected.admin = true ? <AdminLink /> : null)} */}
                {admin == "true" ? <AdminLink /> : null}
                {userConnected && admin == "false" ? <SignOutLink /> : null}
                {userConnected ? null : <SignInLink />}
              </Collapse>
            </div>
          </Container>
        </Navbar>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.auth
  };
};

export default connect(mapStateToProps)(Example);
