import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Col, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { year: '2016' }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ year: value });
  }

  render() {
    const years = ['2012', '2013', '2014', '2015', '2016'];
    const yearButtons = years.map((year) => {
      return <ToggleButton value={year} key={year}>{year}</ToggleButton>
    });

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <Col xs={12} md={8} mdPush={2}>
          <h3>Select a year</h3>
          <ToggleButtonGroup type="radio" name="yearButtons" defaultValue={'2016'} onChange={this.handleChange} justified>
            {yearButtons}
          </ToggleButtonGroup>
          <h1>{this.state.year}</h1>
        </Col>
      </div>
    );
  }
}

export default App;
