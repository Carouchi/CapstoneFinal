import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FortAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSignOutAlt,
	faNewspaper,
	faBackspace,
} from "@fortawesome/free-solid-svg-icons";

library.add(faSignOutAlt, faNewspaper, faBackspace);

import Auth from "./pages/auth";
import Blog from "./pages/blog";
import BlogDetail from "./pages/blog-detail";
import NavigationComponent from "./navigation/navigation-container";
export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loggedInStatus: "NOT_LOGGED_IN",
		};

		this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
		this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
		this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
	}

	handleSuccessfulLogin() {
		this.setState({
			loggedInStatus: "LOGGED_IN",
		});
	}

	handleUnsuccessfulLogin() {
		this.setState({
			loggedInStatus: "NOT_LOGGED_IN",
		});
	}

	handleSuccessfulLogout() {
		this.setState({
			loggedInStatus: "NOT_LOGGED_IN",
		});
	}

	checkLoginStatus() {
		return axios
			.get("", {
				withCredentials: true,
			})
			.then((response) => {
				const loggedIn = response.data.logged_in;
				const loggedInStatus = this.state.loggedInStatus;

				if (loggedIn && loggedInStatus === "LOGGED_IN") {
					return loggedIn;
				} else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
					this.setState({
						loggedInStatus: "LOGGED_IN",
					});
				} else if (!loggedIn && loggedInStatus === "LOGGED_IN") {
					this.setState({
						loggedInStatus: "NOT_LOGGED_IN",
					});
				}
			})
			.catch((error) => {
				console.log("Error", error);
			});
	}

	componentDidMount() {
		this.checkLoginStatus();
	}

	authorizedPages() {
		return [<Route path="/blog" component={Blog} />]; //POSSIBLY REMOVE
	}

	render() {
		return (
			<div className="container">
				<Router>
					<div>
						<Switch>
							<Route
								exact
								path="/"
								render={(props) => (
									<Auth
										{...props}
										handleSuccessfulLogin={this.handleSuccessfulLogin}
										handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
									/>
								)}
							/>
							{this.state.loggedInStatus === "LOGGED_IN"
								? this.authorizedPages()
								: null}

							<div>
								<NavigationComponent
									loggedInStatus={this.state.loggedInStatus}
									handleSuccessfulLogout={this.handleSuccessfulLogout}
								/>
								<Route
									path="/blog"
									render={(props) => (
										<Blog
											{...props}
											loggedInStatus={this.state.loggedInStatus}
										/>
									)}
								/>
								<Route path="/b/:slug" component={BlogDetail} />
							</div>
						</Switch>
					</div>
				</Router>
			</div>
		);
	}
}
