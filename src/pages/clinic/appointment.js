import React from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Panel,
  PanelHeader,
  PanelBody,
} from "../../components/panel/panel.jsx";
import { UncontrolledDropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import ReactTags from "react-tag-autocomplete";
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import DateTime from "react-datetime";
import moment from "moment";
//import Select from 'react-select';
//import Select from "../../common/select";
import Tooltip from "rc-tooltip";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "react-datetime/css/react-datetime.css";
import "react-datepicker/dist/react-datepicker.css";
import Joi from "joi";
import Form from "../../common/form.jsx";
import { apiUrl } from "../../config/config.json";
import http from "../../services/httpService";
import { saveAppointment, getAppointment } from "./../../services/appointments";
import { getClinic,getClinics } from "./../../services/clinics";
import { getDoctor,getDoctors } from "./../../services/doctors";
import { getPatient,getPatients } from "./../../services/patients";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;

class Appointment extends Form {
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
      patients:[],
	  doctors:[],
	  clinics:[],
      data: {
        patientNo: "",
		clinicNo: '',
        doctorNo: '',
        date: new Date(),
        startTime: "",
        endTime: "",
        //chiefComplaint: "",
		complaint: "",
        appointmentType: "",
        sessionType: "",
        note: "",
		status: ""
        
      },
      errors: {},
    };

    this.appointmentTypeOptions = [
      { value: "clinic", label: "At Clinic" },
      { value: "home", label: "At home" },
      { value: "phone", label: "Telephone" },
      { value: "video", label: "Video" },
    ];

    this.appointmentStatusOptions = [
      { value: "canceled<24h", label: "Canceled < 24h" },
      { value: "delayed", label: "Delayed" },
      { value: "invoiced", label: "Invoiced" },
      { value: "arrived", label: "Arrived" },
      { value: "intreatment", label: "In Treatment" },
      { value: "active", label: "Active" },
    ];

    this.sessionTypeOptions = [
      { value: "intake", label: "Intake (new complaint)" },
      { value: "follow", label: "Follow" },
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
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  populateAppointmentTypes() {
    this.appointmentTypeoptions = this.appointmentTypeOptions.map((option) => (
      <option key={option.label} value={option.value}>
        {option.value}
      </option>
    ));
  }
  populateAppointmentStatus() {
    this.appointmentStatusoptions = this.appointmentStatusOptions.map(
      (option) => (
        <option key={option.label} value={option.value}>
          {option.value}
        </option>
      )
    );
  }
  populateSessionType() {
    this.sessionTypeoptions = this.sessionTypeOptions.map((option) => (
      <option key={option.label} value={option.value}>
        {option.value}
      </option>
    ));
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
  async populateAppointment() {
    try {
      const AppointmentId = this.props.match.params.id;

      if (AppointmentId === "new") return;

      const { data: Appointment } = await getAppointment(AppointmentId);
	  const startDate = new Date(Appointment.start);
	  const endDate = new Date(Appointment.end);
	  Appointment.date = startDate.getFullYear()-startDate.getMonth() + 1-startDate.getDate();
	  Appointment.startTime = startDate.getHours()+":"+startDate.getMinutes();
	  Appointment.endTime = endDate.getHours()+":"+endDate.getMinutes();
      this.setState({ data: this.mapToViewModel(Appointment) });
      console.log(this.state.data);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/error");
    }
  }

  async componentDidMount() {
    this.populateAppointmentTypes();
    this.populateAppointmentStatus();
    this.populateSessionType();
	await this.populatePatients();
	await this.populateClinics();
	await this.populateDoctors();
    await this.populateAppointment();
  }


  schema = Joi.object({
    patientNo: Joi.string(),
	doctorNo: Joi.string().optional(),
	clinicNo: Joi.string().required(),
    date: Joi.date().required(),
    startTime: Joi.string(),
    endTime: Joi.string().optional(),
    //chiefComplaint: Joi.string().optional(),
	complaint: Joi.string().optional(),
    appointmentType: Joi.string().optional(),
    sessionType: Joi.string().optional(),
    note: Joi.any().optional(),
    status: Joi.string().optional(),
  });

  handleDateChange = (e) => {
    const errors = { ...this.state.errors };
    const data = { ...this.state.data };
	data["date"] = new Date(e);
    this.setState({ data });
    console.log(this.state.data);
  };

  doSubmit = async (appointment) => {
    try {
	const data = { ...this.state.data };
	console.log(this.state.data);
	data.start = new Date(data.date + " "+ moment(data.startTime, "HH:mm:ss"));
	data.end = new Date(data.date + " "+ moment(data.endTime, "HH:mm:ss"));
	delete data.date;
	delete data.startTime;
	delete data.endTime;
	const { data: clinic } = await getClinic(data.clinicNo);
	data.clinicUser = clinic[0].user;
	const { data: patient } = await getPatient(data.patientNo);
	data.patientUser = patient[0].user;
	if(data.doctorNo) {
		const { data: doctor } = await getDoctor(data.doctorNo);
		data.doctorUser = doctor[0].user;
	}
    this.setState({ data });
	console.log(this.state.data);
      await saveAppointment(this.state.data);
      this.props.history.push("/clinic/appointments");
    } catch (ex) {
      if (ex.response) {
        const errors = { ...this.state.errors };
        errors.status = ex.response.data;
        this.setState({ errors });
        //console.log(this.state.errors);
      }
    }
  };

  mapToViewModel(Appointment) {
    return {
      _id: Appointment._id,
      date: new Date(Appointment.date),
      startTime: Appointment.startTime,
      endTime: Appointment.endTime,
      appointmentType: Appointment.appointmentType,
      sessionType: Appointment.sessionType,
      doctorNo: Appointment.doctorNo,
	  patientNo: Appointment.patientNo,
	  clinicNo: Appointment.clinicNo,
      note: Appointment.note,
      status: Appointment.status,
	  //chiefComplaint: Appointment.chiefComplaint,
	  complaint: Appointment.complaint,
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
            <li className="breadcrumb-item active">Add/Edit Appointment</li>
          </ol>
          <h1 className="page-header">
            Add Appointment <small>Appointment-registration-form</small>
          </h1>

          <div className="row">
            <div className="col-xl-10">
              <Panel>
                <PanelHeader>Add/Edit Appointment</PanelHeader>
                <PanelBody className="panel-form">
                  <form
                    className="form-horizontal form-bordered"
                    onSubmit={this.handleSubmit}
                  >
                    <div className="form-group row">
                      <label className="col-lg-4 col-form-label">Patient</label>
                      <div className="col-lg-8">
                        <select
                          name="patientNo"
                          id="patientNo"
                          onChange={this.handleChange}
                          className="form-control"
                        >
                          <option value="">Select Patient</option>
                          {this.selectPatients}
                        </select>
                      </div>
					  {errors.patientNo && (
                        <div className="alert alert-danger">
                          {errors.patientNo}
                        </div> )}
                    </div>
                    <div className="form-group row">
                      <label
                        className="col-lg-4 col-form-label"
                        htmlFor="doctorNo"
                      >
                        Select Doctor
                      </label>
                      <div className="col-lg-8">
                        <select
                          name="doctorNo"
                          id="doctorNo"
                          onChange={this.handleChange}
                          className="form-control"
                        >
                          <option value="">Select Doctor</option>
                          {this.selectDoctors}
                        </select>
                      </div>
					
					  {errors.doctorNo && (
                        <div className="alert alert-danger">
                          {errors.doctorNo}
                        </div> )}
                     
                      </div>
                    <div className="form-group row">
                      <label
                        className="col-lg-4 col-form-label"
                        htmlFor="clinicNo"
                      >
                        Select Clinic
                      </label>
                      <div className="col-lg-8">
                        <select
                          name="clinicNo"
                          id="clinicNo"
                          onChange={this.handleChange}
                          className="form-control"
                        >
                          <option value="">Select Clinic</option>
                          {this.selectClinics}
                        </select>
                      </div>
                      {errors.clinicNo && (
                        <div className="alert alert-danger">
                          {errors.clinicNo}
                        </div>
                      )}
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-4 col-form-label" htmlFor="date">
                        Date
                      </label>
                      <div className="col-lg-8">
                        <DatePicker
                          onChange={this.handleDateChange}
                          id={data.date}
                          value={data.date}
                          selected={data.date}
                          inputProps={{ placeholder: "Datepicker" }}
                          className="form-control"
                        />
                        {errors.date && (
                          <div className="alert alert-danger">
                            {errors.date}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-4 col-form-label">
                        Select Start-Time
                      </label>
                      <div className="col-lg-8">
					  <TimePicker
					       disableClock={true}
						   onChange={(e) => {			
							const data = { ...this.state.data };
							data.startTime = e;
							this.setState({ data });
							console.log(this.state.data);
						  }}
						   id={data.startTime}
						   value={data.startTime}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-4 col-form-label">
                        Select End-Time
                      </label>
                      <div className="col-lg-8">
					  <TimePicker
					       disableClock={true}
						   onChange={(e) => {				
							const data = { ...this.state.data };
							data.endTime = e;
							this.setState({ data });
							console.log(this.state.data);
						  }}
						   id={data.endTime}
						   value={data.endTime}
                        />
                      </div>
                    </div>

                 

					{this.renderTextarea("complaint","Complaint","Enter Complaint")}

                    <div className="form-group row">
                      <label
                        className="col-lg-4 col-form-label"
                        htmlFor="appointmentType"
                      >
                        Select Appointment-type
                      </label>
                      <div className="col-lg-8">
                        <select
                          name="appointmentType"
                          id="appointmentType"
                          onChange={this.handleChange}
                          className="form-control"
                        >
                          <option value="">Select Appointment-type</option>
                          {this.appointmentTypeoptions}
                        </select>
                      </div>
                      {errors.appointmentType && (
                        <div className="alert alert-danger">
                          {errors.appointmentType}
                        </div>
                      )}
                    </div>

                    <div className="form-group row">
                      <label
                        className="col-lg-4 col-form-label"
                        htmlFor="sessionType"
                      >
                        Select Session-type
                      </label>
                      <div className="col-lg-8">
                        <select
                          name="sessionType"
                          id="sessionType"
                          onChange={this.handleChange}
                          className="form-control"
                        >
                          <option value="">Select Session-type</option>
                          {this.sessionTypeoptions}
                        </select>
                      </div>
                      {errors.sessionType && (
                        <div className="alert alert-danger">
                          {errors.sessionType}
                        </div>
                      )}
                    </div>

					{this.renderTextarea("note","Note","* Enter Note")}

                    <div className="form-group row">
                      <label
                        className="col-lg-4 col-form-label"
                        htmlFor="status"
                      >
                        Select Status
                      </label>
                      <div className="col-lg-8">
                        <select
                          name="status"
                          id="status"
                          onChange={this.handleChange}
                          className="form-control"
                        >
                          <option value="">Select Status</option>
                          {this.appointmentStatusoptions}
                        </select>
                      </div>
                      {errors.status && (
                        <div className="alert alert-danger">
                          {errors.status}
                        </div>
                      )}
                    </div>

                    <div className="form-group row">
                      <div className="col-lg-8">
                        <button
                          type="submit"
                          disabled={this.validate()}
                          className="btn btn-primary btn-block btn-lg"
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

export default withRouter(Appointment);