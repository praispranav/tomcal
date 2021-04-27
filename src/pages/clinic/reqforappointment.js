import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Panel, PanelHeader, PanelBody } from "../../components/panel/panel.jsx";
import { UncontrolledDropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import ReactTags from "react-tag-autocomplete";
import DatePicker from "react-datepicker";
import DateTime from "react-datetime";
import moment from "moment";
import Tooltip from "rc-tooltip";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "react-datetime/css/react-datetime.css";
import "react-datepicker/dist/react-datepicker.css";
import Joi from "joi";
import Form from "../../common/form.jsx";
import { apiUrl } from "../../config/config.json";
import http from "../../services/httpService";
import { saveAppointment } from "./../../services/appointments.js";
import { savereqForAppointment, getreqForAppointment } from "./../../services/reqforappointments";
import { getClinics } from "./../../services/clinics";
import { getDoctors } from "./../../services/doctors";
import { getPatients } from "./../../services/patients";
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;

class reqForAppointment extends Form {
	constructor(props) {
		super(props);

		var maxYesterday = "";
		var minYesterday = DateTime.moment().subtract(1, "day");

		this.minDateRange = (current) => {
			return current.isAfter(minYesterday);
		};
		this.maxDateRange = (current) => {
			return current.isAfter(maxYesterday);
		};
		this.minDateChange = (value) => {
			this.setState({
				maxDateDisabled: false,
			});
			maxYesterday = value;
		};

		this.state = {
			maxDateDisabled: true,
			countries: [],
			profiles: [],
			patients: [],
			doctors: [],
			clinics: [],
			data: {
				patient: "",
				doctor: "",
				clinic: "",
				date: new Date(),
				preferedStartTime: "",
				preferedEndTime: "",
				complaint: "",
				reqforappointmentType: "",
				sessionType: "",
				patientNote: "",
				note: "",
				reqforappointmentStatus: "",
			},
			selectedFile: null,
			errors: {},
		};

		this.apointmentTypeOptions = [
			{ value: "clinic", label: "At Clinic" },
			{ value: "home", label: "At home" },
			{ value: "phone", label: "Telephone" },
			{ value: "video", label: "Video" },
		];

		this.apointmentStatusOptions = [
			{ value: "approved", label: "Approved" },
			{ value: "canceled", label: "Canceled" },
			{ value: "active", label: "Active" },
		];

		this.sessionTypeOptions = [
			{ value: "intake", label: "Intake (new complaint)" },
			{ value: "follow", label: "Follow" },
		];

		this.handleSlider = (props) => {
			const { value, dragging, index, ...restProps } = props;
			return (
				<Tooltip prefixCls="rc-slider-tooltip" overlay={value} visible={dragging} placement="top" key={index}>
					<Handle value={value} {...restProps} />
				</Tooltip>
			);
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	async populateappointmentTypes() {
		this.reqforappointmentTypeoptions = this.apointmentTypeOptions.map((option) => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	async populatereqforappointmentStatus() {
		this.apointmentStatusoptions = this.apointmentStatusOptions.map((option) => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	async populatesessionType() {
		this.sessionTypeoptions = this.sessionTypeOptions.map((option) => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}

	async populateDoctors() {
		const { data: doctors } = await getDoctors();
		this.setState({ doctors });
		this.selectDoctors = this.state.doctors.map((option) => (
			<option key={option._id} value={option._id}>
				{option.doctors.contactName.last}
			</option>
		));
	}

	async populatePatients() {
		const { data: patients } = await getPatients();
		this.setState({ patients });
		this.selectPatients = this.state.patients.map((option) => (
			<option key={option._id} value={option._id}>
				{option.patients.contactName.first + " " + option.patients.contactName.last}
			</option>
		));
	}

	async populateClinics() {
		const { data: clinics } = await getClinics();
		this.setState({ clinics });
		this.selectClinicSolos = this.state.clinics.map((option) => (
			<option key={option._id} value={option._id}>
				{option.clinics.contactName.first + " " + option.clinics.contactName.last}
			</option>
		));
	}

	async populatereqForAppointment() {
		try {
			const reqForAppointmentId = this.props.match.params.id;
			if (reqForAppointmentId === "new") return;
			const { data: reqForAppointment } = await getreqForAppointment(reqForAppointmentId);

			// reqForAppointment.username = reqForAppointment.username;
			// reqForAppointment.patientNo = reqForAppointment.patientNo;
			// reqForAppointment.businessName = reqForAppointment.businessName;
			// reqForAppointment.date = reqForAppointment.date;
			// reqForAppointment.preferStartTime = reqForAppointment.preferStartTime;
			// reqForAppointment.preferEndTime = reqForAppointment.preferEndTime;
			// reqForAppointment.chiefComplaint = reqForAppointment.chiefComplaint;
			// reqForAppointment.appointmentType = reqForAppointment.appointmentType;
			// reqForAppointment.sessionType = reqForAppointment.sessionType;
			// reqForAppointment.doctorNo = reqForAppointment.doctorNo;
			// reqForAppointment.notePatient = reqForAppointment.notePatient;
			// reqForAppointment.note = reqForAppointment.note;
			// reqForAppointment.status = reqForAppointment.status;

			this.setState({ data: this.mapToViewModel(reqForAppointment) });
			console.log(this.state.data);
		} catch (ex) {
			if (ex.response && ex.response.status === 404) this.props.history.replace("/error");
		}
	}

	async componentDidMount() {
		await this.populateappointmentTypes();
		await this.populatereqforappointmentStatus();
		await this.populatesessionType();
		await this.populatereqForAppointment();
		await this.populateClinics();
		await this.populateDoctors();
		await this.populatePatients();
	}

	schema = Joi.object({
		patient: Joi.any(),
		doctor: Joi.any(),
		clinic: Joi.any(),
		date: Joi.any(),
		preferedStartTime: Joi.any().optional(),
		preferedEndTime: Joi.any().optional(),
		complaint: Joi.any().optional(),
		reqforappointmentType: Joi.any().optional(),
		sessionType: Joi.any().optional(),
		patientNote: Joi.any().optional(),
		note: Joi.any().optional(),
		reqforappointmentStatus: Joi.any().optional(),
	});

	handledateChange = (e) => {
		const errors = { ...this.state.errors };
		const obj = { ["date"]: e };

		const data = { ...this.state.data };
		data["date"] = e;
		this.setState({ data });
		console.log(this.state.data);
	};

	doSubmit = async (reqforappointment) => {
		//console.log('working');
		try {
			if (this.state.data.reqforappointmentStatus === "approved") {
				await saveAppointment(this.state.data);
			} else {
				await savereqForAppointment(this.state.data);
			}
			//console.log(this.state.data);
			this.props.history.push("/clinic/reqforappointments");
		} catch (ex) {
			//if(ex.response && ex.response.status === 404){
			if (ex.response) {
				const errors = { ...this.state.errors };
				errors.username = ex.response.data;
				this.setState({ errors });
				//console.log(this.state.errors);
			}
		}
	};

	mapToViewModel(reqForAppointment) {
		return {
			_id: reqForAppointment._id,
			// username: reqForAppointment.username,
			patient: reqForAppointment.patient,
			doctor: reqForAppointment.doctor,
			clinic: reqForAppointment.clinic,
			date: new Date(reqForAppointment.date),
			preferedStartTime: reqForAppointment.preferedStartTime,
			preferedEndTime: reqForAppointment.preferedEndTime,
			reqforappointmentType: reqForAppointment.reqforappointmentType,
			sessionType: reqForAppointment.sessionType,
			patientNote: reqForAppointment.patientNote,
			note: reqForAppointment.note,
			reqforappointmentStatus: reqForAppointment.reqforappointmentStatus,
		};
	}
	render() {
		const { data, errors } = this.state;
		return (
			<React.Fragment>
				<div>
					<ol className="breadcrumb float-xl-right">
						<li className="breadcrumb-item">
							<Link to="/form/plugins">Home</Link>
						</li>
						<li className="breadcrumb-item">
							<Link to="/form/plugins">Clinics</Link>
						</li>
						<li className="breadcrumb-item active">Add request for appointment</li>
					</ol>
					<h1 className="page-header">
						Add Request For Appointment <small>Request For Appointment Registration Form</small>
					</h1>

					<div className="row">
						<div className="col-xl-10">
							<Panel>
								<PanelBody className="panel-form">
									<PanelHeader>Add Request For Appointment</PanelHeader>
									<form className="form-horizontal form-bordered" onSubmit={this.handleSubmit}>
										<div className="form-group row">
											<label className="col-lg-4 col-form-label">Patient</label>
											<div className="col-lg-8">
												<select
													name="patient"
													id="patients"
													onChange={this.handleChange}
													className="form-control"
													value={data.patient}
												>
													<option value="">Select Patient</option>
													{this.selectPatients}
												</select>
											</div>
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="doctorNo">
												Select Doctor
											</label>
											<div className="col-lg-8">
												<select
													name="doctor"
													id="doctorNo"
													onChange={this.handleChange}
													className="form-control"
													value={data.doctor}
												>
													<option value="">Select Doctor</option>
													{this.selectDoctors}
												</select>
											</div>
										</div>
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="clinicSolos">
												Select Clinic
											</label>
											<div className="col-lg-8">
												<select
													name="clinic"
													id="clinicSolos"
													onChange={this.handleChange}
													className="form-control"
													value={data.clinic}
												>
													<option value="">Select Clinic</option>
													{this.selectClinicSolos}
												</select>
											</div>
											{errors.profile && <div className="alert alert-danger">{errors.profile}</div>}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="date">
												Date
											</label>
											<div className="col-lg-8">
												<DatePicker
													name="date"
													onChange={this.handledateChange}
													id={data.date}
													value={data.date}
													selected={data.date}
													inputProps={{ placeholder: "Datepicker" }}
													className="form-control"
												/>
												{errors.date && <div className="alert alert-danger">{errors.date}</div>}
											</div>
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label">Select Prefer Start-Time</label>
											<div className="col-lg-8">
												<DateTime
													name="preferedStartTime"
													dateFormat={false}
													value={data.preferedStartTime}
													inputProps={{ placeholder: "Timepicker" }}
												/>
											</div>
										</div>
										<div className="form-group row">
											<label className="col-lg-4 col-form-label">Select Prefer End-Time</label>
											<div className="col-lg-8">
												<DateTime
													name="preferedEndTime"
													dateFormat={false}
													value={data.preferedEndTime}
													inputProps={{ placeholder: "Timepicker" }}
												/>
											</div>
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label">Complaint</label>
											<div className="col-lg-8">
												<div className="row row-space-10">
													<input
														name="complaint"
														type="textarea"
														className="form-control m-b-5"
														placeholder="Enter Complaint"
														value={data.complaint}
														onChange={this.handleChange}
													/>
												</div>
											</div>
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="reqforappointmentType">
												Select Appointment-type
											</label>
											<div className="col-lg-8">
												<select
													name="reqforappointmentType"
													id="appointmentType"
													onChange={this.handleChange}
													className="form-control"
													value={data.reqforappointmentType}
												>
													<option value="">Select Appointment-type</option>
													{this.reqforappointmentTypeoptions}
												</select>
											</div>
											{errors.reqforappointmentType && (
												<div className="alert alert-danger">{errors.reqforappointmentType}</div>
											)}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="sessionType">
												Select Session-type
											</label>
											<div className="col-lg-8">
												<select
													name="sessionType"
													id="sessionType"
													onChange={this.handleChange}
													className="form-control"
													value={data.sessionType}
												>
													<option value="">Select Session-type</option>
													{this.sessionTypeoptions}
												</select>
											</div>
											{errors.sessionTypeoptions && (
												<div className="alert alert-danger">{errors.sessionTypeoptions}</div>
											)}
										</div>

										{this.renderInput(
											"patientNote",
											"Note from Patient",
											"text",
											"Enter your Note for clinic"
										)}
										{this.renderInput("note", "Note", "textarea", "Enter Note")}
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="status">
												Select Status
											</label>
											<div className="col-lg-8">
												<select
													name="reqforappointmentStatus"
													id="status"
													onChange={this.handleChange}
													className="form-control"
													value={data.reqforappointmentStatus}
												>
													<option value="">Select Status</option>
													{this.apointmentStatusoptions}
												</select>
											</div>
											{errors.reqforappointmentStatus && (
												<div className="alert alert-danger">{errors.reqforappointmentStatus}</div>
											)}
										</div>

										<div className="form-group row">
											<div className="col-lg-8">
												<button
													type="submit"
													disabled={this.validate()}
													className="btn btn-primary width-65"
												>
													Submit
												</button>
											</div>
										</div>
									</form>
								</PanelBody>
							</Panel>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default withRouter(reqForAppointment);
