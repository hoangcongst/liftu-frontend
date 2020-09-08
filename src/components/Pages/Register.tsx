import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Input, CustomInput } from 'reactstrap';
import { API_COMMAND } from "../../types/api.type";
import FormValidator from '../Forms/FormValidator';
import CommonHelper from '../../helpers/common.helper';
import { compose, Dispatch } from 'redux'
import { loginAction, setRedirect, userInfoAction } from "../../store/actions/session.actions";
import '../../styles/register.css';
import axios from 'axios'

interface PropsInterface {
    login: Function,
    setRedirect: Function,
    user: Function,
    location: any,
    history?: any,
    redirectUrl?: string
}
class Register extends Component<PropsInterface> {

    state = {
        thumbnailPreview: "",
        formRegister: {
            email: '',
            password: '',
            password2: '',
            username: '',
            display_name: '',
            terms: false,
        }
    }

    handleThumbnailLocalPath = (event: any) => {
        let image_as_base64 = URL.createObjectURL(event.target.files[0])
        this.setState({
            thumbnailPreview: image_as_base64
        });
    };

    /**
     * Validate input using onChange event
     * @param  {String} formName The name of the form in the state object
     * @return {Function} a function used for the event
     */
    validateOnChange = (event: any) => {
        const input = event.target;
        const form = input.form
        const value = input.type === 'checkbox' ? input.checked : input.value;

        const result = FormValidator.validate(input);

        this.setState({
            [form.name]: {
                ...(this.state as any)[form.name],
                [input.name]: value,
                errors: {
                    ...(this.state as any)[form.name].errors,
                    [input.name]: result
                }
            }
        });

    }

    onSubmit = (e: any) => {
        const form = e.target;
        const inputs = [...form.elements].filter(i => ['INPUT', 'SELECT'].includes(i.nodeName))
        
        const { errors, hasError } = FormValidator.bulkValidate(inputs)

        this.setState({
            [form.name]: {
                ...(this.state as any)[form.name],
                errors
            }
        });

        if (hasError) {
            console.log('Form has errors. Check!');
        } else {
            // Create an object of formData
            const formData = new FormData(form);
            // Update the formData object
            axios.post(API_COMMAND.BASE_URL + API_COMMAND.REGISTER.url, formData).then((res: any) => {
                if (res.data.status === 0) {
                    this._login(res.data.token, res.data.exprired, res.data.user);
                }
            })
        }
        e.preventDefault()
    }

    _login(token: string, exprired: string, user: any) {
        CommonHelper.setToken(token);
        this.props.login(exprired);
        this.props.user(user);
        this.props.history.push("/");
    }

    /* Simplify error check */
    hasError = (formName: string, inputName: string, method: string) => {
        return (this.state as any)[formName] &&
            (this.state as any)[formName].errors &&
            (this.state as any)[formName].errors[inputName] &&
            (this.state as any)[formName].errors[inputName][method]
    }

    render() {
        return (
            <div className="block-center mt-4 wd-xxl">
                {/* START card */}
                <div className="card card-flat">
                    <div className="card-header text-center bg-dark">
                        <a href="">
                            <img className="block-center" src="/img/logo.png" alt="Logo" />
                        </a>
                    </div>
                    <div className="card-body">
                        <p className="text-center py-2">SIGNUP TO GET INSTANT ACCESS.</p>
                        <form className="mb-3" name="formRegister" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label className="text-muted" htmlFor="signupInputEmail1">Tên đăng nhập</label>
                                <div className="input-group with-focus">
                                    <Input type="text"
                                        name="username"
                                        className="border-right-0"
                                        placeholder="Enter tên đăng nhập"
                                        invalid={this.hasError('formRegister', 'username', 'required')}
                                        onChange={this.validateOnChange}
                                        data-validate='["required"]'
                                        value={this.state.formRegister.username} />
                                    <div className="input-group-append">
                                        <span className="input-group-text text-muted bg-transparent border-left-0">
                                            <em className="fa fa-user"></em>
                                        </span>
                                    </div>
                                    {this.hasError('formRegister', 'email', 'required') && <span className="invalid-feedback">Tên đăng nhập không để trống</span>}
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="text-muted" htmlFor="signupInputEmail1">Tên hiển thị</label>
                                <div className="input-group with-focus">
                                    <Input type="text"
                                        name="display_name"
                                        className="border-right-0"
                                        placeholder="Enter tên hiển thị"
                                        invalid={this.hasError('formRegister', 'display_name', 'required')}
                                        onChange={this.validateOnChange}
                                        data-validate='["required"]'
                                        value={this.state.formRegister.display_name} />
                                    <div className="input-group-append">
                                        <span className="input-group-text text-muted bg-transparent border-left-0">
                                            <em className="fa fa-user"></em>
                                        </span>
                                    </div>
                                    {this.hasError('formRegister', 'display_name', 'required') && <span className="invalid-feedback">Tên hiển thị không để trống</span>}
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="text-muted" htmlFor="signupInputEmail1">Email address</label>
                                <div className="input-group with-focus">
                                    <Input type="email"
                                        name="email"
                                        className="border-right-0"
                                        placeholder="Enter email"
                                        invalid={this.hasError('formRegister', 'email', 'required') || this.hasError('formRegister', 'email', 'email')}
                                        onChange={this.validateOnChange}
                                        data-validate='["required", "email"]'
                                        value={this.state.formRegister.email} />
                                    <div className="input-group-append">
                                        <span className="input-group-text text-muted bg-transparent border-left-0">
                                            <em className="fa fa-envelope"></em>
                                        </span>
                                    </div>
                                    {this.hasError('formRegister', 'email', 'required') && <span className="invalid-feedback">Email không để trống</span>}
                                    {this.hasError('formRegister', 'email', 'email') && <span className="invalid-feedback">Email không đúng định dạng</span>}
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="text-muted" htmlFor="signupInputPassword1">Password</label>
                                <div className="input-group with-focus">
                                    <Input type="password"
                                        id="id-password"
                                        name="password"
                                        className="border-right-0"
                                        placeholder="Password"
                                        invalid={this.hasError('formRegister', 'password', 'required')}
                                        onChange={this.validateOnChange}
                                        data-validate='["required"]'
                                        value={this.state.formRegister.password}
                                    />
                                    <div className="input-group-append">
                                        <span className="input-group-text text-muted bg-transparent border-left-0">
                                            <em className="fa fa-lock"></em>
                                        </span>
                                    </div>
                                    <span className="invalid-feedback">Field is required</span>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="text-muted" htmlFor="signupInputRePassword1">Retype Password</label>
                                <div className="input-group with-focus">
                                    <Input type="password" name="password2"
                                        className="border-right-0"
                                        placeholder="Retype assword"
                                        invalid={this.hasError('formRegister', 'password2', 'equalto')}
                                        onChange={this.validateOnChange}
                                        data-validate='["equalto"]'
                                        value={this.state.formRegister.password2}
                                        data-param="id-password"
                                    />
                                    <div className="input-group-append">
                                        <span className="input-group-text text-muted bg-transparent border-left-0">
                                            <em className="fa fa-lock"></em>
                                        </span>
                                    </div>
                                    <span className="invalid-feedback">Field must be equal to previous</span>
                                </div>
                            </div>
                            <div className="form-group">
                                <CustomInput type="file" onChange={this.handleThumbnailLocalPath} id="thumbnailLocalPath" name="avatar" />
                                <img alt="avatar" className="thumbnailAvatar" src={this.state.thumbnailPreview}
                                    style={{
                                        height: this.state.thumbnailPreview ? "50%" : "0px",
                                        visibility: this.state.thumbnailPreview ? "visible" : "hidden"
                                    }} />
                            </div>

                            <CustomInput type="checkbox" id="terms"
                                name="terms"
                                label="I agree with the terms"
                                invalid={this.hasError('formRegister', 'terms', 'required')}
                                onChange={this.validateOnChange}
                                data-validate='["required"]'
                                checked={this.state.formRegister.terms}>
                                <span className="invalid-feedback">Field is required</span>
                            </CustomInput>
                            <button className="btn btn-block btn-primary mt-3" type="submit">Create account</button>
                        </form>
                        <p className="pt-3 text-center">Have an account?</p>
                        <Link to="login" className="btn btn-block btn-secondary">Signup</Link>
                    </div>
                </div>
                {/* END card */}
                <div className="p-3 text-center">
                    <span className="mr-2">&copy;</span>
                    <span>2020</span>
                    <span className="mx-2">-</span>
                    <span>LiftU</span>
                    <br />
                    <span>Copyright © 2020 LiftU. All Rights Reserved</span>
                </div>
            </div>
        );
    }
}

const stateToProps = (state: any) => {
    return {
        user: state.user,
        redirectUrl: state.session.redirectUrl,
    };
};

const dispatchToProps = (dispatch: Dispatch) => ({
    login: (exprired: string) => dispatch(loginAction(exprired)),
    setRedirect: (url: string) => dispatch(setRedirect(url)),
    user: (user: Object) => dispatch(userInfoAction(user)),
    dispatch
});

const enhance = compose(
    withRouter,
    connect(stateToProps, dispatchToProps),
)

export default enhance(Register) as React.ComponentType<any>;
