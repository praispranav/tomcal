import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Panel, PanelHeader, PanelBody } from "./../../components/panel/panel.jsx";
import { getTickets, deleteTicket, saveTicket } from "./../../services/tickets";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "../../common/pagination";
import { paginate } from "../../utils/paginate";
import MedicalFilesTable from "../../components/medicalfilesTable.jsx";
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
import eyeIcon from "../../assets/Icons/eye.svg";
import trashIcon from "../../assets/Icons/trash.svg";
import csvIcon from "../../assets/Icons/csv.svg";
import xlsIcon from "../../assets/Icons/xls.svg";
import pdfIcon from "../../assets/Icons/pdf.svg";
import sharingIcon from "../../assets/Icons/sharing.svg";
import archiveIcon from "../../assets/Icons/archive.svg";

class MedicalFilesTableData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			medicalfiles: [],
			pageSize: 10,
			currentPage: 1,
			sortColumn: { path: "title", order: "asc" },
			searchQuery: "",
			errors: {},
			checkedMedicalFiles: [],
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
		const { data } = await getMedicalFiles();
		this.setState({ medicalfiles: data });
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
		const { pageSize, currentPage, medicalfiles: MedicalFiles, sortColumn, searchQuery } = this.state;

		//filter maybe next time
		let filtered = MedicalFiles;
		if (searchQuery) {
			console.log(searchQuery);
			filtered = MedicalFiles.filter(
				(el) =>
					el.email.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
					el.username.toLowerCase().startsWith(searchQuery.toLowerCase())
			);
		}

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
		const medicalfiles = paginate(sorted, currentPage, pageSize);
		return { data: medicalfiles };
	};

	handleDelete = async (medicalfile) => {
		///delete
		const originalMedicalFiles = this.state.medicalfiles;
		const medicalfiles = this.state.medicalfiles.filter((MedicalFile) => MedicalFile._id !== medicalfile._id);
		this.setState({ medicalfiles });
		try {
			await http.delete(apiUrl + "/medicalfiles/" + medicalfile._id);
		} catch (ex) {
			//ex.request
			//ex.response

			if (ex.response && ex.response === 404) {
				alert("already deleted");
			}

			this.setState({ medicalfiles: originalMedicalFiles });
		}
	};

	handleCheckboxChange = ({ target: { checked, value } }) => {
		if (checked) {
			this.setState(({ checkedMedicalFiles }) => ({
				checkedMedicalFiles: [...checkedMedicalFiles, value],
			}));
		} else {
			this.setState(({ checkedMedicalFiles }) => ({
				checkedMedicalFiles: checkedMedicalFiles.filter((e) => e !== value),
			}));
		}
		console.log("checked users: ", this.state.checkedMedicalFiles);
	};

	handleMassDelete = (CheckedMedicalFiles) => {
		const originalMedicalFiles = this.state.medicalfiles;
		CheckedMedicalFiles.map(async (medicalfile) => {
			const medicalfiles = this.state.medicalfiles.filter((MedicalFile) => MedicalFile._id !== medicalfile);
			this.setState({ medicalfiles });
			try {
				await http.delete(apiUrl + "/medicalfiles/" + medicalfile);
			} catch (ex) {
				if (ex.response && ex.response === 404) {
					alert("already deleted");
				}

				this.setState({ medicalfiles: originalMedicalFiles });
			}
			console.log("MedicalFiles: ", this.state.medicalfiles);
		});
	};

	// handleChange = ({ currentTarget: input }) => {
	// 	const medicalfileData = { ...this.state.medicalfileData };
	// 	medicalfileData[input.name] = input.value;
	// 	this.setState({ medicalfileData });
	// };

	doSubmit = async (e) => {
		e.preventDefault();
		console.log("medicalfiles form data: ", this.state.medicalfileData);
		try {
			await saveMedicalFile(this.state.medicalfileData);
		} catch (err) {
			if (err) {
				console.log("Error: ", err);
			}
		}
		this.toggle();
	};

	render() {
		const { length: count } = this.state.medicalfiles;
		const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
		//if (count === 0) return <p>No data available</p>;

		const { data: medicalfiles } = this.getDataPgnation();

		return (
			<div>
				<ol className="breadcrumb float-xl-right">
					<li className="breadcrumb-item">
						<Link to="/">Home</Link>
					</li>
					<li className="breadcrumb-item">
						<Link to="/">MedicalFiles</Link>
					</li>
					<li className="breadcrumb-item active">MedicalFiles Tables</li>
				</ol>
				<h1 className="page-header">MedicalFiles </h1>
				<Panel>
					<PanelHeader>MedicalFiles Management</PanelHeader>

					<React.Fragment>
						<ToastContainer />
						<div className="toolbar" style={toolbarStyles}>
							
							<button className="btn btn-default active m-r-5 m-b-5" title="View the medicalfile" style={btnStyles}>
								{" "}
								<Link to="/clinic/medicalfiles/">
									<img style={iconStyles} src={eyeIcon} />
								</Link>{" "}
							</button>
							
							<button className="btn btn-default active m-r-5 m-b-5" title="edit medicalfile" style={btnStyles}>
								{" "}
								<Link
									to={
										this.state.checkedMedicalFiles
											? `/clinic/medicalfiles/${this.state.checkedMedicalFiles[0]}`
											: "/clinic/medicalfiles/"
									}
								>
									<img style={iconStyles} src={editIcon} />
								</Link>{" "}
							</button>
							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="delete medicalfiles"
								style={btnStyles}
								onClick={() => this.handleMassDelete(this.state.checkedMedicalFiles)}
							>
								{" "}
								<img style={{ width: "25px", height: "25px" }} src={trashIcon} />
							</button>
							<button className="btn btn-default active m-r-5 m-b-5" title="Excel" style={btnStyles}>
								{" "}
								<Link to="/clinic/medicalfiles/">
									<img style={iconStyles} src={xlsIcon} />
								</Link>{" "}
							</button>
							
							<button className="btn btn-default active m-r-5 m-b-5" title="csv" style={btnStyles}>
								{" "}
								<Link to="/clinic/medicalfiles/">
									<img style={iconStyles} src={csvIcon} />
								</Link>{" "}
							</button>
							<button className="btn btn-default active m-r-5 m-b-5" title="PDF" style={btnStyles}>
								{" "}
								<Link to="/clinic/medicalfiles/">
									<img style={iconStyles} src={pdfIcon} />
								</Link>{" "}
							</button>
							<button className="btn btn-default active m-r-5 m-b-5" title="Share to other" style={btnStyles}>
								{" "}
								<Link to="/clinic/medicalfiles/">
									<img style={iconStyles} src={sharingIcon} />
								</Link>{" "}
							</button>
							<button className="btn btn-default active m-r-5 m-b-5" title="Archive the medicalfile" style={btnStyles}>
								{" "}
								<Link to="/clinic/medicalfiles/">
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

							<MedicalFilesTable
								medicalfiles={medicalfiles}
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

export default MedicalFilesTableData;

{
	/* <div>
	<Modal isOpen={this.state.toggleModal} toggle={this.toggle}>
		<ModalHeader toggle={this.toggle}>Add MedicalFile</ModalHeader>
		<ModalBody>
			<Form onSubmit={this.handleSubmit}>
				<Row form>
					<Col md={6}>
						<FormGroup>
							<Input
								type="text"
								name="name"
								placeholder="name"
								value={this.state.medicalfileData.name}
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
								value={this.state.medicalfileData.participants}
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
								value={this.state.medicalfileData.narrative}
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
								value={this.state.medicalfileData.category}
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
								value={this.state.medicalfileData.priority}
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
								value={this.state.medicalfileData.createdOn}
								onChange={(e) =>
									this.setState({
										medicalfileData: { ...this.state.medicalfileData, createdOn: e.target.value },
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
								value={this.state.medicalfileData.deadline}
								onChange={(e) =>
									this.setState({
										medicalfileData: { ...this.state.medicalfileData, deadline: e.target.value },
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
								value={this.state.medicalfileData.department}
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
								value={this.state.medicalfileData.subDepartment}
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
								value={this.state.medicalfileData.location}
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
								value={this.state.medicalfileData.field}
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
								value={this.state.medicalfileData.tags}
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
								value={this.state.medicalfileData.reference}
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
								value={this.state.medicalfileData.sharingLink}
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
								value={this.state.medicalfileData.assignedto}
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
								value={this.state.medicalfileData.sharedTo}
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
								value={this.state.medicalfileData.note}
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
								value={this.state.medicalfileData.businessName}
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
								value={this.state.medicalfileData.status}
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