import React,{Component} from "react";
import Table from './../common/table';
import { Link, withRouter } from 'react-router-dom';


class TicketsTable extends Component {
  columns = [
    //   {path: '_id', ticket: 'Id'},
	
    {ticket: 'Owner',   path: 'username' } ,
    {ticket: 'Name',   path: 'name' } ,   
    {ticket: 'Participants',   path: 'participants' } ,   
    {ticket: 'Narrative',   path: 'narrative' } ,   	  
    {ticket: 'Category',   path: 'category' } ,
    {ticket: 'Priority',   path: 'priority' } ,   
    {ticket: 'Businessname',   path: 'businessName' } ,
    {ticket: 'TicketNo',   path: 'ticketNo' } ,   
    {ticket: 'CreatedOn',   path: 'createdOn' } ,   
    {ticket: 'Deadline',   path: 'deadline' } ,   	
    {ticket: 'Department',   path: 'department' } ,   	  
    {ticket: 'Sub-Department',   path: 'subDepartment' } ,   	  	
    {ticket: 'Locations',   path: 'locations' } ,   	  		
    {ticket: 'Field',   path: 'field' } ,   	  
    {ticket: 'Tags',   path: 'tags' } ,   	  
    {ticket: 'Reference',   path: 'ticketReference' } ,   		
    {ticket: 'Sharinglink',   path: 'sharingLink' } ,   	  		
    {ticket: 'AssignedTo',   path: 'assignedTo' } ,   	  
    {ticket: 'SharedTo',   path: 'sharedTo' } ,   	  	
    {ticket: 'Note',   path: 'note' } ,   	  	  
    
    {key:'edit',ticket: '',content: ticket => <Link to={`/clinic/tickets/${ticket._id}`}><i className="far fa-lg fa-fw m-r-10 fa-edit"></i></Link>},
    {key:'delete',ticket: '',content: ticket=>(<a onClick={() => this.props.onDelete(ticket)}><i className="fas fa-lg fa-fw m-r-10 fa-trash"></i></a> )}
   
    ];
   
    render(){ 
       //console.log(this.columns) ;
        const {tickets,onSort,sortColumn} = this.props;
        return (
       <Table columns={this.columns}
       sortColumn={sortColumn} 
       onSort={onSort}
       data={tickets}
       />
        );
    }
}


export default TicketsTable;