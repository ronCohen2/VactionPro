import React, { Component } from "react";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { FollowVacation } from "../../store/action/vacationAction";
import { UnFollowVacation } from "../../store/action/vacationAction";
import { getUserFollowVacation } from "../../store/action/vacationAction";

class FollowButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: this.props.follow
    };
  }
  follow = data => {
    const { user_id } = this.props.user;
    const { unique_id } = this.props.data;
    const { favVacation } = this.props.vacation;
    var flag = false;
    for (let index = 0; index < favVacation.length; index++) {
      if (favVacation[index].unique_id == unique_id) {
        flag = true;
        break;
      }
    }
    if (flag !== true) {
      console.log(flag);
      this.props.followVacation(data, user_id);
    }
    this.setState({
      toggle: false
    });
  };
  unfollow = data => {
    const { user_id } = this.props.user;
    const { unique_id } = this.props.data;
    this.props.UnfollowVacation(data, user_id);
    this.setState({
      toggle: true
    });
  };
  render() {
    const { data } = this.props;
    const { toggle } = this.state;
    return (
      <div>
        {toggle ? (
          <div>
            <h4 className=" float-left  d-inline"> {data.title}</h4>
            <i
              className="far fa-thumbs-down fa-2x float-right"
              onClick={() => this.unfollow(data)}
            />
          </div>
        ) : (
          <div>
            <h4 className="d-inline float-left "> {data.title}</h4>
            <i
              className="far fa-thumbs-up fa-2x float-right"
              onClick={() => this.follow(data)}
            />
          </div>
        )}
      </div>
    );
  }
}
const mapPropsToState = state => {
  return {
    vacation: state.vacation,
    user: state.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    followVacation: (data, user_id) => dispatch(FollowVacation(data, user_id)),
    UnfollowVacation: (data, user_id) => {
      dispatch(UnFollowVacation(data, user_id));
    },
    getUserFollowVacation: id => {
      dispatch(getUserFollowVacation(id));
    }
  };
};
export default connect(
  mapPropsToState,
  mapDispatchToProps
)(FollowButton);
