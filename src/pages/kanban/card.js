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
import {saveCard,getCard} from './../../services/cards';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;


class Card extends Form {
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
			    name         : '',
				narrative    : '',	  
				category     : '',	  
				businessName : '',
				userID     : '',		  
				priority     : '',
				department   : '',
				subDepartment: '',	  
				locations    : '',	  
				cardNo       : '',		  
				createdOn    : new Date(),
				deadline     : '',	  
				documentNo   : '',	  
				field        : '',	  
				tags	     : '',	  
				cardReference    : '',	  	  
				sharingLink  : '',	  
				assignedTo   : '',	  
				sharedTo   	 : '',	  
				note     	 : '',	  				
				status   	 : '',	  				
			},
            selectedFile: null,
			errors: {}
		}

		this.categoryOptions = [
			{ value: 'bug-error', label: 'Bug/Error' },
			{ value: 'complaint', label: 'Complaint' },
			{ value: 'disconnection', label: 'Disconnection' },
			{ value: 'feature-request', label: 'Feature Request' },
			{ value: 'orders', label: 'orders' },
			{ value: 'sales', label: 'Sales' },
			{ value: 'other', label: 'Other' }
		];

		this.priorityOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'low', label: 'low' },
			{ value: 'high', label: 'high' },
			{ value: 'urgent', label: 'urgent' },
		];

		this.statusOptions = [
			{ value: 'in progress', label: 'In Progress' },
			{ value: 'pending', label: 'Pending' },
			{ value: 'new', label: 'New' },
			{ value: 'archive', label: 'Archive' }
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

	async populateCategory(){
		this.categoryoptions = this.categoryOptions.map(option => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	async populatePriority(){
    this.priorityoptions = this.priorityOptions.map(option => (
		<option key={option.label} value={option.value}>
			{option.value}
		</option>
	));
	}

	async populateStatus(){
    this.statusoptions = this.statusOptions.map(option => (
		<option key={option.label} value={option.value}>
			{option.value}
		</option>
	));
	}
	
	async populateCard() { 
		try {
		  const cardId = this.props.match.params.id;
		
		  if (cardId === "new") return;
	
		  const { data: card } = await getCard(cardId);

			 card.userID = card.userID;		  
			 card.name = card.name;
			 card.narrative = card.narrative;
			 card.category = card.category;
			 card.priority = card.priority;
			 card.field = card.field;
			 card.tag = card.tag;
			 card.department = card.department;
			 card.subDepartment = card.subDepartment;
			 card.locations   = card.locations;
			 card.createdOn = card.creadOn;
			 card.deadline = card.deadline;
			 card.note = card.note;
			 card.status = card.status;

		  this.setState({ data: this.mapToViewModel(card) });

		  console.log(this.state.data);
		} catch (ex) {
		  if (ex.response && ex.response.status === 404)
			this.props.history.replace("/error");
		}
	  }

	async componentDidMount() {
	
		await this.populateCategory();
		await this.populatePriority();
		await this.populateCard();
	}

schema = Joi.object({
		name: Joi.string(),
		userID: Joi.string(),
		businessName: Joi.any().optional(),
		narrative: Joi.string().optional(),
		priority: Joi.string().optional(),
		category: Joi.string().optional(),
		department: Joi.string().optional(),		
		subDepartment: Joi.string().optional(),				
		createdOn: Joi.date().optional(),
		deadline: Joi.date().optional(),
		locations: Joi.string().optional(),
		cardNo: Joi.string().optional(),
		documentNo: Joi.string().optional(),
		field: Joi.string().optional(),
		tags: Joi.string().optional(),
		cardReference: Joi.string().optional(),
		action: Joi.string().optional(),
		sharingLink: Joi.string().optional(),
		assignedTo: Joi.string().optional(),
		sharedTo: Joi.string().optional(),
		note: Joi.string().optional(),		
		status: Joi.string().optional(),			
	});


	handlecreatedOnChange = (e) => {
		const errors = { ...this.state.errors };
		const data = { ...this.state.data };
		data['createdOn'] = e;
		this.setState({ data });
		console.log(this.state.data);
	};

	handledeadlineChange = (e) => {
		const errors = { ...this.state.errors };
		const data = { ...this.state.data };
		data['deadline'] = e;
		this.setState({ data });
		console.log(this.state.data);
	};
	
	onChangeImgHandler=event=>{

		this.setState({ imageSrc: event.target.files[0] });
	  console.log(event.target.files[0]);
	
	}

	doSubmit = async (card) => {
	    try{
			console.log(this.state.data);
			await saveCard(this.state.data,this.state.imageSrc);
			this.props.history.push("/clinic/cards");
		}catch(ex){
			//if(ex.response && ex.response.status === 404){
			if(ex.response){
				const errors = {...this.state.errors};
				errors.cardname = ex.response.data;
				this.setState({errors});
				//console.log(this.state.errors);
			}
		}
		
	};
	
	makeCardNo() {
		let cardNumber = "CD-";
		const possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ2356789";
		for (let i = 0; i <= 5; i++) cardNumber += possible.charAt(Math.floor(Math.random() * possible.length));
		return cardNumber;
	}
	
	mapToViewModel(card) {
		return {
            _id: card._id,
            cardname	: card.cardname,            
            name		: card.name,
            narrative	: card.narrative,
            category	: card.category,
			businessName: card.businessName,
			priority	: card.priority,
            department	: card.department,
            subDepartment: card.subDepartment,  
            locations	: card.locations,
            cardNo	: card.cardNo,
            createdOn	: new Date(card.createdOn),			
            deadline	: new Date(card.deadline),			
            documentNo  : card.documentNo,
            field       : card.field,
            tags		: card.tags,			
            cardReference: card.cardReference,
            sharingLink : card.sharingLink,
            assignedTo  : card.assignedTo,
            sharedTo    : card.sharedTo,
            note        : card.note,			
            status      : card.status,     
		};
	  }

	render() {

		const { data, errors } = this.state;
		return (
			<React.Fragment>
				<div>
					<ol className="breadcrumb float-xl-right">
						<li className="breadcrumb-item"><Link to="/form/plugins">Home</Link></li>
						<li className="breadcrumb-item"><Link to="/clinic/cards">Cards</Link></li>
						<li className="breadcrumb-item active">Add Card</li>
					</ol>
					<h1 className="page-header">
						Add Card-Solo <small>Card-registration-form</small>
					</h1>

					<div className="row">
						<div className="col-xl-10">
							<Panel>
								<PanelHeader>Add Card</PanelHeader>
								<PanelBody className="panel-form">
									<form className="form-horizontal form-bordered" onSubmit={this.handleSubmit} >
 
									   {this.renderInput("name","Name of card","text","Enter Name/Title/subject for card")}
									   {this.renderInput("narrative","Narrative","text","* Tell your story/issue....")}                                    
                                           
									{/* <div className="form-group row">
										<label className="col-lg-4 col-form-label">Subscription Type</label>
										<div className="btn-group col-lg-8">
											<div className="btn btn-secondary active">
												<input type="radio" name="subscription" onChange={this.handleChange} value="Card"  checked={data.subscription === "Card" } />
												<label>Card</label>
											</div>
											<div className="btn btn-secondary">
												<input type="radio" name="subscription" onChange={this.handleChange} value="Solo" checked={data.subscription === "Solo" } />
												<label>SoloPractice</label>
											</div>
										</div>
										{errors.subscription && (<div className="alert alert-danger">{errors.subscription}</div>)}
									</div>  */}

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="priority" >Priority</label>
											<div className="col-lg-8">
												<select name="priority" id="priority" value={data.priority} onChange={this.handleChange} className="form-control" >
													<option value="">Select Priority</option>
													{this.priorityoptions}
												</select>
											</div>
											{errors.priority && (<div className="alert alert-danger">{errors.priority}</div>)}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="category" >Category</label>
											<div className="col-lg-8">
												<select name="category" id="category" value={data.category} onChange={this.handleChange} className="form-control" >
													<option value="">Select Category</option>
													{this.categoryoptions}
												</select>
											</div>
											{errors.category && (<div className="alert alert-danger">{errors.category}</div>)}
										</div>
										
										{this.renderInput("department","Department","text","Enter Department")} 
										{this.renderInput("subDepartment","Sub-Department","text","Enter Sub-department")}
										{this.renderInput("locations","Locations","text","Enter Locations")}
										{this.renderInput("documentNo","DocumentNo","text","Enter DocumentNo")}
										{this.renderInput("field","field","text","Enter field")} 
										{this.renderInput("tags","Tags","text","Enter Tags")}
										{this.renderInput("cardReference","References","text","Enter References")} 
										{this.renderInput("assignedTo","Assigned To","text","Enter Assignees")}
										{this.renderInput("sharedTo","Shared To","text","Enter Shared cards")} 
										
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="deadline" >Deadline</label>
											<div className="col-lg-8">
												<DatePicker
													onChange={this.handleDobChange}
													id={data.deadline}
													value={data.deadline}
													selected={data.deadline}
													inputProps={{ placeholder: "Datepicker" }}
													className="form-control"
												/>
												{errors.deadline && <div className="alert alert-danger">{errors.deadline}</div>}
											</div>
										</div>
										
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="imageSrc">Image</label>
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

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="status" >Status</label>
											<div className="col-lg-8">
												<select name="status" id="status" value={data.category} onChange={this.handleChange} className="form-control" >
													<option value="">Select Status</option>
													{this.statusoptions}
												</select>
											</div>
											{errors.category && (<div className="alert alert-danger">{errors.status}</div>)}
										</div>
										
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

export default withRouter(Card);