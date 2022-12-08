import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLogin } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
        };
    }

    handleLogin = async () => {
        try {
            await handleLogin(this.state.username, this.state.password);
        } catch (e) {
            console.log(e)
        }
    };

    render() {


        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <h1 className='col-12 text-center'>Login</h1>
                        <div className='col-12 form-group type-input-login'>
                            <label>UserName</label>
                            <input
                                value={this.state.username}
                                onChange={(e) => this.setState({
                                    username: e.target.value
                                })}
                                type='text'
                                className='form-control'
                                placeholder='Nhập email của bạn'>
                            </input>
                        </div>
                        <div className='col-12 form-group type-input-login'>
                            <label>Password</label>
                            <div className='custom-input-password'>
                                <input
                                    value={this.state.password}
                                    onChange={(e) => this.setState({
                                        password: e.target.value
                                    })}
                                    className='form-control'
                                    type={this.state.isShowPassword === true ? 'text' : 'password'}
                                    placeholder='Nhập mật khẩu của bạn'>
                                </input>
                                <span onClick={() => this.setState(
                                    {
                                        isShowPassword: !this.state.isShowPassword
                                    }
                                )}>
                                    <i className={this.state.isShowPassword === true ? "far fa-eye-slash" : "far fa-eye"}></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12 type-btn-login'>
                            <button
                                type='submit'
                                className='btn btn-primary'
                                onClick={() => this.handleLogin()}>
                                Login
                            </button>
                        </div>
                        <div className='col-12 forgot-pw'>
                            <span>Forgot your password?</span>
                        </div>
                        <div className='col-12 mt-3 text-center'>
                            <span>Or Login With</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
