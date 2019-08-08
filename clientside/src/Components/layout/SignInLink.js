import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";

function SignInLink() {
  return (
    <div>
      <Nav className="ml-auto " navbar>
        <NavItem>
          <NavLink>
            <Link to="/Login" className="text-muted">
              Login
            </Link>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink>
            <Link to="/Register" className="text-muted">
              Register
            </Link>
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
}

export default SignInLink;
