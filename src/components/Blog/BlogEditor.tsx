import React, {Component} from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import {Row, Col, Card, Alert} from 'reactstrap';
// React Select
import Select from 'react-select';
// React Draft Wysiwyg
import {EditorState, ContentState, convertFromHTML, convertToRaw} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ApiHelper from '../../helpers/api.helper';
import {API_COMMAND} from "../../types/api.type";
import draftToHtml from 'draftjs-to-html';


const CATEGORIES = [
    {value: 'coding', label: 'coding'},
]
const TAGS = [
    {value: 'JAVASCRIPT', label: 'JAVASCRIPT'},
]
const REVIEWERS = [
    {value: 'adam@email.com', label: 'adam@email.com'},
]

class BlogEditor extends Component {

    state = {
        categories: [],
        tags: [],
        reviewers: [],
        editorState: EditorState.createEmpty(),

        post: {
            title: "",
            description: "",
            status: "",
        }
    }

    componentDidMount() {
        // // editor initial content
        // const blocksFromHTML = convertFromHTML('<p>Write something...</p>');
        // const initialEditorContent = ContentState.createFromBlockArray(
        //     blocksFromHTML.contentBlocks,
        //     blocksFromHTML.entityMap
        // );
        // this.setState({
        //     editorState: EditorState.createWithContent(initialEditorContent)
        // })
    }

    handleChangeSelect = (name: string, newVal: any) => {
        this.setState({
            [name]: newVal
        });
    }

    onEditorStateChange = (editorState: object) => {
        this.setState({editorState})
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
        console.log(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))
        ApiHelper.request(
            API_COMMAND.POST_CREATE,
            {
                title: this.state.post.title,
                content: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
                status: this.state.post.status,
                description: this.state.post.description
            },
            {isLoading: true}
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
                    <em className="fa fa-exclamation-circle fa-lg fa-fw"/>
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
                                       className="mb-3 form-control form-control-lg"/>
                                <Editor
                                    editorState={this.state.editorState}
                                    wrapperClassName="wysiwig-editor-wrapper"
                                    editorClassName="form-control"
                                    editorStyle={{height: 300}}
                                    onEditorStateChange={this.onEditorStateChange}
                                />
                                <br/>
                                <p>Notes</p>
                                <textarea cols={6} className="mb-3 form-control"/>
                                <div className="clearfix">
                                    <div className="float-left">
                                        <button type="button" className="btn btn-secondary">
                                            <em className="fa fa-edit fa-fw"/>Draft
                                        </button>
                                        <button type="button" className="btn btn-primary m-t-10"
                                                onClick={() => this._onSubmit()}>
                                            <em className="fa fa-check fa-fw"/>Save
                                        </button>
                                    </div>
                                    <div className="float-right">
                                        <button type="button" className="btn btn-danger">
                                            <em className="fas fa-trash-alt fa-fw"/>Remove
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
                                <input type="text" placeholder="Brief description.." className="form-control"/>
                            </div>
                            <div className="form-group">
                                <p>Description</p>
                                <textarea rows={5}
                                          placeholder="Max 255 characters..." className="form-control"
                                          value={this.state.post.description} onChange={this.handleDescriptionChange} />
                            </div>
                            <div className="form-group">
                                <p>Keywords</p>
                                <textarea rows={5} placeholder="Max 1000 characters..." className="form-control"/>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </ContentWrapper>
        );
    }

}

export default BlogEditor;