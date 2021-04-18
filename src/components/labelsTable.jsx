import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";

class LabelsTable extends Component {
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
			content: (label) => (
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
						value={label._id}
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
		{label: 'Username',   path: 'username' } ,
		{label: 'name',   path: 'name' } ,   
		{label: 'Labelsize',   path: 'labelSize' } ,   
		{label: 'Fontsize',   path: 'fontSize' } ,   	  
		{label: 'SKU',   path: 'SKU' } ,   	  
		{label: 'serial',   path: 'serial' } ,   	  
		{label: 'MadeIn',   path: 'countries' } ,   	  
		{label: 'PrinterName',   path: 'printerName' } ,   	  
		{label: 'BarcodeType',   path: 'barcodeType' } ,   	  
		{label: 'ExpriredOn',   path: 'expriredOn' } ,   	  	  
		{label: 'PrintedOn',   path: 'printedOn' } ,   	  	  			
		{label: 'copies',   path: 'copies' } ,   	  	  		  	  			
		{label: 'Note',   path: 'note' } ,   	  	  
	];

	render() {
		//console.log(this.columns) ;
		const { labels, onSort, sortColumn } = this.props;
		return (
			<Table
				columns={this.columns}
				sortColumn={sortColumn}
				onSort={onSort}
				data={labels}
			/>
		);
	}
}

export default LabelsTable;
