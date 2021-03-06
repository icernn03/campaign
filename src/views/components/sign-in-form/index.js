import React, { PropTypes } from 'react';
import {Button} from 'semantic-ui-react';

import {Field, reduxForm } from 'redux-form';
import TextInput from 'views/components/textinput';
import { authActions } from 'core/auth';
import validate from './validate';


const SignInForm = ({ handleSubmit, invalid, error, submitting }) => {
  return (
    <form onSubmit={handleSubmit(authActions.signIn())}>
      {error && <div>{error}</div>}
      {submitting && <div>Signing In...</div>}
      <Field
        placeholder="Email"
        type="email"
        name="email"
        component={TextInput}
      />

      <Field
        placeholder="Password"
        type="password"
        name="password"
        component={TextInput}
      />

      <Button
        inverted color="green"
        content="Sign In"
        icon="sign in"
        labelPosition="left"
        disabled={invalid || submitting}
      />
    </form>
  );
};

SignInForm.propTypes = {
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
};


export default reduxForm({
  form: 'sign-in',
  destroyOnUnmount: false,
  validate
})(SignInForm);
