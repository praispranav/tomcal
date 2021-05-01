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
import {saveListKanban,getListKanban} from './../../services/listkanbans';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;


class ListKanban extends Form {
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
				participants : '',	  
				username     : '',		  
				kanbanNo     : '',		  
				createdOn    : new Date(),				
				status   	 : '',	  				
			},
            selectedFile: null,
			errors: {}
		}

		this.statusOptions = [
			{ value: 'active', label: 'Active' },
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
	

	populateStatus(){
    this.statusOptions = this.statusOptions.map(option => (
		<option key={option.label} value={option.value}>
			{option.value}
		</option>
	));
	}

	async populateListKanban() { 
		try {
		  const listkanbanId = this.props.match.params.id;
		
		  if (listkanbanId === "new") return;
	
		  const { data: listkanban } = await getListKanban(listkanbanId);

			 listkanban.username = listkanban.username;		  
			 listkanban.name = listkanban.name;
			 listkanban.participants = listkanban.participants;
			 listkanban.narrative = listkanban.narrative;
			 listkanban.businessName = listkanban.businessName;			 
			 listkanban.department = listkanban.department;
			 listkanban.subDepartment = listkanban.subDepartment;
			 listkanban.locations   = listkanban.locations;
			 listkanban.field = listkanban.field;
			 listkanban.tag = listkanban.tag;
			 listkanban.color = listkanban.color;			 
//			 listkanban.sharingLink  = listkanban.sharingLink;
//			 listkanban.sharedTo = listkanban.sharedTo;
			 listkanban.createdOn = listkanban.creadOn;			 
			 listkanban.status = listkanban.status;

		  this.setState({ data: this.mapToViewModel(listkanban) });

		  console.log(this.state.data);
		} catch (ex) {
		  if (ex.response && ex.response.status === 404)
			this.props.history.replace("/error");
		}
	  }

	async componentDidMount() {
	
		await this.populateCategory();
		await this.populatePriority();
		await this.populateListKanban();
	}

schema = Joi.object({
		name: Joi.string(),
		username: Joi.string(),
		narrative: Joi.string().optional(),
		businessName: Joi.any().optional(),		
		department: Joi.string().optional(),		
		subDepartment: Joi.string().optional(),				
		createdOn: Joi.date().optional(),
		deadline: Joi.date().optional(),
		locations: Joi.string().optional(),
		listkanbanNo: Joi.string().optional(),
		documentNo: Joi.string().optional(),
		field: Joi.string().optional(),
		tags: Joi.string().optional(),
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

	doSubmit = async (listkanban) => {
	    try{
			console.log(this.state.data);
			await saveListKanban(this.state.data,this.state.imageSrc);
			this.props.history.push("/clinic/listkanbans");
		}catch(ex){
			//if(ex.response && ex.response.status === 404){
			if(ex.response){
				const errors = {...this.state.errors};
				errors.listkanbanname = ex.response.data;
				this.setState({errors});
				//console.log(this.state.errors);
			}
		}
		
	};

	makelistKanbanNo() {
		let listKanbanNumber = "LK-";
		const possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ2356789";
		for (let i = 0; i <= 5; i++) listKanbanNumber += possible.charAt(Math.floor(Math.random() * possible.length));
		return listKanbanNumber;
	}
	
	mapToViewModel(listkanban) {
		return {
            _id: listkanban._id,
            listkanbanName	: listkanban.listkanbanName,            
            name		: listkanban.name,
            narrative	: listkanban.narrative,
            category	: listkanban.category,
            message		: listkanban.message,
            comment		: listkanban.comment,
            reply		: listkanban.reply,
			businessName: listkanban.businessName,
			priority	: listkanban.priority,
            department	: listkanban.department,
            subDepartment: listkanban.subDepartment,  
            locations	: listkanban.locations,
            listkanbanNo	: listkanban.listkanbanNo,
            createdOn	: new Date(listkanban.createdOn),			
            deadline	: new Date(listkanban.deadline),			
            documentNo  : listkanban.documentNo,
            field       : listkanban.field,
            tags		: listkanban.tags,			
            color       : listkanban.color,
            listkanbanReference: listkanban.listkanbanReference,
            sharingLink : listkanban.sharingLink,
            assignedTo  : listkanban.assignedTo,
            sharedTo    : listkanban.sharedTo,
            status      : listkanban.status,     
		};
	  }

	render() {

		const { data, errors } = this.state;
		return (
			<React.Fragment>
				<div>
					<ol className="breadcrumb float-xl-right">
						<li className="breadcrumb-item"><Link to="/form/plugins">Home</Link></li>
						<li className="breadcrumb-item"><Link to="/kanban/listkanbans">ListKanbans</Link></li>
						<li className="breadcrumb-item active">Add ListKanban</li>
					</ol>
					<h1 className="page-header">
						Add ListKanban-Solo <small>ListKanban-registration-form</small>
					</h1>

					<div className="row">
						<div className="col-xl-10">
							<Panel>
								<PanelHeader>Add ListKanban</PanelHeader>
								<PanelBody className="panel-form">
									<form className="form-horizontal form-bordered" onSubmit={this.handleSubmit} >
 
									   {this.renderInput("name","Name of kanban","text","Enter Name/Title/subject for kanban")}
									   {this.renderInput("narrative","Narrative","text","* Tell your story/issue....")}                                    
                                           
									{/* <div className="form-group row">
										<label className="col-lg-4 col-form-label">Subscription Type</label>
										<div className="btn-group col-lg-8">
											<div className="btn btn-secondary active">
												<input type="radio" name="subscription" onChange={this.handleChange} value="ListKanban"  checked={data.subscription === "ListKanban" } />
												<label>ListKanban</label>
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
										{this.renderInput("kanbanReference","References","text","Enter References")} 
										{this.renderInput("assignedTo","Assigned To","text","Enter Assignees")}
										{this.renderInput("sharedTo","Shared To","text","Enter Shared kanbans")} 
										
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
{/*
									<div className="form-group row">
										<label className="col-lg-4 col-form-label">Chrome Type Colorpicker</label>
										<div className="col-lg-8">
											<UncontrolledDropdown>
												<div className="input-group">
													<input type="text" className="form-control bg-white" readOnly value={this.state.chromeBackgroundColor} />
													<span className="input-group-append">
														<span className="input-group-text">
															<DropdownToggle className="p-0 border-0">
																<i style={{width: '16px', height: '16px', display: 'block', background: this.state.chromeBackgroundColor}}></i>
															</DropdownToggle>
														</span>
													</span>
												</div>
												<DropdownMenu>
													<ChromePicker color={ this.state.chromeBackgroundColor } onChangeComplete={ this.handleChromeChangeComplete } />
												</DropdownMenu> 
											</UncontrolledDropdown>
										</div>
									</div>  */}
										
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

export default withRouter(ListKanban);