import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import logo from '../assets/img/logo.png';
import successlogo from '../assets/img/successlogo.png'
import { connect } from "react-redux";
import { changeLogin, changePassword, verifyData } from "../actions/LoginFormActions";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(event) {
        let data = {"login": this.props.login, "password": this.props.password};
        this.props.verifyData("http://localhost:8080/RESTfulExample/rest/login", data);
        event.preventDefault();
    }
    
    handleLoginChange(event) {
        this.props.changeLogin(event.target.value);
    }
    
    handlePasswordChange(event) {
        this.props.changePassword(event.target.value);
    }
    
    render(){
        const Error = (
            <div className="error">
				<h1>Oops!</h1>
				<div className="error-details">
					<h2>Something went wrong! No response!</h2>
				</div>	
			</div>
        );
        const Success = (
            <div className="form">
                <br/>
                <div className="form-header-logo"><img src={successlogo} alt="successlogo" /></div>
                <div className="form-header-text">Succesful logged</div>
            </div>
        );
        const FormDiv = (
                <div className="form">
                    <br/>
                    <div className="form-header">
                        <div className="form-header-logo"><img src={logo} alt="logo" /></div>
                        <div className="form-header-text">Login</div>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup
                            bsSize="small"
                        >
                            <FormControl
                                id={(this.props.data.Auth === "Denied") ? "denied" : ""}
                                type="text"
                                value={this.props.login}
                                onChange={this.handleLoginChange}
                                placeholder="Login"
                            />
                            <br/>
                            <FormControl
                                type="password"
                                value={this.props.password}
                                onChange={this.handlePasswordChange}
                                placeholder="Password"
                            />
                            <br/>
                            <Button type="submit" 
                                id={this.props.isLoading ? "loginwaiting" : "login"} 
                                name="submit" 
                                alt="login" 
                                value=""/>
                        </FormGroup>
                    </form>
                </div>
        );
        if (this.props.error === true) {
            return Error
        } else {
            return (this.props.data.Auth === "Logged") ? Success : FormDiv;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.formReducer.login,
        password: state.formReducer.password,
        isLoading: state.formReducer.isLoading,
        data: state.formReducer.data,
        error: state.formReducer.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLogin: (login) => {
            dispatch(changeLogin(login));
        },
        changePassword: (password) => {
            dispatch(changePassword(password));
        },
        verifyData: (url, data) => {
            dispatch(verifyData(url, data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
