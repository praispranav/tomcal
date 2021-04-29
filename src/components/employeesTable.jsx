import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";

class EmployeesTable extends Component {
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
			content: (employee) => (
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
						value={employee._id}
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
		{label: 'Username',   path: 'employees.username' } ,
		{label: 'Firstname',   path: 'employees.contactName.first' } ,   
		{label: 'Initials',   path: 'employees.contactName.initials' } ,   	  
		{label: 'Lastname',   path: 'employees.contactName.last' } ,   	  
		{label: 'DOB',   path: 'employees.dateBirth' } ,   	  
		{label: 'Gender',   path: 'employees.gender' } ,   	  
		{label: 'Address1',   path: 'employees.address1' } ,   
		{label: 'Address2',   path: 'employees.address2' } ,   
		{label: 'Address3',   path: 'employees.address3' } ,           
		{label: 'Zip',   path: 'employees.zip' } ,   	  
		{label: 'City',   path: 'employees.city' } ,   	      
		{label: 'State',   path: 'employees.state' } ,   	          
		{label: 'Country',   path: 'employees.country' } ,   	  	  
		{label: 'Linkedin',   path: 'linkedin' } ,       
		{label: 'Mobile',   path: 'mobile' } ,   	  
		{label: 'Phone',   path: 'phone' } ,   	  
		{label: 'Skype',   path: 'skype' } , 
		{label: 'IBAN',   path: 'IBAN' } ,   
		{label: 'Bank',   path: 'bank' } ,   
		{label: 'Branch Bank',   path: 'branchOfBank' } ,   
		{label: 'Clinic',   path: 'clinicSolo' } ,   
		{label: 'Prim. InsuranceNo',   path: 'primInsuranceNo' } ,   	  
		{label: 'Prim. Insurance',   path: 'primInsurance' } ,   	  
		{label: 'Prim. Insurance Valid Till',   path: 'primInsuranceValidTill' } , 
		{label: 'Sec. InsuranceNo',   path: 'secInsuranceNo' } ,   	  
		{label: 'Sec. Insurance',   path: 'secInsurance' } ,   	  
		{label: 'Sec. Insurance Valid Till',   path: 'secInsuranceValidTill' } , 
		{label: 'ID-Paper',   path: 'idPaper' } ,   	  
		{label: 'ID-Paper Valid Till',   path: 'idPaperValidTill' } , 
		{label: 'Treatments',   path: 'treatments' } ,   	  	
		{label: 'LicenseNo',   path: 'licenseNo' } ,   	  
		{label: 'License Valid Till',   path: 'licenseValidTill' } ,   	      
	];

	render() {
		//console.log(this.columns) ;
		const { employees, onSort, sortColumn } = this.props;
		return (
			<Table
				columns={this.columns}
				sortColumn={sortColumn}
				onSort={onSort}
				data={employees}
			/>
		);
	}
}

export default EmployeesTable;
