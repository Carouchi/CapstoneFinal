import React, { Component } from "react";
import axios from "axios";

import RichTextEditor from "../forms/rich-text-editor";
export default class BlogForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: "",
			content: "",
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleRichTextEditorChange =
			this.handleRichTextEditorChange.bind(this);
	}

	handleRichTextEditorChange(content) {
		this.setState({
			content: content,
		});
	}

	buildForm() {
		let formData = new FormData();

		formData.append("[title]", this.state.title);
		formData.append("[content]", this.state.content);

		return formData;
	}

	handleSubmit(event) {
		axios
			.post("", this.buildForm(), { withCredentials: true })
			.then((response) => {
				this.setState({
					title: "",
					content: "",
				});

				this.props.handleSuccessfulFormSubmission(response.data.portfolio_blog); // add api endpoint where portfolio_blog is to pass to parent comp
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

				<div className="text-editor-column">
					<RichTextEditor
						handleRichTextEditorChange={this.handleRichTextEditorChange}
					/>
				</div>

				<button className="btn">save</button>
			</form>
		);
	}
}
