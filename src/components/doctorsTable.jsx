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
		{label: 'Address1',   path: 'doctors.Address.address1' } ,   
		{label: 'Address2',   path: 'doctors.Address.address2' } ,   
		{label: 'Address3',   path: 'doctors.Address.address3' } ,           
		{label: 'Zip',   path: 'doctors.Address.zip' } ,   	  
		{label: 'City',   path: 'doctors.Address.city' } ,   	      
		{label: 'State',   path: 'doctors.Address.state' } ,   	          
		{label: 'Country',   path: 'doctors.Address.country' } ,   	  	  
		{label: 'Linkedin',   path: 'doctors.linkedin' } ,       
		{label: 'Mobile',   path: 'doctors.phones.mobile' } ,   	  
		{label: 'Phone',   path: 'doctors.phones.phone' } ,   	  
		{label: 'Skype',   path: 'doctors.phones.skype' } , 
		{label: 'IBAN',   path: 'doctors.bankInfo.IBAN' } ,   
		{label: 'Bank',   path: 'doctors.bankInfo.bank' } ,   
		{label: 'Branch Bank',   path: 'doctors.bankInfo.branchOfBank' } ,   
		{label: 'Clinic',   path: 'clinicSolo' } ,   
		{label: 'Prim. InsuranceNo',   path: 'doctors.insurance.primInsuranceNo' } ,   	  
		{label: 'Prim. Insurance',   path: 'doctors.insurance.primInsurance' } ,   	  
		{label: 'Prim. Insurance Valid Till',   path: 'doctors.insurance.primInsuranceValidTill' } , 
		{label: 'Sec. InsuranceNo',   path: 'doctors.insurance.secInsuranceNo' } ,   	  
		{label: 'Sec. Insurance',   path: 'doctors.insurance.secInsurance' } ,   	  
		{label: 'Sec. Insurance Valid Till',   path: 'doctors.insurance.secInsuranceValidTill' } , 
		{label: 'ID-Paper',   path: 'doctors.identification.idPaper' } ,   	  
		{label: 'ID-Paper Valid Till',   path: 'doctors.identification.idPaperValidTill' } , 
		{label: 'HIPIO No',   path: 'doctors.healthcareProviderIdentifierOrganisation' } ,   	  
		{label: 'HIPII No',   path: 'doctors.healthcareProviderIdentifierIndividual' } ,   	  
		{label: 'Treatments',   path: 'doctors.treatments' } ,   	  	
		{label: 'LicenseNo',   path: 'doctors.licenseNo' } ,   	  
		{label: 'License Valid Till',   path: 'doctors.licenseValidTill' } ,   	      
		{label: 'OrganizationA Name',   path: 'doctors.organizationAName' } ,   	          
		{label: 'OrganizationA Member No',   path: 'doctors.organizationAMemberNo' } ,   	  	  
		{label: 'OrganizationB Name',   path: 'doctors.organizationBName' } ,   	          
		{label: 'OrganizationB Member No',   path: 'doctors.organizationBMemberNo' } ,   	  	  
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
