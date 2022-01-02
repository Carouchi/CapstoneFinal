import React, { Component } from "react";
import ReactModal from "react-modal";

import BlogForm from "../blog/blog-form";

ReactModal.setAppElement(".app-wrapper");

export default class BlogModal extends Component {
	constructor(props) {
		super(props);

		this.customStyles = {
			content: {
				top: "50%",
				left: "50%",
				right: "auto",
				marginRight: "-50%",
				transform: "translate(-50%, -50%)",
				width: "800px",
			},

			overlay: {
				backgroundColor: "rgba(1, 1, 1, .80)",
			},
		};

		this.handleSuccessfulFormSubmission =
			this.handleSuccessfulFormSubmission.bind(this);
	}

	handleSuccessfulFormSubmission(blog) {
		this.props.handleSuccessfulNewBlogSubmission(blog);
	}

	render() {
		return (
			<ReactModal
				style={this.customStyles}
				onRequestClose={() => {
					this.props.handleModalClose();
				}}
				isOpen={this.props.modalIsOpen}
			>
				<h1>
					<BlogForm
						handleSuccessfulFormSubmission={this.handleSuccessfulFormSubmission}
					/>
				</h1>
			</ReactModal>
		);
	}
}
