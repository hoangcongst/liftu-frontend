/*!
 *
 * Angle - Bootstrap Admin Template
 *
 * Version: 4.7.5
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 *
 */

import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

// App Routes
import Routes from './Routes';

// Vendor dependencies
import "./Vendor";
// Application Styles
import './styles/bootstrap.scss';
import './styles/app.scss'
import {connect} from "react-redux";
import CommonHelper from "./helpers/common.helper";
import _ from 'underscore'
import {LOGIN, LOGOUT} from "./store/actions/session.actions";

interface PropsApp {
    location: any,
    authenticated?: boolean,
    logout?: Function
    history?: any
}

class App extends Component<PropsApp> {
    constructor(props: PropsApp) {
        super(props)
        this._checkAuth();
    }

    _checkAuth = () => {
        if (_.isEmpty(CommonHelper.getToken())) {
            // this.props.logout!({
            //     callback: () => {
            //         window.location.href = '/';
            //     }
            // });
            // return;
        
            this._initApp();
        }
    };

    _initApp = () => {
        this._moveUserPage();
    };

    _moveUserPage = () => {
        if (this.props.location.pathname !== '/login') {
            this.props.history.push('/login');
        }
    };

    render() {
        let {location} = this.props
        return (
            <Routes location={location}/>
        );
    }
}

const stateToProps = (state: any) => {
    return {
        authenticated: state.session.authenticated,
        user: state.user
    };
};

const dispatchToProps = (dispatch: any) => ({
    login: (response: any) => dispatch({ 'type': LOGIN, response }),
    logout: (payload: any) =>  dispatch({ 'type': LOGOUT, payload }),
    dispatch
});

export default connect(
    stateToProps,
    dispatchToProps
)(withRouter(props => <App {...props} />));