import React, { Component } from 'react';
import { Collapse } from 'reactstrap';

import { ApplicationState } from '../../store/store';
import { connect } from 'react-redux';

export interface SidebarUserBlockProps {
    showUserBlock: boolean
}

class SidebarUserBlock extends Component<SidebarUserBlockProps> {

    state = {
        showUserBlock: false
    }

    componentWillReceiveProps(newProps: SidebarUserBlockProps) {
        if (newProps.showUserBlock !== this.props.showUserBlock) {
            this.setState({ showUserBlock: newProps.showUserBlock })
        }
    }

    render() {
        return (
            <Collapse id="user-block" isOpen={ this.state.showUserBlock }>
                <div>
                    <div className="item user-block">
                       {/* User picture */}
                       <div className="user-block-picture">
                          <div className="user-block-status">
                             <img className="img-thumbnail rounded-circle" src="img/user/02.jpg" alt="Avatar" width="60" height="60" />
                             <div className="circle bg-success circle-lg"></div>
                          </div>
                       </div>
                       {/* Name and Job */}
                       <div className="user-block-info">
                          <span className="user-block-name">Hello, Mike</span>
                          <span className="user-block-role">Designer</span>
                       </div>
                    </div>
                </div>
            </Collapse>
        )
    }
}


const mapStateToProps = (state: ApplicationState) => ({ showUserBlock: state.settings.showUserBlock })

export default connect(
    mapStateToProps
)(SidebarUserBlock);