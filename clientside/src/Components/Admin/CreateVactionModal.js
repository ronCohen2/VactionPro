import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { addVacation } from "../../store/action/adminAction";
import { getAllVacationAdmin } from "../../store/action/adminAction";
import { withRouter } from "react-router-dom";
import { Alert } from "reactstrap";

class CreateVacationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      Description: null,
      location: null,
      img: null,
      depart: null,
      return: null,
      price: null,
      title: null
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  cancel = () => {
    this.props.CleanError();
    this.setState({
      modal: false,
      Description: null,
      location: null,
      img: null,
      depart: null,
      return: null,
      price: null,
      title: null
    });
  };
  ToDashbord = () => {
    this.props.history.push("/dashbord");
  };
  submit = () => {
    const { err } = this.props.admin;
    console.log(this.state);
    this.props.addVacation(this.state, this.toggle);
    this.props.getVacation();
  };

  render() {
    const { err } = this.props.admin;

    return (
      <div>
        <Button color="primary" onClick={this.toggle} className="dash_button ">
          Create Vacation
        </Button>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle} className="bg-primary">
            Create New Vacation
          </ModalHeader>
          <ModalBody>
            <form>
              <div className="form-group">
                <label htmlFor="Title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Location">Location</label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Description">Description</label>
                <input
                  type="email"
                  className="form-control"
                  id="Description"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Depart">Depart</label>
                <input
                  type="date"
                  className="form-control"
                  id="depart"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Return">Return</label>
                <input
                  type="date"
                  className="form-control"
                  id="return"
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="Image">Image</label>
                <input
                  type="text"
                  className="form-control"
                  id="img"
                  onChange={this.handleChange}
                />
              </div>
            </form>
            <Alert color="danger">
              {err ? err.map(err => <li>{err.msg}</li>) : null}
            </Alert>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary" onClick={this.submit}>
              Create
            </Button>
            <Button color="secondary" onClick={this.cancel}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
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
    addVacation: (vacation, ToDashbord) =>
      dispatch(addVacation(vacation, ToDashbord)),
    getVacation: () => dispatch(getAllVacationAdmin()),
    CleanError: () => dispatch({ type: "CLEAN_ERR_ADMIN" })
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreateVacationModal)
);
