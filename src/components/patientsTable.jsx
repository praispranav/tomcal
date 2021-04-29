import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";

class PatientsTable extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		values: [],
	// 	};
	// }

	columns = [
		//   {path: '_id', label: 'Id'},
		{
			key: "checkbox",
			label: (
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
			content: (patient) => (
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
						value={patient._id}
					/>
				</span>
			),
		},
		{
			key: "avatar",
			label: "avatar",
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
		{label: 'Username',   path: 'patients.username' } ,
		{label: 'firstname',   path: 'patients.contactName.first' } ,   
		{label: 'initials',   path: 'patients.contactName.initials' } ,   	  
		{label: 'lastname',   path: 'patients.contactName.last' } ,   	  
		{label: 'DOB',   path: 'patients.dateBirth' } ,   	  
		{label: 'gender',   path: 'patients.gender' } ,   	  
		{label: 'address1',   path: 'patients.address1' } ,   
		{label: 'address2',   path: 'patients.address2' } ,   
		{label: 'address3',   path: 'patients.address3' } ,           
		{label: 'zip',   path: 'patients.zip' } ,   	  
		{label: 'city',   path: 'patients.city' } ,   	      
		{label: 'state',   path: 'patients.state' } ,   	          
		{label: 'country',   path: 'patients.country' } ,   	  	  
		{label: 'website',   path: 'website' } , 
		{label: 'Linkedin',   path: 'linkedin' } ,       
		{label: 'mobile',   path: 'patients.phones.mobile' } ,   	  
		{label: 'phone',   path: 'patients.phones.phone' } ,   	  
		{label: 'skype',   path: 'patients.phones.skype' } , 
		{label: 'IBAN',   path: 'bankInfo.IBAN' } ,   
		{label: 'Bank',   path: 'bankInfo.bank' } ,   
		{label: 'Branch Bank',   path: 'bankInfo.branchOfBank' } ,   
		{label: 'Clinic',   path: 'clinicSolo' } ,   
		{label: 'primInsuranceNo',   path: 'insurance.primInsuranceNo' } ,   	  
		{label: 'primInsurance',   path: 'insurance.primInsurance' } ,   	  
		{label: 'primInsuranceValidTill',   path: 'insurance.primInsuranceValidTill' } , 
		{label: 'secInsuranceNo',   path: 'insurance.secInsuranceNo' } ,   	  
		{label: 'secInsurance',   path: 'insurance.secInsurance' } ,   	  
		{label: 'secInsuranceValidTill',   path: 'insurance.secInsuranceValidTill' } , 
		{label: 'idPaper',   path: 'idPaper' } ,   	  
		{label: 'idPaperValidTill',   path: 'idPaperValidTill' } , 
		{label: 'height',   path: 'height' } ,   	  
		{label: 'weight',   path: 'weight' } , 
		{label: 'BMI',   path: 'BMI' } ,   
	];

	render() {
		//console.log(this.columns) ;
		const { patients, onSort, sortColumn } = this.props;
		return (
			<Table
				columns={this.columns}
				sortColumn={sortColumn}
				onSort={onSort}
				data={patients}
			/>
		);
	}
}

export default PatientsTable;
