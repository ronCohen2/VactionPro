import React from "react";
import { Button } from "reactstrap";
import { Redirect } from "react-router-dom";
import RemoveVacation from "./RemoveVacation";
import { withRouter } from "react-router-dom";

class VacationSummary extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { props } = this;
    

    return (
      <tr>
        <td>{this.props.data.title}</td>
        <td>{this.props.data.unique_id}</td>
        <td> {this.props.data.location}</td>
        <td>
          <Button
            onClick={() =>
              this.props.history.push(
                `/editvacation/${this.props.data.unique_id}`
              )
            }
          >
            Edit
          </Button>
        </td>
        <td>
          <RemoveVacation id={this.props.data.unique_id} />
        </td>
      </tr>
    );
  }
}
export default withRouter(VacationSummary);
