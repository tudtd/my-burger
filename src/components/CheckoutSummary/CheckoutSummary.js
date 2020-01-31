import React from 'react';

import classes from './CheckoutSummary.css';
import Burger from '../Burger/Burger';
import Button from '../../components/UI/Button/Button';

const checkoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Check out</h1>
      <Burger ingredients={props.ingredients} />
      <Button btnType="Success" clicked={props.checkoutContinued}>
        CONTINUE
      </Button>
      <Button btnType="Danger" clicked={props.checkoutCancelled}>
        CANCEL
      </Button>
    </div>
  );
};

export default checkoutSummary;
