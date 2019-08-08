import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { editVacation } from "../../store/action/adminAction";
import { getVacationDetails } from "../../store/action/vacationAction";
import { Container, Row, Col } from "reactstrap";
import ChangeVacationImage from "./ChangeVacationImage";
import {
  Card,
  Button,
  CardHeader,
  CardFooter,
  CardBody,
  CardTitle,
  CardText,
  Alert,
  CardImg
} from "reactstrap";
class VacationEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getVacationDetail(id);
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  ToDashbord = () => {
    this.props.history.push("/dashbord");
  };
  componentWillUnmount() {
    this.props.CleanError();
  }

  render() {
    const { vacationDeatils } = this.props.vacation;
    const { updateEror } = this.props.admin;
    const { admin } = this.props.user;
    if (admin == false) {
      this.props.history.push("/login");
    }
    return (
      <Container>
        {vacationDeatils ? (
          <Row>
            <Col sm="8">
              <Card className="mt-4">
                <CardHeader tag="h3">
                  Edit Vacation - vacationDeatils
                  <div>{this.props.vacation.vacationDeatils.unique_id}</div>
                </CardHeader>
                <CardBody>
                  <form>
                    <div className="form-group ">
                      <label htmlFor="Title">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder={this.props.vacation.vacationDeatils.title}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Location">Location</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={
                          this.props.vacation.vacationDeatils.location
                        }
                        id="location"
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Description">Description</label>
                      <input
                        type="email"
                        className="form-control"
                        id="description"
                        placeholder={
                          this.props.vacation.vacationDeatils.description
                        }
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Depart">Depart</label>
                      <input
                        type="text"
                        className="form-control"
                        id="depart_data"
                        placeholder={
                          this.props.vacation.vacationDeatils.depart_data
                        }
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Return">Return</label>
                      <input
                        type="text"
                        className="form-control"
                        id="return_data"
                        placeholder={
                          this.props.vacation.vacationDeatils.return_data
                        }
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="image">Image</label>
                      <input
                        type="text"
                        className="form-control"
                        id="img"
                        placeholder={this.props.vacation.vacationDeatils.img}
                        onChange={this.handleChange}
                      />
                    </div>
                  </form>
                  {/* validation Alert */}
                  {updateEror
                    ? updateEror.map(err => (
                        <Alert color="danger">{err.msg}</Alert>
                      ))
                    : null}
                  <Button
                    color="success"
                    onClick={() => {
                      const { unique_id } = this.props.vacation.vacationDeatils;
                      const updateVacation = Object.assign(
                        vacationDeatils,
                        this.state
                      );
                      this.props.editVacation(
                        unique_id,
                        updateVacation,
                        this.ToDashbord
                      );
                    }}
                  >
                    Save
                  </Button>
                </CardBody>
              </Card>
            </Col>
            <Col sm="4">
              <Card className="mt-4">
                <CardImg
                  top
                  width="100%"
                  src={this.props.vacation.vacationDeatils.img}
                  alt="Card image cap"
                />
                <CardBody />
              </Card>
            </Col>
          </Row>
        ) : null}
      </Container>
    );
  }
}
const mapPropsToState = state => {
  return {
    admin: state.admin,
    vacation: state.vacation,
    user: state.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    editVacation: (id, data, ToDashbord) =>
      dispatch(editVacation(id, data, ToDashbord)),
    getVacationDetail: id => dispatch(getVacationDetails(id)),
    CleanError: () => dispatch({ type: "CLEAN_ERR_UPDATE" })
  };
};
export default connect(
  mapPropsToState,
  mapDispatchToProps
)(VacationEdit);
