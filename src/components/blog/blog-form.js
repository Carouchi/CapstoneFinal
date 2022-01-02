import React, { Component } from "react";
import axios from "axios";

export default class BlogForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: "",
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	buildForm() {
		let formData = new FormData();

		formData.append("[title]", this.state.title);

		return formData;
	}

	handleSubmit(event) {
		axios
			.post("", this.buildForm(), { withCredentials: true })
			.then((response) => {
				this.props.handleSuccessfulFormSubmission(response.data.portfolio_blog); // add api endpoint where portfolio_blog is to pass to parent comp

				this.setState({
					title: "",
				});
			})
			.catch((error) => {
				console.log("handleSubmit blog error", error);
			});

		this.props.handleSuccessfulFormSubmission(this.state);
		event.preventDefault();
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit} className="blog-form-wrapper">
				<div className="column">
					<input
						type="text"
						onChange={this.handleChange}
						name="title"
						placeholder="Blog Title"
						value={this.state.title}
					/>
				</div>

				<button className="btn">save</button>
			</form>
		);
	}
}
