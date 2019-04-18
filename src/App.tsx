import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import SampleComponent from "./components/sample/sample.component";

class App extends Component {
  render() {
    return (
      <div className="App">
        <SampleComponent />
      </div>
    );
  }
}

export default App;
