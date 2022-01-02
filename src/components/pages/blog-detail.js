import React, { Component } from "react";
import axios from "axios";

export default class BlogDetail extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentId: this.props.match.params.slug,
			blogItem: {},
		};
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
		return (
			<div className="blog-container">
				<div className="content-container">
					<div className="blog-tittle-wrapper">
						<h1>{title}</h1>
					</div>
					<div className="featured-image-wrapper">
						<img src={featured_image_url} />
					</div>

					<div className="content">
						<div>{content}</div>
					</div>
				</div>
			</div>
		);
	}
}
