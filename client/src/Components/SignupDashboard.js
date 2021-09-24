import React from 'react';
import validator from 'validator';

class SignupDashboard extends React.Component {
  state = {
    fields: {
      firstName: {
        string: '',
        error: null,
        options: {
          length: { min: 1, max: 14 },
          canContainSpecialCharacters: false
        }
      },
      surname: {
        string: '',
        error: null,
        options: {
          length: { min: 1, max: 14 },
          canContainSpecialCharacters: false
        }
      },
      email: {
        string: '',
        error: null,
        options: {
          length: { min: 4, max: 256 },
          type: 'email'
        }
      },
      password: {
        string: '',
        error: null,
        options: {
          length: { min: 8, max: 128 }
        }
      },
      confirmPassword: {
        string: '',
        error: null,
        options: {
          length: { min: 8, max: 128 }
        }
      }
    },
  };

  componentDidMount() {
    document.body.classList.add('bg-light');
  };

  getClasses(name) {
    var className = 'form-control';
    const field = this.state.fields[name];
    if (field.string.length > 0) className += ' focus';
    return className;
  }

  onChange = (event) => {
    const { value, name } = event.target;
    let fields = Object.assign({}, this.state.fields);
    fields[name].string = value;
    this.setState({ fields });
  }

  onSubmit = (event) => {
    event.preventDefault();

    const fields = new Map(Object.entries(this.state.fields));
    fields.forEach((value, key) => {
      const result = this.validate(value.string, { ...value.options, type: value.options.type ? value.options.type : 'text' });
      if (!result.success) {
        value.error = result.errorMessage;
      } else if (key === 'confirmPassword') {
        if (value.string !== this.state.fields.password.string) {
          value.error = 'Passwords do not match.'
        } else {
          value.error = null
        }
      } else {
        value.error = null;
      }
      fields.set(key, value);
    })

    this.setState({ fields: Object.fromEntries(fields) });
  }

  validate(string, validationOptions) {
    if (!validationOptions) return { success: true };

    if (string.length < 1) {
      return {
        success: false,
        errorMessage: 'This field is required.'
      }
    }
    if (validationOptions.canContainSpecialCharacters === false) {
      const specialCharactersRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`؟’،]+/;
      if (specialCharactersRegex.test(string)) {
        return {
          success: false,
          errorMessage: 'The string cannot contain special characters.'
        }
      }
    }

    if (validationOptions.type === 'email') {
      if (!validator.isEmail(string)) {
        return {
          success: false,
          errorMessage: `The string is not a valid email.`
        }
      }
    }
    if (validationOptions.length) {
      let length = validationOptions.length ? validationOptions.length : { min: 1, max: 9999 };
      if (!validator.isLength(string, length)) {
        return {
          success: false,
          errorMessage: `The string should be between ${length.min} and ${length.max} characters.`
        }
      }
    }
    return {
      success: true
    };
  }

  render() {
    return (
      <div className='flex flex-justify-center flex-align-center h-100'>
        <div className='card w-75 signup-card'>
          <h2 className='card-title text-center'>
            Get Started
            <small className='card-subtitle'>Let's Create Your Account</small>
          </h2>
          <hr />
          <div className='card-body'>
            <form action='' method='POST' className='form-group' noValidate onSubmit={this.onSubmit}>
              <div className='form-item'>
                <input id='firstName' type='text' className={this.getClasses('firstName')} onChange={this.onChange} name='firstName' required />
                <label className='form-label' htmlFor='firstName'>First Name</label>
                <span className='form-text text-danger'>{this.state.fields['firstName'].error}</span>
              </div>
              <div className='form-item'>
                <input id='surname' type='text' className={this.getClasses('surname')} onChange={this.onChange} name='surname' required />
                <label className='form-label' htmlFor='surname'>Surname</label>
                <span className='form-text text-danger'>{this.state.fields['surname'].error}</span>
              </div>
              <div className='form-item'>
                <input id='email' type='email' className={this.getClasses('email')} onChange={this.onChange} name='email' required />
                <label className='form-label' htmlFor='email'>Email</label>
                <span className='form-text text-danger'>{this.state.fields['email'].error}</span>
              </div>
              <div className='form-item'>
                <input id='password' type='password' className={this.getClasses('password')} onChange={this.onChange} name='password' required />
                <label className='form-label' htmlFor='password'>Password</label>
                <span className='form-text text-danger'>{this.state.fields['password'].error}</span>
              </div>
              <div className='form-item'>
                <input id='confirm-password' name='confirmPassword' type='password' className={this.getClasses('confirmPassword')} onChange={this.onChange} required />
                <label className='form-label' htmlFor='confirm-password'>Confirm Password</label>
                <span className='form-text text-danger'>{this.state.fields['confirmPassword'].error}</span>
              </div>
              <button type="submit" className="btn btn-primary">Create!</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignupDashboard;
