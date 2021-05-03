import React from "react";
import { Route, withRouter, Switch } from "react-router-dom";
//import routes from './../../config/page-route.jsx';
import { PageSettings } from "./../../config/page-settings.js";
import auth from "./../../services/authservice";
import { getUser } from "./../../services/users";
import { Redirect } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import configureStore from "./../../store/configureStore";
import { Provider } from "react-redux";

import ProtectedRoute from "./../../common/ProtectedRoute";
////////////////////////////////////////////////////////////////////
import YourDrive from "./../../pages/drive/yourdrive.js";
import TCMSession from "./../../pages/clinic/add_tcmsession.js";
import DashboardV2 from "./../../pages/dashboard/dashboard-v2.js";
//import DashboardV3 from './../../pages/dashboard/dashboard-v3.js';
import EmailInbox from "./../../pages/email/email-inbox.js";
import EmailCompose from "./../../pages/email/email-compose.js";
import EmailDetail from "./../../pages/email/email-detail.js";
import Widgets from "./../../pages/widget/widget.js";
import UIGeneral from "./../../pages/ui/ui-general.js";
import UITypography from "./../../pages/ui/ui-typography.js";
import UITabsAccordion from "./../../pages/ui/ui-tabs-accordion.js";
import UIModalNotification from "./../../pages/ui/ui-modal-notification.js";
import UIWidgetBoxes from "./../../pages/ui/ui-widget-boxes.js";
import UIMediaObject from "./../../pages/ui/ui-media-object.js";
import UIButtons from "./../../pages/ui/ui-buttons.js";
import UIIcons from "./../../pages/ui/ui-icons.js";
import UISimpleLineIcons from "./../../pages/ui/ui-simple-line-icons.js";
import UIIonicons from "./../../pages/ui/ui-ionicons.js";
import UILanguageBarIcon from "./../../pages/ui/ui-language-bar-icon.js";
import UISocialButtons from "./../../pages/ui/ui-social-buttons.js";
import Bootstrap4 from "./../../pages/bootstrap/bootstrap-4.js";
import FormElements from "./../../pages/form/form-elements.js";
import FormWizards from "./../../pages/form/form-wizards.js";
import TableBasic from "./../../pages/table/table-basic.js";
import Table from "./../../pages/table/table-data.js";
import PosCustomerOrder from "./../../pages/pos/customer-order.js";
import PosKitchenOrder from "./../../pages/pos/kitchen-order.js";
import PosCounterCheckout from "./../../pages/pos/counter-checkout.js";
import PosTableBooking from "./../../pages/pos/table-booking.js";
import PosMenuStock from "./../../pages/pos/menu-stock.js";
import ChartJS from "./../../pages/chart/chart-js.js";
import ChartD3 from "./../../pages/chart/chart-d3.js";
import ChartApex from "./../../pages/chart/chart-apex.js";
import Calendar from "./../../pages/calendar/calendar.js";
import SchedulerCal from "./../../pages/calendar/scheduler.js";
import SchedulerfCal from "./../../pages/calendar/newscheduler.js";
import Map from "./../../pages/map/map.js";
import Gallery from "./../../pages/gallery/gallery.js";
import PageBlank from "./../../pages/option/page-blank.js";
import PageWithFooter from "./../../pages/option/page-with-footer.js";
import PageWithoutSidebar from "./../../pages/option/page-without-sidebar.js";
import PageWithRightSidebar from "./../../pages/option/page-with-right-sidebar.js";
import PageWithMinifiedSidebar from "./../../pages/option/page-with-minified-sidebar.js";
import PageWithTwoSidebar from "./../../pages/option/page-with-two-sidebar.js";
import PageFullHeight from "./../../pages/option/page-full-height.js";
import PageWithWideSidebar from "./../../pages/option/page-with-wide-sidebar.js";
import PageWithLightSidebar from "./../../pages/option/page-with-light-sidebar.js";
import PageWithMegaMenu from "./../../pages/option/page-with-mega-menu.js";
import PageWithTopMenu from "./../../pages/option/page-with-top-menu.js";
import PageWithBoxedLayout from "./../../pages/option/page-with-boxed-layout.js";
import PageWithMixedMenu from "./../../pages/option/page-with-mixed-menu.js";
import PageBoxedLayoutWithMixedMenu from "./../../pages/option/page-boxed-layout-with-mixed-menu.js";
import PageWithTransparentSidebar from "./../../pages/option/page-with-transparent-sidebar.js";
import PageWithSearchSidebar from "./../../pages/option/page-with-search-sidebar.js";
import ExtraTimeline from "./../../pages/extra/extra-timeline.js";
import ExtraComingSoon from "./../../pages/extra/extra-coming-soon.js";
import ExtraSearch from "./../../pages/extra/extra-search.js";
import ExtraInvoice from "./../../pages/extra/extra-invoice.js";
import ExtraError from "./../../pages/extra/extra-error.js";
import Profile from "./../../pages/user/profile.js";
import ExtraScrumBoard from "./../../pages/extra/extra-scrum-board.js";
import ExtraCookieAcceptanceBanner from "./../../pages/extra/extra-cookie-acceptance-banner.js";
//import LoginV1 from './../../pages/user/login-v1.js';
import LoginV2 from "../../pages/user/login.js";
import RegisterV3 from "./../../pages/register.js";
import User from "./../../pages/clinic/user.js";
import Ticket from "./../../pages/clinic/ticket.js";
import TicketsTable from "./../../pages/clinic/tickets.js";
import ClinicSolo from "./../../pages/clinic/clinicsolo.js";
import ClinicSoloTable from "./../../pages/clinic/clinicsolos.js";
import Appointment from './../../pages/clinic/appointment.js';
import AppointmentTable from "./../../pages/clinic/appointments.js";
import reqForAppointment from "./../../pages/clinic/reqforappointment.js";
import reqforappointmentTable from "./../../pages/clinic/reqforappointments.js";
import Patient from "./../../pages/clinic/patient.js";
import PatientTable from "./../../pages/clinic/patients.js";
import UserTable from "./../../pages/clinic/users.js";
import Doctor from "./../../pages/clinic/doctor.js";
import DoctorTable from "./../../pages/clinic/doctors.js";
import GridTicket from "./../../pages/clinic/grid-tickets.js";
//import Label from './../../pages/label/label.js';
//import LabelTable from './../../pages/label/labels.js';
//import Accountant from './../../pages/clinic/accountant.js';
//import AccountantsTable from './../../pages/clinic/accountants.js';
// import reception from './../../pages/clinic/reception.js';
// import receptionTable from './../../pages/clinic/receptions.js';
// import Invoice from './../../pages/clinic/Invoice.js';
// import InvoiceTable from './../../pages/clinic/invoices.js';
// import TCMTreatment from './../../pages/clinic/tcmtreatment.js';
// import TCMTreatmentTable from './../../pages/clinic/tcmtreatments.js';
// import MedicalFile from './../../pages/clinic/medicalfile.js';
// import MedicalFilesTable from './../../pages/clinic/medicalfiles.js';
// import Acupuncture from './../../pages/clinic/acupuncture.js';
// import AcupunctureTable from './../../pages/clinic/acupunctures.js';
// import Formula from './../../pages/clinic/formula.js';
// import FormulaTable from './../../pages/clinic/formulas.js';
// import MateriaMedica from './../../pages/clinic/materiamedica.js';
// import MateriaMedicaTable from './../../pages/clinic/materiamedicas.js';
// import MeridianTable from './../../pages/clinic/meridians.js';
// import Salon from './../../pages/clinic/salon.js';
// import SalonTable from './../../pages/clinic/salons.js';
// import BTreatment from './../../pages/clinic/btreatment.js';
// import BTreatmentTable from './../../pages/clinic/btreatments.js';

import Card from './../../pages/kanban/card.js';
import Listkanban from './../../pages/kanban/listkanban.js';
import Kanban from './../../pages/kanban/kanban.js';
import Scrumboard from './../../pages/kanban/scrumboard.js';

import FormPlugins from "./../../pages/form/form-plugins";
import Logout from "./../../common/logout";


import ticketProfile from "./../../pages/ticket/ticketprofile";

function setTitle(path, routeArray) {
	var pageTitle;
	for (var i = 0; i < routeArray.length; i++) {
		if (routeArray[i].path === path) {
			pageTitle = "TCMFiles | " + routeArray[i].title;
		}
	}
	document.title = pageTitle ? pageTitle : "TCMFiles | Users";
}

const store = configureStore();

class Content extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	async componentDidMount() {
		//set page title dinamically
		//setTitle(this.props.history.location.pathname, routes);
		/*     try{
		const user = auth.getProfile();	
	    //if(user){
		   const {data:currentUser} = await getUser(user._id);
		   this.setState({ user: this.mapToViewModel(currentUser) });
    	//}
	    }catch(ex){
		  console.log(ex);
    	} */
	}

	// componentWillMount() {
	//   //set page title dinamically
	//   this.props.history.listen(() => {
	// 		//setTitle(this.props.history.location.pathname, routes);
	//   });
	// }

	render() {
		const { user } = this.state;
		return (
			<PageSettings.Consumer>
				{({ pageContentFullWidth, pageContentClass, pageContentInverseMode }) => (
					<div
						className={
							"content " +
							(pageContentFullWidth ? "content-full-width " : "") +
							(pageContentInverseMode ? "content-inverse-mode " : "") +
							pageContentClass
						}
					>
						<React.Fragment>
							<ToastContainer />

							<Switch>
								<ProtectedRoute path="/dashboard/" title="Clinic Dashboard" component={DashboardV2} />

								<Redirect from="/" exact to="/dashboard/" />

								<Route
									path="/user/login"
									title="Login"
									render={(props) => {
										if (this.state.user) return <Redirect to="/dashboard" />;
										return <LoginV2 {...props} />;
									}}
								/>

								<Route path="/logout" title="Logout" component={Logout} />
								<Route path="/register" title="Register" component={RegisterV3} />
								<ProtectedRoute path="/clinic/users/:id" title="User" component={User} />
								<ProtectedRoute path="/clinic/tickets/:id" title="Ticket" component={Ticket} />
								<ProtectedRoute path="/clinic/users" title="Users" component={UserTable} />
								<ProtectedRoute path="/clinic/tickets" title="Tickets" component={TicketsTable} />
								<ProtectedRoute path="/clinic/clinicsolos/:id" title="ClinicSolo" component={ClinicSolo} />
								<ProtectedRoute path="/clinic/clinicsolos" title="ClinicSolos" component={ClinicSoloTable} />
								<ProtectedRoute path="/clinic/patients/:id" title="Patient" component={Patient} />
								<ProtectedRoute path="/clinic/patients" title="Patients" component={PatientTable} />
								<ProtectedRoute path="/clinic/doctors/:id" title="Doctor" component={Doctor} />
								<ProtectedRoute path="/clinic/doctors" title="Doctors" component={DoctorTable} />

								<Route path="/clinic/yourdrive/" title="Your Drive" component={YourDrive} />
								<Route path="/calendar" title="Calendar" component={Calendar} />
								<Route path="/scheduler" title="Scheduler" component={SchedulerCal} />

								<Route path="/scheduler2" title="Scheduler2" component={SchedulerfCal} />
								<Route path="/kanban/scrumboard" title="Scrumboard" component={Scrumboard} />

								<Route path="/kanban/kanban" title="Card" component={Card} />								
								<Route path="/kanban/kanban" title="Listkanban" component={Listkanban} />																
								<Route path="/kanban/kanban" title="Kanban" component={Kanban} />																
								<Route path= '/clinic/tickets' title="GridTicket" component={GridTicket}   /> 

								<ProtectedRoute
									path="/clinic/reqforappointments/:id"
									title="ReqForAppointment"
									component={reqForAppointment}
								/>

								<ProtectedRoute
									path="/clinic/reqforappointments"
									title="ReqForAppointments"
									component={reqforappointmentTable}
								/>

                                <ProtectedRoute
									path="/clinic/appointments/:id"
									title="Appointment"
									component={Appointment}
								/>

								<ProtectedRoute
									path="/clinic/appointments"
									title="ReqForAppointments"
									component={AppointmentTable}
								/>


                                <ProtectedRoute
									path="/ticket/ticketprofile"
									title="ticketProfile"
									component={ticketProfile}
								/>


								<ProtectedRoute path="/clinic/grid-tickets" title="grid-tickets" component={GridTicket} />

								<Route path="/clinic/add_tcmsession" title="TCM Session" component={TCMSession} />
								<Route path="/email/inbox" title="Email Inbox" component={EmailInbox} />
								<Route path="/email/compose" title="Email Compose" component={EmailCompose} />
								<Route path="/email/detail" title="Email Detail" component={EmailDetail} />
								<Route path="/widgets" title="Widgets" component={Widgets} />
								<Route path="/ui/general" title="UI General" component={UIGeneral} />
								<Route path="/ui/typography" title="UI Typography" component={UITypography} />
								<Route path="/ui/tabs-accordion" title="UI Tabs Accordion" component={UITabsAccordion} />
								<Route
									path="/ui/modal-notification"
									title="UI Modal Notification"
									component={UIModalNotification}
								/>
								<Route path="/ui/widget-boxes" title="UI Widget Boxes" component={UIWidgetBoxes} />
								<Route path="/ui/media-object" title="UI Media Object" component={UIMediaObject} />
								<Route path="/ui/buttons" title="UI Buttons" component={UIButtons} />
								<Route path="/ui/icons" title="UIIcons" component={UIIcons} />
								<Route path="/ui/simple-line-icons" title="UISimpleLineIcons" component={UISimpleLineIcons} />
								<Route path="/ui/ionicons" title="UIIonicons" component={UIIonicons} />
								<Route path="/ui/language-bar-icon" title="UILanguageBarIcon" component={UILanguageBarIcon} />
								<Route path="/ui/social-buttons" title="UISocialButtons" component={UISocialButtons} />
								<Route path="/bootstrap-4" title="Bootstrap4" component={Bootstrap4} />
								<Route path="/form/elements" title="FormElements" component={FormElements} />
								<Route path="/form/wizards" title="FormWizards" component={FormWizards} />
								<Route path="/form/form" title="FormPlugins" component={FormPlugins} />
								<Route path="/table/basic" title="TableBasic" component={TableBasic} />
								<Route path="/table/data" title="Table" component={Table} />
								<Route path="/pos/customer-order" title="PosCustomerOrder" component={PosCustomerOrder} />
								<Route path="/pos/kitchen-order" title="PosKitchenOrder" component={PosKitchenOrder} />
								<Route path="/pos/counter-checkout" title="PosCounterCheckout" component={PosCounterCheckout} />
								<Route path="/pos/table-booking" title="PosTableBooking" component={PosTableBooking} />
								<Route path="/pos/menu-stock" title="PosMenuStock" component={PosMenuStock} />
								<Route path="/chart/js" title="ChartJS" component={ChartJS} />
								<Route path="/chart/d3" title="ChartD3" component={ChartD3} />
								<Route path="/chart/apex" title="ChartApex" component={ChartApex} />

								<Route path="/map" title="Map" component={Map} />
								<Route path="/gallery" title="Gallery" component={Gallery} />
								<Route path="/page-option/with-footer" title="PageWithFooter" component={PageWithFooter} />
								<Route
									path="/page-option/without-sidebar"
									title="PageWithoutSidebar"
									component={PageWithoutSidebar}
								/>
								<Route
									path="/page-option/with-right-sidebar"
									title="PageWithRightSidebar"
									component={PageWithRightSidebar}
								/>
								<Route
									path="/page-option/with-minified-sidebar"
									title="PageWithMinifiedSidebar"
									component={PageWithMinifiedSidebar}
								/>
								<Route
									path="/page-option/with-two-sidebar"
									title="PageWithTwoSidebar"
									component={PageWithTwoSidebar}
								/>
								<Route path="/page-option/full-height" title="PageFullHeight" component={PageFullHeight} />
								<Route
									path="/page-option/with-wide-sidebar"
									title="PageWithWideSidebar"
									component={PageWithWideSidebar}
								/>
								<Route
									path="/page-option/with-light-sidebar"
									title="PageWithLightSidebar"
									component={PageWithLightSidebar}
								/>
								<Route
									path="/page-option/with-mega-menu"
									title="PageWithMegaMenu"
									component={PageWithMegaMenu}
								/>
								<Route path="/page-option/with-top-menu" title="PageWithTopMenu" component={PageWithTopMenu} />
								<Route
									path="/page-option/with-boxed-layout"
									title="PageWithBoxedLayout"
									component={PageWithBoxedLayout}
								/>
								<Route
									path="/page-option/with-mixed-menu"
									title="PageWithMixedMenu"
									component={PageWithMixedMenu}
								/>
								<Route
									path="/page-option/boxed-layout-with-mixed-menu"
									title="PageBoxedLayoutWithMixedMenu"
									component={PageBoxedLayoutWithMixedMenu}
								/>
								<Route
									path="/page-option/with-transparent-sidebar"
									title="PageWithTransparentSidebar"
									component={PageWithTransparentSidebar}
								/>
								<Route
									path="/page-option/with-search-sidebar"
									title="Page With Search Sidebar"
									component={PageWithSearchSidebar}
								/>
								<Route path="/extra/timeline" title="Extra Timeline" component={ExtraTimeline} />
								<Route path="/extra/coming-soon" title="Extra Coming Soon" component={ExtraComingSoon} />
								<Route path="/extra/search" title="Extra Search Results" component={ExtraSearch} />
								<Route path="/extra/invoice" title="Extra Invoice" component={ExtraInvoice} />

								<Provider store={store}>
									<Route path="/user/profile" title="Extra Profile" component={Profile} />
								</Provider>
								<Route path="/extra/scrum-board" title="Extra Scrum Board" component={ExtraScrumBoard} />
								<Route
									path="/extra/cookie-acceptance-banner"
									title="Extra Cookie Acceptance Banner"
									component={ExtraCookieAcceptanceBanner}
								/>
								<Route title="404" component={ExtraError} />
							</Switch>
						</React.Fragment>
					</div>
				)}
			</PageSettings.Consumer>
		);
	}
}

export default withRouter(Content);
