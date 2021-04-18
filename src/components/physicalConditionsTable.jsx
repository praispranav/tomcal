import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";

class PhysicalConditionsTable extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		values: [],
	// 	};
	// }

	columns = [
		//   {path: '_id', physicalCondition: 'Id'},
		{
			key: "checkbox",
			physicalCondition: (
				<input
					type="check"
					style={{
						width: "15px",
						height: "15px",
						marginTop: "0.4rem",
						borderRadius: 0,
					}}
				/>
			),
			content: (physicalCondition) => (
				<span className="icon-img sm-r-5" style={{ marginTop: "15px" }}>
					<input
						type="checkbox"
						style={{
							width: "15px",
							height: "15px",
							marginTop: "0.4rem",
							borderRadius: 0,
						}}
						onChange={this.props.handleCheckboxChange}
						value={physicalCondition._id}
					/>
				</span>
			),
		},
		{
			key: "avatar",
			physicalCondition: "avatar",
			content: (user) => (
				<span className="icon-img sm-r-5">
					<img
						style={{ width: "30px", height: "30px", borderRadius: "50%" }}
						src={user.imageSrc}
						alt=""
					/>
				</span>
			),
		},
		{label: 'Username',   path: 'username' } ,
		{label: 'SessionNo',   path: 'sessionNoe' } ,   	  
		{label: 'date',   path: 'date' } ,   	  
		{label: 'Time',   path: 'Time' } ,   	  
		{label: 'age',   path: 'age' } ,   	  
		{label: 'ethnicity',   path: 'ethnicity' } ,   
		{label: 'DOB',   path: 'dayBirth' } ,   
		{label: 'cityOfBirth',   path: 'cityOfBirth' } ,           
		{label: 'weight',   path: 'weight' } ,   	  
		{label: 'weightUnit',   path: 'weightUnit' } ,   	      
		{label: 'height',   path: 'height' } ,   	          
		{label: 'heightUnit',   path: 'heightUnit' } ,   	  	  
		{label: 'BMI',   path: 'BMI' } , 
		{label: 'BMICategory',   path: 'BMICategory' } ,       
		{label: 'temperature',   path: 'temperature' } ,   	  
		{label: 'temperatureUnit',   path: 'temperatureUnit' } ,   	  
		{label: 'bloodPressure',   path: 'bloodPressure' } , 
		{label: 'bloodGroupe',   path: 'bloodGroupe' } ,   
		{label: 'bloodGlucoseLevel',   path: 'bloodGlucoseLevel' } ,   	  
		{label: 'heartBeat',   path: 'heartBeat' } ,   	  
		{label: 'oxygenSaturation',   path: 'oxygenSaturation' } ,   	  
		{label: 'RedBloodCell',   path: 'RedBloodCell' } , 
		{label: 'WhiteBloodCell',   path: 'WhiteBloodCell' } ,   	  
		{label: 'Hgb',   path: 'Hgb' } ,   	  
		{label: 'GSR',   path: 'GSR' } , 
		{label: 'GSP',   path: 'GSP' } ,   	  
		{label: 'leftEyeSpherical',   path: 'leftEyeSpherical' } , 
		{label: 'rightEyeSpherical',   path: 'rightEyeSpherical' } ,   	  
		{label: 'systolicBoodPressureNo',   path: 'systolicBoodPressureNo' } , 
		{label: 'diastolicBloodPressureNo',   path: 'diastolicBloodPressureNo' } 
    
	];

	render() {
		//console.log(this.columns) ;
		const { physicalConditions, onSort, sortColumn } = this.props;
		return (
			<Table
				columns={this.columns}
				sortColumn={sortColumn}
				onSort={onSort}
				data={physicalConditions}
			/>
		);
	}
}

export default PhysicalConditionsTable;
