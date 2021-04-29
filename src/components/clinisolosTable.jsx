import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";

class ClinicsolosTable extends Component {
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
			content: (clinicsolo) => (
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
						value={clinicsolo._id}
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
		{label: 'Username',   path: 'clinics.username' } ,	
		{label: 'email',   path: 'clinics.email' } ,   
		{label: 'ClinicNo',   path: 'clinicSoloNo' } ,   
		{label: 'Clinic',   path: 'companyInfo.businessName' } ,       
		{label: 'Firstname',   path: 'clinics.contactName.first' } ,   
		{label: 'initials',   path: 'clinics.contactName.initials' } ,   	  
		{label: 'Lastname',   path: 'clinics.contactName.last' } ,   	  
		{label: 'DOB',   path: 'clinics.dateBirth' } ,   	  
		{label: 'gender',   path: 'clinics.gender' } ,   	  
		{label: 'Address 1',   path: 'clinics.Address.address1' } ,   
		{label: 'Address 2',   path: 'clinics.Address.address2' } ,   
		{label: 'Address 3',   path: 'clinics.Address.address3' } ,           
		{label: 'zip',   path: 'clinics.Address.zip' } ,   	  
		{label: 'city',   path: 'clinics.Address.city' } ,   	      
		{label: 'state',   path: 'clinics.Address.state' } ,   	          
		{label: 'Country',   path: 'clinics.Address.country' } ,   	  	  
		{label: 'website',   path: 'website' } ,   
		{label: 'Linkedin',   path: 'linkedin' } ,       
		{label: 'mobile',   path: 'clinics.phones.mobile' } ,   	  
		{label: 'phone',   path: 'clinics.phones.phone' } ,   	  
		{label: 'skype',   path: 'clinics.phones.skype' } , 
		{label: 'IBAN',   path: 'bankInfo.IBAN' } ,   
		{label: 'Bank',   path: 'bankInfo.bank' } ,   
		{label: 'Branch Bank',   path: 'bankInfo.branchOfBank' } ,   
		// {label: 'subscription',   path: 'subscription' } ,   	  
		// {label: 'subscriptionEndDate',   path: 'subscriptionEndDate' } ,   	  
		{label: 'HIPIO No',   path: 'healthcareProviderIdentifierOrganisation' } ,   	  
		{label: 'HIPII No',   path: 'healthcareProviderIdentifierIndividual' } ,   	  
		{label: 'ChamberCommerce No',   path: 'chamberCommerceNo' } ,   
		{label: 'TaxPayerNo',   path: 'taxPayerNo' } ,   
		{label: 'treatments',   path: 'treatments' } ,   
		{label: 'LicenseNo',   path: 'licenseNo' } ,   	  
		{label: 'License Valid Till',   path: 'licenseValidTill' } ,   	      
		{label: 'OrganizationA Name',   path: 'organizationAName' } ,   	          
		{label: 'OrganizationA Member No',   path: 'organizationAMemberNo' } ,   	  	  
		{label: 'OrganizationB Name',   path: 'organizationBName' } ,   	          
		{label: 'OrganizationB Member No',   path: 'organizationBMemberNo' } ,   	  	  
	];

	render() {
		//console.log(this.columns) ;
		const { clinicsolos, onSort, sortColumn } = this.props;
		return (
			<Table
				columns={this.columns}
				sortColumn={sortColumn}
				onSort={onSort}
				data={clinicsolos}
			/>
		);
	}
}

export default ClinicsolosTable;
