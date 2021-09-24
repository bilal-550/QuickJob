import React, { Component } from 'react';

class Tooltip extends Component {
  render() {
    return (
      <span style={{ cursor: 'pointer' }}>
        {this.props.children}
      </span>
    );
  }
}

export default Tooltip;
