import React from 'react';
import { withTranslation, WithTranslation, Trans } from 'react-i18next';
import ContentWrapper from '../Layout/ContentWrapper';
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class SingleView extends React.Component<WithTranslation> {

    state = {
      dropdownOpen: false
    }

    changeLanguage = (lng: string) => {
        this.props.i18n.changeLanguage(lng);
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                   <div>Welcome
                      <small><Trans i18nKey='dashboard.WELCOME'></Trans></small>
                   </div>
                    { /* START Language list */ }
                    <div className="ml-auto">
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle>
                                English
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-right-forced animated fadeInUpShort">
                                <DropdownItem onClick={() => this.changeLanguage('en')}>English</DropdownItem>
                                <DropdownItem onClick={() => this.changeLanguage('es')}>Spanish</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    { /* END Language list */ }
                </div>
                <Row>
                    <Col xs={12} className="text-center">
                        <h2 className="text-thin mb-4">React Typescript Starter</h2>
                        <p>
                            This project is an application skeleton. You can use it to quickly bootstrap your ReactJS webapp projects and dev environment for these projects.
                            <br/>
                            This starter project offers some examples to work with the template using Typescript and the structure is based on React Create App with <a target="_blank" href="https://create-react-app.dev/docs/adding-typescript/" rel="noopener noreferrer">Typescript Support</a>.
                        </p>
                    </Col>
                </Row>
            </ContentWrapper>
        );
    }
}

export default withTranslation('translations')(SingleView);