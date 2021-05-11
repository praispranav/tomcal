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

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'react-datetime/css/react-datetime.css';
import 'react-datepicker/dist/react-datepicker.css';
import Joi from 'joi';
import Form from '../../common/form.jsx';
import {apiUrl} from '../../config/config.json';
import http from '../../services/httpService';
import {saveAcupuncture,getAcupuncture} from './../../services/acupunctures';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;


class Acupuncture extends Form {
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
			profiles: [],
			data: {
				letter_1: '',
				letter_2: '',
				name: '',				
				pinyin: '',				
				english: '',
				korean: '',
				japanese: '',
				vietnamese: '',
				physicalLocation: '',
				meridian: '',
				city: '',
				state: '',				
				country: '',
				gender: '',
				prefix: '',
				phone: '',
				mobile: '',
				skype: '',				
				IBAN: '',
				bank: '',
				branchOfBank: '',
				primInsuranceNo: '',
				primInsurance: '',
				primInsuranceValidTill: '',
				secInsuranceNo: '',
				secInsurance: '',
				secInsuranceValidTill: '',
				healthcareProviderIdentifierOrganisation: '',
				healthcareProviderIdentifierIndividual: '',				
				treatments: '',
				licenseNo: '',
				licenseValidTill: '',
				organizationAName: '',
				organizationAMemberNo: '',				
				organizationBName: '',
			    organizationBMemberNo: '',				
				idPaper: '',
				idPaperValidTill: '',
				
			},
            selectedFile: null,
			errors: {}
		}

		this.meridianOptions = [
			{ value: 'mr', label: 'Mr.' },
			{ value: 'mrs', label: 'Mrs.' },
			{ value: 'mss', label: 'Mss.' },
			{ value: 'ms', label: 'Ms.' },
			{ value: 'prof', label: 'Prof.' },
			{ value: 'dr', label: 'Dr.' }
		];

		this.temperatureOptions = [
			{ value: 'verycool', label: 'Very Cool' },
			{ value: 'cool', label: 'Cool' },
			{ value: 'neutral', label: 'Neutral' },
			{ value: 'warm', label: 'Warm' },
			{ value: 'hot', label: 'Hot' },
			{ value: 'veryhot', label: 'Very Hot' }
		];
		
		this.fiveElementOptions = [
			{ value: 'mr', label: 'Mr.' },
			{ value: 'mrs', label: 'Mrs.' },
			{ value: 'mss', label: 'Mss.' },
			{ value: 'ms', label: 'Ms.' },
			{ value: 'prof', label: 'Prof.' },
			{ value: 'dr', label: 'Dr.' }
		];
		
		this.tongueOptions = [
			{  value: 'female', label: 'Female' },
			{  value: 'male', label: 'Male' },
			{  value: 'transgender', label: 'Transgender' }
		];

		this.pulseOptions = [
			{  value: 'female', label: 'Female' },
			{  value: 'male', label: 'Male' },
			{  value: 'transgender', label: 'Transgender' }
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


	async populateGenders(){
		this.genderoptions = this.genderOptions.map(option => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	async populatePrefix(){
    this.prefixoptions = this.prefixOptions.map(option => (
		<option key={option.label} value={option.value}>
			{option.value}
		</option>
	));
	}

	async populateUser() { 
		try {
		  const userId = this.props.match.params.id;
		
		  if (userId === "new") return;
	
		  const { data: user } = await getAcupuncture(userId);
            const acupuncture = user[0];
		    console.log(acupuncture);
		     
			acupuncture.firstName =acupuncture.contactName.first;
			acupuncture.lastName =acupuncture.contactName.last;
			acupuncture.initials =acupuncture.contactName.initials;
			// acupuncture.IBAN = acupuncture.bankInfo.IBAN;
			// acupuncture.bank = acupuncture.bankInfo.bank;
			// acupuncture.branchOfBank = acupuncture.bankInfo.branchOfBank;
			// acupuncture.healthcareProviderIdentifierOrganisation = acupuncture.professionalInfo.healthcareProviderIdentifierOrganisation;
			// acupuncture.healthcareProviderIdentifierIndividual = acupuncture.professionalInfo.healthcareProviderIdentifierIndividual;
			// acupuncture.treatments = acupuncture.professionalInfo.treatments;
			// acupuncture.licenseNo  = acupuncture.professionalInfo.licenseNo;
			// acupuncture.licenseValidTill = acupuncture.professionalInfo.licenseValidTill;
			// acupuncture.organizationAName = acupuncture.membership.organizationAName;
			// acupuncture.organizationAMemberNo = acupuncture.membership.organizationAMemberNo;
			// acupuncture.organizationBName =acupuncture.membership.organizationBName;
			// acupuncture.organizationBMemberNo =acupuncture.membership.organizationBMemberNo;
			// acupuncture.idPaper  =acupuncture.identification.idPaper;
			// acupuncture.idPaperValidTill =acupuncture.identification.idPaperValidTill;

		  this.setState({ data: this.mapToViewModel(acupuncture) });

		  console.log(this.state.data);
		} catch (ex) {
		  if (ex.response && ex.response.status === 404)
			this.props.history.replace("/error");
		}
	  }


	async componentDidMount() {
	
	
		//await this.populateProfiles();
		await this.populatePrefix();
		await this.populateGenders();
		await this.populateCountries();
		await this.populateUser();
	
	}


schema = Joi.object({
		username: Joi.string()
		firstName: Joi.string(),
		lastName: Joi.string(),
		initials: Joi.any().optional(),
		gender: Joi.string().optional(),
		prefix: Joi.string().optional(),
		address1: Joi.string().optional(),
		address2: Joi.any().optional(),		
		address3: Joi.any().optional(),		
		zip: Joi.any().optional(),
		city: Joi.any().optional(),		
		state: Joi.any().optional(),				
		country: Joi.string().optional(),
		IBAN: Joi.any().optional(),
		bank: Joi.any().optional(),
		primInsuranceNo: Joi.any().optional(),
		primInsurance: Joi.any().optional(),
		primInsuranceValidTill: Joi.any().optional(),
		secInsuranceNo: Joi.any().optional(),
		secInsurance: Joi.any().optional(),
		secInsuranceValidTill: Joi.any().optional(),
		branchOfBank: Joi.any().optional(),
		healthcareProviderIdentifierOrganisation: Joi.any().optional(),
		healthcareProviderIdentifierIndividual: Joi.any().optional(),  
		treatments: Joi.any().optional(),
		licenseNo: Joi.any().optional(),        				
		licenseValidTill: Joi.any().optional(),
		organizationAName: Joi.any().optional(),        				
		organizationAMemberNo: Joi.any().optional(),
		organizationBName: Joi.any().optional(),        				
		organizationBMemberNo: Joi.any().optional(),
		idPaper: Joi.any().optional(),        				
		idPaperValidTill: Joi.any().optional(),
			
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


	doSubmit = async (acupuncture) => {
		//console.log('working');
	    try{
			console.log(this.state.data);
			await saveAcupuncture(this.state.data,this.state.imageSrc);
			//console.log(this.state.data);
			this.props.history.push("/clinic/acupunctures");
		}catch(ex){
			//if(ex.response && ex.response.status === 404){
			if(ex.response){
				const errors = {...this.state.errors};
				//console.log(ex.response.data.split('"')[1]);
				const path = ex.response.data.split('"')[1];
				//errors.acupuncturename = ex.response.data;
				errors[path] = ex.response.data;
				this.setState({errors});
				//console.log(this.state.errors);
			}
		}
		
	};
	
	mapToViewModel(acupuncture) {
		return {
            _id: acupuncture._id,
            acupuncturename: acupuncture.acupuncturename,
            //profile: acupuncture.profile,
            email: acupuncture.email,
            firstName: acupuncture.firstName,
            lastName: acupuncture.lastName,
            initials: acupuncture.initials,
            prefix: acupuncture.prefix,
            address1: acupuncture.address1,
			address2: acupuncture.address2,
			address3: acupuncture.address3,
            country: acupuncture.country,
            gender: acupuncture.gender,  
            IBAN : acupuncture.IBAN,
            bank : acupuncture.bank,
            branchOfBank : acupuncture.branchOfBank,
			primInsuranceNo: acupuncture.primInsuranceNo,
			primInsurance: acupuncture.primInsurance,
			primInsuranceValidTill: acupuncture.primInsuranceValidTill,
			secInsuranceNo: acupuncture.secInsuranceNo,
			secInsurance: acupuncture.secInsurance,
			secInsuranceValidTill: acupuncture.secInsuranceValidTill,
            healthcareProviderIdentifierOrganisation : acupuncture.healthcareProviderIdentifierOrganisation,
            healthcareProviderIdentifierIndividual : acupuncture.healthcareProviderIdentifierIndividual,
            treatments : acupuncture.treatments,
            licenseNo  : acupuncture.licenseNo,
            licenseValidTill : acupuncture.licenseValidTill,
            organizationAName : acupuncture.organizationAName,
            organizationAMemberNo : acupuncture.organizationAMemberNo,
            organizationBName : acupuncture.organizationBName,
            organizationBMemberNo : acupuncture.organizationBMemberNo,
            idPaper  : acupuncture.idPaper,
            idPaperValidTill : acupuncture.idPaperValidTill,
     
		};
	  }


	render() {

		const { data, errors } = this.state;
		return (
			<React.Fragment>
				<div>
					<ol className="breadcrumb float-xl-right">
						<li className="breadcrumb-item"><Link to="/form/plugins">Home</Link></li>
						<li className="breadcrumb-item"><Link to="/form/plugins">Acupunctures</Link></li>
						<li className="breadcrumb-item active">Add Acupuncture</li>
					</ol>
					<h1 className="page-header">
						Add Acupuncture <small>Acupuncture-registration-form</small>
					</h1>

					<div className="row">
						<div className="col-xl-10">
							<Panel>
								<PanelHeader>Add Acupuncture</PanelHeader>
								<PanelBody className="panel-form">
									<form className="form-horizontal form-bordered" onSubmit={this.handleSubmit} >
 
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="prefix" >Prefix</label>
											<div className="col-lg-8">
												<select name="prefix" id="prefix" value={data.prefix} onChange={this.handleChange} className="form-control" >
													<option value="">Select Prefix</option>
													{this.prefixoptions}
												</select>
											</div>
											{errors.prefix && (<div className="alert alert-danger">{errors.prefix}</div>)}
										</div>

										{this.renderInput("firstName","First Name","text","* Enter Firstname")}
										{this.renderInput("initials","Initials","text","Enter Initials")}
										{this.renderInput("lastName","Last Name","text","* Enter Lastname")}
										
                                        {this.renderInput("address1","Address 1","text","Enter address1")} 
										{this.renderInput("address2","Address 2","text","Enter address2")} 
										{this.renderInput("address3","Address 3","text","Enter address3")}
										{this.renderInput("city","City","text","Enter City")}
										{this.renderInput("state","State","text","Enter State")}
										{this.renderInput("zip","Zip code","text","Enter zipcode")} 
										{this.renderSelect("country","Country",	this.state.countries)}										
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="gender" >Gender</label>
											<div className="col-lg-8">
												<select name="gender" id="gender" value={data.gender} onChange={this.handleChange} className="form-control" >
													<option value="">Select Gender</option>
													{this.genderoptions}
												</select>
											</div>
											{errors.gender && (<div className="alert alert-danger">{errors.gender}</div>)}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="dateBirth" >Date of Birth</label>
											<div className="col-lg-8">
												<DatePicker
													onChange={this.handleDobChange}
													id={data.dateBirth}
													value={data.dateBirth}
													selected={data.dateBirth}
													inputProps={{ placeholder: "Datepicker" }}
													className="form-control"
												/>
												{errors.dateBirth && <div className="alert alert-danger">{errors.dateBirth}</div>}
											</div>
										</div>
										
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="acupuncturename">UserName</label>
											<div className="col-lg-8">
												<div className="row row-space-10">
													<input type="text" id="acupuncturename" name="acupuncturename" value={data.acupuncturename}
														className="form-control m-b-5" placeholder="Enter acupuncturename"
														onChange={this.handleChange}
														autoFocus />
													{errors.acupuncturename && (
														<div className="alert alert-danger">
															{errors.acupuncturename}
														</div>
													)}
												</div>
											</div>
										</div>

										{this.renderInput("email", "Email", "email", "Enter email")}
										{this.renderInput("password", "Password", "password", "Enter Password")}
										
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

                                        {this.renderInput("bank","Bank","text","Enter Bank")} 
                                        {this.renderInput("branchOfBank","branch Of Bank","text","Enter branchOfBank")}
                                        {this.renderInput("IBAN","IBAN","text","Enter IBAN")}                                
                                        {this.renderInput("healthcareProviderIdentifierOrganisation","healthcare Provider Identifier Organisation","text","Enter healthcareProviderIdentifierOrganisation")} 
                                        {this.renderInput("healthcareProviderIdentifierIndividual","healthcare Provider Identifier Individual","text","Enter healthcareProviderIdentifierIndividual")} 
                                        {this.renderInput("treatments","Treatments","text","Enter treatments")} 
                                        {this.renderInput("licenseNo","license No","text","Enter licenseNo")} 
                                        {this.renderInput("licenseValidTill","license Valid Till","text","Enter licenseValidTill")} 
                                        {this.renderInput("organizationAName","organizationA Name","text","Enter organizationAName")} 
                                        {this.renderInput("organizationAMemberNo","organizationA Member No","text","Enter organizationAMemberNo")} 
                                        {this.renderInput("organizationBName","organizationB Name","text","Enter organizationBName")} 
                                        {this.renderInput("organizationBMemberNo","organizationB MemberNo","text","Enter organizationBMemberNo")}                         
                                        {this.renderInput("idPaper","ID-paper","text","Enter ID-Paper-type")} 

										<div className="form-group row">
											<div className="col-lg-8">
												<button	type="submit" disabled={this.validate()} className="btn btn-primary width-65">Submit</button>
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

export default withRouter(Acupuncture);