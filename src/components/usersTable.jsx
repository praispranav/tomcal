import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";

class UsersTable extends Component {
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
						style={{ width: "20px", height: "20px", borderRadius: "50%" }}
						src={user.imageSrc}
						alt=""
					/>
				</span>
			),
		},
		{ label: "Username", path: "username" },
		{ label: "email", path: "email" },
		{ label: "Usergroup", path: "profile.profileName" },
		{ label: "Firstname", path: "contactName.first" },
		{ label: "initials", path: "contactName.initials" },
		{ label: "Lastname", path: "contactName.last" },
		{ label: "DOB", path: "dateBirth" },
		{ label: "Gender", path: "gender" },
		{ label: "Address 1", path: "address1" },
		{ label: "Address 2", path: "address2" },
		{ label: "Address 3", path: "address3" },
		{ label: "Zip-code", path: "zip" },
		{ label: "City", path: "city" },
		{ label: "State", path: "state" },
		{ label: "Country", path: "country" },
		{ label: "Mobile", path: "mobile" },
		{ label: "Phone", path: "phone" },
		{ label: "Skype", path: "skype" },

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

export default UsersTable;
