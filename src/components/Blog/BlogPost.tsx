import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import ApiHelper from '../../helpers/api.helper';
import { API_COMMAND } from '../../types/api.type';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";
interface Props {
    match: any,
    user: Object
}

class BlogPost extends Component<Props, any> {

    state = {
        //Create an array of word objects, each representing a word in the cloud
        word_array: [
            { text: 'Lorem', weight: 13 /*link: 'http://themicon.co'*/ },
            { text: 'Ipsum', weight: 10.5 },
            { text: 'Dolor', weight: 9.4 },
            { text: 'Sit', weight: 8 },
            { text: 'Amet', weight: 6.2 },
            { text: 'Consectetur', weight: 5 },
            { text: 'Adipiscing', weight: 5 },
            { text: 'Sit', weight: 8 },
            { text: 'Amet', weight: 6.2 },
            { text: 'Consectetur', weight: 5 },
            {
                text: 'Adipiscing', weight: 5
            }],
        post: {
            title: "",
            content: "",
            created_at: "",
            user: {}
        },
        postId: '',
    }
    

    loadPost(postId: number) {
        ApiHelper.request(
            API_COMMAND.POST_SHOW,
            {},
            {isLoading: true},
            { postId: postId }
        ).subscribe(
            (response: any) => {
                this.setState({
                    post: {
                        title: response.data.data.title,
                        content: response.data.data.content,
                        created_at: response.data.data.created_at,
                        user: response.data.data.user
                    }
                })
            }
        );
    }

    componentDidMount() {
        const postId = this.props.match.params.postId;
        this.setState({
            postId: postId
        });
        if (postId) {
            this.loadPost(postId)
        }
    }

    render() {
        return (
            <ContentWrapper>
                <Row>
                    {/* Blog Content */}
                    <Col xl="9">
                        <Card className="card-default">
                            <CardHeader>
                                
                                <div className="bb">

                                    <h2 className="text-lg mt-3">{this.state.post.title}</h2>
                                    <p className="d-flex">
                                        <span>
                                            <small className="mr-1">By
                                                <a className="ml-1" href="">Erica Castro</a>
                                            </small>
                                            <small className="mr-1">{this.state.post.created_at}</small>
                                            <small className="mr-1">
                                                {
                                                    // @ts-ignore
                                                    (this.props.user.id === this.state.post.user.id) &&
                                                   
                                                        <Link to={"/edit-post/" + this.state.postId} >
                                                             <em className="fa fa-edit text-muted" /> 
                                                        </Link>  
                                                }
                                                
                                            </small>
                                        </span>
                                        <span className="ml-auto">
                                            <small>
                                                <strong>56</strong>
                                                <span>Comments</span>
                                            </small>
                                        </span>
                                    </p>
                                </div>
                            </CardHeader>
                            <CardBody className="text-md">
                                <div dangerouslySetInnerHTML={{__html: this.state.post.content}} />
                                <hr className="my-4" />
                                <div className="btn-group" role="group" aria-label="...">
                                    <button className="btn btn-secondary" type="button">
                                        <em className="fab fa-facebook-f text-muted" />
                                    </button>
                                    <button className="btn btn-secondary" type="button">
                                        <em className="fab fa-twitter text-muted" />
                                    </button>
                                    <button className="btn btn-secondary" type="button">
                                        <em className="fab fa-google-plus-g text-muted" />
                                    </button>
                                    <button className="btn btn-secondary" type="button">
                                        <em className="fa fa-tumblr text-muted" />
                                    </button>
                                    <button className="btn btn-secondary" type="button">
                                        <em className="fa fa-pinterest text-muted" />
                                    </button>
                                    <button className="btn btn-secondary" type="button">
                                        <em className="fa fa-share-alt text-muted" />
                                    </button>
                                </div>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>3 Comments</CardHeader>
                            <CardBody>
                                <div className="media">
                                    <img className="mr-3 rounded-circle thumb64" src="img/user/01.jpg" alt="Demo" />
                                    <div className="media-body">
                                        <h4 id="media-heading">
                                            <a href="">Susan Grant</a>
                                            <small> 10 min</small>
                                        </h4>
                                        <p>Donec ac massa tortor. In hac habitasse platea dictumst. Nam blandit fringilla faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nisi eget metus semper congue.</p>
                                        <p>Fusce ullamcorper placerat tortor, placerat consequat diam cursus posuere.</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="media">
                                    <img className="mr-3 rounded-circle thumb64" src="img/user/03.jpg" alt="Demo" />
                                    <div className="media-body mb-3">
                                        <h4 id="media-heading">
                                            <a href="">Dustin Dunn</a>
                                            <small> 20 min</small>
                                        </h4>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                                        <hr />
                                        <div className="media">
                                            <img className="mr-3 rounded-circle thumb64" src="img/user/06.jpg" alt="Demo" />
                                            <div className="media-body">
                                                <h4 id="nested-media-heading">
                                                    <a href="">Marcus Gomez</a>
                                                    <small> 1 hour</small>
                                                </h4>Integer ac nisl et urna gravida malesuada. Vivamus fermentum libero vel felis aliquet interdum.</div>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>
                                <em className="fas fa-pencil-alt mr-2" />Add your Comment
                            </CardHeader>
                            <CardBody>
                                <form className="form-horizontal" action="/">
                                    <div className="form-group row">
                                        <Col xs="6">
                                            <input className="form-control" id="post-firstname" type="text" name="post-firstname" placeholder="Your firstname" />
                                        </Col>
                                        <Col xs="6">
                                            <input className="form-control" id="post-lastname" type="text" name="post-lastname" placeholder="Your lastname" />
                                        </Col>
                                    </div>
                                    <div className="form-group row">
                                        <Col xs="12">
                                            <textarea className="form-control" id="post-comment" name="post-comment" rows={4} placeholder="Comment here.." />
                                        </Col>
                                    </div>
                                    <div className="form-group row">
                                        <Col xs="12">
                                            <button className="btn btn-primary" type="button">Send Comment</button>
                                        </Col>
                                    </div>
                                </form>
                            </CardBody>
                        </Card>
                    </Col>
                    {/* Blog Sidebar */}
                    <Col xl="3">
                        <Row>
                            <Col xs="12">
                                {/* Search */}
                                <Card className="card-default">
                                    <CardHeader>Search</CardHeader>
                                    <CardBody>
                                        <form className="form-horizontal">
                                            <div className="input-group">
                                                <input className="form-control" type="text" placeholder="Search for..." />
                                                <span className="input-group-btn">
                                                    <button className="btn btn-secondary" type="button">
                                                        <em className="fa fa-search" />
                                                    </button>
                                                </span>
                                            </div>
                                        </form>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col xs="4" xl="12">
                                {/* Categories */}
                                <Card className="card-default">
                                    <CardHeader>Categories</CardHeader>
                                    <CardBody>
                                        <ul className="list-unstyled">
                                            <li>
                                                <a href="">
                                                    <em className="fa fa-angle-right fa-fw" />Smartphones</a>
                                            </li>
                                            <li>
                                                <a href="">
                                                    <em className="fa fa-angle-right fa-fw" />Mobiles</a>
                                            </li>
                                            <li>
                                                <a href="">
                                                    <em className="fa fa-angle-right fa-fw" />Tech</a>
                                            </li>
                                            <li>
                                                <a href="">
                                                    <em className="fa fa-angle-right fa-fw" />Inpiration</a>
                                            </li>
                                            <li>
                                                <a href="">
                                                    <em className="fa fa-angle-right fa-fw" />Workspace</a>
                                            </li>
                                        </ul>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col xs="4" xl="12">
                                {/* Tag Cloud */}
                                <Card className="card-default">
                                    <CardHeader>Tag Cloud</CardHeader>
                                    <CardBody>
                                        <div ref="jqcloud" className="mw-100" />
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </ContentWrapper>
        );
    }

}

const stateToProps = (state: any) => {
    return {
        user: state.session.user
    };
};

export default connect(
    stateToProps,
    null
)(BlogPost);