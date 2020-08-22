import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Row, Col, Card, CardHeader, CardBody, CardColumns } from 'reactstrap';
import $ from 'jquery';
// JQ Cloud
import 'jqcloud2/dist/jqcloud.css';
import 'jqcloud2/dist/jqcloud.js';

class BlogList extends Component {

    state = {
        //Create an array of word objects, each representing a word in the cloud
        word_array: [
            { text: 'Lorem', weight: 13 /*link: 'http://themicon.co'*/},
            { text: 'Ipsum', weight: 10.5},
            { text: 'Dolor', weight: 9.4},
            { text: 'Sit', weight: 8},
            { text: 'Amet', weight: 6.2},
            { text: 'Consectetur', weight: 5},
            { text: 'Adipiscing', weight: 5},
            { text: 'Sit', weight: 8},
            { text: 'Amet', weight: 6.2},
            { text: 'Consectetur', weight: 5},
            { text: 'Adipiscing', weight: 5
        }]
    }

    componentDidMount() {

    }

    render() {
        return (
            <ContentWrapper>
                <Row>
                    {/* Blog Content */}
                    <Col xl="9">
                        <CardColumns>
                            <Card>
                                <a href="">
                                    <img className="img-fluid" src="img/bg1.jpg" alt="Demo"/>
                                </a>
                                <CardBody>
                                    <p className="d-flex">
                                        <span>
                                            <small className="mr-1">By
                                                <a className="ml-1" href="">Erica Castro</a>
                                            </small>
                                            <small className="mr-1">May 03, 2015</small>
                                        </span>
                                        <span className="ml-auto">
                                            <small>
                                                <strong>56</strong>
                                                <span> Comments</span>
                                            </small>
                                        </span>
                                    </p>
                                    <h4>
                                        <a href="">Trip down the river</a>
                                    </h4>
                                    <p>Aenean in sollicitudin velit. Nam sem magna, tristique non facilisis a, porta ut elit. Aliquam luctus nulla in justo euismod blandit. Aliquam condimentum enim a risus cursus blandit.</p>
                                </CardBody>
                            </Card>
                        </CardColumns>
                    </Col>
                    {/* Blog Sidebar */}
                    <Col xl="3">
                        {/* Search */}
                        <Card className="card-default">
                            <CardHeader>Search</CardHeader>
                            <CardBody>
                                <form className="form-horizontal">
                                    <div className="input-group">
                                        <input className="form-control" type="text" placeholder="Search for..."/>
                                        <span className="input-group-btn">
                                            <button className="btn btn-secondary" type="button">
                                                <em className="fa fa-search"></em>
                                            </button>
                                        </span>
                                    </div>
                                </form>
                            </CardBody>
                        </Card>
                        {/* Categories */}
                        <Card className="card-default">
                            <CardHeader>Categories</CardHeader>
                            <CardBody>
                                <ul className="list-unstyled">
                                    <li>
                                        <a href="">
                                            <em className="fa fa-angle-right fa-fw"></em>Smartphones</a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <em className="fa fa-angle-right fa-fw"></em>Mobiles</a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <em className="fa fa-angle-right fa-fw"></em>Tech</a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <em className="fa fa-angle-right fa-fw"></em>Inpiration</a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <em className="fa fa-angle-right fa-fw"></em>Workspace</a>
                                    </li>
                                </ul>
                            </CardBody>
                        </Card>
                        {/* Tag Cloud */}
                        <Card className="card-default">
                            <CardHeader>Tag Cloud</CardHeader>
                            <CardBody>
                                <div ref="jqcloud" className="mw-100"></div>
                            </CardBody>
                        </Card>
                        {/* Ads */}
                        <Card className="card-default">
                            <CardHeader>Ads</CardHeader>
                            <CardBody className="ie-fix-flex">
                                <a href="">
                                    <img className="img-fluid img-thumbnail" src="img/mockup.png" alt="Demo"/>
                                </a>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </ContentWrapper>
            );
    }

}

export default BlogList;