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
import { savePhysicalCondition, getPhysicalCondition } from "./../../services/physicalConditions";
import { getClinic,getClinics } from "./../../services/clinics";
import { getDoctor,getDoctors } from "./../../services/doctors";
import { getPatient,getPatients } from "./../../services/patients";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;

class PhysicalCondition extends Form {
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
        age: "",
        ethnicity: "",
    	cityOfBirth: "",		
        weight: "",
	    weightUnit: '',
        height: '',
        heightUnit: "",
        BMI: "",
    	BMICategory: "",		
        temperature: "",
	    temperatureUnit: '',		
        bloodPressure: '',		
        bloodGroupe: "",		
        bloodGlucoseLevel: "",		
    	heartBeat: "",				
        oxygenSaturation: "",
	    redBloodCell: '',
        whiteBloodCell: '',		
        Hgb: "",
        GSR: "",
    	GSP: "",
        leftEyeSpherical: "",
	    rightEyeSpherical: '',
        systolicBoodPressureNo: '',
        diastolicBloodPressureNo: "",
        appointmentType: "",
        sessionType: "",
        note: "",
        date: new Date(),		
	    status: ""
      
      },
      errors: {},
    };


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
  async populatePhysicalCondition() {
    try {
      const PhysicalConditionId = this.props.match.params.id;

      if (PhysicalConditionId === "new") return;

      const { data: PhysicalCondition } = await getPhysicalCondition(PhysicalConditionId);
	  const startDate = new Date(PhysicalCondition.startTime);
	  const endDate = new Date(PhysicalCondition.endTime);
	  //PhysicalCondition.date = startDate.getFullYear()-startDate.getMonth() + 1-startDate.getDate();
    PhysicalCondition.date = moment(startDate).format("YYYY-MM-DD");
	  //PhysicalCondition.startTime = startDate.getHours()+":"+startDate.getMinutes();
    PhysicalCondition.startTime = moment(startDate).format("HH:mm");
	  //PhysicalCondition.endTime = endDate.getHours()+":"+endDate.getMinutes();
    PhysicalCondition.endTime = moment(endDate).format("HH:mm");
      this.setState({ data: this.mapToViewModel(PhysicalCondition) });
      console.log(this.state.data);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/error");
    }
  }

  async componentDidMount() {
	await this.populatePatients();
	await this.populateClinics();
	await this.populateDoctors();
    await this.populatePhysicalCondition();
  }

  schema = Joi.object({
    patientNo: Joi.string(),
	doctorNo: Joi.string().optional(),
	clinicNo: Joi.string().required(),
    age: Joi.string().optional(),
	ethnicity: Joi.string().optional(),	
    cityOfBirth: Joi.string().optional(),
    weight: Joi.string().optional(),	
    weightUnit: Joi.string().optional(),
    height: Joi.string().optional(),	
    heightUnit: Joi.string().optional(),
	temperature: Joi.string().optional(),	
    temperatureUnit: Joi.string().optional(),	
	BMI: Joi.string().optional(),
	BMICategory: Joi.string().required(),	
    bloodPressure: Joi.string().optional(),
	bloodGroupe: Joi.string().optional(),		
    bloodGlucoseLevel: Joi.string().optional(),	
    heartBeat: Joi.string().optional(),		
    oxygenSaturation: Joi.string().optional(),	
    redBloodCell: Joi.string().optional(),	
    whiteBloodCell: Joi.string().optional(),	
	Hgb: Joi.string().optional(),		
    GSR: Joi.string().optional(),	
    GSP: Joi.string().optional(),		
    leftEyeSpherical: Joi.string().optional(),	
    rightEyeSpherical: Joi.string().optional(),	
    systolicBoodPressureNo: Joi.string().optional(),	
    diastolicBloodPressureNo: Joi.string().optional(),	
    note: Joi.any().optional(),
    createdOn: Joi.date().required(),	
    status: Joi.string().optional(),
  });

  handleDateChange = (e) => {
    const errors = { ...this.state.errors };
    const data = { ...this.state.data };
	data["date"] = new Date(e);
    this.setState({ data });
    console.log(this.state.data);
  };

  doSubmit = async (physicalCondition) => {
    
    try {
	const data = { ...this.state.data };
	console.log(this.state.data);
	
  let [hour, minute] = data.startTime.split(":");
  data.start = moment(data.date).add({hours: hour, minutes: minute}).toString(); 
  [hour, minute] = data.endTime.split(":");
  data.end = moment(data.date).add({hours: hour, minutes: minute}).toString(); 
  
	const { data: clinic } = await getClinic(data.clinicNo);
	data.clinicUser = clinic[0].user;
	const { data: patient } = await getPatient(data.patientNo);
	data.patientUser = patient[0].user;
	if(data.doctorNo) {
		const { data: doctor } = await getDoctor(data.doctorNo);
		data.doctorUser = doctor[0].user;
	}
  delete data.date;
	delete data.startTime;
	delete data.endTime;
    this.setState({ data });
	console.log(this.state.data);
      await savePhysicalCondition(this.state.data);
      this.props.history.push("/clinic/physicalConditions");
    } catch (ex) {
      if (ex.response) {
        const errors = { ...this.state.errors };
        errors.status = ex.response.data;
        this.setState({ errors });
        //console.log(this.state.errors);
      }
    }
  };

  mapToViewModel(PhysicalCondition) {
    return {
      _id: PhysicalCondition._id,
      createdOn: new Date(PhysicalCondition.createdOn),
      age: PhysicalCondition.age,
      ethnicity: PhysicalCondition.ethnicity,	  
      cityOfBirth: PhysicalCondition.cityOfBirth,
      weight: PhysicalCondition.weight,	  
      weightUnit: PhysicalCondition.weightUnit,
      height: PhysicalCondition.height,	  
      heightUnit: PhysicalCondition.heightUnit,
      BMI: PhysicalCondition.BMI,	  
      BMICategory: PhysicalCondition.BMICategory,	  
      temperature: PhysicalCondition.temperature,	  
      temperatureUnit: PhysicalCondition.temperatureUnit,	  
      bloodPressure: PhysicalCondition.bloodPressure,	 	  
      bloodGroupe: PhysicalCondition.bloodGroupe,
      bloodGlucoseLevel: PhysicalCondition.bloodGlucoseLevel,	  
      heartBeat: PhysicalCondition.heartBeat,	  	  
      oxygenSaturation: PhysicalCondition.oxygenSaturation,	  
      redBloodCell: PhysicalCondition.redBloodCell,	  
      whitedBloodCell: PhysicalCondition.whiteBloodCell,	  
      Hgb: PhysicalCondition.Hgb,	  	  
      GSR: PhysicalCondition.GSR,	  
      GSP: PhysicalCondition.GSP,	  	  
      leftEyeSpherical: PhysicalCondition.leftEyeSpherical,	
      rightEyeSpherical: PhysicalCondition.rightEyeSpherical,	  	  
      systolicBoodPressureNo: PhysicalCondition.systolicBoodPressureNo,	  	  
      diastolicBloodPressureNo: PhysicalCondition.diastolicBloodPressureNo,	 	  
      doctorNo: PhysicalCondition.doctorNo,
  	  patientNo: PhysicalCondition.patientNo,
	  clinicNo: PhysicalCondition.clinicNo,
      note: PhysicalCondition.note,
      status: PhysicalCondition.status,
	  //chiefComplaint: PhysicalCondition.chiefComplaint,
	  complaint: PhysicalCondition.complaint,
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
            <li className="breadcrumb-item active">Add/Edit PhysicalCondition</li>
          </ol>
          <h1 className="page-header">
            Add PhysicalCondition <small>PhysicalCondition-registration-form</small>
          </h1>

          <div className="row">
            <div className="col-xl-10">
              <Panel>
                <PanelHeader>Add/Edit PhysicalCondition</PanelHeader>
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
                          value={data.patientNo}
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

					{this.renderTextarea("complaint","Complaint","Enter Complaint")}

					{this.renderTextarea("note","Note","* Enter Note")}


                    <div className="form-group row">
                      <div className="col-lg-8">
                        <button
                          type="submit"
                          disabled={this.validate}
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

export default withRouter(PhysicalCondition);