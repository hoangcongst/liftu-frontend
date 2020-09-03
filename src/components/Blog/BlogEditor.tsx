import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Row, Col, Card, Alert } from 'reactstrap';
// React Select
import Select from 'react-select';
import ApiHelper from '../../helpers/api.helper';
import { API_COMMAND } from "../../types/api.type";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CATEGORIES = [
    { value: 'coding', label: 'coding' },
]
const TAGS = [
    { value: 'JAVASCRIPT', label: 'JAVASCRIPT' },
]

class BlogEditor extends Component {

    state = {
        categories: [],
        tags: [],
        reviewers: [],

        post: {
            title: "",
            description: "",
            status: "",
            content: ""
        }
    }

    handleChangeSelect = (name: string, newVal: any) => {
        this.setState({
            [name]: newVal
        });
    }

    onEditorStateChange = (event: any, editor: any) => {
        this.setState({
            post: {
                ...this.state.post,
                content: editor.getData()
            }
        })
    }

    handleTitleChange = (event: any) => {
        this.setState({
            post: {
                ...this.state.post,
                title: event.target.value
            }
        })
    }

    handleDescriptionChange = (event: any) => {
        this.setState({
            post: {
                ...this.state.post,
                description: event.target.value
            }
        })
    }

    _onSubmit = () => {
        ApiHelper.request(
            API_COMMAND.POST_CREATE,
            {
                title: this.state.post.title,
                content: this.state.post.content,
                status: this.state.post.status,
                description: this.state.post.description
            },
            { isLoading: true }
        ).subscribe(
            (response: any) => {

            },
            error => {
                try {

                } catch (e) {

                }
            }
        );
    }

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">New Article</div>
                <Alert color="info">
                    <em className="fa fa-exclamation-circle fa-lg fa-fw" />
                    <span>There is an autosaved version of this article that is more recent than the version below. <a
                        href="" className="text-white">Restore</a>
                    </span>
                </Alert>
                <Row>
                    { /* Article Content */}
                    <Col lg={9}>
                        <Card body className="card-default">
                            <form action="">
                                <input value={this.state.post.title} onChange={this.handleTitleChange} type="text"
                                    name="article-title" placeholder="Article title..."
                                    className="mb-3 form-control form-control-lg" />
                                <CKEditor
                                    editor={ ClassicEditor }
                                    data={this.state.post.content}
                                    onInit={(editor: any) => {
                                        // Insert the toolbar before the editable area.
                                        editor.ui.getEditableElement().parentElement.insertBefore(
                                            editor.ui.view.toolbar.element,
                                            editor.ui.getEditableElement()
                                        );
                                    }}
                                    onChange={this.onEditorStateChange}
                                />
                                <br />
                                <p>Notes</p>
                                <textarea cols={6} className="mb-3 form-control" />
                                <div className="clearfix">
                                    <div className="float-left">
                                        <button type="button" className="btn btn-secondary">
                                            <em className="fa fa-edit fa-fw" />Draft
                                        </button>
                                        <button type="button" className="btn btn-primary m-t-10"
                                            onClick={() => this._onSubmit()}>
                                            <em className="fa fa-check fa-fw" />Save
                                        </button>
                                    </div>
                                    <div className="float-right">
                                        <button type="button" className="btn btn-danger">
                                            <em className="fas fa-trash-alt fa-fw" />Remove
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </Card>
                    </Col>
                    { /* Article sidebar */}
                    <Col lg={3}>
                        <Card body className="card-default">
                            <p className="lead">Article Data</p>
                            <p>Categories</p>
                            <Select
                                name="categories"
                                multi
                                simpleValue
                                value={this.state.categories}
                                onChange={this.handleChangeSelect.bind(this, 'categories')}
                                options={CATEGORIES}
                            />
                            <p className="mt-2">Tags</p>
                            <Select
                                name="tags"
                                multi
                                simpleValue
                                value={this.state.tags}
                                onChange={this.handleChangeSelect.bind(this, 'tags')}
                                options={TAGS}
                            />
                            <p className="lead mt-3">SEO Metadata</p>
                            <div className="form-group">
                                <p>Title</p>
                                <input type="text" placeholder="Brief description.." className="form-control" />
                            </div>
                            <div className="form-group">
                                <p>Description</p>
                                <textarea rows={5}
                                    placeholder="Max 255 characters..." className="form-control"
                                    value={this.state.post.description} onChange={this.handleDescriptionChange} />
                            </div>
                            <div className="form-group">
                                <p>Keywords</p>
                                <textarea rows={5} placeholder="Max 1000 characters..." className="form-control" />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </ContentWrapper>
        );
    }

}

export default BlogEditor;
