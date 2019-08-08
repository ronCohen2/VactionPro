import React from "react";
import { Table, Container, Row, Col } from "reactstrap";
import {
  Card,
  Button,
  CardHeader,
  CardFooter,
  CardBody,
  CardTitle,
  CardText
} from "reactstrap";
import VacationSummary from "./VacationSummary";
import { connect } from "react-redux";
import { getAllVacationAdmin } from "../../store/action/adminAction";
import { getAllUsers } from "../../store/action/adminAction";
import CreateVactionModal from "./CreateVactionModal";

class VacationList extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentWillMount() {
    this.props.getVacation();
    this.props.getUsers();
  }

  render() {
    const { allVacation } = this.props.admin;
    const { users } = this.props.admin;
    if (users) {
      const LastUsers1 = users.slice(users.length - 2, users.length + 1);
      var lastUserTemplate = LastUsers1.map((user, index) => {
        return (
          <tr>
            <td>{user.user_name}</td>
            <td>
              {user.first_name} {user.last_name}
            </td>
            <td>{user.unique_id}</td>
            <td>{user.admin}</td>
          </tr>
        );
      });
    }
    if (allVacation) {
      const { allVacation } = this.props.admin;
      let lastVacation = allVacation.slice(
        allVacation.length - 2,
        allVacation.length
      );
      var lastVacationTemplate = lastVacation.map((vacation, index) => {
        return <VacationSummary data={vacation} />;
      });
    }

    return (
      <Container>
        <Row>
          <Col>
            <Card className="mt-4">
              <CardHeader>Last Vacation</CardHeader>
              <CardBody>
                <div className="table-responsive">
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Unique id</th>
                        <th>Location</th>
                        <th>Details</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>{lastVacationTemplate}</tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="mt-4">
              <CardHeader>Last Users</CardHeader>
              <CardBody>
                <div className="table-responsive">
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>User Name</th>
                        <th>Name</th>
                        <th>Unique id </th>
                        <th>Admin</th>
                      </tr>
                    </thead>
                    <tbody>{lastUserTemplate}</tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getVacation: () => dispatch(getAllVacationAdmin()),
    getUsers: () => dispatch(getAllUsers())
  };
};
const mapStateToProps = state => {
  return {
    auth: state.auth,
    vacation: state.vacation,
    admin: state.admin
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VacationList);
