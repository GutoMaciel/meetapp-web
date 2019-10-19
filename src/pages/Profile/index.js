import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

import { Container } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Full Name" />
        <Input name="email" type="email" placeholder="Email" />

        <hr />

        <Input type="password" name="oldPassword" placeholder="Password" />
        <Input type="password" name="password" placeholder="New password" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Password confirmation"
        />

        <button type="submit">Update profile</button>
      </Form>

      <button type="submit" onClick={handleSignOut}>
        Log out
      </button>
    </Container>
  );
}
