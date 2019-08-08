import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllVacation } from "../../store/action/vacationAction";
import { getUserFollowVacation } from "../../store/action/vacationAction";
import VacationSummary from "./VacationSummary";
import { Container, Row, Col } from "reactstrap";
import { breakStatement } from "@babel/types";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { user_id } = this.props.user;
    this.props.getUserFollowVacation(user_id);
    this.interval1 = setInterval(() => {
      this.props.getVacation();
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval1);
    this.interval1 = null;
  }
  componentWillReceiveProps() {
    this.setState({
      favVacation: this.props.vacation.favVacation,
      AllVacation: this.props.vacation.vacation
    });
  }

  render() {
    const { userConnected, admin } = this.props.user;
    const favVacation = this.props.vacation.favVacation;
    const AllVacation = this.props.vacation.vacation;
    var flag23 = false;

    if (userConnected === false) {
      this.props.history.push("/login");
    }
    if (admin == "true") {
      this.props.history.push("/dashbord");
    }

    return (
      <div>
        <h3>welcome {this.props.user.username}</h3>
        <Container>
          <Row>
            {favVacation.length > 0
              ? favVacation.map((vac, index) => {
                  return (
                    <VacationSummary
                      data={vac}
                      {...vac}
                      follow={true}
                      key={index}
                    />
                  );
                })
              : null}
            {AllVacation.length > 0
              ? AllVacation.map((vac, i) => {
                  for (let index = 0; index < favVacation.length; index++) {
                    if (favVacation[index].unique_id == vac.unique_id) {
                      flag23 = true;
                    }
                  }
                  if (flag23 == false) {
                    return (
                      <VacationSummary data={vac} follow={false} key={i} />
                    );
                  }
                  flag23 = false;
                })
              : null}
            {}
          </Row>
          <Row />
        </Container>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getVacation: () => {
      dispatch(getAllVacation());
    },
    getUserFollowVacation: id => {
      dispatch(getUserFollowVacation(id));
    }
  };
};
const mapStateToProps = state => {
  return {
    user: state.auth,
    vacation: state.vacation
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
