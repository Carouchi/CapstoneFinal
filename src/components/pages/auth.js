import React, { Component } from "react";
import loginImg from "../../../static/assets/loginImg.jpg";
import Login from "../auth/login";

export default class Auth extends Component {
	render() {
		return (
			<div className="auth-page-wrapper">
				<div className="auth-page-form">
					<Login />
				</div>
			</div>
		);
	}
}
