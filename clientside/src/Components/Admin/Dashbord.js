import React, { Component } from "react";
import CreateVactionModal from "./CreateVactionModal";
import CreateUser from "./CreateUser";
import VacationList from "./VacationList";
import InformationCard from "./InformationCard";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { getAllUsers } from "../../store/action/adminAction";
import { GetFollowers } from "../../store/action/adminAction";

import { getFavaoriteVacationSummary } from "../../store/action/adminAction";
import Reports from "./Reports";

class Dashbord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }
  componentDidMount() {
    this.interval2 = setInterval(() => {
      this.props.getUsers();
      this.props.getFavaoriteVacationSummary();
      this.props.GetFollowers();
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval2);
    this.interval2 = null;
  }

  render() {
    const { admin } = this.props.user;

    if (admin == false) {
      this.props.history.push("/login");
    }
    const { allVacation } = this.props.admin;
    const { users } = this.props.admin;
    const { favoriteSummary } = this.props.admin;
    const fo = this.props.admin.followers;

    return (
      <Container>
        <Row>
          <Col sm="9">
            <VacationList />
          </Col>
          <Col sm="3">
            {allVacation && users ? (
              <InformationCard
                vacationLength={allVacation.length}
                usersLength={users.length}
                followers={fo}
              />
            ) : null}
          </Col>
        </Row>
        <Row>
          <Col className="mt-3 mb-4">
            <Reports data={favoriteSummary} />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth,
    vacation: state.vacation,
    admin: state.admin
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(getAllUsers()),
    getFavaoriteVacationSummary: () => dispatch(getFavaoriteVacationSummary()),
    GetFollowers: () => dispatch(GetFollowers())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashbord);
