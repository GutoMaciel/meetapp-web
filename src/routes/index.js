import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

import Details from '../pages/Details/Detail';
import New from '../pages/Details/New';
import Edit from '../pages/Details/Edit';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />

      <Route path="/details/detail/:id" component={Details} isPrivate />
      <Route path="/details/new" component={New} isPrivate />
      <Route path="/details/edit/:id" component={Edit} isPrivate />
    </Switch>
  );
}
