import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Col, ButtonGroup, Button } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { year: '' }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({ year: event.target.value });
  }

  render() {
    const years = ['2012', '2013', '2014', '2015', '2016'];
    const buttons = years.map((year) => {
      return <Button value={year}>{year}</Button>
    });

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <Col xs={12} md={8} mdPush={2}>
          <h3>Select a year</h3>
          <ButtonGroup onClick={this.handleClick}>
            {buttons}
          </ButtonGroup>
          <h1>{this.state.year}</h1>
        </Col>
      </div>
    );
  }
}

export default App;
