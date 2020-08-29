import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router';
import { connect } from 'react-redux';

interface PropsType extends RouteProps {
    authenticated?: boolean;
    roles?: number[],
    role?: number,
}

class PrivateRoute extends React.Component<PropsType, any> {
    render() {
        if (this.props.authenticated && this.props.role) {
            if (!this.props.roles || !this.props.roles.length) {
                return <Route {...this.props} />
            }
            if (this.props.roles.includes(this.props.role || 0)) {
                return <Route {...this.props} />
            }
            return <div>Dont have permission</div>
        }
        return <Redirect to="/login" />
    }
}

const stateToProps = (state: any) => {
    return {
        authenticated: state.session.authenticated,
        role: 1,
    };
};

export default connect(
    stateToProps,
    null
)(PrivateRoute);