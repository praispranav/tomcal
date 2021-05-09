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
import { getClinics,getClinic } from "./../../services/clinics";
import { getDoctors,getDoctor } from "./../../services/doctors";
import { getPatients,getPatient } from "./../../services/patients";
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
				patientNo: "",
				doctorNo: "",
				clinicNo: "",
				date: new Date(),
				preferStartTime: "",
				preferEndTime: "",
				complaint: "",
				appointmentType: "",
				sessionType: "",
				notePatient: "",
				note: "",
				status: "",
			},
			selectedFile: null,
			errors: {},
		};

		this.appointmentTypeOptions = [
			{ value: "clinic", label: "At Clinic" },
			{ value: "home", label: "At home" },
			{ value: "phone", label: "Telephone" },
			{ value: "video", label: "Video" },
		];

		this.reqforappointmentStatusOptions = [
			{ value: "active", label: "Active" },
			{ value: "approved", label: "Approved" },
			{ value: "canceled", label: "Canceled" },
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
		this.appointmentTypeoptions = this.appointmentTypeOptions.map((option) => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	async populatereqforappointmentStatus() {
		this.reqforappointmentStatusoptions = this.reqforappointmentStatusOptions.map((option) => (
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
		await this.populatePatients();
		await this.populateClinics();
		await this.populateDoctors();
		await this.populateappointmentTypes();
		await this.populatereqforappointmentStatus();
		await this.populatesessionType();
		await this.populatereqForAppointment();
	}

	schema = Joi.object({
		patientNo: Joi.any(),
		doctorNo: Joi.any(),
		clinicNo: Joi.any(),
		date: Joi.any(),
		preferStartTime: Joi.any().optional(),
		preferEndTime: Joi.any().optional(),
		complaint: Joi.any().optional(),
		appointmentType: Joi.any().optional(),
		sessionType: Joi.any().optional(),
		notePatient: Joi.any().optional(),
		note: Joi.any().optional(),
		status: Joi.any().optional(),
	});

	handledateChange = (e) => {
		const errors = { ...this.state.errors };
		const data = { ...this.state.data };
		data["date"] = e;
		this.setState({ data });
		console.log(this.state.data);
	};

	doSubmit = async () => {
		const data = { ...this.state.data };
		const { data: clinic } = await getClinic(data.clinicNo);
	    data.clinicUser = clinic[0].user;
	    const { data: patient } = await getPatient(data.patientNo);
    	data.patientUser = patient[0].user;
    	if(data.doctorNo) {
		const { data: doctor } = await getDoctor(data.doctorNo);
		data.doctorUser = doctor[0].user;
     	}
    this.setState({ data });
		try {
			if (this.state.data.status === "approved") {
				await savereqForAppointment(this.state.data);
				const data = { ...this.state.data };
				let [hour, minute] = data.preferStartTime.split(":");
                data.start = moment(data.date).add({hours: hour, minutes: minute}).toString(); 
                [hour, minute] = data.preferEndTime.split(":");
                data.end = moment(data.date).add({hours: hour, minutes: minute}).toString(); 
				delete data.date;
				delete data.preferStartTime;
				delete data.preferEndTime;
				delete data._id;
				//this.setState({ data });
				await saveAppointment(data);

			} else {
				await savereqForAppointment(this.state.data);
			}
			//console.log(this.state.data);
			this.props.history.push("/clinic/reqforappointments");
		} catch (ex) {
			//if(ex.response && ex.response.status === 404){
			if (ex.response) {
				const errors = { ...this.state.errors };
				errors.clinicNo = ex.response.data;
				this.setState({ errors });
				//console.log(this.state.errors);
			}
		}
	};

	mapToViewModel(reqForAppointment) {
		return {
			_id: reqForAppointment._id,
			// username: reqForAppointment.username,
			patientNo: reqForAppointment.patientNo,
			doctorNo: reqForAppointment.doctorNo,
			clinicNo: reqForAppointment.clinicNo,
			date: new Date(reqForAppointment.date),
			preferStartTime: reqForAppointment.preferStartTime,
			preferEndTime: reqForAppointment.preferEndTime,
			appointmentType: reqForAppointment.reqforappointmentType,
			sessionType: reqForAppointment.sessionType,
			notePatient: reqForAppointment.notePatient,
			note: reqForAppointment.note,
			status: reqForAppointment.status,
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
													name="patientNo"
													id="patients"
													onChange={this.handleChange}
													className="form-control"
													value={data.patientNo}
												>
													<option value="">Select Patient</option>
													{this.selectPatients}
												</select>
											</div>
											{errors.patientNo && <div className="alert alert-danger">{errors.patientNo}</div>}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="doctorNo">
												Select Doctor
											</label>
											<div className="col-lg-8">
												<select
													name="doctorNo"
													id="doctorNo"
													onChange={this.handleChange}
													className="form-control"
													value={data.doctorNo}
												>
													<option value="">Select Doctor</option>
													{this.selectDoctors}
												</select>
											</div>
											{errors.doctorNo && <div className="alert alert-danger">{errors.doctorNo}</div>}
										</div>
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="clinicSolos">
												Select Clinic
											</label>
											<div className="col-lg-8">
												<select
													name="clinicNo"
													id="clinicSolos"
													onChange={this.handleChange}
													className="form-control"
													value={data.clinicNo}
												>
													<option value="">Select Clinic</option>
													{this.selectClinicSolos}
												</select>
											</div>
											{errors.clinicNo && <div className="alert alert-danger">{errors.clinicNo}</div>}
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
													name="preferStartTime"
													dateFormat={false}
													value={data.preferStartTime}
													onChange={(e) => {			
														const data = { ...this.state.data };
														data.preferStartTime = e;
														this.setState({ data });
												
													  }}
													inputProps={{ placeholder: "Timepicker" }}
												/>
											</div>
										</div>
										<div className="form-group row">
											<label className="col-lg-4 col-form-label">Select Prefer End-Time</label>
											<div className="col-lg-8">
												<DateTime
													name="preferEndTime"
													dateFormat={false}
													value={data.preferEndTime}
													onChange={(e) => {			
														const data = { ...this.state.data };
														data.preferEndTime = e;
														this.setState({ data });
												
													  }}
													inputProps={{ placeholder: "Timepicker" }}
												/>
											</div>
										</div>

										{/* <div className="form-group row">
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
										</div> */}

                             {this.renderTextarea("complaint","Complaint",'Enter Complaint')}

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="appointmentType">
												Select Appointment-type
											</label>
											<div className="col-lg-8">
												<select
													name="appointmentType"
													id="appointmentType"
													onChange={this.handleChange}
													className="form-control"
													value={data.appointmentType}
												>
													<option value="">Select Appointment-type</option>
													{this.appointmentTypeoptions}
												</select>
											</div>
											{errors.appointmentType && (
												<div className="alert alert-danger">{errors.appointmentType}</div>
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

								
                        {this.renderTextarea("notePatient","Note from Patient",'Enter your Note for clinic')}
									
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="status">
												Select Status
											</label>
											<div className="col-lg-8">
												<select
													name="status"
													id="status"
													onChange={this.handleChange}
													className="form-control"
													value={data.status}
												>
													<option value="">Select Status</option>
													{this.reqforappointmentStatusoptions}
												</select>
											</div>
											{errors.status && (
												<div className="alert alert-danger">{errors.status}</div>
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
