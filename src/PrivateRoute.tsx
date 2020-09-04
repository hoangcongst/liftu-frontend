import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router';
import { connect } from 'react-redux';
import CommonHelper from './helpers/common.helper';

interface PropsType extends RouteProps {
    roles?: number[],
    role?: number,
}

class PrivateRoute extends React.Component<PropsType, any> {
    render() {
        if (CommonHelper.getToken() && this.props.role) {
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
        role: 1,
    };
};

export default connect(
    stateToProps,
    null
)(PrivateRoute);