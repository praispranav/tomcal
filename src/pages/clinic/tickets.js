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
import { getUsers, deleteUser } from "./../../services/tickets";
import "bootstrap/dist/css/bootstrap.min.css";
//import FloatSubMenu from './../../components/float-sub-menu/float-sub-menu';
import Pagination from "../../common/pagination";
import { paginate } from "../../utils/paginate";
import UsersTable from "../../components/ticketsTable.jsx";
import SearchBox from "./../../common/searchBox";
import _ from "lodash";
import http from "./../../services/httpService";
import { apiUrl } from "./../../config/config.json";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import newIcon from "../../assets/Icons/new.svg";
import editIcon from "../../assets/Icons/edit.svg";
import trashIcon from "../../assets/Icons/trash.svg";
import csvIcon from "../../assets/Icons/csv.svg";
import pdfIcon from "../../assets/Icons/pdf.svg";
import printIcon from "../../assets/Icons/printer-xxl.svg";
import lockIcon from "../../assets/Icons/lock.svg";
import unlockIcon from "../../assets/Icons/unlock.svg";
import emailIcon from "../../assets/Icons/email.svg";
import messageIcon from "../../assets/Icons/message.svg";
import xlsIcon from "../../assets/Icons/xls.svg";
import importIcon from "../../assets/Icons/import.svg";
import copy2clipboardIcon from "../../assets/Icons/copy2clipboard.svg";

class UserTableData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tickets: [],
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
		this.setState({ tickets: data });
	}

	handleMassDelete = (CheckedUsers) => {
		const originalUsers = this.state.tickets;
		CheckedUsers.map(async (user) => {
			const tickets = this.state.tickets.filter((User) => User._id !== user);
			// console.log("tickets: ", tickets);
			this.setState({ tickets });
			try {
				await http.delete(apiUrl + "/tickets/" + user);
			} catch (ex) {
				if (ex.response && ex.response === 404) {
					alert("already deleted");
				}

				this.setState({ tickets: originalUsers });
			}
			console.log("Users: ", this.state.tickets);
		});
	};

	handleDelete = async (user) => {
		///delete
		const originalUsers = this.state.tickets;
		const tickets = this.state.tickets.filter((User) => User._id !== user._id);
		this.setState({ tickets });
		try {
			await http.delete(apiUrl + "/tickets/" + user._id);
		} catch (ex) {
			//ex.request
			//ex.response

			if (ex.response && ex.response === 404) {
				alert("already deleted");
			}

			this.setState({ tickets: originalUsers });
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
		console.log("checked tickets: ", this.state.checkedUsers);
	};

	// handle edit
	handleEdit = (tickets) => {};

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
			tickets: Users,
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
		const tickets = paginate(sorted, currentPage, pageSize);
		return { data: tickets };
	};

	render() {
		const { length: count } = this.state.tickets;
		const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
		if (count === 0) return "<p>No data available</p>";

		const { data: tickets } = this.getDataPgnation();

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
				<h1 className="page-header">Tickets </h1>
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
								<Link to="/clinic/tickets/new">
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
											? `/clinic/tickets/${this.state.checkedUsers[0]}`
											: "/clinic/tickets/"
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
								{/* <Link to="/clinic/tickets/del"> */}
								<img
									style={{ width: "25px", height: "25px" }}
									src={trashIcon}
								/>
								{/* </Link>{" "} */}
							</button>
							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="csv"
								style={btnStyles}
							>
								{" "}
								<Link to="/clinic/tickets/">
									<img style={iconStyles} src={csvIcon} />
								</Link>{" "}
							</button>

							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="pdf"
								style={btnStyles}
							>
								{" "}
								<Link to="/clinic/tickets/">
									<img style={iconStyles} src={pdfIcon} />
								</Link>{" "}
							</button>

							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="excel"
								style={btnStyles}
							>
								{" "}
								<Link to="/clinic/tickets/">
									<img style={iconStyles} src={xlsIcon} />
								</Link>{" "}
							</button>

							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="print"
								style={btnStyles}
							>
								{" "}
								<Link to="/clinic/tickets/">
									<img style={iconStyles} src={printIcon} />
								</Link>{" "}
							</button>

							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="copy to clipboard"
								style={btnStyles}
							>
								{" "}
								<Link to="/clinic/tickets/">
									<img style={iconStyles} src={copy2clipboardIcon} />
								</Link>{" "}
							</button>

							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="print"
								style={btnStyles}
							>
								{" "}
								<Link to="/clinic/tickets/">
									<img style={iconStyles} src={printIcon} />
								</Link>{" "}
							</button>

							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="import"
								style={btnStyles}
							>
								{" "}
								<Link to="/clinic/tickets/">
									<img style={iconStyles} src={importIcon} />
								</Link>{" "}
							</button>

							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="lock"
								style={btnStyles}
							>
								{" "}
								<Link to="/clinic/tickets/">
									<img style={iconStyles} src={lockIcon} />
								</Link>{" "}
							</button>

							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="unlock"
								style={btnStyles}
							>
								{" "}
								<Link to="/clinic/tickets/">
									<img style={iconStyles} src={unlockIcon} />
								</Link>{" "}
							</button>

							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="email"
								style={btnStyles}
							>
								{" "}
								<Link to="/clinic/tickets/">
									<img style={iconStyles} src={emailIcon} />
								</Link>{" "}
							</button>

							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="message"
								style={btnStyles}
							>
								{" "}
								<Link to="/clinic/tickets/">
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
							<Link to="/clinic/tickets/download">
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
								tickets={tickets}
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

export default TicketTableData;
