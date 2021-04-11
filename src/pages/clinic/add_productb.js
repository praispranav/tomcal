import React from 'react';
import { Link } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from './../../components/panel/panel.jsx';
import { UncontrolledDropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import ReactTags from 'react-tag-autocomplete';
import DatePicker from 'react-datepicker';
import DateTime from 'react-datetime';
import Select from 'react-select';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'react-datetime/css/react-datetime.css';
import 'react-datepicker/dist/react-datepicker.css';


const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;

class AddClinicSolo extends React.Component {
	constructor(props) {
		super(props);
		
		var maxYesterday = '';
		var minYesterday = DateTime.moment().subtract(1, 'day');
		
		this.minDateRange = (current) => {
			return current.isAfter( minYesterday );
		};
		this.maxDateRange = (current) => {
			return current.isAfter( maxYesterday );
		};
		this.minDateChange = (value) => {
			this.setState({
				maxDateDisabled: false
			});
			maxYesterday = value;
		};
		this.handleChange = (date) => {
			this.setState({
				startDate: date
			});
		}
		this.state = {
			maxDateDisabled: true,
			startDate: new Date(),
		
			suggestions: [
				{ id: 3, name: 'Bananas' },
				{ id: 4, name: 'Mangos' },
				{ id: 5, name: 'Lemons' },
				{ id: 6, name: 'Apricots' }
			]
        }
		this.genderOptions = [
			{ value: 'female', label: 'Female' },
			{ value: 'male', label: 'Male' },
			{ value: 'transgender', label: 'Transgender' }
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
	}
	render() {
		return (
			<div>
				<ol className="breadcrumb float-xl-right">
					<li className="breadcrumb-item"><Link to="/form/plugins">Home</Link></li>
					<li className="breadcrumb-item"><Link to="/form/plugins">Products</Link></li>
					<li className="breadcrumb-item active">Add Product</li>
				</ol>
				<h1 className="page-header">Add Product<small>Product-form</small></h1>
				
				<div className="row">
					<div className="col-xl-10">
						<Panel>
							<PanelHeader>
								Add Product
							</PanelHeader>
							<PanelBody className="panel-form">
								<form className="form-horizontal form-bordered">
                                <div className="form-group row">
										<label className="col-lg-4 col-form-label">Name</label>
										<div className="col-lg-8">
											<div className="row row-space-10">
                                            <input type="text" className="form-control m-b-5" placeholder="Enter name" />
											</div>
										</div>
									</div>
									<div className="form-group row">
										<label className="col-lg-4 col-form-label">Description</label>
										<div className="col-lg-8">
											<div className="row row-space-10">
                                            <input type="text" className="form-control m-b-5" placeholder="Enter description" />
											</div>
										</div>
									</div>									
									<div className="form-group row">
										<label className="col-lg-4 col-form-label">Price</label>
										<div className="col-lg-8">
											<div className="row row-space-10">
                                            <input type="text" className="form-control m-b-5" placeholder="Enter Price" />
											</div>
										</div>
									</div>									

                                    <div className="form-group row">
										<label className="col-lg-4 col-form-label">SKU</label>
										<div className="col-lg-8">
											<div className="row row-space-10">
                                            <input type="text" className="form-control m-b-5" placeholder="Enter SKU" />
											</div>
										</div>
									</div>
									<div className="form-group row">
										<label className="col-lg-4 col-form-label">Default Date Time</label>
										<div className="col-lg-8">
											<DateTime inputProps={{ placeholder: 'Datepicker' }} closeOnSelect={true} />
										</div>
									</div>
								
                                    <div className="form-group row">
										<label className="col-lg-4 col-form-label">Date of Expiration</label>
										<div className="col-lg-8">
											<DatePicker selected={this.state.startDate} onChange={this.handleChange} className="form-control" />
										</div>
									</div>

								</form>
							</PanelBody>
						</Panel>
					
					</div>

				</div>
			</div>
		)
	}
}

export default AddClinicSolo;