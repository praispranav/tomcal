import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import auth from './../../../services/authservice';
import {getUser} from './../../../services/users';
import { Link, withRouter } from 'react-router-dom';
class DropdownProfile extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			dropdownOpen: false,
			user:{
			 firstName: '',
			 lastName : '',
			 username: '',
			 imageSrc: ''
			}
		};
	}

	toggle() {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen
		}));
	}
  
    async componentDidMount(){
		try{
				const user = auth.getProfile();	
			
		
		if(user){
			//const {data} = await getUser(user._id);

			//this.setState({data});
			const {data:currentUser} = await getUser(user._id);
			//console.log(currentUser);
			this.setState({ user: this.mapToViewModel(currentUser) });
			//this.setState({user});
			//console.log(user._id);
			//data.imageSrc;
		
		}
		}catch(ex){
			console.log(ex);
		}
	
	
	}
	

	mapToViewModel(user) {
		return {
		  _id: user._id,
		  username: user.username,
		  password: user.password,
		  profile: user.profile,
		  email: user.email,
		  //dateBirth: new Date(user.dateBirth),
		  firstName: user.firstName,
		  lastName: user.firstName,
		  country: user.country,
		  gender: user.gender,
		  imageSrc: user.imageSrc
		};
	  }

		
	render() {
	console.log(this.state.user);

	console.log(this.state);
	const { user} = this.state;
		return (
			// <React.Fragment></React.Fragment>
			<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="dropdown navbar-user" tag="li">
				<DropdownToggle tag="a">
					<img src={user.imageSrc} alt="" /> 
					<span className="d-none d-md-inline">{user.firstName} {user.lastName}</span> <b className="caret"></b>
				</DropdownToggle>
				<DropdownMenu className="dropdown-menu dropdown-menu-right" tag="ul">
					<DropdownItem><Link to="/profile">Edit Profile</Link></DropdownItem>
					<DropdownItem><span className="badge badge-danger pull-right">2</span> Inbox</DropdownItem>
					<DropdownItem><Link to="/calendar">Calendar</Link></DropdownItem>
					<DropdownItem><Link to="/settings">Setting</Link></DropdownItem>
					<div className="dropdown-divider"></div>
					<DropdownItem><Link to="/logout">Log Out</Link></DropdownItem>
				</DropdownMenu>
			</Dropdown>
		
		);
	}
};

export default DropdownProfile;