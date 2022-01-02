import axios from "axios";
import React, { Component } from "react";

export default class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			errorText: "",
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
			errorText: "",
		});
	}

	handleSubmit(event) {
		axios
			.post(
				"",
				{
					client: {
						email: this.state.email,
						password: this.state.password,
					},
				},
				{ withCredentials: true }
			)
			.then((response) => {
				if (response.data.status === "created") {
					this.props.handleSuccessfulAuth();
				} else {
					this.setState({
						errorText: "Wrong email or password",
					});
					this.props.handleUnsuccessfulAuth();
				}
			})
			.catch((error) => {
				this.setState({
					errorText: "An error occurred",
				});
				this.props.handleUnsuccessfulAuth();
			});
		console.log("handle submit, event");
		event.preventDefault();
	}

	render() {
		return (
			<div className="login-form">
				<h1>LOGIN</h1>

				<div>{this.state.errorText}</div>

				<form onSubmit={this.handleSubmit}>
					<input
						type="email"
						name="email"
						placeholder="Your Email"
						value={this.state.email}
						onChange={this.handleChange}
					/>

					<input
						type="password"
						name="password"
						placeholder="Your Password"
						value={this.state.password}
						onChange={this.handleChange}
					/>

					<div className="login-button">
						<button type="submit">Submit</button>
					</div>
				</form>
			</div>
		);
	}
}
