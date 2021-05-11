import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";

class FormulasTable extends Component {
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
			content: (formula) => (
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
						value={formula._id}
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
		{label: 'Name',   path: 'formulas.name' } ,   	  		
		{label: 'pinyin',   path: 'formulas.pinyin' } ,   	  
		{label: 'chinese',   path: 'formulas.chineseSPL' } ,   	      		
		{label: 'english',   path: 'formulas.english' } ,   	  
		{label: 'korean',   path: 'formulas.korean' } ,   	  
		{label: 'japanese',   path: 'formulas.japanese' } ,   
		{label: 'vietnamese',   path: 'formulas.vietnamese' } ,   
		{label: 'Category',   path: 'formulas.category' } ,           
		{label: 'functionality',   path: 'formulas.functionality' } ,   	  	  		
		{label: 'ingredients',   path: 'formulas.ingredients' } ,   	          		
		{label: 'Contraindication',   path: 'formulas.contraIndication' } , 		
		{label: 'suggestion',   path: 'formulas.suggestion' } ,   	  
		{label: 'indication',   path: 'formulas.indication' } , 
		{label: 'modification',   path: 'formulas.modification' } , 		
		{label: 'tongue',   path: 'formulas.tongue' } ,   	  	  		
		{label: 'pulse',   path: 'formulas.pulse' } ,   	          		
		{label: 'caution',   path: 'formulas.caution' } ,   	  
		{label: 'videoLink',   path: 'formulas.videoLink' } ,   	  
		{label: 'sharingLink',   path: 'formulas.sharingLink' } , 
		{label: 'reference',   path: 'formulas.reference' } ,   
		{label: 'note',   path: 'formulas.note' } ,   
		{label: 'Status',   path: 'formulas.status' } ,   		
	];

	render() {
		//console.log(this.columns) ;
		const { formulas, onSort, sortColumn } = this.props;
		return (
			<Table
				columns={this.columns}
				sortColumn={sortColumn}
				onSort={onSort}
				data={formulas}
			/>
		);
	}
}

export default FormulasTable;