import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Panel, PanelHeader, PanelBody } from "./../../components/panel/panel.jsx";
import { getTickets, deleteTicket, saveTicket } from "./../../services/tickets";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "../../common/pagination";
import { paginate } from "../../utils/paginate";
import KanbansTable from "../../components/kanbansTable.jsx";
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

class KanbansTableData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			kanbans: [],
			pageSize: 10,
			currentPage: 1,
			sortColumn: { path: "title", order: "asc" },
			searchQuery: "",
			errors: {},
			checkedUsers: [],
			toggleModal: false,
			kanbanData: {
				kanbanNO: this.makeKanbanNO(),
				name: "",
				participants: "",
				description: "",
				businessName: "",
				createdOn: "",
				department: "",
				subDepartment: "",
				location: "",
				field: "",
				tags: "",
				note: "",
				status: "active",				
			},
		};

		// this.handleDelete = this.handleDelete.bind(this);
		// this.handleMassDelete = this.handleMassDelete.bind(this);
		// this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
		this.toggle = this.toggle.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	makeKanbanNO() {
		let text = "KB-";
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
		const { data } = await getKanbans();
		this.setState({ kanbans: data });
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
		const { pageSize, currentPage, kanbans: Kanbans, sortColumn, searchQuery } = this.state;

		//filter maybe next time
		let filtered = Kanbans;
		if (searchQuery) {
			console.log(searchQuery);
			filtered = Kanbans.filter(
				(el) =>
					el.email.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
					el.username.toLowerCase().startsWith(searchQuery.toLowerCase())
			);
		}

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
		const kanbans = paginate(sorted, currentPage, pageSize);
		return { data: kanbans };
	};


    handleChange = ({currentTarget:input}) =>{
		const kanbanData = {...this.state.kanbanData};
		kanbanData[input.name] = input.value;
		this.setState({kanbanData});
	};



	handleSubmit = async (e) => {
		e.preventDefault();
		console.log("kanbans form data: ", this.state.kanbanData);
		try {
			await saveKanban(this.state.kanbanData);
		} catch (err) {
			if (err) {
				console.log("Error: ", err);
			}
		}
		this.toggle();
	};

	render() {
		const { length: count } = this.state.kanbans;
		const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
		//if (count === 0) return <p>No data available</p>;

		const { data: kanbans } = this.getDataPgnation();

		return (
			<div>
				<ol className="breadcrumb float-xl-right">
					<li className="breadcrumb-item">
						<Link to="/">Home</Link>
					</li>
					<li className="breadcrumb-item">
						<Link to="/">Kanbans</Link>
					</li>
					<li className="breadcrumb-item active">Kanbans Tables</li>
				</ol>
				<h1 className="page-header">Kanbans </h1>
				<Panel>
					<PanelHeader>Kanbans Management</PanelHeader>

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

							<KanbansTable
								kanbans={kanbans}
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
						<ModalHeader toggle={this.toggle}>Add Kanban</ModalHeader>
						<ModalBody>
							<Form onSubmit={this.handleSubmit}>
								<Row form>
									<Col md={6}>
										<FormGroup>
											<Input
												type="text"
												name="name"
												placeholder="name"
												value={this.state.kanbanData.name}
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
												value={this.state.kanbanData.participants}
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
												name="description"
												placeholder="description"
												value={this.state.kanbanData.description}
												onChange={this.handleChange}
											/>
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
												value={this.state.kanbanData.createdOn}
												onChange={(e) =>
													this.setState({
														kanbanData: { ...this.state.kanbanData, createdOn: e.target.value },
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
												value={this.state.kanbanData.department}
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
												value={this.state.kanbanData.subDepartment}
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
												value={this.state.kanbanData.location}
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
												value={this.state.kanbanData.field}
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
												value={this.state.kanbanData.tags}
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
												value={this.state.kanbanData.reference}
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
												name="note"
												placeholder="note"
												value={this.state.kanbanData.note}
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
												name="businessName"
												placeholder="business name"
												value={this.state.kanbanData.businessName}
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
												value={this.state.kanbanData.status}
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

export default KanbansTableData;
