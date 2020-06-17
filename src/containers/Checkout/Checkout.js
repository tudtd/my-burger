import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import classes from "./Checkout.css";
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    };

    render() {
        let summary = <Redirect to='/' />;
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? (
                <Redirect to='/' />
            ) : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <div className={classes.Checkout}>
                        <CheckoutSummary
                            ingredients={this.props.ings}
                            checkoutContinued={this.checkoutContinuedHandler}
                            checkoutCancelled={this.checkoutCancelledHandler}
                        />
                        <Route
                            path={`${this.props.match.path}/contact-data`}
                            component={ContactData}
                        />
                    </div>
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased,
    };
};
export default connect(mapStateToProps)(Checkout);
