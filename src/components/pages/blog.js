import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BlogItem from "../blog/blog-item";
import BlogModal from "../modals/blog-modal";

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
					handleModalClose={this.handleModalClose}
					modalIsOpen={this.state.blogModalIsOpen}
				/>

				<div className="new-blog-link">
					<a onClick={this.handleNewBlogClick}>Open Modal!</a>
				</div>
			</div>
		);
	}
}

export default Blog;
