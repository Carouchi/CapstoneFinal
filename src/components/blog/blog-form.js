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
				this.props.handleSuccessfulFormSubmission(response.data);
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
			<form onSubmit={this.handleSubmit}>
				<input
					type="text"
					onChange={this.handleChange}
					name="title"
					placeholder="Blog Title"
					value={this.state.title}
				/>

				<button>save</button>
			</form>
		);
	}
}
