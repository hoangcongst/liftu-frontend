import React, {Component} from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import {Row, Col, Card, CardHeader, CardBody, CardColumns} from 'reactstrap';
import Pagination from "../Elements/Pagination";
import ApiHelper from "../../helpers/api.helper";
import {API_COMMAND} from "../../types/api.type";
import _ from "underscore";
import {Link} from "react-router-dom";
// import {withRouter} from 'react-router';
import '../../styles/style-post.css';
import CommonHelper from '../../helpers/common.helper';
class BlogList extends Component {

    state = {
        posts: [],
        total: 0,
        page: 1,
    }

    componentDidMount() {
        this.loadPosts()
    }

    _goPage = _.debounce((page: number) => {
        this.setState({page: page}, () => {
            this.loadPosts()
        });
    }, 500);

    loadPosts() {
        let reqParams: any = {
            page: this.state.page - 1,
            size: 12,
        };
        ApiHelper.request(
            API_COMMAND.POST_INDEX,
            reqParams,
            {isLoading: true}
        ).subscribe(
            (response: any) => {
                this.setState({
                    posts: response.data.data.content,
                    total: response.data.data.totalElements
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
                                    return <Card key={post.id} style={{textAlign: 'center'}}>
                                        <Link to={"/posts/" + post.id + "/" + post.alias} >
                                            <img className="img-fluid" src={post.thumbnail ? post.thumbnail : "/img/bg1.jpg"} alt="Demo"/>
                                        </Link>
                                        <CardBody>
                                            <p className="d-flex">
                                        <span>
                                            <small className="mr-1">By
                                                <a className="ml-1" href="">{post.displayName}</a>
                                            </small>
                                            <small className="mr-1">{CommonHelper.formatDate(post.createdAt)}</small>
                                        </span>
                                                <span className="ml-auto">
                                            <small>
                                                <strong>{post.numberComment}</strong>
                                                <span> Comments</span>
                                            </small>
                                        </span>
                                            </p>
                                            <h4 className="title-post-ellipsis">
                                                <Link to={"/posts/" + post.id + "/" + post.alias}>{post.title}</Link>
                                            </h4>
                                            <p>{post.description!}</p>
                                        </CardBody>
                                    </Card>
                                })
                            }

                        </CardColumns>
                        <Pagination page={this.state.page} total={this.state.total} listNum={12} goPage={this._goPage}/>
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
                    </Col>
                </Row>
            </ContentWrapper>
        );
    }

}

export default BlogList;