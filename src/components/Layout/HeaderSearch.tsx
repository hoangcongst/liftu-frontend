import React, { Component } from 'react';

interface HeaderSearchProps {
    isOpen: boolean,
    onClose: React.EventHandler<any>
};

class HeaderSearch extends Component<HeaderSearchProps> {
    componentDidMount() {
        document.addEventListener('keydown', this.closeNavSearchKey);
        document.addEventListener('click', this.closeNavSearchClick);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.closeNavSearchKey);
        document.removeEventListener('click', this.closeNavSearchClick);
    }

    setInputSearch = (isOpen: boolean) => (input: HTMLInputElement) => {
        if (input) input[isOpen ? 'focus' : 'blur']();
    };

    closeNavSearchKey = (e: KeyboardEvent) => {
        if (e.keyCode === 27) this.props.onClose(e);
    };

    closeNavSearchClick = (e: MouseEvent) => {
        if(this.props.isOpen && (!(e.target as any).closest('.navbar-form, .nav-link')))
            this.props.onClose(e);
    };

    render() {
        const { isOpen, onClose } = this.props;
        return (
            <form
                className={'navbar-form ' + (isOpen ? 'open' : '')}
                role="search"
                action="search.html"
            >
                <div className="form-group">
                    <input
                        ref={this.setInputSearch(isOpen)}
                        className="form-control"
                        type="text"
                        placeholder="Type and hit enter ..."
                    />
                    <div className="fa fa-times navbar-form-close" onClick={onClose} />
                </div>
                <button className="d-none" type="submit">
                    Submit
                </button>
            </form>
        );
    }
}


export default HeaderSearch;
