// SLIMSCROLL
// -----------------------------------
import React from 'react';
import $ from 'jquery';
// Slimscroll
import 'jquery-slimscroll';

declare global {
    interface JQuery {
        slimScroll(options?: any): JQuery;
    }
}

export interface ScrollableProps extends React.HTMLAttributes<HTMLDivElement> {
    /** height of the element */
    height: string|number
}

/**
 * Wrapper for jquery-slimscroll plugin
 */
const Scrollable: React.FunctionComponent<ScrollableProps> = (props) => {
    const init = (node: HTMLDivElement) =>
        $(node).slimScroll({
            height: props.height
        });

    return (
        <div ref={init} {...props}>
            {props.children}
        </div>
    );
};

Scrollable.defaultProps = {
    height: 250
};

export default Scrollable;
