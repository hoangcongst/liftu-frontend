import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import ApiHelper from '../../helpers/api.helper';
import { API_COMMAND } from '../../types/api.type';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import CommonHelper from '../../helpers/common.helper';
import AuthHelper from '../../helpers/auth.helper';
import '../../styles/style-post.css';
import { Dispatch } from 'redux';
import { changeOgHeader } from '../../store/actions/actions';

interface Props {
    match: any,
    user: any,
    expired: string,
    changeOgHeader: Function
}

class BlogPost extends Component<Props, any> {

    state = {
        //Create an array of word objects, each representing a word in the cloud
        word_array: [
            { text: 'Lorem', weight: 13 }
        ],
        post: {
            title: "",
            content: "",
            description: "",
            thumbnail: "",
            created_at: "",
            numberComment: 0,
            user: {
                display_name: "",
                id: 0
            }
        },
        comments: [],
        commentPageable: {
            last: false,
            page: 0
        },
        commentContent: "",
        postId: 0,
    }


    loadPost(postId: number) {
        ApiHelper.request(
            API_COMMAND.POST_SHOW,
            {},
            { isLoading: true },
            { postId: postId }
        ).subscribe(
            (response: any) => {
                this.setState({
                    post: response.data.data
                })
                this.props.changeOgHeader(this.state.post.title,
                    this.state.post.description, this.state.post.thumbnail,
                    window.location.href)
            }
        );
    }

    loadComments(postId: number, parentCommentId: number, page = 0, isAddBellow = false) {
        ApiHelper.request(
            API_COMMAND.COMMENT_INDEX,
            { post_id: postId, parent_comment_id: parentCommentId, page: page },
            { isLoading: true },
        ).subscribe(
            (response: any) => {
                let comments = []
                if (!isAddBellow)
                    comments = response.data.content
                else {
                    comments = [...this.state.comments, ...response.data.content]
                }

                this.setState({
                    comments: comments,
                    commentPageable: {
                        last: response.data.last,
                        page: response.data.pageable.pageNumber
                    }
                })
            }
        );
    }

    handleClickViewMoreComment = () => {
        if (!this.state.commentPageable.last) {
            this.loadComments(this.state.postId, 0, this.state.commentPageable.page + 1, true)
        }
    }

    deleteComment(commentId: number) {
        ApiHelper.request(
            API_COMMAND.COMMENT_DELETE,
            {},
            { isLoading: true },
            { commentId: commentId }
        ).subscribe(
            (response: any) => {
                this.setState({
                    post: {
                        ...this.state.post,
                        numberComment: this.state.post.numberComment - 1
                    }
                })
                this.loadComments(this.state.postId, 0)
            }
        );
    }

    createComment(postId: number, parentCommentId: number, content: String) {
        ApiHelper.request(
            API_COMMAND.COMMENT_CREATE,
            { post_id: postId, parent_comment_id: parentCommentId, content: content },
            { isLoading: true },
        ).subscribe(
            (response: any) => {
                if (response.data.status === 0) {
                    this.setState({
                        commentContent: "",
                        post: {
                            ...this.state.post,
                            numberComment: this.state.post.numberComment + 1
                        }
                    })
                    this.loadComments(postId, parentCommentId)
                }
            }
        );
    }

    handleComment = (event: any) => {
        this.setState({
            commentContent: event.target.value
        })
    }

    isOwner = (itemUserId: number) => {
        if (this.props.user && this.props.user.id) {
            return this.props.user.id === itemUserId;
        } else {
            return false;
        }

    }

    componentDidMount() {
        const postId = this.props.match.params.postId;
        this.setState({
            postId: postId
        });
        if (postId) {
            this.loadPost(postId)
            this.loadComments(postId, 0)
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

                                    <h2 className="text-md">{this.state.post.title + " "}
                                        {
                                            this.isOwner(this.state.post.user.id) &&
                                            <Link to={"/edit-post/" + this.state.postId} >
                                                <em className="fa fa-edit text-muted" />
                                            </Link>
                                        }
                                    </h2>
                                    <p className="d-flex">
                                        <span>
                                            <small className="mr-1">By
                                                <a className="ml-1" href="">{this.state.post.user.display_name}</a>
                                            </small>
                                            <small className="mr-1">{CommonHelper.formatDate(this.state.post.created_at)}</small>
                                        </span>
                                        <span className="ml-auto">
                                            <small>
                                                <strong>{this.state.post.numberComment}</strong>
                                                <span> Comments</span>
                                            </small>
                                        </span>
                                    </p>
                                </div>
                            </CardHeader>
                            <CardBody className="text-xs">
                                <div dangerouslySetInnerHTML={{ __html: this.state.post.content }} />
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
                                        <em className="fa fa-share-alt text-muted" />
                                    </button>
                                </div>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>{this.state.post.numberComment} Comments</CardHeader>
                            <CardBody>
                                {
                                    this.state.comments.map(
                                        (comment: any) => (
                                            <div key={comment.id} >
                                                <div className="media">
                                                    <img className="mr-3 rounded-circle thumb64"
                                                        src={comment.user.avatar ? comment.user.avatar : "/img/user/default.jpg"} alt="Demo" />
                                                    <div className="media-body">
                                                        <h4 id="media-heading">
                                                            <a href="">{comment.user.display_name}  </a>
                                                            <small>{CommonHelper.formatDate(comment.created_at)}</small>
                                                        </h4>
                                                        {comment.content.split('\n').map((item: string, i: number) => {
                                                            return <p key={i}>{item}</p>;
                                                        })}
                                                        {
                                                            this.isOwner(comment.user.id) && <>
                                                                {/* <button className="btn mb-1 mr-1 btn-xs btn-outline-success" onClick={() => { }}>Edit</button> */}
                                                                <button className="btn mb-1 mr-1 btn-xs btn-outline-danger" onClick={() => this.deleteComment(comment.id)}>Delete</button>
                                                            </>}
                                                    </div>
                                                </div>
                                                <hr />
                                            </div>
                                        )
                                    )
                                }
                                {
                                    !this.state.commentPageable.last && this.state.comments.length > 0 &&
                                    <button type="button" onClick={() => this.handleClickViewMoreComment()}
                                        className="btn btn-secondary btn-xs">View more comments</button>
                                }
                            </CardBody>
                        </Card>
                        <Card className={AuthHelper.isAuthenticated(this.props.expired) ? "" : "card-hidden"}>
                            <CardHeader>
                                <em className="fas fa-pencil-alt mr-2" />Add your Comment
                            </CardHeader>
                            <CardBody>
                                <form className="form-horizontal" action="/">
                                    <div className="form-group row">
                                        <Col xs="12">
                                            <textarea aria-multiline={true} className="form-control" value={this.state.commentContent} onChange={this.handleComment}
                                                id="post-comment" name="post-comment" rows={4} placeholder="Comment here.." />
                                        </Col>
                                    </div>
                                    <div className="form-group row">
                                        <Col xs="12">
                                            <button className="btn btn-primary" type="button"
                                                onClick={() => this.createComment(this.state.postId, 0, this.state.commentContent)}>Send Comment</button>
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
        user: state.session.user,
        expired: state.session.expired
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    changeOgHeader: (title: string, description: string, image: string, url: string) =>
        dispatch(changeOgHeader(title, description, image, url))
})

export default connect(
    stateToProps,
    mapDispatchToProps
)(BlogPost);