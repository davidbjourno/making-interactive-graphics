import React, { Component } from 'react';
import * as d3 from 'd3';

class Chart extends Component {
  constructor(props) {
    super(props);

    this.margin = { top: 20, right: 30, bottom: 40, left: 30 };
    this.width = 700 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
    this.x = d3.scaleLinear()
      .rangeRound([0, this.width]);
    this.y = d3.scaleBand()
      .rangeRound([0, this.height])
      .padding(0.1);
    this.updateD3 = this.updateD3.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.updateD3(newProps);
  }

  updateD3(props) {
    this.x.domain([-3.5, 3.5]);
    this.y.domain(props.data.map(d => d.country));

    this.bars = props.data.map((d) => {
      return (
        <rect
          x={this.x(Math.min(0, d.growth))}
          y={this.y(d.country)}
          width={Math.abs(this.x(d.growth) - this.x(0))}
          height={this.y.bandwidth()}
          style={{ fill: 'steelblue' }}
          key={d.country}
        />
      );
    });
  }

  render() {
    let svg = <h3>Loading chart…</h3>;

    if (this.props.data.length) {
      svg = (
        <svg
          width={this.width + this.margin.left + this.margin.right}
          height={this.height + this.margin.top + this.margin.bottom}
        >
          <g transform={`translate(${this.margin.left}, ${this.margin.top})`}>
            {this.bars}
          </g>
        </svg>
      );
    }

    return svg;
  }
}

export default Chart;
