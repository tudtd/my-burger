import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './Auth.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions/auth';

class Auth extends Component {
  state = {
    loginForm: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  };

  inputChangedHandler = (event, element) => {
    this.setState({
      loginForm: {
        ...this.state.loginForm,
        [element]: {
          ...this.state.loginForm[element],
          value: event.target.value,
          valid: this.checkValidity(
            event.target.value,
            this.state.loginForm[element].validation
          ),
          touched: true
        }
      }
    });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.loginForm.email.value,
      this.state.loginForm.password.value,
      this.state.isSignup
    );
  };

  checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignup: !prevState.isSignup
      };
    });
  };

  render() {
    let loginFormArray = [];
    for (let key in this.state.loginForm) {
      loginFormArray.push({
        id: key,
        config: this.state.loginForm[key]
      });
    }

    let form = loginFormArray.map(el => (
      <Input
        changed={event => this.inputChangedHandler(event, el.id)}
        key={el.id}
        elementType={el.config.elementType}
        elementConfig={el.config.elementConfig}
        value={el.config.value}
        shouldValidate={el.config.validation}
        inValid={!el.config.valid}
        touched={el.config.touched}
      />
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = this.props.error.message;
    }

    let indexRedirect = null;

    if (this.props.isAuth) {
      indexRedirect = <Redirect to="/" />;
    }

    return (
      <div className={classes.Auth}>
        {indexRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">Comfirm</Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
        </Button>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
