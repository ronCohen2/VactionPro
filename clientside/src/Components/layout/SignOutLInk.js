import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

function SignOutLink(props) {
  console.log("qq", props.user);
  return (
    <div>
      <Nav className="ml-auto" navbar>
        <UncontrolledDropdown setActiveFromChild>
          <DropdownToggle tag="a" className="nav-link" caret>
            Hi {props.user.username}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              <Link to="/Home" className="text-muted">
                Home
              </Link>
            </DropdownItem>

            <DropdownItem tag="a">
              <Link
                className="text-muted"
                onClick={() => {
                  localStorage.removeItem("x-token");
                  this.props.logOut();
                }}
              >
                Log Out
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    user: state.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch({ type: "LOG_OUT" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignOutLink);
