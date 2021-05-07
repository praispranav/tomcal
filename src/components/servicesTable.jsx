import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";

class ServicesTable extends Component {
	columns = [
		{
			key: "checkbox",
			label: <input type="check" style={checkboxStyles} />,
			content: (listService) => (
				<span className="icon-img sm-r-5" style={{ marginTop: "15px" }}>
					<input
						type="checkbox"
						style={checkboxStyles}
						onChange={this.props.handleCheckboxChange}
						value={listService._id}
					/>
				</span>
			),
		},
		{label: "ServiceNo", path: "serviceNo" },
		{label: "Name", path: "name" },
		{label: "Code", path: "code" },
		{label: 'Price',   path: "price" } ,   	  
		{label: 'Valid Till',   path: "validTill" } ,   	  
		{label: 'Description',   path: "description" } ,   	  
		{label: 'Note',   path: "note" } ,   	  	  		
		{label: "ClinicNo", path: "clinicNo" },		
		{label: "CreatedOn", path: "createdOn" },
		{label: "Status", path: "status" },		
	];

	render() {
		//console.log(this.columns) ;
		const { services, onSort, sortColumn } = this.props;
		return (
			<Table columns={this.columns} sortColumn={sortColumn} onSort={onSort} data={services} />
		);
	}
}

const checkboxStyles = {
	width: "15px",
	height: "15px",
	marginTop: "0.4rem",
	borderRadius: 0,
};

export default ServicesTable;
