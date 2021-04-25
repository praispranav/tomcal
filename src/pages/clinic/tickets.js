import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Panel, PanelHeader, PanelBody } from "./../../components/panel/panel.jsx";
import { getTickets, deleteTicket, saveTicket } from "./../../services/tickets";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "../../common/pagination";
import { paginate } from "../../utils/paginate";
import TicketsTable from "../../components/ticketsTable.jsx";
import SearchBox from "./../../common/searchBox";
import _ from "lodash";
import http from "./../../services/httpService";
import { apiUrl } from "./../../config/config.json";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Col, Button, Form, FormGroup, Input, Modal, Label, ModalHeader, ModalBody, Row } from "reactstrap";

// Icons imports
import newIcon from "../../assets/Icons/new.svg";
import editIcon from "../../assets/Icons/edit.svg";
import trashIcon from "../../assets/Icons/trash.svg";
import csvIcon from "../../assets/Icons/csv.svg";
import xlsIcon from "../../assets/Icons/xls.svg";
import pdfIcon from "../../assets/Icons/pdf.svg";
import sharingIcon from "../../assets/Icons/sharing.svg";
import archiveIcon from "../../assets/Icons/archive.svg";

class TicketsTableData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tickets: [],
			pageSize: 10,
			currentPage: 1,
			sortColumn: { path: "title", order: "asc" },
			searchQuery: "",
			errors: {},
			checkedTickets: [],
		};

		this.handleDelete = this.handleDelete.bind(this);
		this.handleMassDelete = this.handleMassDelete.bind(this);
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
	}

	// toggle() {
	// 	this.setState((prevState) => ({
	// 		toggleModal: !prevState.toggleModal,
	// 	}));
	// }

	async componentDidMount() {
		const { data } = await getTickets();
		this.setState({ tickets: data });
	}

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
		const { pageSize, currentPage, tickets: Tickets, sortColumn, searchQuery } = this.state;

		//filter maybe next time
		let filtered = Tickets;
		if (searchQuery) {
			console.log(searchQuery);
			filtered = Tickets.filter(
				(el) =>
					el.email.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
					el.username.toLowerCase().startsWith(searchQuery.toLowerCase())
			);
		}

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
		const tickets = paginate(sorted, currentPage, pageSize);
		return { data: tickets };
	};

	handleDelete = async (ticket) => {
		///delete
		const originalTickets = this.state.tickets;
		const tickets = this.state.tickets.filter((Ticket) => Ticket._id !== ticket._id);
		this.setState({ tickets });
		try {
			await http.delete(apiUrl + "/tickets/" + ticket._id);
		} catch (ex) {
			//ex.request
			//ex.response

			if (ex.response && ex.response === 404) {
				alert("already deleted");
			}

			this.setState({ tickets: originalTickets });
		}
	};

	handleCheckboxChange = ({ target: { checked, value } }) => {
		if (checked) {
			this.setState(({ checkedTickets }) => ({
				checkedTickets: [...checkedTickets, value],
			}));
		} else {
			this.setState(({ checkedTickets }) => ({
				checkedTickets: checkedTickets.filter((e) => e !== value),
			}));
		}
		console.log("checked users: ", this.state.checkedTickets);
	};

	handleMassDelete = (CheckedTickets) => {
		const originalTickets = this.state.tickets;
		CheckedTickets.map(async (ticket) => {
			const tickets = this.state.tickets.filter((Ticket) => Ticket._id !== ticket);
			this.setState({ tickets });
			try {
				await http.delete(apiUrl + "/tickets/" + ticket);
			} catch (ex) {
				if (ex.response && ex.response === 404) {
					alert("already deleted");
				}

				this.setState({ tickets: originalTickets });
			}
			console.log("Tickets: ", this.state.tickets);
		});
	};

	// handleChange = ({ currentTarget: input }) => {
	// 	const ticketData = { ...this.state.ticketData };
	// 	ticketData[input.name] = input.value;
	// 	this.setState({ ticketData });
	// };

	doSubmit = async (e) => {
		e.preventDefault();
		console.log("tickets form data: ", this.state.ticketData);
		try {
			await saveTicket(this.state.ticketData);
		} catch (err) {
			if (err) {
				console.log("Error: ", err);
			}
		}
		this.toggle();
	};

	render() {
		const { length: count } = this.state.tickets;
		const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
		//if (count === 0) return <p>No data available</p>;

		const { data: tickets } = this.getDataPgnation();

		return (
			<div>
				<ol className="breadcrumb float-xl-right">
					<li className="breadcrumb-item">
						<Link to="/">Home</Link>
					</li>
					<li className="breadcrumb-item">
						<Link to="/">Tickets</Link>
					</li>
					<li className="breadcrumb-item active">Tickets Tables</li>
				</ol>
				<h1 className="page-header">Tickets </h1>
				<Panel>
					<PanelHeader>Tickets Management</PanelHeader>

					<React.Fragment>
						<ToastContainer />
						<div className="toolbar" style={toolbarStyles}>
							<button className="btn btn-default active m-r-5 m-b-5" title="add ticket" style={btnStyles}>
								{" "}
								<Link to="/clinic/tickets/new">
									<img style={iconStyles} src={newIcon} />
								</Link>
							</button>
							
							<button className="btn btn-default active m-r-5 m-b-5" title="edit ticket" style={btnStyles}>
								{" "}
								<Link
									to={
										this.state.checkedTickets
											? `/clinic/tickets/${this.state.checkedTickets[0]}`
											: "/clinic/tickets/"
									}
								>
									<img style={iconStyles} src={editIcon} />
								</Link>{" "}
							</button>
							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="delete tickets"
								style={btnStyles}
								onClick={() => this.handleMassDelete(this.state.checkedTickets)}
							>
								{" "}
								<img style={{ width: "25px", height: "25px" }} src={trashIcon} />
							</button>
							<button className="btn btn-default active m-r-5 m-b-5" title="Excel" style={btnStyles}>
								{" "}
								<Link to="/clinic/tickets/">
									<img style={iconStyles} src={xlsIcon} />
								</Link>{" "}
							</button>
							
							<button className="btn btn-default active m-r-5 m-b-5" title="csv" style={btnStyles}>
								{" "}
								<Link to="/clinic/tickets/">
									<img style={iconStyles} src={csvIcon} />
								</Link>{" "}
							</button>
							<button className="btn btn-default active m-r-5 m-b-5" title="PDF" style={btnStyles}>
								{" "}
								<Link to="/clinic/tickets/">
									<img style={iconStyles} src={pdfIcon} />
								</Link>{" "}
							</button>
							<button className="btn btn-default active m-r-5 m-b-5" title="Share to other" style={btnStyles}>
								{" "}
								<Link to="/clinic/tickets/">
									<img style={iconStyles} src={sharingIcon} />
								</Link>{" "}
							</button>
							<button className="btn btn-default active m-r-5 m-b-5" title="Archive the ticket" style={btnStyles}>
								{" "}
								<Link to="/clinic/tickets/">
									<img style={iconStyles} src={archiveIcon} />
								</Link>{" "}
							</button>
							
						</div>

						<div className="table-responsive">
							<SearchBox value={searchQuery} onChange={this.handleSearch} />
							<p
								className="page-header float-xl-left"
								style={({ marginBottom: 5 }, { marginLeft: 20 }, { marginTop: 5 })}
							>
								{count} entries
							</p>

							<TicketsTable
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

export default TicketsTableData;

{
	/* <div>
	<Modal isOpen={this.state.toggleModal} toggle={this.toggle}>
		<ModalHeader toggle={this.toggle}>Add Ticket</ModalHeader>
		<ModalBody>
			<Form onSubmit={this.handleSubmit}>
				<Row form>
					<Col md={6}>
						<FormGroup>
							<Input
								type="text"
								name="name"
								placeholder="name"
								value={this.state.ticketData.name}
								onChange={this.handleChange}
								required
							/>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Input
								type="text"
								name="participants"
								placeholder="participants"
								value={this.state.ticketData.participants}
								onChange={this.handleChange}
							/>
						</FormGroup>
					</Col>
				</Row>
				<Row form>
					<Col md={12}>
						<FormGroup>
							<Input
								type="textarea"
								name="narrative"
								placeholder="narrative"
								value={this.state.ticketData.narrative}
								onChange={this.handleChange}
							/>
						</FormGroup>
					</Col>
				</Row>
				<Row form>
					<Col md={6}>
						<FormGroup>
							<Input
								type="select"
								name="category"
								placeholder="category"
								value={this.state.ticketData.category}
								onChange={this.handleChange}
							>
								<option value="orders">Orders</option>
								<option value="bug-error">Bug Error</option>
								<option value="complaint">Complaint</option>
								<option value="disconnection">Disconnection</option>
								<option value="feature-request">Feature Request</option>
								<option value="sales">Sales</option>
								<option value="others">Others</option>
							</Input>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Input
								type="select"
								name="priority"
								placeholder="priority"
								value={this.state.ticketData.priority}
								onChange={this.handleChange}
							>
								<option value="normal">Normal</option>
								<option value="low">Low</option>
								<option value="high">High</option>
								<option value="urgent">Urgent</option>
							</Input>
						</FormGroup>
					</Col>
				</Row>
				<Row form>
					<Col md={6}>
						<FormGroup>
							<Label>Created on</Label>
							<Input
								type="date"
								name="createdon"
								placeholder="created on"
								value={this.state.ticketData.createdOn}
								onChange={(e) =>
									this.setState({
										ticketData: { ...this.state.ticketData, createdOn: e.target.value },
									})
								}
							/>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Label>Deadline</Label>
							<Input
								type="date"
								name="deadline"
								placeholder="deadline"
								value={this.state.ticketData.deadline}
								onChange={(e) =>
									this.setState({
										ticketData: { ...this.state.ticketData, deadline: e.target.value },
									})
								}
							/>
						</FormGroup>
					</Col>
				</Row>
				<Row form>
					<Col md={6}>
						<FormGroup>
							<Input
								type="text"
								name="department"
								placeholder="department"
								value={this.state.ticketData.department}
								onChange={this.handleChange}
							/>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Input
								type="text"
								name="sub-department"
								placeholder="sub-department"
								value={this.state.ticketData.subDepartment}
								onChange={this.handleChange}
							/>
						</FormGroup>
					</Col>
				</Row>
				<Row form>
					<Col md={6}>
						<FormGroup>
							<Input
								type="text"
								name="location"
								placeholder="location"
								value={this.state.ticketData.location}
								onChange={this.handleChange}
							/>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Input
								type="text"
								name="field"
								placeholder="field"
								value={this.state.ticketData.field}
								onChange={this.handleChange}
							/>
						</FormGroup>
					</Col>
				</Row>
				<Row form>
					<Col md={6}>
						<FormGroup>
							<Input
								type="text"
								name="tags"
								placeholder="tags"
								value={this.state.ticketData.tags}
								onChange={this.handleChange}
							/>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Input
								type="text"
								name="reference"
								placeholder="reference"
								value={this.state.ticketData.reference}
								onChange={this.handleChange}
							/>
						</FormGroup>
					</Col>
				</Row>
				<Row form>
					<Col md={6}>
						<FormGroup>
							<Input
								type="text"
								name="sharinglink"
								placeholder="sharing link"
								value={this.state.ticketData.sharingLink}
								onChange={this.handleChange}
							/>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Input
								type="text"
								name="assignedto"
								placeholder="assigned to"
								value={this.state.ticketData.assignedto}
								onChange={this.handleChange}
							/>
						</FormGroup>
					</Col>
				</Row>

				<Row form>
					<Col md={6}>
						<FormGroup>
							<Input
								type="text"
								name="sharedto"
								placeholder="sharedto"
								value={this.state.ticketData.sharedTo}
								onChange={this.handleChange}
							/>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Input
								type="text"
								name="note"
								placeholder="note"
								value={this.state.ticketData.note}
								onChange={this.handleChange}
							/>
						</FormGroup>
					</Col>
				</Row>
				<Row form>
					<Col md={6}>
						<FormGroup>
							<Input
								type="text"
								name="businessname"
								placeholder="business name"
								value={this.state.ticketData.businessName}
								onChange={this.handleChange}
							/>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Input
								type="select"
								name="status"
								placeholder="status"
								value={this.state.ticketData.status}
								onChange={this.handleChange}
							>
								<option value="active">Active</option>
								<option value="pending">Pending</option>
								<option value="new">New</option>
								<option value="archive">Archive</option>
							</Input>
						</FormGroup>
					</Col>
				</Row>
				<Row form>
					<Col md={6}>
						<Button style={{ float: "right" }} type="submit" color="primary">
							Submit
						</Button>
					</Col>
					<Col md={6}>
						<Button color="secondary" onClick={this.toggle}>
							Cancel
						</Button>
					</Col>
				</Row>
			</Form>
		</ModalBody>
	</Modal>
</div> */
}
