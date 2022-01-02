import React, { Component } from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FortAwesomeIcon } from "@fortawesome/react-fontawesome";

const handleSignOut = () => {
	axios
		.delete("", { withCredentials: true })
		.then((response) => {
			if (response.status === 200) {
				props.history.push("/");
				props.handleSuccessfulLoutout();
			}
			return response.data;
		})
		.catch((error) => {
			console.log("error sign out", error);
		});
};

class NavigationComponent extends Component {
	render() {
		return (
			<div className="nav-wrapper">
				<div className="nav-user-name">MIKE CAROUCHI</div>
				<div className="right-side-nav">
					<a className="signout-icon" onClick={handleSignOut}>
						Sign Out <FontAwesomeIcon icon="sign-out-alt"></FontAwesomeIcon>
					</a>
				</div>
			</div>
		);
	}
}

export default withRouter(NavigationComponent);
