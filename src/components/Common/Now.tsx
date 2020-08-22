import React, { Component } from 'react';
import moment from 'moment'

export interface NowProps {
    /** string to format current date */
    format: string;
}

export interface NowState {
    currentTime: string
}

/**
 * Updates every second the content of the element
 * with the current time formmated
 */
export default class Now extends Component<NowProps, NowState> {
    interval: number = 0;

    componentDidMount() {
        this.updateTime();
        this.interval = window.setInterval(this.updateTime, 1000);
    }

    componentWillUnmount() {
        if (this.interval) window.clearInterval(this.interval);
    }

    updateTime = () => {
        this.setState({
            currentTime: moment(new Date()).format(this.props.format)
        });
    };

    render() {
        return (
            <div {...this.props} style={{ display: 'inline-block' }}>
                {this.state.currentTime}
            </div>
        );
    }
}
