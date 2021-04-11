import React,{Component} from "react";
import Table from './../common/table';
import { Link, withRouter } from 'react-router-dom';


class AppointmentsTable extends Component {
  columns = [
    //   {path: '_id', label: 'Id'},
	
    {key:'avatar', label: 'avatar',content: user=>(<span className="icon-img sm-r-5" ><img src={user.imageSrc} alt="" /></span>) } ,    
    {label: 'Username',   path: 'username' } ,
    {label: 'email',   path: 'email' } ,   
    {label: 'Firstname',   path: 'contactName.first' } ,   
    {label: 'initials',   path: 'contactName.initials' } ,   	  
    {label: 'Lastname',   path: 'contactName.last' } ,   	  
    {label: 'DOB',   path: 'dateBirth' } ,   	  
    {label: 'Mobile',   path: 'mobile' } ,   	  
    {label: 'Phone',   path: 'phone' } ,   	  
    {label: 'Date',   path: 'date' } ,   	  
    {label: 'Start-time',   path: 'startTime' } ,   	  	
    {label: 'End-Time',   path: 'endTime' } ,   	  	  
    {label: 'Complaint',   path: 'complaint' } ,   	  	  			
    {label: 'Clinic',   path: 'businessName' } ,   	  	  	
    {label: 'Doctor',   path: 'doctorNo' } ,   	  	  		
    {label: 'Appointment-type',   path: 'appointmentType' } ,   	  	  		
    {label: 'Session-type',   path: 'sessionType' } ,   	  	  			
    {label: 'Note',   path: 'note' } ,   	  	  
    {label: 'Status',   path: 'status' } ,   	  	  	
    
    {key:'edit',label: '',content: appointment => <Link to={`/clinic/appointments/${appointment._id}`}><i className="far fa-lg fa-fw m-r-10 fa-edit"></i></Link>},
    {key:'delete',label: '',content: appointment=>(<a onClick={() => this.props.onDelete(appointment)}><i className="fas fa-lg fa-fw m-r-10 fa-trash"></i></a> )}
   
    ];
   
    render(){ 
       //console.log(this.columns) ;
        const {appointments,onSort,sortColumn} = this.props;
        return (
       <Table columns={this.columns}
       sortColumn={sortColumn} 
       onSort={onSort}
       data={appointments}
       />
        );
    }
}


export default AppointmentsTable;