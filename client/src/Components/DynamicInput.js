import React, { Component } from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';

class DynamicInput extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  state = {
    field: '',
    errors: [],
    config: {
      type: 'text',
      id: null,
      name: null,
      style: null,
      options: {
        length: {
          min: 1,
          max: -1
        },
        canContainSpecialCharacters: true
      }
    }
  };

  static propTypes = {
    type: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    options: PropTypes.shape({
      fieldRequired: PropTypes.bool,
      length: PropTypes.shape({
        min: PropTypes.number,
        max: PropTypes.number
      }),
      canContainSpecialCharacters: PropTypes.bool,
      isEmail: PropTypes.bool,
      isURL: PropTypes.bool,
      isDate: PropTypes.bool
    })
  };

  async componentDidMount() {
    if (!this.props) return;
    const config = Object.assign({}, this.props, this.state.config);
    if (this.props.options) {
      // length
      let length = Object.assign({}, this.state.config.options.length, this.props.options.length);
      // options
      var options = Object.assign({}, this.state.config.options, this.props.options);
      options.length = length;
      config.options = options;
    }

    await this.setState({ config });
  }

  onChange = (event) => {
    let value = event.target.value;
    const { options: { length, canContainSpecialCharacters } } = this.state.config;
    const errors = [...this.state.errors];
    this.setState({ field: value });
    if (!this.validateLength(value)) {
      errors.push(`The field is not within the valid length (${length.min} - ${length.max === -1 ? '♾' : length.max}) `)
    }

    if (this.props.type === 'email' && !this.validateEmail(this.state.field)) {
      errors.push('The field is not a valid email address.')
    }

    if (this.props.type === 'date' && !this.validateDate(value)) {
      errors.push('The field is not a valid date.')
    };

    if (this.props.type === 'url' && !this.validateURL(value)) {
      errors.push('The field is not a valid URL.')
    }

    if (!canContainSpecialCharacters && this.contiansSpecialCharacters(value)) {
      errors.push('The field should not contain special characters.');
    }

    if (this.props.onValidation) this.props.onValidation({
      success: errors.length > 0 ? false : true,
      errors: errors.length > 0 ? errors : null,
      event,
    })
  }

  validateLength = (string) => {
    let { min, max } = this.state.config.options.length;
    if (max === -1 && string.length < min) {
      return false;
    } else if (max !== -1 && ((string.length < min) || (string.length > max))) {
      return false;
    }

    return true;
  }

  validateEmail(string) {
    return validator.isEmail(string);
  }

  validateDate(string) {
    return validator.isDate(string, { delimiters: [',', '/', '-'] });
  }

  validateURL(string) {
    return validator.isURL(string);
  }

  contiansSpecialCharacters(string) {
    const regex = /[\[!@#$%^&*()_+\-=\]{};':"\\|,.<>\/?~`؟’،+]/;
    return regex.test(string);
  }

  render() {
    const isFocused = this.state.field.length > 0;

    return <input type={this.props.type} id={this.props.id} name={this.props.name} className={this.props.className + (isFocused ? ' focus' : '')} onError={this.props.onError} onChange={this.onChange} value={this.props.vlaue} style={this.props.style} required formNoValidate ref={this.input} />
  }
}

export default DynamicInput;