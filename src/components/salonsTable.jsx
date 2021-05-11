import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";

class SalonsTable extends Component {
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
			content: (salon) => (
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
						value={salon._id}
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
		{label: 'Username',   path: 'salons.username' } ,	
		{label: 'email',   path: 'salons.email' } ,   
		{label: 'SalonNo',   path: 'salonSoloNo' } ,   
		{label: 'Salon',   path: 'companyInfo.businessName' } ,       
		{label: 'Firstname',   path: 'salons.contactName.first' } ,   
		{label: 'initials',   path: 'salons.contactName.initials' } ,   	  
		{label: 'Lastname',   path: 'salons.contactName.last' } ,   	  
		{label: 'DOB',   path: 'salons.dateBirth' } ,   	  
		{label: 'gender',   path: 'salons.gender' } ,   	  
		{label: 'Address 1',   path: 'salons.Address.address1' } ,   
		{label: 'Address 2',   path: 'salons.Address.address2' } ,   
		{label: 'Address 3',   path: 'salons.Address.address3' } ,           
		{label: 'zip',   path: 'salons.Address.zip' } ,   	  
		{label: 'city',   path: 'salons.Address.city' } ,   	      
		{label: 'State',   path: 'salons.Address.state' } ,   	          
		{label: 'Country',   path: 'salons.Address.country' } ,   	  	  
		{label: 'website',   path: 'website' } ,   
		{label: 'Linkedin',   path: 'linkedin' } ,       
		{label: 'mobile',   path: 'salons.phones.mobile' } ,   	  
		{label: 'phone',   path: 'salons.phones.phone' } ,   	  
		{label: 'skype',   path: 'salons.phones.skype' } , 
		{label: 'IBAN',   path: 'bankInfo.IBAN' } ,   
		{label: 'Bank',   path: 'bankInfo.bank' } ,   
		{label: 'Branch Bank',   path: 'bankInfo.branchOfBank' } ,   
		// {label: 'subscription',   path: 'subscription' } ,   	  
		// {label: 'subscriptionEndDate',   path: 'subscriptionEndDate' } ,   	  
		{label: 'ChamberCommerce No',   path: 'chamberCommerceNo' } ,   
		{label: 'TaxPayerNo',   path: 'taxPayerNo' } ,   
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
		const { salons, onSort, sortColumn } = this.props;
		return (
			<Table
				columns={this.columns}
				sortColumn={sortColumn}
				onSort={onSort}
				data={salons}
			/>
		);
	}
}

export default SalonsTable;