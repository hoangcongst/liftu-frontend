import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router';
import { connect } from 'react-redux';
import AuthHelper from './helpers/auth.helper';
import CommonHelper from './helpers/common.helper';
import StorageHelper from './helpers/storage.helper';
interface PropsType extends RouteProps {
    roles?: number[],
    role?: number,
    expired?: string,
}

class PrivateRoute extends React.Component<PropsType, any> {
    render() {
        const isAuthenticated = AuthHelper.isAuthenticated(this.props.expired!)
        if (isAuthenticated && this.props.role) {
            if (!this.props.roles || !this.props.roles.length) {
                return <Route {...this.props} />
            }
            if (this.props.roles.includes(this.props.role || 0)) {
                return <Route {...this.props} />
            }
            return <div>Dont have permission</div>
        } else {
            CommonHelper.clearToken()
            StorageHelper.clear()
        }
        return <Redirect to="/auth/login" />
    }
}

const stateToProps = (state: any) => {
    return {
        role: 1,
        expired: state.session.expired,
    };
};

export default connect(
    stateToProps,
    null
)(PrivateRoute);