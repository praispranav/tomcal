import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";

class DoctorsTable extends Component {
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
			content: (doctor) => (
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
						value={doctor._id}
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
		{label: 'Doctorname',   path: 'doctors.username' } ,
		{label: 'Firstname',   path: 'doctors.contactName.first' } ,   
		{label: 'Initials',   path: 'doctors.contactName.initials' } ,   	  
		{label: 'Lastname',   path: 'doctors.contactName.last' } ,   	  
		{label: 'DOB',   path: 'doctors.dateBirth' } ,   	  
		{label: 'Gender',   path: 'doctors.gender' } ,   	  
		{label: 'Address1',   path: 'doctors.address1' } ,   
		{label: 'Address2',   path: 'doctors.address2' } ,   
		{label: 'Address3',   path: 'doctors.address3' } ,           
		{label: 'Zip',   path: 'doctors.zip' } ,   	  
		{label: 'City',   path: 'doctors.city' } ,   	      
		{label: 'State',   path: 'doctors.state' } ,   	          
		{label: 'Country',   path: 'doctors.country' } ,   	  	  
		{label: 'Linkedin',   path: 'linkedin' } ,       
		{label: 'Mobile',   path: 'phones.mobile' } ,   	  
		{label: 'Phone',   path: 'phones.phone' } ,   	  
		{label: 'Skype',   path: 'phones.skype' } , 
		{label: 'IBAN',   path: 'bankInfo.IBAN' } ,   
		{label: 'Bank',   path: 'bankInfo.bank' } ,   
		{label: 'Branch Bank',   path: 'bankInfo.branchOfBank' } ,   
		{label: 'Clinic',   path: 'clinicSolo' } ,   
		{label: 'Prim. InsuranceNo',   path: 'insurance.primInsuranceNo' } ,   	  
		{label: 'Prim. Insurance',   path: 'insurance.primInsurance' } ,   	  
		{label: 'Prim. Insurance Valid Till',   path: 'insurance.primInsuranceValidTill' } , 
		{label: 'Sec. InsuranceNo',   path: 'insurance.secInsuranceNo' } ,   	  
		{label: 'Sec. Insurance',   path: 'insurance.secInsurance' } ,   	  
		{label: 'Sec. Insurance Valid Till',   path: 'insurance.secInsuranceValidTill' } , 
		{label: 'ID-Paper',   path: 'idPaper' } ,   	  
		{label: 'ID-Paper Valid Till',   path: 'idPaperValidTill' } , 
		{label: 'HIPIO No',   path: 'healthcareProviderIdentifierOrganisation' } ,   	  
		{label: 'HIPII No',   path: 'healthcareProviderIdentifierIndividual' } ,   	  
		{label: 'Treatments',   path: 'treatments' } ,   	  	
		{label: 'LicenseNo',   path: 'licenseNo' } ,   	  
		{label: 'License Valid Till',   path: 'licenseValidTill' } ,   	      
		{label: 'OrganizationA Name',   path: 'organizationAName' } ,   	          
		{label: 'OrganizationA Member No',   path: 'organizationAMemberNo' } ,   	  	  
		{label: 'OrganizationB Name',   path: 'organizationBName' } ,   	          
		{label: 'OrganizationB Member No',   path: 'organizationBMemberNo' } ,   	  	  
	];

	render() {
		//console.log(this.columns) ;
		const { doctors, onSort, sortColumn } = this.props;
		return (
			<Table
				columns={this.columns}
				sortColumn={sortColumn}
				onSort={onSort}
				data={doctors}
			/>
		);
	}
}

export default DoctorsTable;
