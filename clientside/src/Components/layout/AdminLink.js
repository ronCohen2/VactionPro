import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { connect } from "react-redux";
import CreateVactionModal from "../Admin/CreateVactionModal";
function AdminLink() {
  return (
    <div>
      <Nav className="ml-auto" navbar>
        <UncontrolledDropdown setActiveFromChild>
          <DropdownToggle tag="a" className="nav-link" caret>
            Hi Boss
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              <Link to="/dashbord" className="text-muted">
                {" "}
                DashBord
              </Link>
            </DropdownItem>
            <DropdownItem tag="a">
              <Link to="/VacationsPage" className="text-muted">
                {" "}
                Vacations
              </Link>
            </DropdownItem>

            <DropdownItem>
              <Link to="/UserPage" className="text-muted">
                {" "}
                Users
              </Link>
            </DropdownItem>
            <DropdownItem>
              <Link
                className="text-muted"
                onClick={() => {
                  localStorage.removeItem("x-token");
                  this.props.logOut();
                }}
              >
                Log out
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    </div>
  );
}
const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch({ type: "LOG_OUT" })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AdminLink);
