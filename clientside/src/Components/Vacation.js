import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./user/Home";
import VacationDetails from "./user/VacationDetails";
import Dashbord from "./Admin/Dashbord";
import VacationEdit from "./Admin//VacationEdit";
import Reports from "./Admin/Reports";
import NavBar from "./layout/Navbar";
import vacationPage from "./Admin/vacationPage";
import UserPage from "./Admin/UserPage";
import ErorPage from "../ErorPage";

class Vacation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/Login" component={Login} />
            <Route path="/Register" component={Register} />
            <Route path="/VacationDetails/:id" component={VacationDetails} />
            <Route path="/Dashbord" component={Dashbord} />
            <Route path="/EditVacation/:id" component={VacationEdit} />
            <Route path="/Reports" component={Reports} />
            <Route path="/VacationsPage" component={vacationPage} />
            <Route path="/UserPage" component={UserPage} />
            <Route path="/" component={ErorPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Vacation;
