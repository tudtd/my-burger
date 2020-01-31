import React, { Component } from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  // This could be a functional component, doesn't have to be a class

  // componentWillUpdate() {
  //   console.log('Order Sumamry will update!');
  // }

  render() {
    const ingredients = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
          {this.props.ingredients[igKey]}
        </li>
      );
    });

    return (
      <div>
        <h1>Your Order</h1>
        <p>A delicious burger with the following ingredients: </p>
        <ul>{ingredients}</ul>

        <p>
          <span>Total Price</span>: {this.props.totalPrice.toFixed(2)}
        </p>
        <p>Continue checkout?</p>
        <Button btnType="Success" clicked={this.props.continue}>
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
