import React from 'react';
import { Link } from 'react-router-dom';
import { PageSettings } from './../../config/page-settings.js';
import GoogleMapReact from 'google-map-react';

class Profile extends React.Component {
	static contextType = PageSettings;

	constructor(props) {
		super(props);

		this.showTab = this.showTab.bind(this);
		this.state = {
			tabAbout: true,
			tabBank: false,
			tabInsurance: false,
			tabProfessionalInfo: false,
			tabMembership: false			
		}
	}
	
	componentDidMount() {
		this.context.handleSetPageContentFullHeight(true);
		this.context.handleSetPageContentFullWidth(true);
	}

	componentWillUnmount() {
		this.context.handleSetPageContentFullHeight(false);
		this.context.handleSetPageContentFullWidth(false);
	}

	showTab(e, tab) {
		e.preventDefault();
		this.setState(state => ({
     		tabPost: (tab === 'post') ? true : false,
			tabAbout: (tab === 'about') ? true : false,
			tabBank: (tab === 'bank') ? true : false,
			tabInsurance: (tab === 'insurance') ? true : false,
			tabProfessionalInfo: (tab === 'professionalInfo') ? true : false,
			tabMembership: (tab === 'membership') ? true : false			
		}));
	}
	
	render() {
		return (
			<div>
				<div className="profile">
					<div className="profile-header">
						<div className="profile-header-cover"></div>
						<div className="profile-header-content">
							<div className="profile-header-img">
								<img src="{user.imageSrc}" alt="" />
							</div>
							<div className="profile-header-info">
								<h4 className="m-t-10 m-b-5">Sean Ngu</h4>
								<p className="m-b-10">Function</p>
							</div>
						</div>
						<ul className="profile-header-tab nav nav-tabs">
							<li className="nav-item"><Link to="/user/profile" onClick={(e) => this.showTab(e, 'about')} className={'nav-link ' + (this.state.tabAbout ? 'active ': '')}>About</Link></li>
							<li className="nav-item"><Link to="/user/profile" onClick={(e) => this.showTab(e, 'bank')} className={'nav-link ' + (this.state.tabBank ? 'active ': '')}>Bank</Link></li>
							<li className="nav-item"><Link to="/user/profile" onClick={(e) => this.showTab(e, 'insurance')} className={'nav-link ' + (this.state.tabInsurance ? 'active ': '')}>Insurance</Link></li>
							<li className="nav-item"><Link to="/user/profile" onClick={(e) => this.showTab(e, 'professionalInfo')} className={'nav-link ' + (this.state.tabProfesionalInfo ? 'active ': '')}>Professional Info</Link></li>
							<li className="nav-item"><Link to="/user/profile" onClick={(e) => this.showTab(e, 'membership')} className={'nav-link ' + (this.state.tabMembership ? 'active ': '')}>Membership</Link></li>							
						</ul>
					</div>
				</div>
				<div className="profile-content">
					<div className="tab-content p-0">
						<div className={'tab-pane fade ' + (this.state.tabAbout ? 'show active ': '')}>
							<div className="table-responsive form-inline">
								<table className="table table-profile">
									<tbody>
										<tr className="highlight">
											<td className="field">Mood</td>
											<td><Link to="/user/profile">Add Mood Message</Link></td>
										</tr>
										<tr className="divider">
											<td colSpan="2"></td>
										</tr>
										<tr>
											<td className="field">Mobile</td>
											<td><i className="fa fa-mobile fa-lg m-r-5"></i> +1-(847)- 367-8924 <Link to="/user/profile" className="m-l-5">Edit</Link></td>
										</tr>
										<tr>
											<td className="field">Home</td>
											<td><Link to="/user/profile">Add Number</Link></td>
										</tr>
										<tr>
											<td className="field">Office</td>
											<td><Link to="/user/profile">Add Number</Link></td>
										</tr>
										<tr className="divider">
											<td colSpan="2"></td>
										</tr>
										<tr className="highlight">
											<td className="field">About Me</td>
											<td><Link to="/user/profile">Add Description</Link></td>
										</tr>
										<tr className="divider">
											<td colSpan="2"></td>
										</tr>
										<tr>
											<td className="field">Address 1</td>
											<td>Los Angeles</td>
										</tr>
										<tr>
											<td className="field">Address 2</td>
											<td>Los Angeles</td>
										</tr>
										<tr>
											<td className="field">Address 3</td>
											<td>Los Angeles</td>
										</tr>
										<tr>
											<td className="field">Zip-code</td>
											<td>Los Angeles</td>
										</tr>
										
										<tr>
											<td className="field">City</td>
											<td>Los Angeles</td>
										</tr>
										<tr>
											<td className="field">State</td>
											<td><Link to="/user/profile">Add State</Link></td>
										</tr>
										<tr>
											<td className="field">Country</td>
											<td><Link to="/user/profile">Dropdown of countries here</Link></td>
										
										</tr>
										<tr>
											<td className="field valign-middle">Gender</td>
											<td>
												<select className="form-control form-control-sm" name="gender">
													<option value="male">Male</option>
													<option value="female">Female</option>
													<option value="transgender">Transgender</option>													
												</select>
											</td>
										</tr>
										<tr>
											<div className="form-group row">
												<label className="col-lg-4 col-form-label" htmlFor="dateBirth" >Date of Birth</label>
												<div className="col-lg-8">
												</div>
											</div>
										</tr>	
										<tr>
											<td className="field">Language</td>
												<div className="form-group row m-b-15">
													<div className="col-md-9">
														<select multiple className="form-control">
															<option>English</option>
															<option>普通话</option>
															<option>Español</option>															
															<option>日本語</option>
															<option>हिन्दी</option>
															<option>Deutsch</option>
															<option>اَلْعَرَبِيَّةُ</option>
															<option>Français</option>
															<option>Italiano</option>															
															<option>한국어</option>
															<option>Tiếng Việt</option>
															<option>русский язык</option>																														
															<option>Português</option>																																													
															<option>Türkçe</option>																																																												
														</select>
													</div>
												</div>
											
											<td>
											</td>
										</tr>
										<tr className="divider">
											<td colSpan="2"></td>
										</tr>
										<tr className="highlight">
											<td className="field">&nbsp;</td>
											<td className="p-t-10 p-b-10">
												<button type="submit" className="btn btn-primary width-65">Update</button>
												<button type="submit" className="btn btn-red btn-red-without-border width-65 m-l-5">Cancel</button>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div className={'tab-pane fade ' + (this.state.tabBank ? 'show active ': '')}>
							<div className="table-responsive form-inline">
								<table className="table table-profile">
									<tbody>
										<tr>
											<td className="field">IBAN</td>
											<td>Los Angeles</td>
										</tr>
										<tr>
											<td className="field">Bank</td>
											<td>Los Angeles</td>
										</tr>
										<tr>
											<td className="field">Branch of Bank</td>
											<td>Los Angeles</td>
										</tr>
										<tr>
											<td className="field">Currency</td>
												<div className="form-group row m-b-15">
													<div className="col-md-9">
														<select className="form-control">
															<option>Euro €</option>
															<option>USD $</option>
															<option>CNY ¥</option>															
															<option>GBP £</option>
															<option>AUD $</option>
															<option>CAD $</option>
															<option>HKD $</option>
															<option>ILS ₪</option>
															<option>JPY ¥</option>															
															<option>KRW ₩</option>
															<option>CHF </option>
															<option>MXN $</option>																														
															<option>QAR ﷼</option>																																													
															<option>RUB руб</option>
															<option>SAR ﷼</option>
															<option>INR Rp</option>															
															<option>TRY TL</option>
															<option>VND ₫</option>
															<option>BRL R$</option>
															<option>AZR R</option>
															<option>SGD $</option>															
														</select>
													</div>
												</div>
											
											<td>
											</td>
										</tr>
										<tr className="highlight">
											<td className="field">&nbsp;</td>
											<td className="p-t-10 p-b-10">
												<button type="submit" className="btn btn-primary width-65">Update</button>
												<button type="submit" className="btn btn-red btn-red-without-border width-65 m-l-5">Cancel</button>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div className={'tab-pane fade ' + (this.state.tabInsurance ? 'show active ': '')}>
							<div className="table-responsive form-inline">
								<table className="table table-profile">
									<tbody>
										<tr>
											<td className="field">Primairy Insurance</td>
											<td>Los Angeles</td>
										</tr>
										<tr>
											<td className="field">Primairy Insurance No</td>
											<td>Los Angeles</td>
										</tr>
										<tr>
											<td className="field">Secondairy Insurance</td>
											<td>Los Angeles</td>
										</tr>
										<tr>
											<td className="field">Secondairy Insurance No</td>
											<td>Los Angeles</td>
										</tr>
										<tr className="highlight">
											<td className="field">&nbsp;</td>
											<td className="p-t-10 p-b-10">
												<button type="submit" className="btn btn-primary width-65">Update</button>
												<button type="submit" className="btn btn-red btn-red-without-border width-65 m-l-5">Cancel</button>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div className={'tab-pane fade ' + (this.state.tabProfessionalInfo ? 'show active ': '')}>
							<div className="table-responsive form-inline">
								<table className="table table-profile">
									<tbody>
										<tr className="highlight">
											<td className="field">Business Name</td>
											<td><Link to="/user/profile">Business Name</Link></td>
										</tr>
										<tr>
											<td className="field">Industry</td>
											<td><Link to="/user/profile">Industry</Link></td>
										</tr>
										<tr>
											<td className="field">Size</td>
											<td><Link to="/user/profile">Size</Link></td>
										</tr>
										<tr>
											<td className="field">Website</td>
											<td><Link to="/user/profile">Add Webpage</Link></td>
										</tr>
										
										<tr className="divider">
											<td colSpan="2"></td>
										</tr>
										<tr>
											<td className="field">Healthcare Provider Identifier Organisation</td>
											<td>Los Angeles</td>
										</tr>
										<tr>
											<td className="field">Healthcare Provider Identifier Individual</td>
											<td><Link to="/user/profile">HPII</Link></td>
										</tr>
										<tr>
											<td className="field">Treatments</td>
											<td><Link to="/user/profile">Treatments</Link></td>
										</tr>
										<tr>
											<td className="field">LicenseNo</td>
											<td><Link to="/user/profile">Add LicenseNo</Link></td>
										</tr>
										
										<tr>
											<td className="field">License Valid Till</td>
											<td>Date of valid</td>
										</tr>
										
										<tr className="highlight">
											<td className="field">&nbsp;</td>
											<td className="p-t-10 p-b-10">
												<button type="submit" className="btn btn-primary width-65">Update</button>
												<button type="submit" className="btn btn-red btn-red-without-border width-65 m-l-5">Cancel</button>
											</td>
										</tr>
									</tbody>
								</table>
							</div>						
						</div>	
						<div className={'tab-pane fade ' + (this.state.tabMembership ? 'show active ': '')}>
							<div className="table-responsive form-inline">
								<table className="table table-profile">
									<tbody>
										<tr className="highlight">
											<td className="field">Organization A Name</td>
											<td><Link to="/user/profile">Add Name of Organization A</Link></td>
										</tr>
										<tr>
											<td className="field">Organization A Member-No</td>
											<td><Link to="/user/profile">Add Member-No Organization A</Link></td>
										</tr>
										<tr className="highlight">
											<td className="field">Organization B Name</td>
											<td><Link to="/user/profile">Add Name of Organization B</Link></td>
										</tr>
										<tr>
											<td className="field">Organization B Member-No</td>
											<td><Link to="/user/profile">Add Member-No of Organization B</Link></td>
										</tr>
										<tr className="highlight">
											<td className="field">&nbsp;</td>
											<td className="p-t-10 p-b-10">
												<button type="submit" className="btn btn-primary width-65">Update</button>
												<button type="submit" className="btn btn-red btn-red-without-border width-65 m-l-5">Cancel</button>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Profile;