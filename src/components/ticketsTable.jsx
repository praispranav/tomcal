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
						style={{ width: "30px", height: "30px", borderRadius: "50%" }}
						src={user.imageSrc}
						alt=""
					/>
				</span>
			),
		},
		{label: 'Owner',   path: 'username' } ,
		{label: 'Name',   path: 'name' } ,   
		{label: 'Participants',   path: 'participants' } ,   
		{label: 'Narrative',   path: 'narrative' } ,   	  
		{label: 'Category',   path: 'category' } ,
		{label: 'Priority',   path: 'priority' } ,   
		{label: 'Businessname',   path: 'businessName' } ,
		{label: 'TicketNo',   path: 'ticketNo' } ,   
		{label: 'CreatedOn',   path: 'createdOn' } ,   
		{label: 'Deadline',   path: 'deadline' } ,   	
		{label: 'Department',   path: 'department' } ,   	  
		{label: 'Sub-Department',   path: 'subDepartment' } ,   	  	
		{label: 'Locations',   path: 'locations' } ,   	  		
		{label: 'Field',   path: 'field' } ,   	  
		{label: 'Tags',   path: 'tags' } ,   	  
		{label: 'Reference',   path: 'ticketReference' } ,   		
		{label: 'Sharinglink',   path: 'sharingLink' } ,   	  		
		{label: 'AssignedTo',   path: 'assignedTo' } ,   	  
		{label: 'SharedTo',   path: 'sharedTo' } ,   	  	
		{label: 'Note',   path: 'note' } ,   	  	  

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
