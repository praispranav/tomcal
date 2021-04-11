import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { Button,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import Form from '../../common/form.jsx';
import {apiUrl} from '../../config/config.json';
import http from '../../services/httpService';
import {saveAppointment,deleteAppointment} from './../../services/appointments';
import {getClinics,getClinic} from './../../services/clinics';
import {getDoctors,getDoctor} from './../../services/doctors';
import {getPatients,getPatient} from './../../services/patients';
import {getRandomColor,dateCheck} from './../../utils/event-utils'
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import Joi from 'joi';

class Calendar extends Form {
	constructor(props) {
		super(props);
		
		const date = new Date();
		const currentYear = date.getFullYear();
		let currentMonth = date.getMonth() + 1;
				currentMonth = (currentMonth < 10) ? '0' + currentMonth : currentMonth;
		
		this.state = {
			events: [],
			clinics: [],
			doctors: [],
			patients: [],
			headerToolbar: {
				left: 'dayGridMonth,timeGridWeek,timeGridDay',
				center: 'title',
				right: 'prev,next today'
			},
			buttonText: {
				today:    'Today',
				month:    'Month',
				week:     'Week',
				day:      'Day'
			},
			modalAdd : false,
			modalEdit : false,
			//fade: false,
			data:{
				start: '',
				end: '',
				complaint: '',
				color: '',
				patientNo: '',
				clinicNo: '',
				doctorNo: '',
				patientUser: '',
				clinicUser: '',
				doctorUser: '',
				note: '',				
			},
			errors: {},
			slotDuration: '00:05:00',
			contentHeight: 'auto'
			//slotDuration: '05:00'
		}

		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		//this.handleCreateInvoice = this.handleCreateInvoice.bind(this);
		//this.handleCreateSession = this.handleCreateSession.bind(this);
		
	}

	async populateCalendarEvents() {
		const { data: events } = await http.get(apiUrl+"/appointments");

		console.log(events);
		this.setState({ events:events.map((event)=>({
			id: event._id,
			title:event.complaint,
			start:event.startTime,
			end:event.endTime,
			color:event.color,
			note:event.note,			
			extendedProps: {
				patientNo: event.patientNo,
				patientName: event.patientUser.contactName.first+" "+event.patientUser.contactName.last,
				patientDob: event.patientNo.dateBirth,
				doctorNo: event.doctorNo,
				clinicNo: event.clinicNo
			  },
			  //description: 'Lecture'
		
		})) });
	}
	async populateDoctors() {
			const { data: doctors } = await getDoctors();
			this.setState({ doctors });
			this.selectDoctors = this.state.doctors.map(option => (
				<option key={option._id} value={option._id}>
					{option.doctors.contactName.last}
				</option>
			));
	}
	async populatePatients() {
		const { data: patients } = await getPatients();
		this.setState({ patients });
		this.selectPatients = this.state.patients.map(option => (
			<option key={option._id} value={option._id}>
				{option.patients.contactName.first+" "+option.patients.contactName.last}
			</option>
		));
    }
    async populateClinics() {
	    const { data: clinics } = await getClinics();
        this.setState({ clinics });
	this.selectClinics = this.state.clinics.map(option => (
		<option key={option._id} value={option._id}>
			{option.companyInfo.businessName}
		</option>
	));
    }
	async componentDidMount() {
		await this.populateCalendarEvents();
		await this.populatePatients();
		await this.populateClinics();
		await this.populateDoctors();
	}



	handleDateSelect =  (selectInfo) => {
		//const date = new Date();
		if(selectInfo.start < moment()) {
			let calendarApi = selectInfo.view.calendar
			calendarApi.unselect()
			return false;
		} 
	    this.toggleModal('Add');
		const data = { ...this.state.data };
		data.start = new Date(selectInfo.startStr);
		data.end = new Date(selectInfo.endStr);	
		data.color = getRandomColor();
		this.setState({data});	
		let calendarApi = selectInfo.view.calendar
		calendarApi.unselect() // clear date selection
		console.log(getRandomColor());	
	  }


	  handleEventClick = async (clickInfo) => {
	     this.toggleModal('Edit');
		const data = { ...this.state.data };
		data.start = new Date(clickInfo.event.startStr);
		data.end = new Date(clickInfo.event.endStr);
		data.complaint = clickInfo.event.title;	
		data.patientNo = clickInfo.event.extendedProps.patientNo._id;
		data.doctorNo = clickInfo.event.extendedProps.doctorNo._id;
		data.clinicNo = clickInfo.event.extendedProps.clinicNo._id;
		data.note = clickInfo.event.note;	
		//data.color = clickInfo.event.extendedProps.color;
		data.id = clickInfo.event.id;
		this.setState({data});	
		console.log(this.state);
		//console.log(clickInfo);
		console.log(clickInfo.event);
		console.log(clickInfo.event.id);
			
	  }


	  renderEventContent = (eventInfo) => {
		return (
		  <>
		  <i> {` ${eventInfo.event.extendedProps.patientName} ${moment(eventInfo.event.extendedProps.patientDob).format("DD/MM/YYYY")}`}</i>
			<i>{` ${eventInfo.event.title} `}</i>
			{/* <b>{` ${eventInfo.timeText}`}</b> */}
		  </>
		)
	  }  

	toggleModal(name) {
				switch (name) {
					case 'Add':	
						this.setState({ modalAdd: !this.state.modalAdd });
						break;
					case 'Edit':	
						this.setState({ modalEdit: !this.state.modalEdit });
						break;
					default:
						break;
				}
	};
	

	handleStartDate = (e) => {
		const errors = { ...this.state.errors };
		const data = { ...this.state.data };
		// let str = FullCalendar.pluginsformatDate(e, {
		// 	month: 'long',
		// 	year: 'numeric',
		// 	day: 'numeric',
		// 	timeZoneName: 'short',
		// 	// timeZone: 'UTC',
		// 	// locale: 'es'
		//   });
		//console.log(Date.parse(e));
		data["start"] = new Date(e);

		this.setState({ data });
		console.log(this.state.data);


	};

	handleEndDate = (e) => {
		const errors = { ...this.state.errors };
		const data = { ...this.state.data };
		data["end"] = new Date(e);
		this.setState({ data });
		console.log(this.state.data);
	};
    handleDelete = async () => {
	
		const {data,events} = this.state;
		const originalEvents = events;
		const newEvents = events.filter(Event => Event.id !== data.id);
		this.setState({events:newEvents});
		this.setState({data:{}});
		try{
			await deleteAppointment(data.id);
			this.toggleModal('Edit');
		}catch(ex){
			if(ex.response && ex.response === 404){
				alert("already deleted");
			}
			this.setState({events:originalEvents});
		}
	};

	doSubmit = async () => {
	    try{
			const errors = {...this.state.errors};
			errors.complaint = "";
			const {events,data} = this.state;
			for(let event in events){
                 
				   if(dateCheck(data.start,data.end,event.start,event.end))
				     errors.complaint = "Slot not available try again";
			}
			const datas = {...this.state.data};
			const { data: clinic } = await getClinic(datas.clinicNo);
			datas.clinicUser = clinic[0].user;
			const { data: patient } = await getPatient(datas.patientNo);
			datas.patientUser = patient[0].user;
			if(data.doctorNo) {
				const { data: doctor } = await getDoctor(datas.doctorNo);
				datas.doctorUser = doctor[0].user;
			}
			this.setState({ data:datas });
		
			await saveAppointment(this.state.data);
			if(data.id){
				await this.populateCalendarEvents();
				this.toggleModal('Edit');
			}else{
				//this.setState({ events: events.concat(this.mapToViewModel(data))});
				await this.populateCalendarEvents();
				this.toggleModal('Add');
			}
			this.setState({data:{}});
			//this.props.history.push("/calendar/calendar");
		}catch(ex){
		
			if(ex.response){
				const errors = {...this.state.errors};
				errors.complaint = ex.response.data;
				this.setState({errors});
			}
		}
	};
	

	// mapToViewModel(appointment) {
	// 	return {
	// 	  id: appointment._id,
	// 	  start: new Date(appointment.start),
	// 	  end: new Date(appointment.end),
	// 	  title: appointment.complaint
	// 	};
	//   }

	  mapToViewModel(appointment) {
		return {
		  //id: appointment._id,
		  start: appointment.start,
		  end: appointment.end,
		  title: appointment.complaint,
		  patientNo: appointment.patientNo,
		  clinicNo: appointment.clinicNo,
		  doctorNo: appointment.doctorNo,
		  note: appointment.note,		  
		};
	  }

	  schema = Joi.object({
	
		complaint: Joi.any().optional(),
		start: Joi.date().optional(),
		end: Joi.date().optional(),
		color: Joi.any().optional(),
		patientNo: Joi.string().required(),
		clinicNo: Joi.string().required(),
		doctorNo: Joi.any().optional(),
		patientUser: Joi.any().optional(),
		clinicUser: Joi.any().optional(),
		doctorUser: Joi.any().optional(),
		note: Joi.any().optional(),			
	});


	render() {
		const { data, errors } = this.state;
		return (
			<React.Fragment>
			<div>
				<ol className="breadcrumb float-xl-right">
					<li className="breadcrumb-item"><Link to="/calendar">Home</Link></li>
					<li className="breadcrumb-item active">Calendar</li>
				</ol>
				<h1 className="page-header">Calendar of avatar and name of user</h1>
				<hr />
				
				<FullCalendar 
					plugins={[ dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin, bootstrapPlugin ]}
					initialView="timeGridDay"
					themeSystem="bootstrap"
					editable={true}
					selectable={true}

					select={this.handleDateSelect}
					eventContent={this.renderEventContent} // custom render function
					eventClick={this.handleEventClick}
					eventRemove={this.handleDelete}
					nowIndicator= {true}
					headerToolbar={this.state.headerToolbar}
					buttonText={this.state.buttonText}
					events={this.state.events}
					slotDuration={this.state.slotDuration}
					contentHeight={this.state.contentHeight}
				/>


{/* <Button color="danger" onClick={this.toggleModal}>Launch</Button> */}
<form className="form-horizontal form-bordered" onSubmit={this.handleSubmit} >
<Modal isOpen={this.state.modalAdd} toggle={() => this.toggleModal('Add')}>

		<ModalHeader toggle={() => this.toggleModal('Add')}>Create Appointment</ModalHeader>
          			<ModalBody>
          				{/* <p>
										Modal body content here...
									</p> */}
                        	{/* {this.renderInput("start","start time","text","Enter start time")} */}
							<DateTimePicker
                              amPmAriaLabel="Select AM/PM"
                              calendarAriaLabel="Toggle calendar"
                              clearAriaLabel="Clear value"
                              dayAriaLabel="Day"
                              hourAriaLabel="Hour"
                              maxDetail="minute"
                              minuteAriaLabel="Minute"
                              monthAriaLabel="Month"
                              nativeInputAriaLabel="Date and time"
                              onChange={this.handleStartDate}
                              secondAriaLabel="Second"
							  disableCalendar={true}
							  name="start"
                              value={data.start}
                              yearAriaLabel="Year"
                            />

                            {/* {this.renderInput("end","end time","text","Enter end time")} */}
							<DateTimePicker
                              amPmAriaLabel="Select AM/PM"
                              calendarAriaLabel="Toggle calendar"
                              clearAriaLabel="Clear value"
                              dayAriaLabel="Day"
                              hourAriaLabel="Hour"
                              maxDetail="minute"
                              minuteAriaLabel="Minute"
                              monthAriaLabel="Month"
                              nativeInputAriaLabel="Date and time"
                              onChange={this.handleEndDate}
                              secondAriaLabel="Second"
							  disableCalendar={true}
							  name="end"
                              value={data.end}
                              yearAriaLabel="Year"
                            />

                            {/* {this.renderInput("complaint","Complaint","text","Enter Complaint")} */}

						


							{this.renderTextarea("complaint","Complaint","6","Enter Complaint")}
                        <div className="form-group row">
						    <label className="col-lg-4 col-form-label" htmlFor="patientNo" >Patient</label>
								<div className="col-lg-8">
								<select name="patientNo" id="patientNo" value={data.patientNo} onChange={this.handleChange} className="form-control" >
									<option value="">Select Patient</option>
								{this.selectPatients}
								</select>
								</div>
								{errors.patientNo && (<div className="alert alert-danger">{errors.patientNo}</div>)}
						</div>
						<div className="form-group row">
						    <label className="col-lg-4 col-form-label" htmlFor="clinicNo" >Clinic</label>
								<div className="col-lg-8">
								<select name="clinicNo" id="clinicNo" value={data.clinicNo} onChange={this.handleChange} className="form-control" >
									<option value="">Select Clinic</option>
								{this.selectClinics}
								</select>
								</div>
								{errors.clinicNo && (<div className="alert alert-danger">{errors.clinicNo}</div>)}
						</div>
						<div className="form-group row">
						    <label className="col-lg-4 col-form-label" htmlFor="doctorNo" >Doctor</label>
								<div className="col-lg-8">
								<select name="doctorNo" id="doctorNo" value={data.doctorNo} onChange={this.handleChange} className="form-control" >
									<option value="">Select Doctor</option>
								{this.selectDoctors}
								</select>
								</div>
								{errors.doctorNo && (<div className="alert alert-danger">{errors.doctorNo}</div>)}
						</div>
							{this.renderTextarea("note","Note","6","Enter note")}
								</ModalBody>
								<ModalFooter>
									{/* <button className="btn btn-white" onClick={() => this.toggleModal()}>Close</button> */}
								
									<button className="btn btn-red" title="Cancel the Appointment"onClick={() => this.toggleModal('Add')}><i className="ion md-close"></i>Cancel</button>
									<button className="btn btn-green" type="submit" title="Save the Appointment" onClick={this.handleSubmit} disabled={this.validate()}><i className="far fa-save"></i></button>
								
								</ModalFooter>
							
</Modal>

	</form>


	<form className="form-horizontal form-bordered" onSubmit={this.handleSubmit} >
<Modal isOpen={this.state.modalEdit} toggle={() => this.toggleModal('Edit')}>

		<ModalHeader toggle={() => {this.toggleModal('Edit');this.setState({data:{}});}}>Edit Appointment</ModalHeader>
          			<ModalBody>
          				{/* <p>
										Modal body content here...
									</p> */}
                        	{/* {this.renderInput("start","start time","text","Enter start time")}

                            {this.renderInput("end","end time","text","Enter end time")} */}


                             <DateTimePicker
                              amPmAriaLabel="Select AM/PM"
                              calendarAriaLabel="Toggle calendar"
                              clearAriaLabel="Clear value"
                              dayAriaLabel="Day"
                              hourAriaLabel="Hour"
                              //maxDetail="second"
							  maxDetail="minute"
                              minuteAriaLabel="Minute"
                              monthAriaLabel="Month"
                              nativeInputAriaLabel="Date and time"
                              onChange={this.handleStartDate}
                              secondAriaLabel="Second"
							  disableCalendar={true}
							  name="start"
                              value={data.start}
                              yearAriaLabel="Year"
                            />
                              <DateTimePicker
                              amPmAriaLabel="Select AM/PM"
                              calendarAriaLabel="Toggle calendar"
                              clearAriaLabel="Clear value"
                              dayAriaLabel="Day"
                              hourAriaLabel="Hour"
                              maxDetail="minute"
                              minuteAriaLabel="Minute"
                              monthAriaLabel="Month"
                              nativeInputAriaLabel="Date and time"
                              onChange={this.handleEndDate}
                              secondAriaLabel="Second"
							  disableCalendar={true}
							  name="end"
                              value={data.end}
                              yearAriaLabel="Year"
                            />
                            {/* {this.renderInput("complaint","Complaint","text","Enter Complaint")} */}
							{this.renderTextarea("complaint","Complaint","6","Enter Complaint")}
						

					<div className="form-group row">
						    <label className="col-lg-4 col-form-label" htmlFor="patientNo" >Patient</label>
								<div className="col-lg-8">
								<select name="patientNo" id="patientNo" value={data.patientNo} onChange={this.handleChange} className="form-control" >
									<option value="">Select Patient</option>
								{this.selectPatients}
								</select>
								</div>
								{errors.patientNo && (<div className="alert alert-danger">{errors.patientNo}</div>)}
						</div>
						<div className="form-group row">
						    <label className="col-lg-4 col-form-label" htmlFor="clinicNo" >Clinic</label>
								<div className="col-lg-8">
								<select name="clinicNo" id="clinicNo" value={data.clinicNo} onChange={this.handleChange} className="form-control" >
									<option value="">Select Clinic</option>
								{this.selectClinics}
								</select>
								</div>
								{errors.clinicNo && (<div className="alert alert-danger">{errors.clinicNo}</div>)}
						</div>
						<div className="form-group row">
						    <label className="col-lg-4 col-form-label" htmlFor="doctorNo" >Doctor</label>
								<div className="col-lg-8">
								<select name="doctorNo" id="doctorNo" value={data.doctorNo} onChange={this.handleChange} className="form-control" >
									<option value="">Select Doctor</option>
								{this.selectDoctors}
								</select>
								</div>
								{errors.doctorNo && (<div className="alert alert-danger">{errors.doctorNo}</div>)}
						</div>

								</ModalBody>
								<ModalFooter>
									{/* <button className="btn btn-white" onClick={() => this.toggleModal()}>Close</button> */}
									<button className="btn btn-red" title="Cancel the Appointment" onClick={() => {this.toggleModal('Edit');this.setState({data:{}});}}><i className="ion md-close"></i>Cancel</button>								
									<button className="btn btn-gray" title="Delete the Appointment" onClick={this.handleDelete}><i className="far fa-trash-alt"></i></button>
									<button className="btn btn-lime" title="Go To Treatment" onClick={() => this.toggleModal('Edit')}><i className="ion md-close"></i>Treatment</button>								
									<button className="btn btn-blue" title="Create an Invoice" onClick={() => this.toggleModal('Edit')}><i className="ion md-close"></i>Creating Invoice</button>																	
									<button className="btn btn-green" title="Save the changes" type="submit" onClick={this.handleSubmit} disabled={this.validate()}><i className="far fa-save"></i></button>
								
								</ModalFooter>
							
</Modal>

	</form>

			</div>
			</React.Fragment>
		)
	}
}

export default Calendar;