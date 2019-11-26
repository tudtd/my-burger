/* eslint-disable no-undef */
import React from 'react';

import classes from './BuildControls.css';
import BuildControl from '../BuildControls/BuildControl/BuildControl';

const controls = [
  { label: 'Meat', type: 'meat' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' }
];

const buildControls = props => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map(ctrl => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          type={ctrl.type}
          addIncredients={() => props.addIncredients(ctrl.type)}
          removeIncredients={() => props.removeIncredients(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
        />
      ))}

      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.purchased}
      >
        Order Now
      </button>
    </div>
  );
};

export default buildControls;
