import React, {Component} from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import {Row, Col, Card, CardHeader, CardBody, CardColumns} from 'reactstrap';
import ApiHelper from "../../helpers/api.helper";
import {API_COMMAND} from "../../types/api.type";
import {Link} from "react-router-dom";
// import {withRouter} from 'react-router';

class BlogList extends Component {

    state = {
        posts: []
    }

    componentDidMount() {
        this.loadPosts()
    }

    loadPosts() {
        ApiHelper.request(
            API_COMMAND.POST_READ,
            {},
            {isLoading: true}
        ).subscribe(
            (response: any) => {
                this.setState({
                    posts: response.data.data.content
                })
            }
        );
    }

    render() {
        return (
            <ContentWrapper>
                <Row>
                    {/* Blog Content */}
                    <Col xl="9">
                        <CardColumns>
                            {
                                this.state.posts.map((post: any) => {
                                    return <Card key={post.id}>
                                        <Link to="/blog-post" >
                                            <img className="img-fluid" src="img/bg1.jpg" alt="Demo"/>
                                        </Link>
                                        <CardBody>
                                            <p className="d-flex">
                                        <span>
                                            <small className="mr-1">By
                                                <a className="ml-1" href="">{post.username}</a>
                                            </small>
                                            <small className="mr-1">{post.createdAt}</small>
                                        </span>
                                                <span className="ml-auto">
                                            <small>
                                                <strong>56</strong>
                                                <span> Comments</span>
                                            </small>
                                        </span>
                                            </p>
                                            <h4>
                                                <Link to="/blog-post">{post.title}</Link>
                                            </h4>
                                            <p>{post.description!}</p>
                                        </CardBody>
                                    </Card>
                                })
                            }

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