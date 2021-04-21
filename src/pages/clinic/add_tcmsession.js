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

class AddTCMSession extends React.Component {
	constructor(props) {
		super(props);
		
		
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

		this.priorityOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'low', label: 'low' },
			{ value: 'high', label: 'high' },
			{ value: 'urgent', label: 'urgent' },
		];

		this.family_disease_statusOptions = [
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
	}
	render() {
		return (
			<div>
				<ol className="breadcrumb float-xl-right">
					<li className="breadcrumb-item"><Link to="/form/plugins">Home</Link></li>
					<li className="breadcrumb-item"><Link to="/form/plugins">Users</Link></li>
					<li className="breadcrumb-item active">Add User</li>
				</ol>
				<h1 className="page-header">Add TCM-session <small>TCM-session-registration-form</small></h1>
				
				<div className="row">
					<div className="col-xl-10">
						<Panel>
							<PanelHeader>
								Add TCM-session
							</PanelHeader>
							<PanelBody className="panel-form">
								<form className="form-horizontal form-bordered">
									<div className="form-group row">
										<label className="col-lg-4 col-form-label">Name</label>
										<div className="col-lg-8">
											<div className="row row-space-10">
                                            <input type="text" className="form-control m-b-5" placeholder="Enter name of patient" />
											</div>
										</div>
									</div>
									<div className="form-group row">
										<label className="col-lg-4 col-form-label">Chief Complaint</label>
										<div className="col-lg-8">
											<div className="row row-space-10">
												<textarea className="form-control" rows="5" placeholder="Enter chief complaint"></textarea>											
											</div>
										</div>
									</div>									
									<div className="form-group row">
										<label className="col-lg-4 col-form-label">Symptoms</label>
										<div className="col-lg-8">
											<div className="row row-space-10">
												<textarea className="form-control" rows="5" placeholder="Enter chief complaint"></textarea>											
											</div>
										</div>
									</div>									
									<div className="form-group row">
										<label className="col-lg-4 col-form-label">Western Disease/Syndrome</label>
										<div className="col-lg-8">
											<div className="row row-space-10">
                                            <input type="text" className="form-control m-b-5" placeholder="Enter Western Disease/Syndrome" />
											</div>
										</div>
									</div>									

									<div className="form-group row m-b-10">
										<label className="col-md-3 col-form-label">Current Treatment</label>
										<div className="col-md-9">
											<div className="checkbox checkbox-css checkbox-inline">
												<input type="checkbox" value="ayurveda" id="currentTreatment1"/>
												<label htmlFor="currentTreatment1">Ayurveda</label>
											</div>
											<div className="checkbox checkbox-css checkbox-inline">
												<input type="checkbox" value="homeopathy" id="currentTreatment2" />
												<label htmlFor="currentTreatment2">Homeopathy</label>
											</div>
											<div className="checkbox checkbox-css checkbox-inline">
												<input type="checkbox" value="regular_conventional" id="currentTreatment3"/>
												<label htmlFor="currentTreatment3">Regular/Conventional</label>
											</div>
											<div className="checkbox checkbox-css checkbox-inline">
												<input type="checkbox" value="naturopratic" id="currentTreatment4" />
												<label htmlFor="currentTreatment4">Naturopractic</label>
											</div>
											<div className="checkbox checkbox-css checkbox-inline">
												<input type="checkbox" value="osteopathic" id="currentTreatment5"/>
												<label htmlFor="currentTreatment5">Osteopathic</label>
											</div>
											<div className="checkbox checkbox-css checkbox-inline">
												<input type="checkbox" value="shiatsu" id="currentTreatment6" />
												<label htmlFor="currentTreatment6">Shiatsu</label>
											</div>
											<div className="checkbox checkbox-css checkbox-inline">
												<input type="checkbox" value="reiki" id="currentTreatment7"/>
												<label htmlFor="currentTreatment7">Reiki</label>
											</div>
											<div className="checkbox checkbox-css checkbox-inline">
												<input type="checkbox" value="tuina" id="currentTreatment8" />
												<label htmlFor="currentTreatment8">Tuina</label>
											</div>
											<div className="checkbox checkbox-css checkbox-inline">
												<input type="checkbox" value="bach-flowers" id="currentTreatment9"/>
												<label htmlFor="currentTreatment9">Bach-flowers</label>
											</div>
											<div className="checkbox checkbox-css checkbox-inline">
												<input type="checkbox" value="other" id="currentTreatment10" />
												<label htmlFor="currentTreatment10">Other</label>
											</div>
										</div>

									</div>

                                	<div className="form-group row">
										<label className="col-lg-4 col-form-label">Diseases & Illnesses</label>
										<div className="col-lg-8">
											<div className="row row-space-10">
                                            <input type="text" className="form-control m-b-5" placeholder="Enter other Diseases & Illnesses" />
											</div>
										</div>
									</div>
                                	<div className="form-group row">
										<label className="col-lg-4 col-form-label">Surgeries</label>
										<div className="col-lg-8">
											<div className="row row-space-10">
                                            <input type="text" className="form-control m-b-5" placeholder="Enter surgeries" />
											</div>
										</div>
									</div>
                                	<div className="form-group row">
										<label className="col-lg-4 col-form-label">Medicaments & Supplements</label>
										<div className="col-lg-8">
											<div className="row row-space-10">
                                            <input type="text" className="form-control m-b-5" placeholder="Enter Medicaments & Supplements" />
											</div>
										</div>
									</div>

                                	<div className="form-group row">
										<label className="col-lg-4 col-form-label">Allergies</label>
										<div className="col-lg-8">
											<div className="row row-space-10">
                                            <input type="text" className="form-control m-b-5" placeholder="Enter allergies" />
											</div>
										</div>
									</div>
                                	<div className="form-group row">
										<label className="col-lg-4 col-form-label">Pregnancies</label>
										<div className="col-lg-8">
											<div className="row row-space-10">
                                            <input type="text" className="form-control m-b-5" placeholder="Enter Pregnancies" />
											</div>
										</div>
									</div>

                                	<div className="form-group row">
										<label className="col-lg-4 col-form-label">Note for Medical History</label>
										<div className="col-lg-8">
											<div className="row row-space-10">
                                            <input type="text" className="form-control m-b-5" placeholder="Enter Note for Medical History" />
											</div>
										</div>
									</div>


									
                                    <div className="form-group row">
										<label className="col-lg-4 col-form-label">Social Relationship</label>
										<div className="col-md-9">
											<div className="checkbox checkbox-css checkbox-inline">
												<input type="checkbox" value="single" id="socialRelationship1"/>
												<label htmlFor="socialRelationship1">Single</label>
											</div>
											<div className="checkbox checkbox-css checkbox-inline">
												<input type="checkbox" value="married" id="socialRelationship2" />
												<label htmlFor="socialRelationship2">Married</label>
											</div>
											<div className="checkbox checkbox-css checkbox-inline">
												<input type="checkbox" value="in relationship" id="socialRelationship3"/>
												<label htmlFor="socialRelationship3">In Relationship</label>
											</div>
											<div className="checkbox checkbox-css checkbox-inline">
												<input type="checkbox" value="divorced" id="socialRelationship4" />
												<label htmlFor="socialRelationship4">Divorced</label>
											</div>
											<div className="checkbox checkbox-css checkbox-inline">
												<input type="checkbox" value="widowed" id="socialRelationship5"/>
												<label htmlFor="socialRelationship5">Widowed</label>
											</div>
											<div className="checkbox checkbox-css checkbox-inline">
												<input type="checkbox" value="legally separated" id="currentTreatment6" />
												<label htmlFor="currentTreatment6">Legally separated</label>
											</div>
										</div>
									</div>

                                    <div className="form-group row">
										<label className="col-lg-4 col-form-label">Habits</label>
										<div className="col-md-9">
											<div className="checkbox checkbox-css checkbox-inline">
												<input type="checkbox" value="smoking" id="habits1"/>
												<label htmlFor="habits1">Smoking</label>
											</div>
											<div className="checkbox checkbox-css checkbox-inline">
												<input type="checkbox" value="alcohol" id="habits2" />
												<label htmlFor="habits2">Alcohol</label>
											</div>
											<div className="checkbox checkbox-css checkbox-inline">
												<input type="checkbox" value="coffee" id="habits3"/>
												<label htmlFor="habits3">Coffee</label>
											</div>
											<div className="checkbox checkbox-css checkbox-inline">
												<input type="checkbox" value="tea" id="habits4" />
												<label htmlFor="habits4">Tea</label>
											</div>
											<div className="checkbox checkbox-css checkbox-inline">
												<input type="checkbox" value="heroin" id="habits5"/>
												<label htmlFor="habits5">Heroin</label>
											</div>
											<div className="checkbox checkbox-css checkbox-inline">
												<input type="checkbox" value="sugar" id="currentTreatment6" />
												<label htmlFor="currentTreatment6">Sugar</label>
											</div>
											<div className="checkbox checkbox-css checkbox-inline">
												<input type="checkbox" value="heroin" id="currentTreatment6" />
												<label htmlFor="currentTreatment6">Heroin</label>
											</div>
										</div>
									</div>

                                    <div className="form-group row">
										<label className="col-lg-4 col-form-label">Profession</label>
										<div className="col-lg-8">
											<div className="row row-space-10">
                                            <input type="text" className="form-control m-b-5" placeholder="Enter Profession" />
											</div>
										</div>
									</div>

                                    <div className="form-group row">
										<label className="col-lg-4 col-form-label">Employment State</label>
										<div className="col-md-9">
											<div className="checkbox checkbox-css checkbox-inline">
												<input type="checkbox" value="fulltime" id="EmploymentState1"/>
												<label htmlFor="EmploymentState1">Fulltime</label>
											</div>
											<div className="checkbox checkbox-css checkbox-inline">
												<input type="checkbox" value="parttime" id="EmploymentState2" />
												<label htmlFor="EmploymentState2">Part-time</label>
											</div>
											<div className="checkbox checkbox-css checkbox-inline">
												<input type="checkbox" value="retired" id="EmploymentState3"/>
												<label htmlFor="EmploymentState3">Retired</label>
											</div>
											<div className="checkbox checkbox-css checkbox-inline">
												<input type="checkbox" value="freelance" id="EmploymentState4" />
												<label htmlFor="EmploymentState4">Freelance</label>
											</div>
											<div className="checkbox checkbox-css checkbox-inline">
												<input type="checkbox" value="unemployed" id="EmploymentState5"/>
												<label htmlFor="EmploymentState5">Unemployed</label>
											</div>
										</div>
									</div>
									
                                    <div className="form-group row">
										<label className="col-lg-4 col-form-label">Sport</label>
										<div className="col-lg-8">
											<div className="row row-space-10">
                                            <input type="text" className="form-control m-b-5" placeholder="Enter Sport" />
											</div>
										</div>
									</div>

                                    <div className="form-group row">
										<label className="col-lg-4 col-form-label">Sport-frequency</label>
										<div className="col-md-9">
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="sport-frequency1" value="never"  />
												<label htmlFor="sport-frequency1">Never</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="sport-frequency2" value="rare" />
												<label htmlFor="sport-frequency2">Rare</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="sport-frequency3" value="sometimes"  />
												<label htmlFor="sport-frequency3">Sometimes</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="sport-frequency4" value="regular" />
												<label htmlFor="sport-frequency4">Regular</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="sport-frequency5" value="very regular" />
												<label htmlFor="sport-frequency5">Very Regular</label>
											</div>
										</div>
									</div>

									<div className="form-group row">
										<label className="col-lg-4 col-form-label">Hobby</label>
										<div className="col-lg-8">
											<div className="row row-space-10">
												<textarea className="form-control" rows="5" placeholder="Enter hobby"></textarea>											
											</div>
										</div>
									</div>									



                                    <div className="form-group row">
										<label className="col-lg-4 col-form-label">Weight</label>
										<div className="col-lg-8">
											<div className="row row-space-10">
                                            <input type="number" className="form-control m-b-5" placeholder="Enter weight" />
											</div>
										</div>
									</div>

                                    <div className="form-group row">
										<label className="col-lg-4 col-form-label">Weight-unit</label>
										<div className="col-md-9">
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="weight-unit1" value="kg" defaultChecked />
												<label htmlFor="weight-unit1">kg</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="weight-unit2" value="lbs" />
												<label htmlFor="weight-unit2">lbs</label>
											</div>
										</div>
									</div>

                                    <div className="form-group row">
										<label className="col-lg-4 col-form-label">Height</label>
										<div className="col-lg-8">
											<div className="row row-space-10">
                                            <input type="number" className="form-control m-b-5" placeholder="Enter height" />
											</div>
										</div>
									</div>

                                    <div className="form-group row">
										<label className="col-lg-4 col-form-label">Height-unit</label>
										<div className="col-md-9">
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="height-unit1" value="cm" defaultChecked />
												<label htmlFor="weight-unit1">cm</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="height-unit2" value="inch" />
												<label htmlFor="weight-unit2">inch</label>
											</div>
										</div>
									</div>

                                    <div className="form-group row">
										<label className="col-lg-4 col-form-label">BMI</label>
										<div className="col-lg-8">
											<div className="row row-space-10">
                                            <input type="number" className="form-control m-b-5" placeholder="Enter BMI" />
											</div>
										</div>
									</div>

                                    <div className="form-group row">
										<label className="col-lg-4 col-form-label">Temperature</label>
										<div className="col-lg-8">
											<div className="row row-space-10">
                                            <input type="number" className="form-control m-b-5" placeholder="Enter Temperature" />
											</div>
										</div>
									</div>

                                    <div className="form-group row">
										<label className="col-lg-4 col-form-label">Temperature-unit</label>
										<div className="col-md-9">
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="temperature-unit1" value="Celsius" defaultChecked />
												<label htmlFor="temperature-unit1">Celsius</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="temperature-unit2" value="Fahrenheit" />
												<label htmlFor="temperature-unit2">Fahrenheit</label>
											</div>
										</div>
									</div>


                                    <div className="form-group row">
										<label className="col-lg-4 col-form-label">1. Thermal Feeling</label>
										<div className="col-md-9">
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="thermalfeeling1" value="normal" />
												<label htmlFor="thermalfeeling1">Normal</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="thermalfeeling2" value="chilly" />
												<label htmlFor="thermalfeeling2">Chilly</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="thermalfeeling3" value="hotflush"  />
												<label htmlFor="thermalfeeling3">Hotflush</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="thermalfeeling4" value="feverish" />
												<label htmlFor="thermalfeeling4">Feverish</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="thermalfeeling5" value="night sweating" />
												<label htmlFor="thermalfeeling5">Night Sweating</label>
											</div>
										</div>
									</div>

                                    <div className="form-group row">
										<label className="col-lg-4 col-form-label">2. Perspiration</label>
										<div className="col-md-9">
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="perspiration1" value="normal" />
												<label htmlFor="perspiration1">Normal</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="perspiration2" value="frequent" />
												<label htmlFor="perspiration2">Frequent</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="perspiration3" value="absent"  />
												<label htmlFor="perspiration3">Absent</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="perspiration4" value="feverish" />
												<label htmlFor="perspiration4">Profuse</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="perspiration5" value="night sweating" />
												<label htmlFor="perspiration5">Night Sweating</label>
											</div>
										</div>
									</div>

									<div className="form-group row">
										<label className="col-lg-4 col-form-label">3. Appetite</label>
										<div className="col-md-9">
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="appetite1" value="normal" />
												<label htmlFor="appetite1">Normal</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="appetite2" value="excess" />
												<label htmlFor="appetite2">Excess</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="appetite3" value="poor"  />
												<label htmlFor="appetite3">Poor</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="appetite4" value="craving" />
												<label htmlFor="appetite4">Craving</label>
											</div>
										</div>
									</div>
									<div className="form-group row">
										<label className="col-lg-4 col-form-label">Note for appetite</label>
										<div className="col-lg-8">
											<div className="row row-space-10">
												<textarea className="form-control" rows="5" placeholder="Enter note for appetite"></textarea>											
											</div>
										</div>
									</div>									

									<div className="form-group row">
										<label className="col-lg-4 col-form-label">4. Vomiting</label>
										<div className="col-md-9">
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="vomiting1" value="no" />
												<label htmlFor="vomiting1">No</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="vomiting2" value="yes" />
												<label htmlFor="vomiting2">Yes</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="vomiting3" value="yes with blood"  />
												<label htmlFor="vomiting3">Yes with blood</label>
											</div>
										</div>
									</div>
									<div className="form-group row">
										<label className="col-lg-4 col-form-label">Note for Vomiting</label>
										<div className="col-lg-8">
											<div className="row row-space-10">
												<textarea className="form-control" rows="5" placeholder="Enter note for vomiting"></textarea>											
											</div>
										</div>
									</div>									

									<div className="form-group row">
										<label className="col-lg-4 col-form-label">5. Diet</label>
										<div className="col-md-9">
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="diet1" value="no" />
												<label htmlFor="diet1">No</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="diet2" value="vegetarian" />
												<label htmlFor="diet2">vegetarian</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="diet3" value="bionic" />
												<label htmlFor="diet3">Bionic</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="diet4" value="with meat"  />
												<label htmlFor="diet4">With Meat</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="diet5" value="seafood"  />
												<label htmlFor="diet5">Seafood</label>
											</div>
										</div>
									</div>
									<div className="form-group row">
										<label className="col-lg-4 col-form-label">Note for Diet</label>
										<div className="col-lg-8">
											<div className="row row-space-10">
												<textarea className="form-control" rows="5" placeholder="Enter note for diet"></textarea>											
											</div>
										</div>
									</div>									

									<div className="form-group row">
										<label className="col-lg-4 col-form-label">6. Taste</label>
										<div className="col-md-9">
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="taste1" value="normal" />
												<label htmlFor="taste1">Normal</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="taste2" value="bitter" />
												<label htmlFor="taste2">Bitter</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="taste3" value="sweet"  />
												<label htmlFor="taste3">Sweet</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="taste4" value="greasy" />
												<label htmlFor="taste4">Greasy</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="taste5" value="bland" />
												<label htmlFor="taste5">Bland</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="taste6" value="acrid_pungent"  />
												<label htmlFor="taste6">Acrid/pungent</label>
											</div>
											
										</div>
									</div>
									<div className="form-group row">
										<label className="col-lg-4 col-form-label">Note for Taste</label>
										<div className="col-lg-8">
											<div className="row row-space-10">
												<textarea className="form-control" rows="5" placeholder="Enter note for taste"></textarea>											
											</div>
										</div>
									</div>									

									<div className="form-group row">
										<label className="col-lg-4 col-form-label">7. Thirst</label>
										<div className="col-md-9">
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="thirst1" value="normal" />
												<label htmlFor="thirst1">Normal</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="thirst2" value="excess" />
												<label htmlFor="thirst2">Excess</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="thirst3" value="little"  />
												<label htmlFor="thirst3">Little</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="thirst4" value="cold" />
												<label htmlFor="thirst4">Cold</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="thirst5" value="hot" />
												<label htmlFor="thirst5">Hot</label>
											</div>
										</div>
									</div>

									<div className="form-group row">
										<label className="col-lg-4 col-form-label">8. Defecation/Stool</label>
										<div className="col-md-9">
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="defecation1" value="normal" />
												<label htmlFor="defecation1">Normal</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="defecation2" value="diarrhea" />
												<label htmlFor="defecation2">Diarrhea</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="defecation3" value="constipated"  />
												<label htmlFor="defecation3">Constipated</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="defecation4" value="loose" />
												<label htmlFor="defecation4">Loose</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="defecation5" value="dry" />
												<label htmlFor="defecation5">Dry</label>
											</div>
										</div>
									</div>

									<div className="form-group row">
										<label className="col-lg-4 col-form-label">9. Urination</label>
										<div className="col-md-9">
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="urination1" value="normal" />
												<label htmlFor="urination1">Normal</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="urination2" value="scanty" />
												<label htmlFor="urination2">Scanty</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="urination3" value="difficult"  />
												<label htmlFor="urination3">Difficult</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="urination4" value="painful" />
												<label htmlFor="urination4">Painful</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="urination5" value="frequent" />
												<label htmlFor="urination5">Frequent</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="urination4" value="sometimes" />
												<label htmlFor="urination4">sometimes</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="urination5" value="frequent in the night" />
												<label htmlFor="urination5">Frequent in the night</label>
											</div>
										</div>
									</div>

									<div className="form-group row">
										<label className="col-lg-4 col-form-label">10. Urination-color</label>
										<div className="col-md-9">
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="urination-color1" value="normal" />
												<label htmlFor="urination-color1">Normal</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="urination-color2" value="yellow" />
												<label htmlFor="urination-color2">Yellow</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="urination-color3" value="dark yewllow"  />
												<label htmlFor="urination-color3">Dark Yellow</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="urination-color4" value="clearly" />
												<label htmlFor="urination-color4">Clearly</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="urination-color5" value="bloody" />
												<label htmlFor="urination-color5">Bloody</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="urination-color6" value="deep red or browish" />
												<label htmlFor="urination-color6">Deep red or browish</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="urination-color7" value="cloudy white" />
												<label htmlFor="urination-color7">Cloudy White</label>
											</div>
											<div className="radio radio-css radio-inline">
												<input type="radio" name="radio_css_inline" id="urination-color8" value="color of amber"  />
												<label htmlFor="urination-color8">Color of Amber</label>
											</div>
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

export default AddTCMSession;