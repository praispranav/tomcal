import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";

class AcupuncturesTable extends Component {
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
			content: (acupuncture) => (
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
						value={acupuncture._id}
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
		{label: 'Letter 1',   path: 'acupunctures.letter_1' } ,
		{label: 'Letter 2',   path: 'acupunctures.letter_2' } ,   
		{label: 'Name',   path: 'acupunctures.name' } ,   	  		
		{label: 'pinyin',   path: 'acupunctures.pinyin' } ,   	  
		{label: 'english',   path: 'acupunctures.english' } ,   	  
		{label: 'korean',   path: 'acupunctures.korean' } ,   	  
		{label: 'japanese',   path: 'acupunctures.japanese' } ,   
		{label: 'vietnamese',   path: 'acupunctures.vietnamese' } ,   
		{label: 'Location',   path: 'acupunctures.physicalLocation' } ,           
		{label: 'meridian',   path: 'acupunctures.meridian' } ,   	  
		{label: 'fiveElement',   path: 'acupunctures.fiveElement' } ,   	      
		{label: 'horarycycle',   path: 'acupunctures.horarycycle' } ,   	          
		{label: 'functionality',   path: 'acupunctures.functionality' } ,   	  	  
		{label: 'indication',   path: 'acupunctures.indication' } , 
		{label: 'caution',   path: 'acupunctures.caution' } ,   	  
		{label: 'videoLink',   path: 'acupunctures.videoLink' } ,   	  
		{label: 'sharingLink',   path: 'acupunctures.sharingLink' } , 
		{label: 'references',   path: 'acupunctures.references' } ,   
		{label: 'note',   path: 'acupunctures.note' } ,   
		{label: 'Status',   path: 'acupunctures.status' } ,   		
	];

	render() {
		//console.log(this.columns) ;
		const { acupunctures, onSort, sortColumn } = this.props;
		return (
			<Table
				columns={this.columns}
				sortColumn={sortColumn}
				onSort={onSort}
				data={acupunctures}
			/>
		);
	}
}

export default AcupuncturesTable;
