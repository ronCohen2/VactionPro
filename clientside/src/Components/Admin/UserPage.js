import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Table } from "reactstrap";
import { connect } from "react-redux";
import { getAllUsers } from "../../store/action/adminAction";

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getUsers();
  }
  render() {
    console.log(this.props);
    const { users } = this.props.admin;
    const { admin } = this.props.user;
    if (admin == false) {
      this.props.history.push("/login");
    }
    return (
      <Container>
        <Row>
          <Col>
            <h1>Users List</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <div class="table-responsive">
              <Table bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Unique Id</th>
                    <th>User Name</th>
                    <th>Name</th>
                    <th>Admin </th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    ? users.map((user, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{user.unique_id}</td>
                            <td>{user.user_name}</td>
                            <td>
                              {user.first_name} {user.last_name}
                            </td>
                            <td>{user.admin}</td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    admin: state.admin,
    user: state.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(getAllUsers())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage);
