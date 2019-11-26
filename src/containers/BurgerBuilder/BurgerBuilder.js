/* eslint-disable no-undef */
import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGCREDIENTS_PRICES = {
  meat: 1,
  cheese: 0.5,
  salad: 0.7,
  bacon: 0.4
};

class BurgerBuilder extends Component {
  // OLD SYNTAX
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

  // MORDEN SYNTAX
  state = {
    incredients: {
      meat: 0,
      cheese: 0,
      salad: 0,
      bacon: 0
    },
    totalPrice: 4,
    purchasale: false,
    purchasing: false,
    loading: false
  };

  updatePurchaseState(incredients) {
    const sum = Object.keys(incredients)
      .map(incredientKey => {
        return incredients[incredientKey];
      })
      .reduce((sum, el) => sum + el);
    this.setState({ purchasale: sum > 0 });
  }

  addIncredientsHanler = type => {
    const oldCount = this.state.incredients[type];
    const updatedCount = oldCount + 1;
    const updatedIncredients = { ...this.state.incredients };
    updatedIncredients[type] = updatedCount;

    const oldPrice = this.state.totalPrice;
    const updatedPrice = oldPrice + INGCREDIENTS_PRICES[type];

    this.setState({
      incredients: updatedIncredients,
      totalPrice: updatedPrice
    });

    this.updatePurchaseState(updatedIncredients);
  };

  removeIncredientsHanler = type => {
    const oldCount = this.state.incredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIncredients = { ...this.state.incredients };
    updatedIncredients[type] = updatedCount;

    const oldPrice = this.state.totalPrice;
    const updatedPrice = oldPrice - INGCREDIENTS_PRICES[type];

    this.setState({
      incredients: updatedIncredients,
      totalPrice: updatedPrice
    });

    this.updatePurchaseState(updatedIncredients);
  };

  purchasedHanler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.setState({ loading: true });

    const order = {
      incredients: this.state.incredients,
      price: this.state.totalPrice, // Do not use in real app, final price must be calculated on the server
      customer: {
        name: 'Tu Dinh',
        address: {
          street: '18',
          zipCode: '7000000',
          country: 'Viet Nam'
        },
        email: 'tu@gmail.com'
      },
      deliveryMethod: 'fastest'
    };

    axios
      .post('/orders.json', order)
      .then(res => this.setState({ loading: false, purchasing: false }))
      .catch(err => this.setState({ loading: false, purchasing: false }));
  };

  render() {
    const disabledInfo = {
      ...this.state.incredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = (
      <OrderSummary
        incredients={this.state.incredients}
        submit={this.purchaseContinueHandler}
        cancel={this.purchaseCancelHandler}
        totalPrice={this.state.totalPrice}
      />
    );

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} hide={this.purchaseCancel}>
          {orderSummary}
        </Modal>
        <Burger incredients={this.state.incredients} />
        <BuildControls
          addIncredients={this.addIncredientsHanler}
          removeIncredients={this.removeIncredientsHanler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasale}
          purchased={this.purchasedHanler}
        />
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
