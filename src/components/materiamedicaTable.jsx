import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";

class MateriamedicasTable extends Component {
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
			content: (materiamedica) => (
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
						value={materiamedica._id}
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
		{label: 'Letter 1',   path: 'materiamedicas.letter_1' } ,
		{label: 'Letter 2',   path: 'materiamedicas.letter_2' } ,   
		{label: 'Name',   path: 'materiamedicas.name' } ,   	  		
		{label: 'Latin',   path: 'materiamedicas.latin' } ,   	  	  				
		{label: 'pinyin',   path: 'materiamedicas.pinyin' } ,   	  
		{label: 'chinese',   path: 'materiamedicas.chineseSPL' } ,   	      		
		{label: 'english',   path: 'materiamedicas.english' } ,   	  
		{label: 'korean',   path: 'materiamedicas.korean' } ,   	  
		{label: 'japanese',   path: 'materiamedicas.japanese' } ,   
		{label: 'vietnamese',   path: 'materiamedicas.vietnamese' } ,   
		{label: 'Hindi-Sanskrit',   path: 'materiamedicas.hindiSanskrit' } , 				
		{label: 'thai',   path: 'materiamedicas.thai' } ,   	  	  		
		{label: 'arabic',   path: 'materiamedicas.arabic' } ,   	          		
		{label: 'Homeopathy',   path: 'materiamedicas.homeopathy' } ,   	  	  		
		{label: 'Ayurveda',   path: 'materiamedicas.ayurveda' } ,  
		{label: 'Category',   path: 'materiamedicas.category' } ,           
		{label: 'functionality',   path: 'materiamedicas.functionality' } ,   	  	  		
		{label: 'meridian',   path: 'materiamedicas.meridian' } ,   	          		
		{label: 'taste',   path: 'materiamedicas.taste' } ,   	      		
		{label: 'dosage',   path: 'materiamedicas.dosage' } ,   	  
		{label: 'temperature',   path: 'materiamedicas.temperature' } ,   	  
		{label: 'indication',   path: 'materiamedicas.indication' } , 		
		{label: 'alternateNames',   path: 'materiamedicas.alternateNames' } ,   	  
		{label: 'caution',   path: 'materiamedicas.caution' } ,   	  
		{label: 'videoLink',   path: 'materiamedicas.videoLink' } ,   	  
		{label: 'sharingLink',   path: 'materiamedicas.sharingLink' } , 
		{label: 'reference',   path: 'materiamedicas.reference' } ,   
		{label: 'note',   path: 'materiamedicas.note' } ,   
		{label: 'Status',   path: 'materiamedicas.status' } ,   		
	];

	render() {
		//console.log(this.columns) ;
		const { materiamedicas, onSort, sortColumn } = this.props;
		return (
			<Table
				columns={this.columns}
				sortColumn={sortColumn}
				onSort={onSort}
				data={materiamedicas}
			/>
		);
	}
}

export default MateriamedicasTable;