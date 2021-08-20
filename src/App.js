import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  NavLink,
} from "react-router-dom";

import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.css";
import { Col, Container, Row } from "reactstrap";
import AddLinkPage from "./components/AddLinkPage";
import Main from "./components/Main";

// App creation

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { options: [], filters: "", selectedOption: undefined };
  };

  // handleOpenModal = (toggle) => {
  //   this.setState({toggle: toggle})
  // };


  // Handles deletion of website entry - Remove button

  handleDeleteOption = (optionToRemove, titleToRemove) => {
    this.setState((prevState) => ({
      options: prevState.options.filter(
        (option, index) => optionToRemove !== index + 1
      ),
    }));
    toast(`${titleToRemove} removed`, {
      position: "top-center",
      type: "success",
    });
  };

  // Handles website addition - Add Link button at /create

  handleAddOption = (option) => {
    if (!option) {
      return "Enter valid value to add item";
    } else if (this.state.options.indexOf(option) > -1) {
      return "This option already exists";
    }
    alert(option[0] + " is added");
    this.setState((prevState) => ({
      options: prevState.options.concat([option]),
    }));
  };

  // Up vote handler

  handleUpVote = (siteCount, siteVote) => {
    this.state.options.map((site, index) => {
      if (index + 1 == siteCount) {
        //  const newOptions = this.state.options.slice() //copy the array
        this.state.options[index][2] = siteVote + 1; //execute the manipulations

        this.setState((prevState) => ({
          options: prevState.options.concat([]),
        })); //set the new state
      }
    });
    this.refresh();
  };

  // Down vote handler

  handleDownVote = (siteCount, siteVote) => {
    this.state.options.map((site, index) => {
      if (siteVote == 0) {
        return;
      } else if (index + 1 == siteCount) {
        //  const newOptions = this.state.options.slice() //copy the array
        this.state.options[index][2] = siteVote - 1; //execute the manipulations

        this.setState((prevState) => ({
          options: prevState.options.concat([]),
        })); //set the new state
      }
    });
    this.refresh();
  };

  refresh = () => {
    if (this.state.filters === "Asc") {
      this.setState({
        options: [...this.state.options].sort(function (a, b) {
          if (a[2] < b[2]) {
            return -1;
          }
          if (a[2] < b[2]) {
            return 1;
          }
          return 0;
        }),
      });
    } else if (this.state.filters === "Desc") {
      this.setState({
        options: [...this.state.options].sort(function (a, b) {
          if (a[2] > b[2]) {
            return -1;
          }
          if (a[2] > b[2]) {
            return 1;
          }
          return 0;
        }),
      });
    }
  };

  // Sets new state of options(website entries) when a new entry is placed

  componentDidMount() {
    try {
      const json = localStorage.getItem("options");
      const options = JSON.parse(json);

      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (e) {
      // Do nothing at all
    }
  }

  // Updates localstorage upon change in state from componentDidMount

  componentDidUpdate() {
    const json = JSON.stringify(this.state.options);
    localStorage.setItem("options", json);
  }
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  // Dropdown list that toggles sort on change

  onSortChange = (e) => {
    if (e.target.value === "Asc") {
      this.setState({
        filters: "Asc",
        options: [...this.state.options].sort(function (a, b) {
          if (a[2] < b[2]) {
            return -1;
          }
          if (a[2] < b[2]) {
            return 1;
          }
          return 0;
        }),
      });
    } else if (e.target.value === "Desc") {
      this.setState({
        filters: "Desc",
        options: [...this.state.options].sort(function (a, b) {
          if (a[2] > b[2]) {
            return -1;
          }
          if (a[2] > b[2]) {
            return 1;
          }
          return 0;
        }),
      });
    }
  };

  render() {
    return (
      <div>
        <Router>
          <Container>
            <Row className="header">
              <Col>
                <Link to="/">
                  <span>
                    Vote and Sort
                  <span/>
                </Link>
              </Col>
              <Col className="d-flex align-items-center justify-content-end">
                <h3>
                  <strong>Link</strong>
                  <span className="fw-lighter">VOTE</span>{" "}
                  <span className="fw-light">Challenge</span>
                </h3>
              </Col>
            </Row>
            <Switch>
              <Route
                path="/"
                render={() => (
                  <Main
                    {...this.state}
                    handleDeleteOption={this.handleDeleteOption}
                    handleUpVote={this.handleUpVote}
                    handleDownVote={this.handleDownVote}
                    onSortChange={this.onSortChange}
                    handleOpenModal={this.handleOpenModal}
                
                  />
                )}
                exact={true}
              />
              <Route
                path="/create"
                render={() => (
                  <AddLinkPage
                    {...this.state}
                    handleAddOption={this.handleAddOption}
                  />
                )}
              />
            </Switch>
          </Container>
        </Router>
      </div>
    );
  }
}

export default App;
