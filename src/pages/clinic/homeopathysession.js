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
import {saveHomeopathySession,getHomeopathySession} from './../../services/homeopathysessions';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;


class HomeopathySession extends Form {
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
				username: '',
				password: '',
				email: '',
				firstName: '',
				lastName: '',
				initials: '',
				profile: '',
				country: '',
				// mobilePhone: '',
				date: new Date(),
				gender: '',
				prefix: ''
			},
            selectedFile: null,
			errors: {}
		}

		this.familyRoleOptions = [
			{ value: 'father', label: 'father' },
			{ value: 'mother', label: 'mother' },
			{ value: 'brother', label: 'brother' },
			{ value: 'sister', label: 'sister' },
			{ value: 'twin-brother', label: 'twin-brother' },
			{ value: 'twin-sister', label: 'twin-sister' },
            { value: 'grandpa-father-side', label: 'Grandpa at Father\'s side' },
			{ value: 'gradma-father-side', label: 'Grandma at Father\'s side' },
			{ value: 'grandpa-mother-side', label: 'Grandpa at Mother\'s side' },
            { value: 'grandma-mother-side', label: 'Grandma at Mother\'s side' },
            { value: 'uncle-father-side', label: 'Grandpa at Father\'s side' },
			{ value: 'aunt-father-side', label: 'Grandma at Father\'\s side' },
			{ value: 'uncle-mother-side', label: 'Grandpa at Mother\'s side' },
			{ value: 'aunt-mother-side', label: 'Grandma at Mother\'s side' },
			{ value: 'cousin-father-side', label: 'Cousin at Father\'s side' },
			{ value: 'cousin-mother-side', label: 'Cousin at Mother\'s side' },
			{ value: 'nephew', label: 'Nephew' },
            { value: 'niece', label: 'Niece' },
            { value: 'granduncle-father-side', label: 'Granduncle at Father\'s side' },
			{ value: 'gradaunt-father-side', label: 'Grandaunt at Father\'s side' },
			{ value: 'granduncle-mother-side', label: 'Granduncle at Mother\'s side' },
            { value: 'grandaunt-mother-side', label: 'Grandaunt at Mother\'s side' },

		];

		this.familyDiseaseStatusOptions = [
			{ value: 'cured', label: 'cured' },
			{ value: 'in treatment', label: 'in teratment' },
			{ value: 'died', label: 'died' },
			{ value: 'other', label: 'other' },
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


	async populateMateriaMedicas() {
		const { data: materiamedicas } = await http.get(apiUrl+"/materimedicas");
		this.setState({ materiamedicas: materiamedicas });
		//this.selectCountries = this.state.countries.map((country)=>({label: country.name, value: country.name}) );
		this.selectMateriaMedicas = this.state.materiamedicas.map((materiamedica) => ({ _id: materiamedica._id,label: materiamedica.name, value: materiamedica.name }));
	}
	async populateAccounType() {
	const { data: profiles } = await http.get(apiUrl+"/profiles");
	this.setState({ profiles });
	//this.selectProfiles = this.state.profiles.map((profile)=>({label: profile.profileName, value: profile._id}) );
	this.selectProfiles = this.state.profiles.map(option => (
		<option key={option._id} value={option._id}>
			{option.profileName}
		</option>
	));
	}
	}

	async populateUser() { 
		try {
		  const userId = this.props.match.params.id;
		
		  if (userId === "new") return;
	
		  const { data: user } = await getUser(userId);

			 //console.log(this.mapToViewModel(user));
			 if(!user.dateBirth) user.dateBirth = new Date();
		
			 user.firstName = user.contactName.first;
			 user.lastName = user.contactName.last;
			 user.initials = user.contactName.initials;
		  this.setState({ data: this.mapToViewModel(user) });

		  console.log(this.state.data);
		} catch (ex) {
		  if (ex.response && ex.response.status === 404)
			this.props.history.replace("/error");
		}
	  }


	async componentDidMount() {
		
		//await this.populateProfiles();
		await this.populateFamilyRoleOptions();
		await this.populatefamilyDiseaseStatusOptions();
		await this.populateMateriaMedicas();
	}

	// schema = Joi.object({
	// 	username: Joi.string().required().label('Username')
	// 	//password: Joi.string().required().label('Password'),
	// 	//email:Joi.string().required().label('Email'),	
	// 	//gender:Joi.string().required().label('Gender'),
	// 	//country:Joi.string().required().label('Country')
	// });

schema = Joi.object({
		  userNo: Joi.string().optional(),
		  clinicNo: Joi.string().optional(),
		  doctorNo: Joi.string().optional(),
		  businessName: Joi.string().optional(),
		  appointmentType: Joi.string().optional(),
		  sessionType: Joi.string().optional(),
		  chiefComplaint: Joi.string().optional(),
		  symptoms: Joi.string().optional(),
		  WesternDisease: Joi.string().optional(),
		  currentTreatment: Joi.string().optional(),
		  diseasesIllnesses: Joi.string().optional(),
		  surgeries: Joi.string().optional(),
		  medicamentsSupplements: Joi.string().optional(),
		  allergies: Joi.string().optional(),
		  pregnancies: Joi.string().optional(),
		  familyRole: Joi.string().optional(),
		  familyDisease: Joi.string().optional(),
		  familyDiseaseYear: Joi.string().optional(),
		  familyDiseaseState: Joi.string().optional(),
		  medicalHistoryNote: Joi.string().optional(),
		  socialRelationship: Joi.string().optional(),
		  habits: Joi.string().optional(),
		  occupation: Joi.string().optional(),
		  occupationState: Joi.string().optional(),
		  sport: Joi.string().optional(),
		  sportFrequency: Joi.string().optional(),
		  hobbies: Joi.string().optional(),
		  smoking: Joi.string().optional(),
		  sugar: Joi.string().optional(),
		  alcohol: Joi.string().optional(),
		  tea: Joi.string().optional(),
		  coffee: Joi.string().optional(),
		  heroin: Joi.string().optional(),
		  vitality: Joi.string().optional(),
		  appearance: Joi.string().optional(),
		  appearanceNote: Joi.string().optional(),
		  faceColorLustre: Joi.string().optional(),
		  tongueShape: Joi.string().optional(),
		  tongueColor: Joi.string().optional(),
		  tongueQuality: Joi.string().optional(),
		  tongueNote: Joi.string().optional(),
		  respiration: Joi.string().optional(),
		  speech: Joi.string().optional(),
		  cough: Joi.string().optional(),
		  odor: Joi.string().optional(),
		  appetite: Joi.string().optional(),
		  appetiteNote: Joi.string().optional(),
		  vomiting: Joi.string().optional(),
		  vomitingNote: Joi.string().optional(),
		  diet: Joi.string().optional(),
		  dietNote: Joi.string().optional(),
		  taste: Joi.string().optional(),
		  thirst: Joi.string().optional(),
		  defecation: Joi.string().optional(),
		  urination: Joi.string().optional(),
		  urineColor: Joi.string().optional(),
		  sleeping: Joi.string().optional(),
		  thermalFeeling: Joi.string().optional(),
		  perspiration: Joi.string().optional(),
		  head: Joi.string().optional(),
		  eyes: Joi.string().optional(),
		  ears: Joi.string().optional(),
		  nose: Joi.string().optional(),
		  throat: Joi.string().optional(),
		  painLocation: Joi.string().optional(),
		  painNature: Joi.string().optional(),
		  menstruationHistory: Joi.string().optional(),
		  leukorrhea: Joi.string().optional(),
		  emotionalStatus: Joi.string().optional(),
		  emotionalNote: Joi.string().optional(),
		  interviewNote: Joi.string().optional(),
		  pulseSpeed: Joi.string().optional(),
		  pulseDepth: Joi.string().optional(),
		  pulseStrength: Joi.string().optional(),
		  pulseShape: Joi.string().optional(),
		  pulseTension: Joi.string().optional(),
		  pulseRhythm: Joi.string().optional(),
		  pulseNote: Joi.string().optional(),
		  physicalAppearance: Joi.string().optional(),
		  physicalPalpationEpigastrium: Joi.string().optional(),
		  physicalPalpationEpigastriumNote: Joi.string().optional(),
		  physicalPalpationAbdomen: Joi.string().optional(),
		  physicalPalpationAcupoint: Joi.string().optional(),
		  rangeMotion: Joi.string().optional(),
		  painLevel: Joi.string().optional(),
		  physicalExaminationNote: Joi.string().optional(),
		  HomeoDiagnosis: Joi.string().optional(),
		  principleTreatment: Joi.string().optional(),
		  materiaMedica: Joi.string().optional(),
		  potency: Joi.string().optional(),
		  dietTherapy: Joi.string().optional(),
		  recommendation: Joi.string().optional(),
	});


	handleDobChange = (e) => {
		const errors = { ...this.state.errors };
		const obj = { ['dateBirth']: e };

		const data = { ...this.state.data };
		data['dateBirth'] = e;
		//const data = {...this.state.data};
		//data.dateBirth = e;
		this.setState({ data });
		console.log(this.state.data);
	};
	
	onChangeImgHandler=event=>{

		this.setState({ imageSrc: event.target.files[0] });
	  console.log(event.target.files[0]);
	
	}


	doSubmit = async (user) => {
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
	
	
	mapToViewModel(homeopathysession) {
		return {
		  _id: homeopathysession._id,
		  userNo: homeopathysession.userNo,
		  clinicNo: homeopathysession.clinicNo,
		  doctorNo: homeopathysession.doctorNo,
		  businessName: homeopathysession.businessName,
		  appointmentType: homeopathysession.appointmentType,
		  sessionType: homeopathysession.sessionType,
		  chiefComplaint: homeopathysession.chiefComplaint,
		  symptoms: homeopathysession.symptoms,
		  WesternDisease: homeopathysession.WesternDisease,
		  currentTreatment: homeopathysession.currentTreatment,
		  diseasesIllnesses: homeopathysession.diseasesIllnesses,
		  surgeries: homeopathysession.surgeries,
		  medicamentsSupplements: homeopathysession.medicamentsSupplements,
		  allergies: homeopathysession.allergies,
		  pregnancies: homeopathysession.pregnancies,
		  familyRole: homeopathysession.familyRole,
		  familyDisease: homeopathysession.familyDisease,
		  familyDiseaseYear: homeopathysession.familyDiseaseYear,
		  familyDiseaseState: homeopathysession.familyDiseaseState,
		  medicalHistoryNote: homeopathysession.medicalHistoryNote,
		  socialRelationship: homeopathysession.socialRelationship,
		  habits: homeopathysession.habits,
		  occupation: homeopathysession.occupation,
		  occupationState: homeopathysession.occupationState,
		  sport: homeopathysession.sport,
		  sportFrequency: homeopathysession.sportFrequency,
		  hobbies: homeopathysession.hobbies,
		  smoking: homeopathysession.smoking,
		  sugar: homeopathysession.sugar,
		  alcohol: homeopathysession.alcohol,
		  tea: homeopathysession.tea,
		  coffee: homeopathysession.coffee,
		  heroin: homeopathysession.heroin,
		  vitality: homeopathysession.vitality,
		  appearance: homeopathysession.appearance,
		  appearanceNote: homeopathysession.appearanceNote,
		  faceColorLustre: homeopathysession.faceColorLustre,
		  tongueShape: homeopathysession.tongueShape,
		  tongueColor: homeopathysession.tongueColor,
		  tongueQuality: homeopathysession.tongueQuality,
		  tongueNote: homeopathysession.tongueNote,
		  respiration: homeopathysession.respiration,
		  speech: homeopathysession.speech,
		  cough: homeopathysession.cough,
		  odor: homeopathysession.odor,
		  appetite: homeopathysession.appetite,
		  appetiteNote: homeopathysession.appetiteNote,
		  vomiting: homeopathysession.vomiting,
		  vomitingNote: homeopathysession.vomitingNote,
		  diet: homeopathysession.diet,
		  dietNote: homeopathysession.dietNote,		  
		  taste: homeopathysession.taste,
		  thirst: homeopathysession.thirst,		  
		  defecation: homeopathysession.defecation,
		  urination: homeopathysession.urination,		  
		  urineColor: homeopathysession.urineColor,		  
		  sleeping: homeopathysession.sleeping,
		  thermalFeeling: homeopathysession.thermalFeeling,		  
		  perspiration: homeopathysession.perspiration,		  
		  head: homeopathysession.head,
		  eyes: homeopathysession.eyes,
		  ears: homeopathysession.ears,
		  nose: homeopathysession.nose,
		  throat: homeopathysession.throat,		  
		  painLocation: homeopathysession.painLocation,		  
		  painNature: homeopathysession.painNature,
		  menstruationHistory: homeopathysession.menstruationHistory,
		  leukorrhea: homeopathysession.leukorrhea,		  
		  emotionalStatus: homeopathysession.emotionalStatus,		  
		  emotionalNote: homeopathysession.emotionalNote,		  
		  interviewNote: homeopathysession.interviewNote ,		  
		  pulseSpeed: homeopathysession.pulseSpeed,
		  pulseDepth: homeopathysession.pulseDepth,		  
		  pulseStrength: homeopathysession.pulseStrength,		  
		  pulseShape: homeopathysession.pulseShape,
		  pulseTension: homeopathysession.pulseTension,
		  pulseRhythm: homeopathysession.pulseRhythm,
		  pulseNote: homeopathysession.pulseNote,		  
		  physicalAppearance: homeopathysession.physicalAppearance,
		  physicalPalpationEpigastrium: homeopathysession.physicalPalpationEpigastrium,
		  physicalPalpationEpigastriumNote: homeopathysession.physicalPalpationEpigastriumNote,		  
		  physicalPalpationAbdomen: homeopathysession.physicalPalpationAbdomen,
		  physicalPalpationAcupoint: homeopathysession.physicalPalpationAcupoint,
		  rangeMotion: homeopathysession.rangeMotion,
		  painLevel: homeopathysession.painLevel,		  		  
		  physicalExaminationNote: homeopathysession.physicalExaminationNote,		  
		  HomeoDiagnosis: homeopathysession.HomeoDiagnosis,
		  principleTreatment: homeopathysession.principleTreatment,		  
		  materiaMedica: homeopathysession.materiaMedica,
		  potency: homeopathysession.potency,
		  dietTherapy: homeopathysession.dietTherapy,		  
		  recommendation: homeopathysession.recommendation,		  		  
		  createdOn: new Date(user.date),		  
		};
	  }


	render() {

		const { data, errors } = this.state;
		return (
			<React.Fragment>
				<div>
					<ol className="breadcrumb float-xl-right">
						<li className="breadcrumb-item"><Link to="/form/plugins">Home</Link></li>
						<li className="breadcrumb-item"><Link to="clinic/medicalfiles">Medical Files</Link></li>
						<li className="breadcrumb-item active">Add Homeosession</li>
					</ol>
					<h1 className="page-header">
						Add User <small>User-registration-form</small>
					</h1>

					<div className="row">
						<div className="col-xl-10">
							<Panel>
								<PanelHeader>Add User</PanelHeader>
								<PanelBody className="panel-form">
									<form className="form-horizontal form-bordered" onSubmit={this.handleSubmit} >

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="profile" >Select Account-type</label>
											<div className="col-lg-8">
												<select name="profile" id="profile" value={data.profile} onChange={this.handleChange} className="form-control" >
													<option value="">Select Account-type</option>
													{this.selectProfiles}
												</select>
											</div>
											{errors.profile && (<div className="alert alert-danger">{errors.profile}</div>)}
										</div>


										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="prefix" >Select Prefix</label>
											<div className="col-lg-8">
												<select name="prefix" id="prefix" value={data.prefix} onChange={this.handleChange} className="form-control" >
													<option value="">Select Prefix</option>
													{this.prefixoptions}
												</select>
											</div>
											{errors.prefix && (<div className="alert alert-danger">{errors.prefix}</div>)}
										</div>

										{this.renderInput(
											"firstName",
											"First Name",
											"text",
											"Enter Firstname"
										)}
										{this.renderInput(
											"initials",
											"Initials",
											"text",
											"Enter Initials"
										)}
										{this.renderInput(
											"lastName",
											"Last Name",
											"text",
											"Enter Lastname"
										)}
							

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="gender" >Select Gender</label>
											<div className="col-lg-8">
												<select name="gender" id="gender" value={data.gender} onChange={this.handleChange} className="form-control" >
													<option value="">Select Gender</option>
													{this.genderoptions}
												</select>
											</div>
											{errors.gender && (<div className="alert alert-danger">{errors.gender}</div>)}
										</div>


										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="username">UserName</label>
											<div className="col-lg-8">
												<div className="row row-space-10">
													<input type="text" id="username" name="username"
														value={data.username}
														className="form-control m-b-5"
														placeholder="Enter username"
														onChange={this.handleChange}
														autoFocus />
													{errors.username && (
														<div className="alert alert-danger">
															{errors.username}
														</div>
													)}
												</div>
											</div>
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="imageSrc">Avatar</label>
											<div className="col-lg-8">
												<div className="row row-space-10">
													<input type="file" id="imageSrc" name="imageSrc"
													
														className="form-control-file m-b-5"
														onChange={this.onChangeImgHandler}
													/>
													{errors.imageSrc && (
														<div className="alert alert-danger">
															{errors.imageSrc}
														</div>
													)}
												</div>
											</div>
										</div>

							
										{this.renderInput("email", "Email", "email", "Enter email")}
										{this.renderInput("password", "Password", "password", "Enter Password")}
									

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

export default withRouter(HomeopathySession);