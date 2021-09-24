import React, { Component } from 'react';
import Tooltip from './Tooltip';
import Info from '../images/info.png';

class Test extends Component {
  state = {
    errors: {
      email: null,
      text: null
    }
  };

  onValidation = (result) => {
    const errors = this.state.errors;
    if (!result.success) {
      errors[result.name] = result.errors[0];
    } else {
      errors[result.name] = null;
    }

    this.setState({ errors })
  };

  render() {
    return (
      <div>
        <h1>Tooltip <Tooltip><img alt='INFO' src={Info} width='30' height='30' style={{ verticalAlign: 'middle' }} /> </Tooltip>  </h1>
      </div>
    );
  }
}

export default Test;
