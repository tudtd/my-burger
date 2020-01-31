import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem>
      <NavLink to="/">Burger Builder</NavLink>
    </NavigationItem>
    <NavigationItem>
      {props.isAuth ? <NavLink to="/orders">Orders</NavLink> : null}
    </NavigationItem>
    <NavigationItem>
      {props.isAuth ? (
        <NavLink to="/logout">Logout</NavLink>
      ) : (
        <NavLink to="/auth">Login</NavLink>
      )}
    </NavigationItem>

    {/* <NavigationItem link="/" active>
      Burger Builder
    </NavigationItem>
    <NavigationItem link="/">Check out</NavigationItem> */}
  </ul>
);

export default navigationItems;
