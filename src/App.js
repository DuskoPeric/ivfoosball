import React, { Component } from 'react';
import './App.css';
import Layout from './components/Layout/Layout'
import SideMenu from './components/SideMenu/SideMenu';
import Home from './containers/Home/Home';
import { Route, Switch, Redirect, NavLink } from "react-router-dom";
import Admin from './components/Admin/Admin';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import homeReducer from './store/reducers/homeReducer';
import authReducer from './store/reducers/authReducer';

const rootReducer = combineReducers({
  home: homeReducer,
  auth: authReducer
})
const store = createStore(rootReducer);

firebase.initializeApp({
  databaseURL: ''
})

class App extends Component {
  state = {
    table: 'table'
  }

  changeTab = (cD) => {
    if (this.state.table !== cD) {
      this.setState({ table: cD })
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Layout>
          <NavLink
            className='admin'
            to='/admin'
            exact
          >
            Admin
        </NavLink>
          <div className="pr">
            <SideMenu table={this.state.table} changeTabCallback={this.changeTab} />
            <Switch>
              <Route path="/admin" exact component={Admin} />
              <Route path="/" exact render={(props) => <Home {...props} table={this.state.table} />} />
              <Redirect to="/" />
            </Switch>
          </div>
        </Layout>
      </Provider>

    );
  }

}

export default App;
