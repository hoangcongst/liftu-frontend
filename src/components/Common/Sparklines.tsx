// SPARKLINE
// -----------------------------------
import React, { Component } from 'react';
import $ from 'jquery';
// Sparklines
import 'jquery-sparkline/jquery.sparkline.min.js';

const RESIZE_EVENT = 'resize.sparkline';

declare global {
    interface JQuery {
        sparkline(values: any, options?: any): JQuery;
    }
}

export interface SparklineProps {
    /** sparkline options object */
    options: any;
    /** tag to use, defaults to div */
    tag: string;
    /** values to display, allows array or csv string */
    values: string | Array<string|number>;
}

/**
 * Wrapper for for jquery-sparkline plugin
 */
export default class Sparkline extends Component<SparklineProps> {
    element = React.createRef<HTMLDivElement>();

    static defaultProps = {
        options: {},
        tag: 'div'
    };

    state = {
        values: this.props.values,
        options: this.props.options
    };

    componentWillMount() {
        this.normalizeParams();
    }

    normalizeParams() {
        let { options, values } = this.state;

        options.disableHiddenCheck = true; // allow draw when initially is not visible
        options.type = options.type || 'bar'; // default chart is bar
        values = Array.isArray(values) ? values : values.split(','); // support array of csv strings

        this.setState({ options, values });
    }

    componentDidMount() {
        // init sparkline
        if(this.element.current)
            $(this.element.current).sparkline(this.state.values, this.state.options);

        // allow responsive
        if (this.state.options.resize) {
            $(window).on(RESIZE_EVENT, () => {
                if(this.element.current)
                    $(this.element.current).sparkline(this.state.values, this.state.options);
            });
        }
    }

    componentWillUnmount() {
        $(window).off(RESIZE_EVENT);
        if(this.element.current)
            $(this.element.current).sparkline('destroy');
    }

    render() {
        const { tag: Tag } = this.props;
        // @ts-ignore
        return <Tag ref={this.element} {...this.props} />;
    }
}
