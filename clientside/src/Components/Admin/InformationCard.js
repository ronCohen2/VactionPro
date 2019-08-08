import React from "react";
import {
  Card,
  Button,
  CardTitle,
  CardText,
  Container,
  Row,
  Col
} from "reactstrap";
import { withRouter } from "react-router-dom";

class InformationCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { vacationLength } = this.props;
    const { usersLength } = this.props;
    const { followers } = this.props;
    return (
      <Container>
        <Row>
          <Col>
            <Card body inverse color="primary  mt-4">
              <CardTitle>Vacation</CardTitle>
              <CardText>
                <h4 className="display-4">
                  <i className="fas fa-users" /> {vacationLength}
                </h4>
                <Button
                  color="primary"
                  onClick={() => {
                    this.props.history.push("/VacationsPage");
                  }}
                >
                  Click
                </Button>
              </CardText>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card body inverse color="warning mt-2 ">
              <CardTitle>User</CardTitle>
              <CardText>
                <h4 className="display-4">
                  <i className="fas fa-users" /> {usersLength}
                </h4>
                <Button
                  color="warning"
                  onClick={() => this.props.history.push("/UserPage")}
                >
                  Click
                </Button>
              </CardText>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card body inverse color="danger mt-2 ">
              <CardTitle>Follows</CardTitle>
              <CardText>
                <h4 className="display-4">
                  <i class="fab fa-gratipay" />
                  {followers
                    ? followers.map(po => <span> {po.count}</span>)
                    : null}
                </h4>
              </CardText>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(InformationCard);
