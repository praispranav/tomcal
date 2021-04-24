import React from 'react';
import { Link,withRouter} from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from '../../components/panel/panel.jsx';
import { UncontrolledDropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import ReactTags from 'react-tag-autocomplete';
import DatePicker from 'react-datepicker';
import DateTime from 'react-datetime';
import moment from "moment";
//import Select from 'react-select';
//import Select from "../../common/select";
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'react-datetime/css/react-datetime.css';
import 'react-datepicker/dist/react-datepicker.css';
import Joi from 'joi';
import Form from '../../common/form.jsx';
import {apiUrl} from '../../config/config.json';
import http from '../../services/httpService';
import {savereqForAppointment,getreqForAppointment} from './../../services/reqforappointments';
import {getClinics} from './../../services/clinics';
import {getDoctors} from './../../services/doctors';
import {getPatients} from './../../services/patients';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;


class User extends Form {
	constructor(props) {
		super(props);

		var maxYesterday = '';
		var minYesterday = DateTime.moment().subtract(1, 'day');

		this.minDateRange = (current) => {
			return current.isAfter(minYesterday);
		};
		this.maxDateRange = (current) => {
			return current.isAfter(maxYesterday);
		};
		this.minDateChange = (value) => {
			this.setState({
				maxDateDisabled: false
			});
			maxYesterday = value;
		};
	
		this.state = {
			maxDateDisabled: true,
			countries: [],
			profiles: [],
			data: {
				patientNo: '',
				businessName: '',
				date: '',
				startTime: '',
				endTime: '',
				chiefComplaint: '',
				reqforappointmentType: '',
				// mobilePhone: '',
				sessionType: '',
				note: '',
		//		clinicNo: ''				
		//		doctorNo: ''
			},
            selectedFile: null,
			errors: {}
		}

		this.apointmentTypeOptions = [
			{ value: 'clinic', label: 'At Clinic' },
			{ value: 'home', label: 'At home' },
			{ value: 'phone', label: 'Telephone' },
			{ value: 'video', label: 'Video' },
		];

		this.apointmentStatusOptions = [
			{ value: 'approved', label: 'Approved' },
			{ value: 'canceled', label: 'Canceled' },
			{ value: 'active', label: 'Active' },			
		];
		
		this.sessionTypeOptions = [
			{ value: 'intake', label: 'Intake (new complaint)' },
			{ value: 'follow', label: 'Follow' }
		];

		this.handleSlider = (props) => {
			const { value, dragging, index, ...restProps } = props;
			return (
				<Tooltip
					prefixCls="rc-slider-tooltip"
					overlay={value}
					visible={dragging}
					placement="top"
					key={index}
				>
					<Handle value={value} {...restProps} />
				</Tooltip>
			);
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.onChangeImgHandler = this.onChangeImgHandler.bind(this);
	}

	async populateappointmentTypes(){
		this.apointmentTypeoptions = this.apointmentTypeOptions.map(option => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	async populatereqforappointmentStatus(){
		this.apointmentStatusoptions = this.apointmentStatusOptions.map(option => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	async populatesessionType(){
    this.sessionTypeoptions = this.sessionTypeOptions.map(option => (
		<option key={option.label} value={option.value}>
			{option.value}
		</option>
	));
	}

	async populatereqForAppointment() { 
		try {
		  const reqForAppointmentId = this.props.match.params.id;
		
		  if (reqForAppointmentId === "new") return;
	
		  const { data: reqForAppointment } = await getClinic(reqForAppointmentId);
		     
			 reqForAppointment.username = reqForAppointment.username;
			 reqForAppointment.patientNo = reqForAppointment.patientNo;			 
			 reqForAppointment.businessName = reqForAppointment.businessName;
			 reqForAppointment.date = reqForAppointment.date;
			 reqForAppointment.preferStartTime = reqForAppointment.preferStartTime;
			 reqForAppointment.preferEndTime = reqForAppointment.preferEndTime;
			 reqForAppointment.chiefComplaint = reqForAppointment.chiefComplaint;
			 reqForAppointment.appointmentType = reqForAppointment.appointmentType;
			 reqForAppointment.sessionType = reqForAppointment.sessionType;
			 reqForAppointment.doctorNo = reqForAppointment.doctorNo;
			 reqForAppointment.notePatient = reqForAppointment.notePatient;
			 reqForAppointment.note = reqForAppointment.note;			 
			 reqForAppointment.status = reqForAppointment.status;			 
			 
		  this.setState({ data: this.mapToViewModel(reqForAppointment) });

		  console.log(this.state.data);
		} catch (ex) {
		  if (ex.response && ex.response.status === 404)
			this.props.history.replace("/error");
		}
	  }


	async componentDidMount() {
	
		await this.populateApointmentType();
		await this.populateApointmentStatus();		
		await this.populateSessionType();
		await this.populateApointment();
	
	}

	// schema = Joi.object({
	// 	username: Joi.string().required().label('Username')
	// 	//password: Joi.string().required().label('Password'),
	// 	//email:Joi.string().required().label('Email'),	
	// 	//gender:Joi.string().required().label('Gender'),
	// 	//country:Joi.string().required().label('Country')
	// });
schema = Joi.object({
		reqForAppointmentname: Joi.string()
			.alphanum()
			.min(3)
			.max(30)
			.required(),

		patientNo: Joi.string(),
		date: Joi.date().required(),		
		preferStartTime: Joi.string(),
		[referEndTime: Joi.string().optional(),
		chiefComplaint: Joi.string().optional(),
		appointmentType: Joi.string().optional(),
		sessionType: Joi.string().optional(),
		businessName: Joi.any().required(),				
		doctorNo: Joi.string().optional(),		
		notePatient: Joi.string().optional(),				
		note: Joi.string().optional(),		
		status: Joi.string().optional(),		
	});

	handledateChange = (e) => {
		const errors = { ...this.state.errors };
		const obj = { ['date']: e };

		const data = { ...this.state.data };
		data['date'] = e;
		//const data = {...this.state.data};
		//data.date = e;
		this.setState({ data });
		console.log(this.state.data);
	};
	

	doSubmit = async (reqforappointment) => {
		//console.log('working');
	    try{
	
			await saveUser(this.state.data,this.state.imageSrc);
			//console.log(this.state.data);
			this.props.history.push("/clinic/users");
		}catch(ex){
			//if(ex.response && ex.response.status === 404){
			if(ex.response){
				const errors = {...this.state.errors};
				errors.username = ex.response.data;
				this.setState({errors});
				//console.log(this.state.errors);
			}
		}
		
	};
	
	mapToViewModel(reqForAppointment) {
		return {
            _id: reqForAppointment._id,
            username: reqForAppointment.username,
            date: new Date(reqForAppointment.date),
            preferStartTime: reqForAppointment.preferStartTime,
            preferEndTime: reqForAppointment.preferEndTime,
            reqforappointmentType: reqForAppointment.reqforappointmentType,
            sessionType: reqForAppointment.sessionType,
            doctorNo: reqForAppointment.doctorNo,
            notePatient: reqForAppointment.notePatient,  			
            note: reqForAppointment.note,  
            businessName : reqForAppointment.clinicNo,
            status : reqForAppointment.status,     
		};
	  }
		const { data, errors } = this.state;
		return (
			<React.Fragment>
				<div>
					<ol className="breadcrumb float-xl-right">
						<li className="breadcrumb-item"><Link to="/form/plugins">Home</Link></li>
						<li className="breadcrumb-item"><Link to="/form/plugins">Clinics</Link></li>
						<li className="breadcrumb-item active">Add reqForAppointment</li>
					</ol>
					<h1 className="page-header">
						Add reqForAppointment <small>reqForAppointment-registration-form</small>
					</h1>

					<div className="row">
						<div className="col-xl-10">
							<Panel>
								<PanelHeader>Add reqForAppointment</PanelHeader>
								<PanelBody className="panel-form">
									<form className="form-horizontal form-bordered" onSubmit={this.handleSubmit} >
										<div className="form-group row">
											<label className="col-lg-4 col-form-label">Patient</label>
											<div className="col-lg-8">
												<select name="clinicSolos" id="patients" onChange={this.handleChange} className="form-control" >
													<option value="">Select Patient</option>
													{this.selectPatients}
												</select>
										</div>
									
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="doctorNo" >Select Doctor</label>
											<div className="col-lg-8">
												<select name="doctorNo" id="doctorNo" onChange={this.handleChange} className="form-control" >
													<option value="">Select Doctor</option>
													{this.selectDoctors}
												</select>
											</div>
										</div>	
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="clinicSolos" >Select Clinic</label>
											<div className="col-lg-8">
												<select name="clinicSolos" id="clinicSolos" onChange={this.handleChange} className="form-control" >
													<option value="">Select Clinic</option>
													{this.selectClinicSolos}
												</select>
											</div>
											{errors.profile && (<div className="alert alert-danger">{errors.profile}</div>)}
										</div>									

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="date" >Date</label>
											<div className="col-lg-8">
												<DatePicker
													onChange={this.handleDobChange}
													id={data.dateBirth}
													value={data.dateBirth}
													selected={data.dateBirth}
													inputProps={{ placeholder: "Datepicker" }}
													className="form-control"
												/>
												{errors.date && <div className="alert alert-danger">{errors.date}</div>}
											</div>
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label">Select Prefer Start-Time</label>
											<div className="col-lg-8">
												<DateTime dateFormat={false} inputProps={{ placeholder: 'Timepicker' }} />
											</div>
										</div>
										<div className="form-group row">
											<label className="col-lg-4 col-form-label">Select Prefer End-Time</label>
											<div className="col-lg-8">
												<DateTime dateFormat={false} inputProps={{ placeholder: 'Timepicker' }} />
											</div>
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label">Complaint</label>
											<div className="col-lg-8">
												<div className="row row-space-10">
												<input type="textarea" className="form-control m-b-5" placeholder="Enter Complaint" />
												</div>
											</div>
										</div>
										
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="reqforappointmentType" >Select Appointment-type</label>
											<div className="col-lg-8">
												<select name="appointmentType" id="appointmentType" onChange={this.handleChange} className="form-control" >
													<option value="">Select Appointment-type</option>
													{this.reqforappointmentTypeoptions}
												</select>
											</div>
											{errors.reqforappointmentType && (<div className="alert alert-danger">{errors.reqforappointmentType}</div>)}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="sessionType" >Select Session-type</label>
											<div className="col-lg-8">
												<select name="sessionType" id="sessionType" onChange={this.handleChange} className="form-control" >
													<option value="">Select Session-type</option>
													{this.sessionTypeoptions}
												</select>
											</div>
											{errors.sessionType && (<div className="alert alert-danger">{errors.sessionType}</div>)}
										</div>

										{this.renderInput("note","Note","text","* Enter Note"
										)}
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="status" >Select Status</label>
											<div className="col-lg-8">
												<select name="status" id="status" onChange={this.handleChange} className="form-control" >
													<option value="">Select Status</option>
													{this.selectstatus}
												</select>
											</div>
											{errors.profile && (<div className="alert alert-danger">{errors.profile}</div>)}
										</div>									

                                        {/* {this.renderInput("bank","Bank","text","Enter Bank")} 
                                        {this.renderInput("branchOfBank","branch Of Bank","text","Enter branchOfBank")}
                                        {this.renderInput("IBAN","IBAN","text","Enter IBAN")}                                
										{this.renderInput("chamberCommerceNo","chamber Commerce No","text","Enter chamberCommerceNo")}
                                        {this.renderInput("taxPayerNo","tax Payer No","text","Enter taxPayerNo")} 
                                        {this.renderInput("website","Website","text","Enter website")} 
                                        {this.renderInput("size","Size","text","Enter size")} 
                                        {this.renderInput("healthcareProviderIdentifierOrganisation","healthcare Provider Identifier Organisation","text","Enter healthcareProviderIdentifierOrganisation")} 
                                        {this.renderInput("healthcareProviderIdentifierIndividual","healthcare Provider Identifier Individual","text","Enter healthcareProviderIdentifierIndividual")} 
                                        {this.renderInput("treatments","Treatments","text","Enter treatments")} 
                                        {this.renderInput("licenseNo","license No","text","Enter licenseNo")} 
                                        {this.renderInput("licenseValidTill","license Valid Till","text","Enter licenseValidTill")} 
                                        {this.renderInput("organizationAName","organizationA Name","text","Enter organizationAName")} 
                                        {this.renderInput("organizationAMemberNo","organizationA Member No","text","Enter organizationAMemberNo")} 
                                        {this.renderInput("organizationBName","organizationB Name","text","Enter organizationBName")} 
                                        {this.renderInput("organizationBMemberNo","organizationB MemberNo","text","Enter organizationBMemberNo")}                         
									 */}

										<div className="form-group row">
											<div className="col-lg-8">
												<button	type="submit" disabled={this.validate()} className="btn btn-primary btn-block btn-lg">Submit</button>
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