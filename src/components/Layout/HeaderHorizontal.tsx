import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { RouteComponentProps } from "react-router";
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    ListGroup,
    ListGroupItem,
    Nav,
    Collapse,
    NavItem,
    NavLink,
    NavbarToggler
} from 'reactstrap';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { toggleSetting } from '../../store/actions/actions';

import ToggleFullscreen from '../Common/ToggleFullscreen';
import HeaderSearch from './HeaderSearch';

import Menu, { ISidebarMenuItem } from '../../Menu';

export interface HeaderHorizontalProps extends RouteComponentProps {
    toggleSetting: typeof toggleSetting
};

class HeaderHorizontal extends Component<HeaderHorizontalProps> {
    state = {
        navSearchOpen: false,
        isOpen: false
    };

    componentDidMount() {
        // Listen for routes changes in order to hide the sidebar on mobile
        this.props.history.listen(() => {
            this.setState({
                isOpen: false
            });
        });
    }

    toggleNavSearch: React.MouseEventHandler = e => {
        e.preventDefault();
        this.setState({
            navSearchOpen: !this.state.navSearchOpen
        });
    };

    closeNavSearch: React.EventHandler<any> = e => {
        e.preventDefault();
        this.setState({
            navSearchOpen: false
        });
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    toggleOffsidebar: React.MouseEventHandler = e => {
        e.preventDefault();
        this.props.toggleSetting('offsidebarOpen');
    };

    /** map menu config to string to determine which element to render */
    itemType = (item: ISidebarMenuItem) => {
        if (item.heading) return 'heading';
        if (!item.submenu) return 'menu';
        if (item.submenu) return 'submenu';
    };

    render() {
        return (
            <header className="topnavbar-wrapper">
                {/* START Top Navbar */}
                <nav className="navbar topnavbar navbar-expand-lg navbar-light">
                    {/* START navbar header */}
                    <div className="navbar-header">
                        <a className="navbar-brand" href="/">
                            <div className="brand-logo">
                                <img className="img-fluid" src="/img/logo.png" alt="App Logo" />
                            </div>
                            <div className="brand-logo-collapsed">
                                <img className="img-fluid" src="/img/logo-single.png" alt="App Logo" />
                            </div>
                        </a>
                        <NavbarToggler onClick={this.toggle} />
                    </div>
                    {/* END navbar header */}
                    {/* START Nav wrapper */}
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar className="mr-auto flex-column flex-lg-row">
                            {Menu.map((item, i) => {
                                if (this.itemType(item) === 'menu') {
                                    return (
                                        <NavItem key={i}>
                                            <Link className="nav-link" to={item.path!}>{item.name}</Link>
                                        </NavItem>
                                    );
                                }
                                if (this.itemType(item) === 'submenu') {
                                    return (
                                        <UncontrolledDropdown nav inNavbar key={i}>
                                            <DropdownToggle nav>{item.name}</DropdownToggle>
                                            <DropdownMenu className="animated fadeIn">
                                                {item.submenu!.map((sitem, si) => {
                                                    return (
                                                        <Link to={sitem.path!} key={si} className="dropdown-item">
                                                            {sitem.name}
                                                        </Link>
                                                    );
                                                })}
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    );
                                }
                            })}
                            {/* END Left navbar */}
                        </Nav>
                        <Nav className="flex-row" navbar>
                            {/* Search icon */}
                            <NavItem>
                                <NavLink onClick={() => this.toggleNavSearch}>
                                    <em className="icon-magnifier" />
                                </NavLink>
                            </NavItem>
                            {/* Fullscreen (only desktops) */}
                            <NavItem className="d-none d-md-block">
                                <ToggleFullscreen className="nav-link" />
                            </NavItem>
                            {/* START Alert menu */}
                            <UncontrolledDropdown nav inNavbar className="dropdown-list">
                                <DropdownToggle nav className="dropdown-toggle-nocaret">
                                    <em className="icon-bell" />
                                    <span className="badge badge-danger">11</span>
                                </DropdownToggle>
                                {/* START Dropdown menu */}
                                <DropdownMenu
                                    right
                                    className="dropdown-menu-right animated flipInX"
                                >
                                    <DropdownItem>
                                        {/* START list group */}
                                        <ListGroup>
                                            <ListGroupItem
                                                action
                                                tag="a"
                                                href=""
                                                onClick={e => e.preventDefault()}
                                            >
                                                <div className="media">
                                                    <div className="align-self-start mr-2">
                                                        <em className="fab fa-twitter fa-2x text-info" />
                                                    </div>
                                                    <div className="media-body">
                                                        <p className="m-0">New followers</p>
                                                        <p className="m-0 text-muted text-sm">
                                                            1 new follower
                                                        </p>
                                                    </div>
                                                </div>
                                            </ListGroupItem>
                                            <ListGroupItem
                                                action
                                                tag="a"
                                                href=""
                                                onClick={e => e.preventDefault()}
                                            >
                                                <div className="media">
                                                    <div className="align-self-start mr-2">
                                                        <em className="fa fa-envelope fa-2x text-warning" />
                                                    </div>
                                                    <div className="media-body">
                                                        <p className="m-0">New e-mails</p>
                                                        <p className="m-0 text-muted text-sm">
                                                            You have 10 new emails
                                                        </p>
                                                    </div>
                                                </div>
                                            </ListGroupItem>
                                            <ListGroupItem
                                                action
                                                tag="a"
                                                href=""
                                                onClick={e => e.preventDefault()}
                                            >
                                                <div className="media">
                                                    <div className="align-self-start mr-2">
                                                        <em className="fa fa-tasks fa-2x text-success" />
                                                    </div>
                                                    <div className="media-body">
                                                        <p className="m-0">Pending Tasks</p>
                                                        <p className="m-0 text-muted text-sm">
                                                            11 pending task
                                                        </p>
                                                    </div>
                                                </div>
                                            </ListGroupItem>
                                            <ListGroupItem
                                                action
                                                tag="a"
                                                href=""
                                                onClick={e => e.preventDefault()}
                                            >
                                                <span className="d-flex align-items-center">
                                                    <span className="text-sm">
                                                        More notifications
                                                    </span>
                                                    <span className="badge badge-danger ml-auto">
                                                        14
                                                    </span>
                                                </span>
                                            </ListGroupItem>
                                        </ListGroup>
                                        {/* END list group */}
                                    </DropdownItem>
                                </DropdownMenu>
                                {/* END Dropdown menu */}
                            </UncontrolledDropdown>
                            {/* END Alert menu */}
                            {/* START Offsidebar button */}
                            <NavItem>
                                <NavLink href="" onClick={() => this.toggleOffsidebar}>
                                    <em className="icon-notebook" />
                                </NavLink>
                            </NavItem>
                            {/* END Offsidebar menu */}
                        </Nav>
                    </Collapse>
                    {/* END Nav wrapper */}
                    {/* START Search form */}
                    <HeaderSearch isOpen={this.state.navSearchOpen} onClose={this.closeNavSearch} />
                    {/* END Search form */}
                </nav>
                {/* END Top Navbar */}
            </header>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({ toggleSetting: bindActionCreators(toggleSetting, dispatch) })

export default connect(
    null,
    mapDispatchToProps
)(withRouter(HeaderHorizontal));