import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.svg';

import { signUpRequest } from '~store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('Required name'),
  email: Yup.string()
    .email('Your email is invalid')
    .required('Required email'),
  password: Yup.string()
    .min(6, 'Minumun of 6 characters at your password')
    .required('Required Password'),
});

export default function SignUp() {
  const dispatch = useDispatch();

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }
  return (
    <>
      <img src={logo} alt="Meetapp" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Name" />
        <Input name="email" type="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Password" />

        <button type="submit">Create Account</button>
        <Link to="/">Already have an account? Sign In</Link>
      </Form>
    </>
  );
}
