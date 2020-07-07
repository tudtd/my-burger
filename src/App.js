import React, { useEffect, Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

const Checkout = React.lazy(() => import("./containers/Checkout/Checkout"));
const Orders = React.lazy(() => import("./containers/Orders/Orders"));
const Auth = React.lazy(() => import("./containers/Auth/Auth"));

const App = (props) => {
    useEffect(() => {
        props.onTryAutoLogin();
    }, []);

    let routes = (
        <Switch>
            <Route path='/auth' render={(props) => <Auth {...props} />} />
            <Route path='/' exact component={BurgerBuilder} />
            <Redirect to='/' />
        </Switch>
    );

    if (props.isAuth) {
        routes = (
            <Switch>
                <Route
                    path='/checkout'
                    render={(props) => <Checkout {...props} />}
                />
                <Route
                    path='/orders'
                    render={(props) => <Orders {...props} />}
                />
                <Route path='/logout' component={Logout} />
                <Route path='/auth' render={(props) => <Auth {...props} />} />
                <Route path='/' exact component={BurgerBuilder} />
                <Redirect to='/' />
            </Switch>
        );
    }

    return (
        <div>
            <Layout>
                <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
            </Layout>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.token !== null,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoLogin: () => dispatch(actions.authCheckState()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
