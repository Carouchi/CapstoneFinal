import React, { Component } from "react";
import Blog from "../pages/blog";
import { Link } from "react-router-dom";
import BlogDetail from "../pages/blog-detail";
import striptags from "striptags";
import Truncate from "react-truncate";

const BlogItem = (props) => {
	const { id, content, title, feautured_image_url } = props.blogItem;

	return (
		<div className="">
			<Link to={`/b/${id}`}>
				<h1>{title}</h1>
			</Link>
			<div>
				<Truncate
					lines={3}
					ellipsis={
						<span>
							...<Link to={`/b/${id}`}>Read more</Link>
						</span>
					}
				>
					{striptags(content)}
				</Truncate>
			</div>
		</div>
	);
};

export default BlogItem;
