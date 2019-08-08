import React, { Component } from "react";
import { connect } from "react-redux";
import { getVacationDetails } from "../../store/action/vacationAction";
import { Container, Row, Col } from "reactstrap";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardHeader,
  Button
} from "reactstrap";

class VacationDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const VacationId = this.props.match.params.id;
    this.props.getVacationDetails(VacationId);
  }
  render() {
    const { vacationDeatils } = this.props.vacation;
    const { userConnected } = this.props.user;

    if (userConnected === false) {
      this.props.history.push("/login");
    }
    return (
      <div>
        {vacationDeatils ? (
          <Container>
            <Row>
              <Col>
                <img
                  src={this.props.vacation.vacationDeatils.img}
                  className="VacationDetailsIMG"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Card className="mt-3 ">
                  <CardHeader tag="h3">Location</CardHeader>
                  <CardBody>
                    <CardText>{vacationDeatils.location}</CardText>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card className="mt-3">
                  <CardHeader tag="h3">Description</CardHeader>
                  <CardBody>
                    <CardText>{vacationDeatils.description}</CardText>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card className="mt-3">
                  <CardHeader tag="h3">Date</CardHeader>
                  <CardBody>
                    <CardText>
                      {vacationDeatils.depart_data}-
                      {vacationDeatils.return_data}
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        ) : (
          <div>not vacation available</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth,
    vacation: state.vacation
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getVacationDetails: id => dispatch(getVacationDetails(id))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VacationDetails);
