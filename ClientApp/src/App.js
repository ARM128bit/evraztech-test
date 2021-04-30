import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { EquipmentList } from './components/EquipmentList';
import { EquipmentTypeList } from './components/EquipmentTypeList';
import { UserList } from './components/UserList';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route
            path='/equipment'
            component={() => <EquipmentList backendURL='/api/equipment'/>}
        />
        <Route
            path='/equipmenttype'
            component={() => <EquipmentTypeList backendURL='/api/equipmenttype' />}
        />
        <Route
            path='/user'
            component={() => <UserList backendURL='/api/user' />}
        />
      </Layout>
    );
  }
}
