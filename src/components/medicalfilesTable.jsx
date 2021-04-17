import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";

class MedicalfilesTable extends Component {
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
			content: (user) => (
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
						value={user._id}
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
		{ label: "username", path: "username" },
		{ label: "Firstname", path: "contactName.first" },
		{ label: "initials", path: "contactName.initials" },
		{ label: "Lastname", path: "contactName.last" },
		{ label: "Complaint", path: "chiefComplaint" },
		{ label: "Date", path: "date" },
		{ label: "Session", path: "session" },
		{ label: "Doctor", path: "doctor" },
		{ label: "View More Sessions", path: "session" },

		{
			key: "edit",
			label: "",
			content: (user) => (
				<Link to={`/clinic/users/${user._id}`}>
					<i className="far fa-lg fa-fw m-r-10 fa-edit"></i>
				</Link>
			),
		},
		{
			key: "delete",
			label: "",
			content: (user) => (
				<a onClick={() => this.props.onDelete(user)}>
					<i className="fas fa-lg fa-fw m-r-10 fa-trash"></i>
				</a>
			),
		},
	];

	render() {
		//console.log(this.columns) ;
		const { users, onSort, sortColumn } = this.props;
		return (
			<Table
				columns={this.columns}
				sortColumn={sortColumn}
				onSort={onSort}
				data={users}
			/>
		);
	}
}

export default MedicalfilesTable;
