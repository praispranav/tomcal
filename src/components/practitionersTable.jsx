import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";

class PractitionersTable extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		values: [],
	// 	};
	// }

	columns = [
		//   {path: '_id', practitioner: 'Id'},
		{
			key: "checkbox",
			practitioner: (
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
			content: (practitioner) => (
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
						value={practitioner._id}
					/>
				</span>
			),
		},
		{
			key: "avatar",
			practitioner: "avatar",
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
		{label: 'Username',   path: 'login' } ,
		{label: 'firstname',   path: 'firstName' } ,   
		{label: 'initials',   path: 'initials' } ,   	  
		{label: 'lastname',   path: 'lastName' } ,   	  
		{label: 'DOB',   path: 'dateBirth' } ,   	  
		{label: 'gender',   path: 'gender' } ,   	  
		{label: 'address1',   path: 'Address.address1' } ,   
		{label: 'address2',   path: 'Address.address2' } ,   
		{label: 'address3',   path: 'Address.address3' } ,           
		{label: 'zip',   path: 'Address.zip' } ,   	  
		{label: 'city',   path: 'Address.city' } ,   	      
		{label: 'state',   path: 'Address.state' } ,   	          
		{label: 'country',   path: 'Address.country' } ,   	  	  
		{label: 'website',   path: 'website' } , 
		{label: 'Linkedin',   path: 'linkedin' } ,       
		{label: 'mobile',   path: 'phones.mobile' } ,   	  
		{label: 'phone',   path: 'phones.phone' } ,   	  
		{label: 'skype',   path: 'phones.skype' } , 
		{label: 'IBAN',   path: 'bankInfo.IBAN' } ,   
		{label: 'Bank',   path: 'bankInfo.bank' } ,   
		{label: 'Branch Bank',   path: 'bankInfo.branchOfBank' } ,   
		{label: 'Nailsalon',   path: 'nailSalon' } ,   
		{label: 'primInsuranceNo',   path: 'insurance.primInsuranceNo' } ,   	  
		{label: 'primInsurance',   path: 'insurance.primInsurance' } ,   	  
		{label: 'primInsuranceValidTill',   path: 'insurance.primInsuranceValidTill' } , 
		{label: 'secInsuranceNo',   path: 'insurance.secInsuranceNo' } ,   	  
		{label: 'secInsurance',   path: 'insurance.secInsurance' } ,   	  
		{label: 'secInsuranceValidTill',   path: 'insurance.secInsuranceValidTill' } , 
		{label: 'idPaper',   path: 'idPaper' } ,   	  
		{label: 'idPaperValidTill',   path: 'idPaperValidTill' } , 
		{label: 'Skills',   path: 'skills' } ,     
    
	];

	render() {
		//console.log(this.columns) ;
		const { practitioners, onSort, sortColumn } = this.props;
		return (
			<Table
				columns={this.columns}
				sortColumn={sortColumn}
				onSort={onSort}
				data={practitioners}
			/>
		);
	}
}

export default PractitionersTable;
