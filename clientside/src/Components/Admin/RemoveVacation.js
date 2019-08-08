import React, { Component } from "react";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { removeVacation } from "../../store/action/adminAction";
class RemoveVacation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  deleteVacation = id => {
    this.props.deleteVacation(id);
  };
  render() {
    const id = this.props.id;
    return (
      <div>
        <Button color="danger" onClick={() => this.deleteVacation(id)}>
          Remove{" "}
        </Button>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    admin: state.admin
  };
};
const mapDispatchToProps = dispatch => {
  return {
    deleteVacation: vacationId => dispatch(removeVacation(vacationId))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RemoveVacation);
