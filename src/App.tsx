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
import * as sessionActions from './store/reducers/session.reducer';
import _ from 'underscore'
import ApiHelper from "./helpers/api.helper";
import {API_COMMAND} from "./types/api.type";

interface PropsApp {
    location: any,
    authenticated?: boolean,
    logout?: any
    history?: any
}

class App extends Component<PropsApp> {
    constructor(props: PropsApp) {
        super(props)
        // this._checkAuth();
    }

    // _checkAuth = () => {
    //     if (this.props.authenticated && !CommonHelper.getToken()) {
    //         this.props.logout({
    //             callback: () => {
    //                 window.location.href = '/';
    //             }
    //         });
    //         return;
    //     }
    //
    //     if (!this.props.authenticated && !_.isEmpty(CommonHelper.getToken()) && !_.isEmpty(CommonHelper.getCookie('userId'))) {
        //     ApiHelper.request(API_COMMAND.USERS_DETAIL, {}, {}, { id: CommonHelper.getCookie('userId') }).subscribe(
        //         (response) => {
        //             this.props.login({
        //                 token: CommonHelper.getToken(),
        //                 userData: response.data,
        //                 saveId: ''
        //             });
        //         },
        //         () => {
        //             this._initApp();
        //         }
        //     );
    //     } else {
    //         this._initApp();
    //     }
    // };

    // _initApp = () => {
    //     this._moveUserPage();
    // };
    //
    // _moveUserPage = () => {
    //     console.log('move to login')
    //     if (!this.props.authenticated && this.props.location.pathname !== '/user/login') {
    //         this.props.history.push('/user/login');
    //     }
    // };

    render() {
        let { location } = this.props
        return (
            <Routes location={location}/>
        );
    }
}

const stateToProps = (state: any) => {
    return {
        authenticated: state.authenticated,
        user: state.user
    };
};

const dispatchToProps = (dispatch: any) => ({
    login: (response: any) => dispatch(sessionActions.login(response)),
    logout: (payload: any) => dispatch(sessionActions.logout(payload)),
    dispatch
});

export default connect(
    stateToProps,
    dispatchToProps
)(withRouter(props => <App {...props} />));