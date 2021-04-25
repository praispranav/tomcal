import React,{Component} from 'react';
//import { Link } from 'react-router-dom';
import { Link, withRouter  } from 'react-router-dom';

import { Panel, PanelHeader, PanelBody } from './../../components/panel/panel.jsx';
import { UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
//import axios from 'axios';
import {getAppointments,deleteAppointment} from './../../services/appointments';
import 'bootstrap/dist/css/bootstrap.min.css';
//import FloatSubMenu from './../../components/float-sub-menu/float-sub-menu';
import Pagination from '../../common/pagination';
import {paginate} from '../../utils/paginate';
import AppointmentsTable from '../../components/appointmentsTable.jsx';
import SearchBox from './../../common/searchBox';
import _ from 'lodash';
import http from './../../services/httpService';
import {apiUrl} from './../../config/config.json';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AppointmentTableData extends Component {
  
  constructor(props) {
		super(props);
      this.state = {
        appointments:[],
        pageSize: 10,
        currentPage: 1,
        sortColumn:{path:'title',order:'asc'},
        searchQuery: "",
        errors:{},
      }
    
      this.handleDelete = this.handleDelete.bind(this);
    }

  async componentDidMount(){
      const {data} = await getAppointments();
      this.setState({appointments:data});
    }

  handleDelete = async (appointment)=>{
 

     ///delete
		const originalAppointments = this.state.appointments;
		const appointments = this.state.appointments.filter(Appointment => Appointment._id !== appointment._id);
		this.setState({appointments});
		try{
			await http.delete(apiUrl+"/appointments/"+ appointment._id);
		}
		catch(ex){
			//ex.request
			//ex.response

			if(ex.response && ex.response === 404){
				alert("already deleted");
			}
			
			this.setState({appointments:originalAppointments});
		}
    ////
 
  };


  //sorting columns
  handleSort = (sortColumn)=>{
    this.setState({sortColumn})
 };
  handlePageChange = (page)=>{
    console.log(page);
    this.setState({currentPage:page});
  
 };
 
 handleSearch = (query)=>{
  console.log(query);
  this.setState({searchQuery:query,currentPage:1});
};


 getDataPgnation= ()=>{
  const {pageSize,currentPage,appointments:Appointments,sortColumn,searchQuery} = this.state;
  //
  //filter maybe next time
  let filtered = Appointments;
  if(searchQuery){
    console.log(searchQuery);
    filtered = Appointments.filter((el)=> el.email.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
    el.appointmentname.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  }

  //
   const sorted = _.orderBy(filtered,[sortColumn.path],[sortColumn.order]);   
  const appointments = paginate(sorted,currentPage,pageSize);
  return {data:appointments};
 }

  render(){
    const {length:count} = this.state.appointments; 
    const {pageSize,currentPage,sortColumn,searchQuery} = this.state;
    if(count === 0)  return "<p>No data available</p>";
   
    const {data:appointments} = this. getDataPgnation();


    return(
     
      <div>
			<ol className="breadcrumb float-xl-right">
				<li className="breadcrumb-item"><Link to="/">Home</Link></li>
				<li className="breadcrumb-item"><Link to="/">Tables</Link></li>
				<li className="breadcrumb-item active">Data Tables</li>
			</ol>
			<h1 className="page-header">Appointments </h1>
			<Panel>
				<PanelHeader>
					Appointments Management
				</PanelHeader>
  
         <React.Fragment>
           <ToastContainer />
           {/* {appointment && ( <button className="btn btn-default active m-r-5 m-b-5" style={{marginBottom:20},{marginLeft:20},{marginTop:20}}>  <Link to="/clinic/appointment/new">Add Appointment</Link>  </button>)} */}
            <button className="btn btn-default active m-r-5 m-b-5" title="add appointment" style={{marginBottom:20},{marginLeft:20},{marginTop:20}}>  <Link to="/clinic/appointments/new"><i className="fas fa-plus"></i></Link>  </button>
            <button className="btn btn-default active m-r-5 m-b-5" title="edit" style={{marginBottom:20},{marginLeft:20},{marginTop:20}}>  <Link to="/clinic/appointments/edit"><i className="far fa-edit"></i></Link>  </button>			
            <button className="btn btn-default active m-r-5 m-b-5" title="delete" style={{marginBottom:20},{marginLeft:20},{marginTop:20}}>  <Link to="/clinic/appointments/del"><i className="far fa-trash-alt"></i></Link>  </button>						
            <button className="btn btn-default active m-r-5 m-b-5" title="download" style={{marginBottom:20},{marginLeft:20},{marginTop:20}}>  <Link to="/clinic/appointments/download"><i className="ion-md-download"></i></Link>  </button>						
				<div className="table-responsive">
     
       <SearchBox value={searchQuery} onChange={this.handleSearch} />           
        <p className="page-header float-xl-left" style={{marginBottom:5},{marginLeft:20},{marginTop:5}}>{count} entries</p> 

       <AppointmentsTable appointments={appointments} 
       onDelete={this.handleDelete}
       onSort={this.handleSort}
       sortColumn={sortColumn}
       />
        
			 </div> 
       
       </React.Fragment>

			 <hr className="m-0" />
			 <PanelBody>
       	<div className="d-flex align-items-center justify-content-center">
         <Pagination 
           itemsCount ={count}
           pageSize={pageSize}
           onPageChange={this.handlePageChange}
           currentPage={currentPage}
           />
				</div>
			 </PanelBody>
			</Panel>
		</div>
  
    )
  }
}

export default AppointmentTableData