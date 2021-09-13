import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//import additional css
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//import the components
import NavBar from "./components/layout/NavBar";
import Dashboard from "./components/layout/Dashboard";
import Pokemon from "./components/pokemon/Pokemon";

//layout the site and navigation
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
