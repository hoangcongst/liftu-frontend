import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router';
import { connect } from 'react-redux';
interface PropsType extends RouteProps {
    roles?: number[],
    role?: number,
    exprired?: string,
}

class PrivateRoute extends React.Component<PropsType, any> {
    render() {
        if (this.props.exprired && this.props.role) {
            if (!this.props.roles || !this.props.roles.length) {
                return <Route {...this.props} />
            }
            if (this.props.roles.includes(this.props.role || 0)) {
                return <Route {...this.props} />
            }
            return <div>Dont have permission</div>
        }
        return <Redirect to="/auth/login" />
    }
}

const stateToProps = (state: any) => {
    return {
        role: 1,
        exprired: state.session.exprired,
    };
};

export default connect(
    stateToProps,
    null
)(PrivateRoute);