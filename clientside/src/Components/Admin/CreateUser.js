import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      username: null,
      password: null,
      confirmPassword: null,
      firstname: null,
      lastname: null,
      admin: null
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

  render() {
    return (
      <div>
        <Button color="warning" onClick={this.toggle} className="dash_button ">
          Create User
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle} className="bg-warning">
            Create New User
          </ModalHeader>
          <ModalBody>
            <form>
              <div className="form-group">
                <label for="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label for="lastname">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label for="username">User Name</label>
                <input
                  type="email"
                  className="form-control"
                  id="username"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label for="password2">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group ">
                <label for="password2">Admin</label>
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="admin"
                  className="ml-3"
                  onChange={this.handleChange}
                />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => console.log(this.state)}>
              Create
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default CreateUser;
