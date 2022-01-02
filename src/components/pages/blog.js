import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BlogItem from "../blog/blog-item";
import BlogModal from "../modals/blog-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Blog extends Component {
	constructor() {
		super();

		this.state = {
			blogItems: [],
			blogModalIsOpen: false,
		};

		this.getBlogItems = this.getBlogItems.bind(this);
		this.handleNewBlogClick = this.handleNewBlogClick.bind(this);
		this.handleModalClose = this.handleModalClose.bind(this);
		this.handleSuccessfulNewBlogSubmission =
			this.handleSuccessfulNewBlogSubmission.bind(this);
	}

	handleSuccessfulNewBlogSubmission(blog) {
		this.setState({
			blogModalIsOpen: false,
			blogItems: [blog].concat(this.state.blogItems),
		});
	}

	handleModalClose() {
		this.setState({
			blogModalIsOpen: false,
		});
	}

	handleNewBlogClick() {
		this.setState({
			blogModalIsOpen: true,
		});
	}

	getBlogItems() {
		axios
			.get("https://mikecarouchi.devcamp.space/portfolio/portfolio_blogs", {
				withCredentials: true,
			})
			.then((response) => {
				this.setState({
					blogItems: response.data.portfolio_blogs,
				});
			})
			.catch((error) => {
				console.log("getBlogItems error", error);
			});
	}

	componentWillMount() {
		this.getBlogItems();
	}

	render() {
		const blogRecords = this.state.blogItems.map((blogItem) => {
			return <BlogItem key={blogItem.id} blogItem={blogItem} />;
		});

		return (
			<div className="blog-container">
				<div className="content-container">{blogRecords}</div>
				<BlogModal
					handleSuccessfulNewBlogSubmission={
						this.handleSuccessfulNewBlogSubmission
					}
					handleModalClose={this.handleModalClose}
					modalIsOpen={this.state.blogModalIsOpen}
				/>

				<div className="new-blog-link">
					<a onClick={this.handleNewBlogClick}>
						<FontAwesomeIcon icon="newspaper"></FontAwesomeIcon>
					</a>
				</div>
			</div>
		);
	}
}

export default Blog;

// {this.props.loggedInStatus === "LOGGED_IN" ? :null} code to go around new-blog-link onced linked with api and loggin works
