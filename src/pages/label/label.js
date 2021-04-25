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
import {saveLabel,getLabel} from './../../services/labels';
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
				username: '',
				name: '',
				labelSize: '',
				fontSize: '',
				SKU: '',
				serial: '',
				countries: '',
				printerName: '',
				barcodeType: '',
				expiredOn: '',
				printedOn: '',
				copies: '',				
				orientation: '',								
				note: '',
			},
            selectedFile: null,
			errors: {}
		}

		this.labelSizeOptions = [
			{ value: '100mmx48mm', label: '100mm x 48mm' },
			{ value: '1.5inchx1', label: '1.5"x1' },
			{ value: '1inchx3', label: '1"x3' },
			{ value: '2inchx1', label: '2"x1' },
			{ value: '2-0.25inchx0.5', label: '2-1/4"x1/2' },
			{ value: '1-0.5inchx3-0.5', label: '1-0.5"x3-0.5' },
			{ value: '1-0.2inchx0.85', label: '1-0.2"x0.85' },
			{ value: '1.125inchx1.25', label: '1.125"x1.25' },
			{ value: '1-3/16inchx1', label: '1-3/16"x1' },
			{ value: '1.2inchx0.85', label: '1.2"x0.85' },
			{ value: '1-0.25inchx1', label: '1-0.25"x1' },
			{ value: '1-0.75inchx2-0.75', label: '1-0.75"x2-0.75' },
			{ value: '2.25inchx1.25-1', label: '2.25"x1.25-1' },			
			{ value: '2.25inchx1.25', label: '2.25"x1.25' },
			{ value: '2-0.25inchx1-0.25', label: '2-0.25"x1-0.25' },
			{ value: '3inchx1', label: '3"x1' },
			{ value: '3inchx2', label: '3"x2' },
			{ value: '4inchx1', label: '4"x1' },
			{ value: '4inchx2', label: '4"x2' },
			{ value: '4inchx2.5', label: '4"x2.5' },			
			{ value: '4inchx3', label: '4"x3' },			
			{ value: '4inchx4', label: '4"x4' },						
			{ value: '4inchx5', label: '4"x5' },
			{ value: '4inchx6', label: '4"x6' },			
			{ value: '4inchx6.5', label: '4"x6.5' },						
			{ value: '4inchx8', label: '4"x8' },			
			{ value: '4inchx13', label: '4"x13' },			
			{ value: '6inchx4', label: '6"x4' }			
		];

		this.barcodeTypeOptions = [
			{ value: 'UPC-E', label: 'UPC-E' },
			{ value: 'UPC-A', label: 'UPC-A' },
			{ value: 'UPC-Extension-2-Digits', label: 'UPC Extension 2 Digits' },			
			{ value: 'UPC-Extension-5-Digits', label: 'UPC Extension 5 Digits' },			
			{ value: 'JAN/EAN8', label: 'JAN/EAN8' },
			{ value: 'JAN/EAN13', label: 'JAN/EAN13' },
			{ value: 'JAN/EAN14', label: 'JAN/EAN14' },			
			{ value: 'Code39', label: 'Code39' },
			{ value: 'ITF', label: 'ITF' },
			{ value: 'Code128', label: 'Code128' },
			{ value: 'Code93', label: 'Code93' },
			{ value: 'EAN-128', label: 'UCC/EAN-128' },			
			{ value: 'ISBN', label: 'ISBN' },			
			{ value: 'ISMN', label: 'ISMN' },						
			{ value: 'ISSN', label: 'ISSN' },						
			{ value: 'Interaved-2of5', label: 'Interaved 2 of 5' },
			{ value: 'Standard-2of5', label: 'Standard 2 of 5' },
			{ value: 'NW-7', label: 'NW-7' },			
			{ value: 'MSIPlessey', label: 'MSI Plessey' },
			{ value: 'PostNet', label: 'PostNet' },		
			{ value: 'Pharmacode', label: 'Pharmacode' },
			{ value: 'DataMatrix', label: 'Data Matrix' },			
			{ value: 'Code32', label: ' Italian Pharmacode (Code 32)' }			
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

	async populatelabelSize(){
		this.labelSizeoptions = this.labelSizeOptions.map(option => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	async populatebarcodeType(){
    this.barcodeTypeoptions = this.barcodeTypeOptions.map(option => (
		<option key={option.label} value={option.value}>
			{option.value}
		</option>
	));
	}

	async populateLabel() { 
		try {
		  const LabelId = this.props.match.params.id;
		
		  if (LabelId === "new") return;
	
		  const { data: Label } = await getLabel(LabelId);
		     
			 Label.username = Label.username;
			 Label.name = Label.name;
			 Label.fontSize = Label.fontSize;
			 Label.labelSize = Label.labelSize;
			 Label.SKU = Label.SKU;
			 Label.serial = Label.serial;
			 Label.countries = Label.countries;			 
			 Label.barcodeType = Label.barcodeType;
			 Label.expiredOn = Label.expiredOn;
			 Label.printerName = Label.printerName;
			 Label.copies = Label.copies;
			 Label.orientation = Label.orientation;			 
			 Label.note = Label.note;
			 
		  this.setState({ data: this.mapToViewModel(Label) });

		  console.log(this.state.data);
		} catch (ex) {
		  if (ex.response && ex.response.status === 404)
			this.props.history.replace("/error");
		}
	  }

	async populateCountries() {
		const { data: countries } = await http.get(apiUrl+"/countries");
		this.setState({ countries: countries });
		//this.selectCountries = this.state.countries.map((country)=>({label: country.name, value: country.name}) );
		this.selectCountries = this.state.countries.map((country) => ({ _id: country._id,label: country.name, value: country.name }));
	}
	  
	async componentDidMount() {
	
		await this.populatelabelSize();
		await this.populatebarcodeType();
		await this.populateCountries();		
	}

	// schema = Joi.object({
	// 	username: Joi.string().required().label('Username')
	// 	//password: Joi.string().required().label('Password'),
	// 	//email:Joi.string().required().label('Email'),	
	// 	//gender:Joi.string().required().label('Gender'),
	// 	//country:Joi.string().required().label('Country')
	// });
schema = Joi.object({

		username : Joi.string().optional(),
		name     : Joi.string().optional(),		
		labelSize: Joi.string().optional(),
		fontSize : Joi.string().optional(),
		SKU   : Joi.string().optional(),
		serial: Joi.string().optional(),
		copies: Joi.string().optional(),
		countries: Joi.string().optional(),				
		printerName: Joi.string().optional(),		
		printedOn: Joi.date().optional(),		
		expiredOn: Joi.date().optional(),				
		barcodeType: Joi.string().optional(),				
		orientation: Joi.string().optional(),						
		note: Joi.string().optional(),		
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
	

	doSubmit = async (label) => {
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
	
	mapToViewModel(Label) {
		return {
            _id: Label._id,
            username: Label.username,
            name: Label.name,			
            labelSize: Label.labelSize,
            fontSize: Label.fontSize,
            SKU: Label.SKU,
            serial: Label.serial,
            countries: Label.countries,
            printerName: Label.printerName,						
            barcodeType: Label.barcodeType,			
            expiredOn: Date(Label.date),
            printedOn: new Date(Label.date),
            copies: Label.copies,			
            orientation: Label.orientation,						
            note: Label.note,  			
		};
	  }
		const { data, errors } = this.state;
		return (
			<React.Fragment>
				<div>
					<h1 className="page-header">
						Add Label <small>Label-registration-form</small>
					</h1>

					<div className="row">
						<div className="col-xl-10">
							<Panel>
								<PanelHeader>Add Label</PanelHeader>
								<PanelBody className="panel-form">
									<form className="form-horizontal form-bordered" onSubmit={this.handleSubmit} >

										{this.renderInput("printerName","Printer-Name","text","* Enter Name of Printer")}									
										{this.renderInput("name","Label-Name","text","* Enter Name for label")}
										
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="labelSize" >Label-Size</label>
											<div className="col-lg-8">
												<select name="labelSize" id="labelSize" onChange={this.handleChange} className="form-control" >
													<option value="">Select Label-Size</option>
													{this.labelSizeoptions}
												</select>
											</div>
											{errors.labelType && (<div className="alert alert-danger">{errors.labelSize}</div>)}
										</div>

										{this.renderInput("fontSize","Fontsize","number","* Enter Size for font")}
										
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="barcodeType" >Barcode Type</label>
											<div className="col-lg-8">
												<select name="barcodeType" id="barcodeType" onChange={this.handleChange} className="form-control" >
													<option value="">Select Barcode-Type</option>
													{this.barcodeTypeoptions}
												</select>
											</div>
											{errors.barcodeType && (<div className="alert alert-danger">{errors.barcodeType}</div>)}
										</div>
										
										{this.renderSelect("countries","MadeIn",this.state.countries)}
										
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="date" >Expired Date</label>
											<div className="col-lg-8">
												<DatePicker
													onChange={this.handleDobChange}
													id={data.expiredDate}
													value={data.expiredDate}
													selected={data.expiredDate}
													inputProps={{ placeholder: "Datepicker" }}
													className="form-control"
												/>
												{errors.date && <div className="alert alert-danger">{errors.date}</div>}
											</div>
										</div>

   								    <div className="form-group row">
										<label className="col-lg-4 col-form-label">Orientation</label>
										
										<div className="btn-group col-lg-8">
											<div className="custom-control custom-radio custom-control-inline">
												<input type="radio" name="orientation" id="customRadioInline1" class="custom-control-input"  onChange={this.handleChange} value="landscape"  checked={data.orientation === "landscape"  checked} />
												<label class="custom-control-label" for="customRadioInline1"> Landscape</label>
											</div>
											<div className="custom-control custom-radio custom-control-inline">
												<input type="radio" name="orientation" id="customRadioInline2" class="custom-control-input" onChange={this.handleChange} value="portrait" checked={data.orientation === "portrait" } />
												<label class="custom-control-label" for="customRadioInline2"> Portrait</label>
											</div>
										</div>
										{errors.orientation && (<div className="alert alert-danger">{errors.orientation}</div>)}
									</div>  
										
										
										<div className="form-group row">
											<label className="col-lg-4 col-form-label">Note</label>
											<div className="col-lg-8">
												<div className="row row-space-5">
												<input type="textarea" className="form-control m-b-5" placeholder="Enter Note" />
												</div>
											</div>
										</div>
										
										{this.renderInput("copies","copies","number","Enter copies")}
										
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

export default withRouter(Label);