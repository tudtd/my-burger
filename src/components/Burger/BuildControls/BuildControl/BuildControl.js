/* eslint-disable no-undef */
import React from 'react';

import classes from './BuildControl.css';

const buildControl = props => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button className={classes.ButtonMore} onClick={props.addIngredient}>
        More
      </button>
      <button
        className={classes.ButtonLess}
        onClick={props.removeIngredient}
        disabled={props.disabled}
      >
        Less
      </button>
    </div>
  );
};

export default buildControl;
