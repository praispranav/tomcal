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
import {savelistKanban,getlistKanban} from './../../services/listkanbans';

// Icons imports
import newIcon from "../../assets/Icons/new.svg";
import editIcon from "../../assets/Icons/edit.svg";
import trashIcon from "../../assets/Icons/trash.svg";
import csvIcon from "../../assets/Icons/csv.svg";
import xlsIcon from "../../assets/Icons/xls.svg";
import pdfIcon from "../../assets/Icons/pdf.svg";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;


class listKanban extends Form {
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
				username     : '',		  
				priority     : '',
				department   : '',
				subDepartment: '',	  
				locations    : '',	  
				kanbanNo     : '',		  
				createdOn    : new Date(),
				deadline     : '',	  
				documentNo   : '',	  
				kanbanReference    : '',	  	  
				status   	 : '',	  				
			},
            selectedFile: null,
			errors: {}
		}

		this.statusOptions = [
			{ value: 'active', label: 'Active' },		
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
	
	async populateKanban() { 
		try {
		  const kanbanId = this.props.match.params.id;
		
		  if (kanbanId === "new") return;
	
		  const { data: kanban } = await getKanban(kanbanId);

			 kanban.username = kanban.username;		  
			 kanban.name = kanban.name;
			 kanban.narrative = kanban.narrative;
			 kanban.priority = kanban.priority;
			 kanban.field = kanban.field;
			 kanban.tag = kanban.tag;
			 kanban.department = kanban.department;
			 kanban.subDepartment = kanban.subDepartment;
			 kanban.locations   = kanban.locations;
			 kanban.createdOn = kanban.creadOn;
			 kanban.deadline = kanban.deadline;
			 kanban.status = kanban.status;

		  this.setState({ data: this.mapToViewModel(kanban) });

		  console.log(this.state.data);
		} catch (ex) {
		  if (ex.response && ex.response.status === 404)
			this.props.history.replace("/error");
		}
	  }

	async componentDidMount() {
	
		await this.populateKanban();
	}

schema = Joi.object({
		name: Joi.string(),
		username: Joi.string(),
		narrative: Joi.string().optional(),

		deadline: Joi.date().optional(),
		locations: Joi.string().optional(),
		kanbanNo: Joi.string().optional(),
		createdOn: Joi.date().optional(),
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

	doSubmit = async (kanban) => {
	    try{
			console.log(this.state.data);
			await saveKanban(this.state.data,this.state.imageSrc);
			this.props.history.push("/clinic/kanbans");
		}catch(ex){
			//if(ex.response && ex.response.status === 404){
			if(ex.response){
				const errors = {...this.state.errors};
				errors.kanbanname = ex.response.data;
				this.setState({errors});
				//console.log(this.state.errors);
			}
		}
		
	};
	
	mapToViewModel(listKanban) {
		return {
            _id: listkanban._id,
            listkanbanNo	: kanban.No,            
            name		: kanban.name,
            narrative	: kanban.narrative,
            category	: kanban.category,
			businessName: kanban.businessName,
            kanbanNo	: kanban.kanbanNo,
            createdOn	: new Date(kanban.createdOn),						
            status      : kanban.status,     
		};
	  }

	render() {

		const { data, errors } = this.state;
		return (
			<React.Fragment>
				<div>
					<ol className="breadcrumb float-xl-right">
						<li className="breadcrumb-item"><Link to="/form/plugins">Home</Link></li>
						<li className="breadcrumb-item"><Link to="/clinic/kanbans">Kanbans</Link></li>
						<li className="breadcrumb-item active">Add Kanban</li>
					</ol>
					<h1 className="page-header">
						Add Kanban-Solo <small>Kanban-registration-form</small>
					</h1>

					<div className="row">
						<div className="col-xl-10">
							<Panel>
								<PanelHeader>Add Kanban</PanelHeader>
								<PanelBody className="panel-form">
									<form className="form-horizontal form-bordered" onSubmit={this.handleSubmit} >
 
									   {this.renderInput("name","Name of kanban","text","Enter Name/Title/subject for kanban")}
									   {this.renderInput("narrative","Narrative","text","* Tell your story/issue....")}                                    
                                           
									{/* <div className="form-group row">
										<label className="col-lg-4 col-form-label">Subscription Type</label>
										<div className="btn-group col-lg-8">
											<div className="btn btn-secondary active">
												<input type="radio" name="subscription" onChange={this.handleChange} value="Kanban"  checked={data.subscription === "Kanban" } />
												<label>Kanban</label>
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

export default withRouter(Kanban);