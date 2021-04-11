import React,{Component} from "react";
import Table from './../common/table';
import { Link, withRouter } from 'react-router-dom';


class LabelsTable extends Component {
  columns = [
    //   {path: '_id', label: 'Id'},
	
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
    
    {key:'edit',label: '',content: label => <Link to={`/clinic/labels/${label._id}`}><i className="far fa-lg fa-fw m-r-10 fa-edit"></i></Link>},
    {key:'delete',label: '',content: label=>(<a onClick={() => this.props.onDelete(label)}><i className="fas fa-lg fa-fw m-r-10 fa-trash"></i></a> )}
   
    ];
   
    render(){ 
       //console.log(this.columns) ;
        const {labels,onSort,sortColumn} = this.props;
        return (
       <Table columns={this.columns}
       sortColumn={sortColumn} 
       onSort={onSort}
       data={labels}
       />
        );
    }
}


export default LabelsTable;