import React, { Component } from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import BlogFeaturedImage from "../blog/blog-featured-image";
import BlogForm from "../blog/blog-form";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default class BlogDetail extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentId: this.props.match.params.slug,
			blogItem: {},
			editMode: false,
		};

		this.handleEditClick = this.handleEditClick.bind(this);
		this.handleUpdateFormSubmission =
			this.handleUpdateFormSubmission.bind(this);
	}

	handleUpdateFormSubmission(blog) {
		this.setState({
			blogItem: blog,
			editMode: false,
		});
	}

	handleEditClick() {
		this.setState({ editMode: true });
	}

	getBlogItem() {
		axios
			.get(
				`https://mikecarouchi.devcamp.space/portfolio/portfolio_blogs/${this.state.currentId}`
			)
			.then((response) => {
				this.setState({
					blogItem: response.data.portfolio_blog,
				});
			})
			.catch((error) => {
				console.log("getblogitem error", error);
			});
	}

	componentDidMount() {
		this.getBlogItem();
	}

	render() {
		const { title, content, featured_image_url } = this.state.blogItem;
		console.log("currentId", this.state.currentId);

		const contentManager = () => {
			if (this.state.editMode) {
				return (
					<BlogForm editMode={this.state.editMode} blog={this.state.blogItem} />
				);
			} else {
				return (
					<div className="content-container">
						<div className="blog-tittle-wrapper">
							<h1 onClick={this.handleEditClick}>{title}</h1>
						</div>

						<div className="content">
							<div>{ReactHtmlParser(content)}</div>
						</div>
						<div className="back-wrapper">
							<button
								className="back-button"
								onClick={() => this.props.history.goBack()}
							>
								Back
							</button>
						</div>
					</div>
				);
			}
		};

		return <div className="blog-container">{contentManager()}</div>;
	}
}
