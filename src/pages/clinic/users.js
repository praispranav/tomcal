import React, { Component } from "react";
//import { Link } from 'react-router-dom';
import { Link, withRouter } from "react-router-dom";
import {
	Panel,
	PanelHeader,
	PanelBody,
} from "./../../components/panel/panel.jsx";
import {
	UncontrolledButtonDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from "reactstrap";
//import axios from 'axios';
import { getUsers, deleteUser } from "./../../services/users";
import "bootstrap/dist/css/bootstrap.min.css";
//import FloatSubMenu from './../../components/float-sub-menu/float-sub-menu';
import Pagination from "../../common/pagination";
import { paginate } from "../../utils/paginate";
import UsersTable from "../../components/usersTable.jsx";
import SearchBox from "./../../common/searchBox";
import _ from "lodash";
import http from "./../../services/httpService";
import { apiUrl } from "./../../config/config.json";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import newIcon from "../../assets/Icons/new.svg";
import editIcon from "../../assets/Icons/edit.svg";
import deleteIcon from "../../assets/Icons/permanentdelete.svg";
import csvIcon from "../../assets/Icons/csv.svg";
import pdfIcon from "../../assets/Icons/pdf.svg";
import printIcon from "../../assets/Icons/printer-xxl.svg";
import lockIcon from "../../assets/Icons/lock.svg";
import unlockIcon from "../../assets/Icons/unlock.svg";
import banIcon from "../../assets/Icons/ban.svg";
import emailIcon from "../../assets/Icons/email.svg";
import messageIcon from "../../assets/Icons/message.svg";
import xlsIcon from "../../assets/Icons/xls.svg";
import copy2clipboardIcon from "../../assets/Icons/copy2clipboard.svg";

class UserTableData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			pageSize: 10,
			currentPage: 1,
			sortColumn: { path: "title", order: "asc" },
			searchQuery: "",
			errors: {},
			checkedUsers: [],
		};

		this.handleDelete = this.handleDelete.bind(this);
		this.handleMassDelete = this.handleMassDelete.bind(this);
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
	}

	async componentDidMount() {
		const { data } = await getUsers();
		this.setState({ users: data });
	}

	handleMassDelete = (CheckedUsers) => {
		const originalUsers = this.state.users;
		CheckedUsers.map(async (user) => {
			const users = this.state.users.filter((User) => User._id !== user);
			// console.log("users: ", users);
			this.setState({ users });
			try {
				await http.delete(apiUrl + "/users/" + user);
			} catch (ex) {
				if (ex.response && ex.response === 404) {
					alert("already deleted");
				}

				this.setState({ users: originalUsers });
			}
			console.log("Users: ", this.state.users);
		});
	};

	handleDelete = async (user) => {
		///delete
		const originalUsers = this.state.users;
		const users = this.state.users.filter((User) => User._id !== user._id);
		this.setState({ users });
		try {
			await http.delete(apiUrl + "/users/" + user._id);
		} catch (ex) {
			//ex.request
			//ex.response

			if (ex.response && ex.response === 404) {
				alert("already deleted");
			}

			this.setState({ users: originalUsers });
		}
		////
	};

	//check box change
	handleCheckboxChange = ({ target: { checked, value } }) => {
		if (checked) {
			this.setState(({ checkedUsers }) => ({
				checkedUsers: [...checkedUsers, value],
			}));
		} else {
			this.setState(({ checkedUsers }) => ({
				checkedUsers: checkedUsers.filter((e) => e !== value),
			}));
		}
		console.log("checked users: ", this.state.checkedUsers);
	};

	// handle edit
	handleEdit = (users) => {};

	//sorting columns
	handleSort = (sortColumn) => {
		this.setState({ sortColumn });
	};
	handlePageChange = (page) => {
		console.log(page);
		this.setState({ currentPage: page });
	};

	handleSearch = (query) => {
		console.log(query);
		this.setState({ searchQuery: query, currentPage: 1 });
	};

	getDataPgnation = () => {
		const {
			pageSize,
			currentPage,
			users: Users,
			sortColumn,
			searchQuery,
		} = this.state;
		//
		//filter maybe next time
		let filtered = Users;
		if (searchQuery) {
			console.log(searchQuery);
			filtered = Users.filter(
				(el) =>
					el.email.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
					el.username.toLowerCase().startsWith(searchQuery.toLowerCase())
			);
		}

		//
		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
		const users = paginate(sorted, currentPage, pageSize);
		return { data: users };
	};

	render() {
		const { length: count } = this.state.users;
		const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
		//if (count === 0) return "<p>No data available</p>";

		const { data: users } = this.getDataPgnation();

		return (
			<div>
				<ol className="breadcrumb float-xl-right">
					<li className="breadcrumb-item">
						<Link to="/">Home</Link>
					</li>
					<li className="breadcrumb-item">
						<Link to="/">Tables</Link>
					</li>
					<li className="breadcrumb-item active">Data Tables</li>
				</ol>
				<h1 className="page-header">Users </h1>
				<Panel>
					<PanelHeader>Users Management</PanelHeader>

					<React.Fragment>
						<ToastContainer />
						{/* {user && ( <button className="btn btn-default active m-r-5 m-b-5" style={{marginBottom:20},{marginLeft:20},{marginTop:20}}>  <Link to="/clinic/user/new">Add User</Link>  </button>)} */}
						<div className="toolbar" style={toolbarStyles}>
							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="add user"
								style={btnStyles}
							>
								{" "}
								<Link to="/clinic/users/new">
									<img style={iconStyles} src={newIcon} />
								</Link>{" "}
							</button>
							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="edit"
								style={btnStyles}
								// onClick={}
							>
								{" "}
								<Link
									to={
										this.state.checkedUsers
											? `/clinic/users/${this.state.checkedUsers[0]}`
											: "/clinic/users/"
									}
								>
									<img style={iconStyles} src={editIcon} />
								</Link>{" "}
							</button>
							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="delete"
								style={btnStyles}
								onClick={() =>
									this.handleMassDelete(this.state.checkedUsers)
								}
							>
								{" "}
								{/* <Link to="/clinic/users/del"> */}
								<img
									style={{ width: "25px", height: "25px" }}
									src={deleteIcon}
								/>
								{/* </Link>{" "} */}
							</button>
							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="csv"
								style={btnStyles}
							>
								{" "}
								<Link to="/clinic/users/">
									<img style={iconStyles} src={csvIcon} />
								</Link>{" "}
							</button>

							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="pdf"
								style={btnStyles}
							>
								{" "}
								<Link to="/clinic/users/">
									<img style={iconStyles} src={pdfIcon} />
								</Link>{" "}
							</button>

							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="excel"
								style={btnStyles}
							>
								{" "}
								<Link to="/clinic/users/">
									<img style={iconStyles} src={xlsIcon} />
								</Link>{" "}
							</button>

							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="print"
								style={btnStyles}
							>
								{" "}
								<Link to="/clinic/users/">
									<img style={iconStyles} src={printIcon} />
								</Link>{" "}
							</button>

							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="copy to clipboard"
								style={btnStyles}
							>
								{" "}
								<Link to="/clinic/users/">
									<img style={iconStyles} src={copy2clipboardIcon} />
								</Link>{" "}
							</button>

							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="print"
								style={btnStyles}
							>
								{" "}
								<Link to="/clinic/users/">
									<img style={iconStyles} src={printIcon} />
								</Link>{" "}
							</button>

							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="print"
								style={btnStyles}
							>
								{" "}
								<Link to="/clinic/users/">
									<img style={iconStyles} src={printIcon} />
								</Link>{" "}
							</button>

							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="print"
								style={btnStyles}
							>
								{" "}
								<Link to="/clinic/users/">
									<img style={iconStyles} src={printIcon} />
								</Link>{" "}
							</button>

							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="print"
								style={btnStyles}
							>
								{" "}
								<Link to="/clinic/users/">
									<img style={iconStyles} src={printIcon} />
								</Link>{" "}
							</button>
							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="lock"
								style={btnStyles}
							>
								{" "}
								<Link to="/clinic/users/">
									<img style={iconStyles} src={lockIcon} />
								</Link>{" "}
							</button>

							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="unlock"
								style={btnStyles}
							>
								{" "}
								<Link to="/clinic/users/">
									<img style={iconStyles} src={unlockIcon} />
								</Link>{" "}
							</button>

							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="ban"
								style={btnStyles}
							>
								{" "}
								<Link to="/clinic/users/">
									<img style={iconStyles} src={banIcon} />
								</Link>{" "}
							</button>

							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="email"
								style={btnStyles}
							>
								{" "}
								<Link to="/clinic/users/">
									<img style={iconStyles} src={emailIcon} />
								</Link>{" "}
							</button>

							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="message"
								style={btnStyles}
							>
								{" "}
								<Link to="/clinic/users/">
									<img style={iconStyles} src={messageIcon} />
								</Link>{" "}
							</button>
						</div>
						{/* <button
							className="btn btn-default active m-r-5 m-b-5"
							title="download"
							style={
								({ marginBottom: 20 },
								{ marginLeft: 20 },
								{ marginTop: 20 })
							}
						>
							{" "}
							<Link to="/clinic/users/download">
								<i className="ion-md-download"></i>
							</Link>{" "}
						</button> */}

						<div className="table-responsive">
							<SearchBox
								value={searchQuery}
								onChange={this.handleSearch}
							/>
							<p
								className="page-header float-xl-left"
								style={
									({ marginBottom: 5 },
									{ marginLeft: 20 },
									{ marginTop: 5 })
								}
							>
								{count} entries
							</p>

							<UsersTable
								users={users}
								onDelete={this.handleDelete}
								onSort={this.handleSort}
								sortColumn={sortColumn}
								handleCheckboxChange={this.handleCheckboxChange}
							/>
						</div>
					</React.Fragment>

					<hr className="m-0" />
					<PanelBody>
						<div className="d-flex align-items-center justify-content-center">
							<Pagination
								itemsCount={count}
								pageSize={pageSize}
								onPageChange={this.handlePageChange}
								currentPage={currentPage}
							/>
						</div>
					</PanelBody>
				</Panel>
			</div>
		);
	}
}

const toolbarStyles = {
	background: "#c8e9f3",
	padding: "10px",
};

const btnStyles = { background: "#348fe2", margin: "0rem" };

const iconStyles = {
	width: "25px",
	height: "25px",
	marginRight: "0rem",
};

export default UserTableData;
