// FULLSCREEN
// -----------------------------------
import React, { Component } from 'react';
import screenfull, { Screenfull } from 'screenfull';

const sf = screenfull as Screenfull;

const FULLSCREEN_ON_ICON = 'fa fa-expand';
const FULLSCREEN_OFF_ICON = 'fa fa-compress';

export interface ToggleFullscreenProps extends React.HTMLAttributes<HTMLDivElement> {
    /** tag to use, defaults to A */
    tag: string;
}

/**
 * Wrapper for screenfull plugin
 * Wraps child element and toggles
 * fullscreen mode on click
 */
export default class ToggleFullscreen extends Component<ToggleFullscreenProps> {
    element = React.createRef<HTMLDivElement>();

    static defaultProps = {
        tag: 'a'
    };

    state = {
        iconClass: FULLSCREEN_ON_ICON,
        fullscreenSupported: true
    };

    componentDidMount() {
        // Not supported under IE
        const ua = window.navigator.userAgent;
        if (ua.indexOf('MSIE ') > 0 || !!ua.match(/Trident.*rv:11\./)) {
            this.setState({
                fullscreenSupported: false
            });
        } else {
            if (sf.raw && sf.raw.fullscreenchange)
                document.addEventListener(sf.raw.fullscreenchange, this.toggleFSIcon);
        }
    }

    toggleFSIcon = () => {
        this.setState({
            iconClass: sf.isFullscreen ? FULLSCREEN_OFF_ICON : FULLSCREEN_ON_ICON
        });
    };

    componentWillUnmount() {
        document.removeEventListener(sf.raw.fullscreenchange, this.toggleFSIcon);
    }

    clickHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        if (sf.enabled) {
            sf.toggle();
            // Switch icon indicator
            this.toggleFSIcon();
        } else {
            console.log('Fullscreen not enabled');
        }
    };

    render() {
        const { tag: Tag } = this.props;
        return this.state.fullscreenSupported ? (
            // @ts-ignore
            <Tag onClick={this.clickHandler} {...this.props}>
                <em className={this.state.iconClass} />
            </Tag>
        ) : null;
    }
}
