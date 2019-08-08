import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import FollowButton from "./FollowButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

import { Card, CardImg, CardFooter } from "reactstrap";
import { Container, Row, Col } from "reactstrap";

class VacationSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  vacationDetails = id => {
    console.log(id);
    this.props.history.push(`/VacationDetails/${id}`);
  };
  render() {
    const id = this.props.data.unique_id;
    const title = this.props.data.title;
    const { follow, data, index } = this.props;

    return (
      <Fragment>
        <Col sm="4">
          <Card key={this.props.key}>
            <div>
              <CardImg
                onClick={() => this.vacationDetails(id)}
                width="33%"
                src={data.img}
                alt="Card image cap"
              />
            </div>
            <CardFooter className="bg-muted">
              <FollowButton data={data} follow={follow} index={index} />
            </CardFooter>
          </Card>
        </Col>
      </Fragment>
    );
  }
}

export default withRouter(VacationSummary);
