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

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { RouteComponentProps } from "react-router";
// App Routes
import Routes from './Routes';
// Vendor dependencies
import "./Vendor";
// Application Styles
import './styles/bootstrap.scss';
import './styles/app.scss'
import MetaTags from 'react-meta-tags';
import { initialState } from './store/reducers/ogheader.reducers';

interface PropsApp extends RouteComponentProps {
    location: any,
    ogTitle?: string,
    ogDescription?: string,
    ogImage?: string,
    ogUrl?: string,
}

class App extends Component<PropsApp> {
    isChangeRouteWithoutUpdateMetaHeader = () => {
        console.log(this.props.ogUrl !== window.location.href)
        return this.props.ogUrl !== window.location.href
    }

    render() {
        let { location } = this.props
        return (
            <>
                <MetaTags>
                    <title>{this.isChangeRouteWithoutUpdateMetaHeader() ?
                        initialState.title : this.props.ogTitle}</title>
                    <meta property="og:title" content={this.isChangeRouteWithoutUpdateMetaHeader() ?
                        initialState.title : this.props.ogTitle} />
                    <meta name="og:description" content={this.isChangeRouteWithoutUpdateMetaHeader() ?
                        initialState.description : this.props.ogDescription} />
                    <meta property="og:image" content={this.isChangeRouteWithoutUpdateMetaHeader() ?
                        initialState.image : this.props.ogImage} />
                    <meta property="og:url" content={window.location.href} />
                </MetaTags>
                <Routes location={location} />
            </>
        );
    }
}

const stateToProps = (state: any) => {
    return {
        ogTitle: state.ogheader.title,
        ogDescription: state.ogheader.description,
        ogImage: state.ogheader.image,
        ogUrl: state.ogheader.url
    };
};

export default withRouter(connect(
    stateToProps
)(App))