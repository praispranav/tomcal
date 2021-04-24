import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Panel, PanelHeader, PanelBody } from "./../../components/panel/panel.jsx";
import { getTickets, deleteTicket, saveTicket } from "./../../services/tickets";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "../../common/pagination";
import { paginate } from "../../utils/paginate";
import CardsTable from "../../components/cardsTable.jsx";
import SearchBox from "./../../common/searchBox";
import _ from "lodash";
import http from "./../../services/httpService";
import { apiUrl } from "./../../config/config.json";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Col, Button, Form, FormGroup, Input, Modal, Label, ModalHeader, ModalBody, Row } from "reactstrap";

// Icons imoprt svg
import newIcon from "../../assets/Icons/new.svg";
import editIcon from "../../assets/Icons/edit.svg";
import trashIcon from "../../assets/Icons/trash.svg";
import csvIcon from "../../assets/Icons/csv.svg";
import xlsIcon from "../../assets/Icons/xls.svg";
import pdfIcon from "../../assets/Icons/pdf.svg";

class CardsTableData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cards: [],
			pageSize: 10,
			currentPage: 1,
			sortColumn: { path: "title", order: "asc" },
			searchQuery: "",
			errors: {},
			checkedUsers: [],
			toggleModal: false,
			cardData: {
				cardNO: this.makeCardNO(),
				name: "",
				status: "active",
				participants: "",
				narrative: "",
				category: "orders",
				priority: "normal",
				businessName: "",
				createdOn: "",
				deadline: "",
				department: "",
				subDepartment: "",
				location: "",
				field: "",
				tags: "",
				referenece: "",
				sharingLink: "",
				assignedto: "",
				sharedTo: "",
				note: "",
			},
		};

		// this.handleDelete = this.handleDelete.bind(this);
		// this.handleMassDelete = this.handleMassDelete.bind(this);
		// this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
		this.toggle = this.toggle.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	makeCardNO() {
		let text = "TK-";
		const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		for (let i = 0; i <= 5; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
		return text;
	}

	toggle() {
		this.setState((prevState) => ({
			toggleModal: !prevState.toggleModal,
		}));
	}

	async componentDidMount() {
		const { data } = await getCards();
		this.setState({ cards: data });
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
		const { pageSize, currentPage, cards: Cards, sortColumn, searchQuery } = this.state;

		//filter maybe next time
		let filtered = Cards;
		if (searchQuery) {
			console.log(searchQuery);
			filtered = Cards.filter(
				(el) =>
					el.email.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
					el.username.toLowerCase().startsWith(searchQuery.toLowerCase())
			);
		}

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
		const cards = paginate(sorted, currentPage, pageSize);
		return { data: cards };
	};


    handleChange = ({currentTarget:input}) =>{
		const cardData = {...this.state.cardData};
		cardData[input.name] = input.value;
		this.setState({cardData});
	};



	handleSubmit = async (e) => {
		e.preventDefault();
		console.log("cards form data: ", this.state.cardData);
		try {
			await saveCard(this.state.cardData);
		} catch (err) {
			if (err) {
				console.log("Error: ", err);
			}
		}
		this.toggle();
	};

	render() {
		const { length: count } = this.state.cards;
		const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
		//if (count === 0) return <p>No data available</p>;

		const { data: cards } = this.getDataPgnation();

		return (
			<div>
				<ol className="breadcrumb float-xl-right">
					<li className="breadcrumb-item">
						<Link to="/">Home</Link>
					</li>
					<li className="breadcrumb-item">
						<Link to="/">Cards</Link>
					</li>
					<li className="breadcrumb-item active">Cards Tables</li>
				</ol>
				<h1 className="page-header">Cards </h1>
				<Panel>
					<PanelHeader>Cards Management</PanelHeader>

					<React.Fragment>
						<ToastContainer />
						<div className="toolbar" style={toolbarStyles}>
							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="add user"
								onClick={this.toggle}
								style={btnStyles}
							>
								{" "}
								<img style={iconStyles} src={newIcon} />
							</button>
							<button className="btn btn-default active m-r-5 m-b-5" title="edit" style={btnStyles}>
								{" "}
								{/* <Link
									to={
										this.state.checkedUsers ? `/clinic/users/${this.state.checkedUsers[0]}` : "/clinic/users/"
									}
								> */}
								<img style={iconStyles} src={editIcon} />
								{/* </Link>{" "} */}
							</button>
							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="delete"
								style={btnStyles}
								// onClick={() => this.handleMassDelete(this.state.checkedUsers)}
							>
								{" "}
								<img style={{ width: "25px", height: "25px" }} src={trashIcon} />
							</button>
							<button className="btn btn-default active m-r-5 m-b-5" title="csv" style={btnStyles}>
								{" "}
								{/* <Link to="/clinic/users/"> */}
								<img style={iconStyles} src={csvIcon} />
								{/* </Link>{" "} */}
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

							<CardsTable
								cards={cards}
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

				<div>
					<Modal isOpen={this.state.toggleModal} toggle={this.toggle}>
						<ModalHeader toggle={this.toggle}>Add Card</ModalHeader>
						<ModalBody>
							<Form onSubmit={this.handleSubmit}>
								<Row form>
									<Col md={6}>
										<FormGroup>
											<Input
												type="text"
												name="name"
												placeholder="name"
												value={this.state.cardData.name}
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
												value={this.state.cardData.participants}
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
												value={this.state.cardData.narrative}
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
												value={this.state.cardData.category}
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
												value={this.state.cardData.priority}
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
												value={this.state.cardData.createdOn}
												onChange={(e) =>
													this.setState({
														cardData: { ...this.state.cardData, createdOn: e.target.value },
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
												value={this.state.cardData.deadline}
												onChange={(e) =>
													this.setState({
														cardData: { ...this.state.cardData, deadline: e.target.value },
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
												value={this.state.cardData.department}
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
												value={this.state.cardData.subDepartment}
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
												value={this.state.cardData.location}
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
												value={this.state.cardData.field}
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
												value={this.state.cardData.tags}
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
												value={this.state.cardData.reference}
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
												value={this.state.cardData.sharingLink}
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
												value={this.state.cardData.assignedto}
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
												value={this.state.cardData.sharedTo}
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
												value={this.state.cardData.note}
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
												value={this.state.cardData.businessName}
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
												value={this.state.cardData.status}
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
				</div>
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

export default CardsTableData;
