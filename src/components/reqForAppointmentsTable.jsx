import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";

class ReqforappointmentsTable extends Component {
	columns = [
		//   {path: '_id', reqforappointment: 'Id'},
		{
			key: "checkbox",
			reqforappointment: (
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
			content: (reqforappointment) => (
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
						value={reqforappointment._id}
					/>
				</span>
			),
		},
	/* 	{
			key: "avatar",
			reqforappointment: "avatar",
			content: (user) => (
				<span className="icon-img sm-r-5">
					<img style={{ width: "30px", height: "30px", borderRadius: "50%" }} src={user.imageSrc} alt="" />
				</span>
			),
		}, */
		{ label: "Username", path: "patientUser.username" },
		{
			key: "avatar",
			label: "avatar",
			content: (user) => (
				<span className="icon-img">
					<img src={user.imageSrc} alt="" />
				</span>
			),
		},
		// {label: 'Username',   path: 'patientUser.username' } ,
		{label: 'email',   path: 'patientUser.email' } ,   
		{label: 'Firstname',   path: 'patientUser.contactName.first' } ,   
		 {label: 'initials',   path: 'patientUser.contactName.initials' } ,   	  
		{label: 'Lastname',   path: 'patientUser.contactName.last' } ,   	  
		{label: 'DOB',   path: 'patientUser.dateBirth' } ,   	  
		 {label: 'Mobile',   path: 'patientUser.phones.mobile' } ,   	  
		{label: 'Phone',   path: 'patientUser.phones.phone' } ,   	  
		{ label: "gender", path: "patientUser.gender" },
		{ label: "Complaint", path: "complaint" },
		{ label: "Date", path: "date" },
		{ label: "PreferStartTime", path: "preferStartTime" },
		{ label: "PreferEndtime", path: "preferEndTime" },
		{ label: "Clinic", path: "clinicNo.companyInfo.businessName" },
		{ label: "doctor", path: "doctorUser.contactName.last" },		
		{ label: "appointmentType", path: "appointmentType" },
		{ label: "sessionType", path: "sessionType" },
		{ label: "Patient-note", path: "notePatient" },
		{ label: "Note", path: "note" },
		{ label: "Status", path: "status" },		
	];

	render() {
		//console.log(this.columns) ;
		const { reqforappointments, onSort, sortColumn } = this.props;
		return <Table columns={this.columns} sortColumn={sortColumn} onSort={onSort} data={reqforappointments} />;
	}
}

export default ReqforappointmentsTable;
