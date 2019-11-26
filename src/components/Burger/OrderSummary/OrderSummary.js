import React, { Component } from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  // This could be a functional component, doesn't have to be a class

  // componentWillUpdate() {
  //   console.log('Order Sumamry will update!');
  // }

  render() {
    const incredients = Object.keys(this.props.incredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
          {this.props.incredients[igKey]}
        </li>
      );
    });

    return (
      <div>
        <h1>Your Order</h1>
        <p>A delicious burger with the following incredients: </p>
        <ul>{incredients}</ul>

        <p>
          <span>Total Price</span>: {this.props.totalPrice.toFixed(2)}
        </p>
        <p>Continue checkout?</p>
        <Button btnType="Success" clicked={this.props.submit}>
          CONTINUE
        </Button>
        <Button btnType="Danger" clicked={this.props.cancel}>
          CANCEL
        </Button>
      </div>
    );
  }
}

export default OrderSummary;
