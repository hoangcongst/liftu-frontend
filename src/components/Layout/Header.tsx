import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, ListGroup, ListGroupItem } from 'reactstrap';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { toggleSetting } from '../../store/actions/actions';

import ToggleFullscreen from '../Common/ToggleFullscreen';
import HeaderSearch from './HeaderSearch';

type HeaderProps = {
    toggleSetting: typeof toggleSetting
};

class Header extends Component<HeaderProps> {

    state = {
        navSearchOpen: false
    };

    toggleUserblock = (e: React.MouseEvent) => {
        e.preventDefault();
        this.props.toggleSetting('showUserBlock');
    }

    toggleOffsidebar = (e: React.MouseEvent) => {
        e.preventDefault()
        this.props.toggleSetting('offsidebarOpen');
    }

    toggleCollapsed = (e: React.MouseEvent) => {
        e.preventDefault()
        this.props.toggleSetting('isCollapsed');
        this.resize()
    }

    toggleAside = (e: React.MouseEvent) => {
        e.preventDefault()
        this.props.toggleSetting('asideToggled');
    }

    resize () {
        const event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, false);
        document.dispatchEvent(event);
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

    render() {
        return (
            <header className="topnavbar-wrapper">
                { /* START Top Navbar */ }
                <nav className="navbar topnavbar">
                    { /* START navbar header */ }
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#/">
                            <div className="brand-logo">
                                <img className="img-fluid" src="img/logo.png" alt="App Logo" />
                            </div>
                            <div className="brand-logo-collapsed">
                                <img className="img-fluid" src="img/logo-single.png" alt="App Logo" />
                            </div>
                        </a>
                    </div>
                    { /* END navbar header */ }

                    { /* START Left navbar */ }
                    <ul className="navbar-nav mr-auto flex-row">
                        <li className="nav-item">
                            { /* Button used to collapse the left sidebar. Only visible on tablet and desktops */ }
                            <a href="" className="nav-link d-none d-md-block d-lg-block d-xl-block" onClick={ this.toggleCollapsed }>
                                <em className="fas fa-bars"></em>
                            </a>
                            { /* Button to show/hide the sidebar on mobile. Visible on mobile only. */ }
                            <a href=""  className="nav-link sidebar-toggle d-md-none" onClick={ this.toggleAside }>
                                <em className="fas fa-bars"></em>
                            </a>
                        </li>
                        { /* START User avatar toggle */ }
                        <li className="nav-item d-none d-md-block">
                            <a  className="nav-link" onClick={ this.toggleUserblock }>
                                <em className="icon-user"></em>
                            </a>
                        </li>
                        { /* END User avatar toggle */ }
                        { /* START lock screen */ }
                        <li className="nav-item d-none d-md-block">
                            <Link to="lock" title="Lock screen" className="nav-link">
                                <em className="icon-lock"></em>
                            </Link>
                        </li>
                        { /* END lock screen */ }
                    </ul>
                    { /* END Left navbar */ }
                    { /* START Right Navbar */ }
                    <ul className="navbar-nav flex-row">
                        { /* Search icon */ }
                        <li className="nav-item">
                            <a className="nav-link" onClick={this.toggleNavSearch}>
                                <em className="icon-magnifier"></em>
                            </a>
                        </li>
                        { /* Fullscreen (only desktops) */ }
                        <li className="nav-item d-none d-md-block">
                            <ToggleFullscreen className="nav-link"/>
                        </li>
                        { /* START Alert menu */ }
                        <UncontrolledDropdown nav inNavbar className="dropdown-list">
                            <DropdownToggle nav className="dropdown-toggle-nocaret">
                                <em className="icon-bell"></em>
                                <span className="badge badge-danger">11</span>
                            </DropdownToggle>
                            { /* START Dropdown menu */ }
                            <DropdownMenu right className="dropdown-menu-right animated flipInX">
                                <DropdownItem>
                                    { /* START list group */ }
                                    <ListGroup>
                                       <ListGroupItem action tag="a" href="" onClick={e => e.preventDefault()}>
                                          <div className="media">
                                             <div className="align-self-start mr-2">
                                                <em className="fab fa-twitter fa-2x text-info"></em>
                                             </div>
                                             <div className="media-body">
                                                <p className="m-0">New followers</p>
                                                <p className="m-0 text-muted text-sm">1 new follower</p>
                                             </div>
                                          </div>
                                       </ListGroupItem>
                                       <ListGroupItem action tag="a" href="" onClick={e => e.preventDefault()}>
                                          <div className="media">
                                             <div className="align-self-start mr-2">
                                                <em className="fa fa-envelope fa-2x text-warning"></em>
                                             </div>
                                             <div className="media-body">
                                                <p className="m-0">New e-mails</p>
                                                <p className="m-0 text-muted text-sm">You have 10 new emails</p>
                                             </div>
                                          </div>
                                       </ListGroupItem>
                                       <ListGroupItem action tag="a" href="" onClick={e => e.preventDefault()}>
                                          <div className="media">
                                             <div className="align-self-start mr-2">
                                                <em className="fa fa-tasks fa-2x text-success"></em>
                                             </div>
                                             <div className="media-body">
                                                <p className="m-0">Pending Tasks</p>
                                                <p className="m-0 text-muted text-sm">11 pending task</p>
                                             </div>
                                          </div>
                                       </ListGroupItem>
                                       <ListGroupItem action tag="a" href="" onClick={e => e.preventDefault()}>
                                          <span className="d-flex align-items-center">
                                             <span className="text-sm">More notifications</span>
                                             <span className="badge badge-danger ml-auto">14</span>
                                          </span>
                                       </ListGroupItem>
                                    </ListGroup>
                                    { /* END list group */ }
                                </DropdownItem>
                            </DropdownMenu>
                            { /* END Dropdown menu */ }
                        </UncontrolledDropdown>
                        { /* END Alert menu */ }
                        { /* START Offsidebar button */ }
                        <li className="nav-item">
                            <a className="nav-link" href="" onClick={this.toggleOffsidebar}>
                                <em className="icon-notebook"></em>
                            </a>
                        </li>
                        { /* END Offsidebar menu */ }
                    </ul>
                    { /* END Right Navbar */ }

                    {/* START Search form */}
                    <HeaderSearch isOpen={this.state.navSearchOpen} onClose={this.closeNavSearch} />
                    {/* END Search form */}
                </nav>
                { /* END Top Navbar */ }
            </header>
            );
    }

}


const mapDispatchToProps = (dispatch: Dispatch) => ({ toggleSetting: bindActionCreators(toggleSetting, dispatch) })

export default connect(
    null,
    mapDispatchToProps
)(Header);