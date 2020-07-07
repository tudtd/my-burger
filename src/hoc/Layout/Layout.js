import React, { useState } from "react";

import Aux from "../Auxiliary/Auxiliary";
import classes from "./Layout.css";
import { connect } from "react-redux";

import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    };

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    };

    return (
        <Aux>
            <SideDrawer
                open={showSideDrawer}
                closed={sideDrawerClosedHandler}
                isAuth={props.isAuth}
            />
            <Toolbar
                drawerToggleClicked={sideDrawerToggleHandler}
                isAuth={props.isAuth}
            />
            <main className={classes.Content}>{props.children}</main>
        </Aux>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.token !== null,
    };
};

export default connect(mapStateToProps, null)(Layout);
