import React from 'react';

import classes from './Backdrop.css';

const backdrop = props =>
  props.show ? (
    <div onClick={props.hide} className={classes.Backdrop}></div>
  ) : null;

export default backdrop;
