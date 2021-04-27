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
		{
			key: "avatar",
			reqforappointment: "avatar",
			content: (user) => (
				<span className="icon-img sm-r-5">
					<img style={{ width: "30px", height: "30px", borderRadius: "50%" }} src={user.imageSrc} alt="" />
				</span>
			),
		},
		{ label: "Username", path: "username" },
		{
			key: "avatar",
			label: "avatar",
			content: (user) => (
				<span className="icon-img">
					<img src={user.imageSrc} alt="" />
				</span>
			),
		},
		{ label: "PatientNo", path: "patientNo" },
		{ label: "Firstname", path: "firstName" },
		{ label: "initials", path: "initials" },
		{ label: "Lastname", path: "lastName" },
		{ label: "DOB", path: "dateBirth" },
		{ label: "gender", path: "gender" },
		{ label: "Complaint", path: "complaint" },
		{ label: "Date", path: "date" },
		{ label: "PreferStartTime", path: "preferStartTime" },
		{ label: "PreferEndtime", path: "preferEndTime" },
		{ label: "Clinic", path: "clinicSolo" },
		{ label: "appointmentType", path: "appointmentType" },
		{ label: "sessionType", path: "sessionType" },
		{ label: "doctor", path: "doctor" },
		{ label: "Patient-note", path: "notePatient" },
		{ label: "Note", path: "internalNote" },
	];

	render() {
		//console.log(this.columns) ;
		const { reqforappointments, onSort, sortColumn } = this.props;
		return <Table columns={this.columns} sortColumn={sortColumn} onSort={onSort} data={reqforappointments} />;
	}
}

export default ReqforappointmentsTable;
