import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Table } from "reactstrap";
import { connect } from "react-redux";
import { getAllVacationAdmin } from "../../store/action/adminAction";
import RemoveVacation from "./RemoveVacation";
import CreateVactionModal from "./CreateVactionModal";

class vacationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.props.getVacation();
  }

  render() {
    const { allVacation } = this.props.admin;
    const { admin } = this.props.user;
    if (admin == false) {
      this.props.history.push("/login");
    }
    return (
      <Container>
        <Row>
          <Col>
            <h1>Vacation List</h1>
            <CreateVactionModal />
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="table-responsive">
              <Table bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Unique Id</th>
                    <th>Location</th>
                    <th>Depart</th>
                    <th>Return</th>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {allVacation ? (
                    allVacation.map((vacation, index) => {
                      if (index <= allVacation.length) {
                        return (
                          <tr>
                            <th>{index}</th>
                            <td>{vacation.title}</td>
                            <td>{vacation.unique_id}</td>
                            <td>{vacation.location}</td>
                            <td>{vacation.depart_data}</td>
                            <td>{vacation.return_data}</td>
                            <td>{vacation.description}</td>
                            <td>
                              <Button
                                color="warning"
                                onClick={() =>
                                  this.props.history.push(
                                    `/editvacation/${vacation.unique_id}`
                                  )
                                }
                              >
                                Edit
                              </Button>
                            </td>
                            <td>
                              <RemoveVacation id={vacation.unique_id} />
                            </td>
                          </tr>
                        );
                      }
                    })
                  ) : (
                    <h1>sd</h1>
                  )}
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
    getVacation: () => dispatch(getAllVacationAdmin())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(vacationPage);
