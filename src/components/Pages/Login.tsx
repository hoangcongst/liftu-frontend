import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Input, CustomInput } from 'reactstrap';

import FormValidator from '../Forms/FormValidator';
import ApiHelper from "../../helpers/api.helper";
import {API_COMMAND} from "../../types/api.type";


class Login extends Component {

    state = {
        formLogin: {
            email: '',
            password: ''
        }
    }

     /**
      * Validate input using onChange event
      * @return {Function} a function used for the event
      * @param event
      */
    validateOnChange = (event: any) => {
        const input = event.target;
        const form = input.form
        const value = input.type === 'checkbox' ? input.checked : input.value;

        const result = FormValidator.validate(input);

        const newState = {
            [form.name]: {
                ...(this.state as any)[form.name],
                [input.name]: value,
                errors: {
                    ...(this.state as any)[form.name].errors,
                    [input.name]: result
                }
            }
        }
        this.setState(newState);
    }

    onSubmit = (e:any) => {
        const form = e.target;
        const inputs = [...form.elements].filter(i => ['INPUT', 'SELECT'].includes(i.nodeName))

        const { errors, hasError } = FormValidator.bulkValidate(inputs)

        this.setState({
            [form.name]: {
                ...(this.state as any)[form.name],
                errors
            }
        });

        ApiHelper.request(
            API_COMMAND.SIGNIN,
            {
                loginId: this.state.formLogin.email,
                password: this.state.formLogin.password,
            },
            { isLoading: true }
        ).subscribe(
            (response) => {
                // this.props.login({
                //     token: response.headers.authorization,
                //     userData: response.data,
                //     saveId: this.state.saveId ? this.state.loginId : '',
                //     callback: () => {
                //         if (!_.isEmpty(this.props.user) && this.props.user.status !== USER_STATUS.PWDINIT) {
                //             window.location.replace('/');
                //         }
                //     }
                // });
            },
            error => {
                try {
                    this._loginError(error);
                } catch (e) {

                }
            }
        );

        e.preventDefault()
    }

    _loginError = (error: any) => {
        console.log(error)
    };

    /* Simplify error check */
    hasError = (formName:string, inputName:string, method:string) => {
        return  (this.state as any)[formName] &&
            (this.state as any)[formName].errors &&
            (this.state as any)[formName].errors[inputName] &&
            (this.state as any)[formName].errors[inputName][method]
    }

    render() {
        return (
            <div className="block-center mt-4 wd-xl">
                <div className="card card-flat">
                    <div className="card-header text-center bg-dark">
                        <a href="">
                            <img className="block-center rounded" src="img/logo.png" alt="Logo"/>
                        </a>
                    </div>
                    <div className="card-body">
                        <p className="text-center py-2">SIGN IN TO CONTINUE.</p>
                        <form className="mb-3" name="formLogin" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <div className="input-group with-focus">
                                    <Input type="email"
                                        name="email"
                                        className="border-right-0"
                                        placeholder="Enter email"
                                        invalid={this.hasError('formLogin','email','required')||this.hasError('formLogin','email','email')}
                                        onChange={this.validateOnChange}
                                        data-validate='["required", "email"]'
                                        value={this.state.formLogin.email}/>
                                    <div className="input-group-append">
                                        <span className="input-group-text text-muted bg-transparent border-left-0">
                                            <em className="fa fa-envelope" />
                                        </span>
                                    </div>
                                    { this.hasError('formLogin','email','required') && <span className="invalid-feedback">Field is required</span> }
                                    { this.hasError('formLogin','email','email') && <span className="invalid-feedback">Field must be valid email</span> }
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group with-focus">
                                    <Input type="password"
                                        id="id-password"
                                        name="password"
                                        className="border-right-0"
                                        placeholder="Password"
                                        invalid={this.hasError('formLogin','password','required')}
                                        onChange={this.validateOnChange}
                                        data-validate='["required"]'
                                        value={this.state.formLogin.password}
                                    />
                                    <div className="input-group-append">
                                        <span className="input-group-text text-muted bg-transparent border-left-0">
                                            <em className="fa fa-lock" />
                                        </span>
                                    </div>
                                    <span className="invalid-feedback">Field is required</span>
                                </div>
                            </div>
                            <div className="clearfix">
                                <CustomInput type="checkbox" id="rememberme"
                                    className="float-left mt-0"
                                    name="remember"
                                    label="Remember Me">
                                </CustomInput>
                                <div className="float-right">
                                    <Link to="recover" className="text-muted">Forgot your password?</Link>
                                </div>
                            </div>
                            <button className="btn btn-block btn-primary mt-3" type="submit">Login</button>
                        </form>
                        <p className="pt-3 text-center">Need to Signup?</p>
                        <Link to="register" className="btn btn-block btn-secondary">Register Now</Link>
                    </div>
                </div>
                <div className="p-3 text-center">
                    <span className="mr-2">&copy;</span>
                    <span>2020</span>
                    <span className="mx-2">-</span>
                    <span>Angle</span>
                    <br/>
                    <span>Bootstrap Admin Template</span>
                </div>
            </div>
        );
    }
}

const stateToProps = (state: any) => {
    return {
        authenticated: state.authenticated,
        user: state.user
    };
};

const dispatchToProps = (dispatch: any) => ({
    // login: (response: any) => dispatch(sessionActions.login(response)),
    dispatch
});

export default connect(
    stateToProps,
    dispatchToProps
)(Login);

