import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";

class UsersTable extends Component {
	columns = [
		//   {path: '_id', label: 'Id'},
		{
			key: "avatar",
			label: "avatar",
			content: (user) => (
				<span className="icon-img sm-r-5">
					<img src={user.imageSrc} alt="" />
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

export default UsersTable;
