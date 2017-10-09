import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Col, ToggleButtonGroup, ToggleButton, Table } from 'react-bootstrap';
import * as d3 from 'd3';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      year: '2012',
      rawData: [],
      filteredData: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.filterData = this.filterData.bind(this);
  }

  componentDidMount() {
    d3.csv('data.csv', (error, data) => {
      if (error) throw error;

      this.setState({ rawData: data }, () => {
        this.filterData('2012');
      });
    });
  }

  filterData(value) {
    const filteredData = this.state.rawData.map(row => {
      return {
        country: row.Country,
        growth: parseFloat(row[`y${value}`]),
      };
    });

    this.setState({ filteredData });
  }

  handleChange(value) {
    this.setState({ year: value }, () => {
      this.filterData(value);
    });
  }

  render() {
    const years = ['2012', '2013', '2014', '2015', '2016'];
    const yearButtons = years.map((year) => {
      return <ToggleButton value={year} key={year}>{year}</ToggleButton>;
    });
    let table = <h3>Loading data…</h3>;

    if (this.state.filteredData.length) {
      const rows = this.state.filteredData.map((row) => {
        return (
          <tr key={row.country}>
            <td>{row.country}</td>
            <td>{row.growth}</td>
          </tr>
        );
      });

      table = (
        <Table striped bordered>
          <thead>
            <tr>
              <th>Country</th>
              <th>{this.state.year} growth rate (GDP per capita)</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
      );
    }

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <Col xs={12} md={6} mdPush={3}>
          <h3>Select a year</h3>
          <ToggleButtonGroup type="radio" name="yearButtons" defaultValue={'2012'} onChange={this.handleChange} justified>
            {yearButtons}
          </ToggleButtonGroup>
          {table}
        </Col>
      </div>
    );
  }
}

export default App;
