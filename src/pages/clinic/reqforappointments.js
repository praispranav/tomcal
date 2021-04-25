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
import reqforappointmentsTable from '../../components/reqforappointmentsTable.jsx';
import SearchBox from './../../common/searchBox';
import _ from 'lodash';
import http from './../../services/httpService';
import {apiUrl} from './../../config/config.json';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class reqforreqforappointmentTableData extends Component {
  
  constructor(props) {
		super(props);
      this.state = {
        reqforappointments:[],
        pageSize: 10,
        currentPage: 1,
        sortColumn:{path:'title',order:'asc'},
        searchQuery: "",
        errors:{},
      }
    
      this.handleDelete = this.handleDelete.bind(this);
    }

  async componentDidMount(){
      const {data} = await getreqforappointments();
      this.setState({reqforappointments:data});
    }

  handleDelete = async (reqforappointment)=>{
 

     ///delete
		const originalreqforappointments = this.state.reqforappointments;
		const reqforappointments = this.state.reqforappointments.filter(reqforappointment => reqforappointment._id !== reqforappointment._id);
		this.setState({reqforappointments});
		try{
			await http.delete(apiUrl+"/reqforappointments/"+ reqforappointment._id);
		}
		catch(ex){
			//ex.request
			//ex.response

			if(ex.response && ex.response === 404){
				alert("already deleted");
			}
			
			this.setState({reqforappointments:originalreqforappointments});
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
  const {pageSize,currentPage,reqforappointments:reqforappointments,sortColumn,searchQuery} = this.state;
  //
  //filter maybe next time
  let filtered = reqforappointments;
  if(searchQuery){
    console.log(searchQuery);
    filtered = reqforappointments.filter((el)=> el.email.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
    el.reqforappointmentname.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  }

  //
   const sorted = _.orderBy(filtered,[sortColumn.path],[sortColumn.order]);   
  const reqforappointments = paginate(sorted,currentPage,pageSize);
  return {data:reqforappointments};
 }

  render(){
    const {length:count} = this.state.reqforappointments; 
    const {pageSize,currentPage,sortColumn,searchQuery} = this.state;
    if(count === 0)  return "<p>No data available</p>";
   
    const {data:reqforappointments} = this. getDataPgnation();


    return(
     
      <div>
			<ol className="breadcrumb float-xl-right">
				<li className="breadcrumb-item"><Link to="/">Home</Link></li>
				<li className="breadcrumb-item"><Link to="/">Tables</Link></li>
				<li className="breadcrumb-item active">Data Tables</li>
			</ol>
			<h1 className="page-header">Requests for Appointments </h1>
			<Panel>
				<PanelHeader>
					Requests for Appointments Management
				</PanelHeader>
  
         <React.Fragment>
           <ToastContainer />
						<div className="toolbar" style={toolbarStyles}>
							<button className="btn btn-default active m-r-5 m-b-5" title="add ticket" style={btnStyles}>
								{" "}
								<Link to="/clinic/reqforappointments/new">
									<img style={iconStyles} src={newIcon} />
								</Link>
							</button>
							
							<button className="btn btn-default active m-r-5 m-b-5" title="edit ticket" style={btnStyles}>
								{" "}
								<Link
									to={
										this.state.checkedTickets
											? `/clinic/reqforappointments/${this.state.checkedTickets[0]}`
											: "/clinic/reqforappointments/"
									}
								>
									<img style={iconStyles} src={editIcon} />
								</Link>{" "}
							</button>
							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="delete tickets"
								style={btnStyles}
								onClick={() => this.handleMassDelete(this.state.checkedTickets)}
							>
								{" "}
								<img style={{ width: "25px", height: "25px" }} src={trashIcon} />
							</button>
							<button className="btn btn-default active m-r-5 m-b-5" title="Excel" style={btnStyles}>
								{" "}
								<Link to="/clinic/reqforappointments/">
									<img style={iconStyles} src={xlsIcon} />
								</Link>{" "}
							</button>
							
							<button className="btn btn-default active m-r-5 m-b-5" title="csv" style={btnStyles}>
								{" "}
								<Link to="/clinic/reqforappointments/">
									<img style={iconStyles} src={csvIcon} />
								</Link>{" "}
							</button>
							<button className="btn btn-default active m-r-5 m-b-5" title="PDF" style={btnStyles}>
								{" "}
								<Link to="/clinic/reqforappointments/">
									<img style={iconStyles} src={pdfIcon} />
								</Link>{" "}
							</button>
							<button className="btn btn-default active m-r-5 m-b-5" title="Share to other" style={btnStyles}>
								{" "}
								<Link to="/clinic/reqforappointments/">
									<img style={iconStyles} src={shareIcon} />
								</Link>{" "}
							</button>
							<button className="btn btn-default active m-r-5 m-b-5" title="Archive the ticket" style={btnStyles}>
								{" "}
								<Link to="/clinic/reqforappointments/">
									<img style={iconStyles} src={archiveIcon} />
								</Link>{" "}
							</button>
							
						</div>
				<div className="table-responsive">
     
       <SearchBox value={searchQuery} onChange={this.handleSearch} />           
        <p className="page-header float-xl-left" style={{marginBottom:5},{marginLeft:20},{marginTop:5}}>{count} entries</p> 

       <reqforappointmentsTable reqforappointments={reqforappointments} 
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

export default reqforappointmentTableData