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
import _ from 'underscore'

interface PropsApp {
    location: any
}

class App extends Component<PropsApp> {
    render() {
        let {location} = this.props
        return (
            <Routes location={location}/>
        );
    }
}

export default withRouter(App as any);