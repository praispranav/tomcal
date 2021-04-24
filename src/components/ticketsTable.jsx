import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";

class TicketsTable extends Component {
	columns = [
		{
			key: "checkbox",
			label: <input type="check" style={checkboxStyles} />,
			content: (ticket) => (
				<span className="icon-img sm-r-5" style={{ marginTop: "15px" }}>
					<input
						type="checkbox"
						style={checkboxStyles}
						onChange={this.props.handleCheckboxChange}
						value={ticket._id}
					/>
				</span>
			),
		},
		{ label: "TicketNo", path: "ticketNo" },
		{ label: "Name", path: "name" },
		{ label: "Owner", path: "ticketname" },
		{ label: "Participants", path: "participants" },
		{ label: "Narrative", path: "narrative" },
		{ label: "Category", path: "category" },
		{ label: "Priority", path: "priority" },
		{ label: "Businessname", path: "businessName" },
		{ label: "CreatedOn", path: "createdOn" },
		{ label: "Deadline", path: "deadline" },
		{ label: "Department", path: "department" },
		{ label: "Sub-Department", path: "subDepartment" },
		{ label: "Locations", path: "locations" },
		{ label: "Field", path: "field" },
		{ label: "Tags", path: "tags" },
		{ label: "Reference", path: "ticketReference" },
		{ label: "Sharinglink", path: "sharingLink" },
		{ label: "AssignedTo", path: "assignedTo" },
		{ label: "SharedTo", path: "sharedTo" },
		{ label: "Note", path: "note" },
	];

	render() {
		//console.log(this.columns) ;
		const { tickets, onSort, sortColumn } = this.props;
		return <Table columns={this.columns} sortColumn={sortColumn} onSort={onSort} data={tickets} />;
	}
}

const checkboxStyles = {
	width: "15px",
	height: "15px",
	marginTop: "0.4rem",
	borderRadius: 0,
};

export default TicketsTable;
