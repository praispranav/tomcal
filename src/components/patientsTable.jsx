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
		{label: 'address1',   path: 'patients.Address.address1' } ,   
		{label: 'address2',   path: 'patients.Address.address2' } ,   
		{label: 'address3',   path: 'patients.Address.address3' } ,           
		{label: 'zip',   path: 'patients.Address.zip' } ,   	  
		{label: 'city',   path: 'patients.Address.city' } ,   	      
		{label: 'state',   path: 'patients.Address.state' } ,   	          
		{label: 'country',   path: 'patients.Address.country' } ,   	  	  
		{label: 'website',   path: 'patients.website' } , 
		{label: 'Linkedin',   path: 'patients.linkedin' } ,       
		{label: 'mobile',   path: 'patients.phones.mobile' } ,   	  
		{label: 'phone',   path: 'patients.phones.phone' } ,   	  
		{label: 'skype',   path: 'patients.phones.skype' } , 
		{label: 'IBAN',   path: 'patients.bankInfo.IBAN' } ,   
		{label: 'Bank',   path: 'patients.bankInfo.bank' } ,   
		{label: 'Branch Bank',   path: 'patients.bankInfo.branchOfBank' } ,   
		{label: 'Clinic',   path: 'clinicSolo' } ,   
		{label: 'primInsuranceNo',   path: 'patients.insurance.primInsuranceNo' } ,   	  
		{label: 'primInsurance',   path: 'patients.insurance.primInsurance' } ,   	  
		{label: 'primInsuranceValidTill',   path: 'patients.insurance.primInsuranceValidTill' } , 
		{label: 'secInsuranceNo',   path: 'patients.insurance.secInsuranceNo' } ,   	  
		{label: 'secInsurance',   path: 'patients.insurance.secInsurance' } ,   	  
		{label: 'secInsuranceValidTill',   path: 'patients.insurance.secInsuranceValidTill' } , 
		{label: 'idPaper',   path: 'patients.identification.idPaper' } ,   	  
		{label: 'idPaperValidTill',   path: 'patients.identification.idPaperValidTill' } , 
		{label: 'height',   path: 'patients.height' } ,   	  
		{label: 'weight',   path: 'patients.weight' } , 
		{label: 'BMI',   path: 'patients.BMI' } ,   
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
