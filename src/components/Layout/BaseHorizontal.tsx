import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { changeSetting } from '../../store/actions/actions';

import HeaderHorizontal from './HeaderHorizontal'
import Offsidebar from './Offsidebar'
import Footer from './Footer'

export interface BaseHorizontalProps {
    changeSetting: typeof changeSetting
};

class BaseHorizontal extends Component<BaseHorizontalProps> {
    /* Toggle Horizontal layout for demo purposes.
        Set the 'horizontal' flag using redux in the settingsReducer
        and remove below methods so it gets rendered by default
    */
    componentDidMount = () => this.props.changeSetting({name: 'horizontal', value: true});
    componentWillUnmount = () => this.props.changeSetting({name: 'horizontal', value: false});

    render() {

        return (
            <div className="wrapper">
                <HeaderHorizontal />

                <Offsidebar />

                <section className="section-container">
                    { this.props.children }
                </section>

                <Footer />
            </div>
        );
    }

}



const mapDispatchToProps = (dispatch: Dispatch) => ({ changeSetting: bindActionCreators(changeSetting, dispatch) });

export default connect(
    null,
    mapDispatchToProps
)(BaseHorizontal);
