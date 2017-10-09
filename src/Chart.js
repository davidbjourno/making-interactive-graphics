import React, { Component } from 'react';
import * as d3 from 'd3';

class Chart extends Component {
  constructor(props) {
    super(props);

    this.width = 800;
    this.height = 500;
    this.margin = {top: 20, right: 20, bottom: 30, left: 40};
    this.x = d3.scaleBand()
      .rangeRound([0, this.width])
      .padding(0.1);
    this.y = d3.scaleLinear()
      .rangeRound([this.height, 0]);
    this.bars = [];
    this.updateD3 = this.updateD3.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.updateD3(newProps);
  }

  updateD3(props) {
    this.x.domain(props.data.map(d => d.country));
    this.y.domain([-3.5, 3.5]);

    this.bars = props.data.map((d) => {
      return (
        <rect
          x={this.x(d.country)}
          y={this.y(Math.max(0, d.growth))}
          width={this.x.bandwidth()}
          height={Math.abs(this.y(d.growth) - this.y(0))}
          style={{ fill: 'steelblue' }}
          key={d.country}
        />
      );
    });
  }

  render() {
    return (
      <svg
        width={this.width}
        height={this.height}
        ref={node => this.node === node}
      >
        <g>
          {this.bars}
        </g>
      </svg>
    );
  }
}

export default Chart;
