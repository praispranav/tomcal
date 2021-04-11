const Menu = [
  { path: '/dashboard', icon: 'fa fa-th', title: 'Dashboard',
    children: [
      { path: '/dashboard/v2', title: 'Dashboard TCMFiles' },
      { path: '/dashboard/v2', title: 'Dashboard AI' },	  
      { path: '/dashboard/v2', title: 'Dashboard Ayurveda' },	  	  
      { path: '/dashboard/v2', title: 'Dashboard Homeo' },	  	  
      { path: '/dashboard/v2', title: 'Dashboard Wappsolute' },	  	  	  
      { path: '/dashboard/v2', title: 'Dashboard MedicalFiles' },	  	  	  	  
      { path: '/dashboard/v2', title: 'Dashboard Wellness' },	  
      { path: '/dashboard/v2', title: 'Dashboard Transport' },	  	  
    ]
  },
  { path: '/Calendar & Planning', icon: 'fa fa-calendar', title: 'Calendar & Planning', badge: '10',
    children: [
	  { path: '/calendar', icon: 'fa fa-calendar', title: 'Calendar' },	
      { path: '/clinic/appointments', title: 'Appointments' },
      { path: '/clinic/reqforappointments', title: 'Requests for Appointments' },
      { path: '/clinic/appointments/new', title: 'Add Appointment' },
      { path: '/calendar/scheduler', title: 'Team-scheduler' },	  
    ]
  },

  { path: '/files', icon: 'fa fa-hospital', title: 'Your Drive', badge: '10',
    children: [
      { path: '/drive/yourdrive', title: 'your drive' },
      { path: '/drive/files', title: 'files' },
      { path: '/drive/filemanager/filemanager', title: 'File Manager' },	  
      { path: '/drive/search_drive', title: 'Search in Your drive' },  
    ]
  },
  
  { path: '/Users', icon: 'fa fa-address-book', title: 'Users', badge: '10',
    children: [
      { path: '/clinic/doctors', title: 'Doctors' },
      { path: '/clinic/add_doctor', title: 'Add doctor' },
      { path: '/clinic/search_doctor', title: 'Search in Doctors' },  
      { path: '/clinic/receptions', title: 'receptions' },
      { path: '/clinic/add_reception', title: 'Add reception' },
      { path: '/clinic/search_reception', title: 'Search in Receptions' },  
      { path: '/clinic/accountants', title: 'accountants' },
      { path: '/clinic/add_accountant', title: 'Add accountant' },
      { path: '/clinic/search_accountant', title: 'Search in Accountants' },  
      { path: '/clinic/patients', title: 'patients' },
      { path: '/clinic/add_patient', title: 'Add patient' },
      { path: '/clinic/search_reception', title: 'Search in Patients' },  
      { path: '/clinic/users', title: 'users' },
      { path: '/clinic/user/new', title: 'Add user' },
      { path: '/clinic/user/profile', title: 'Edit Profile' },	  
      { path: '/clinic/search_user', title: 'Search in Users' },  
    ]
  },
    
  { path: '/Clinicsolos', icon: 'fa fa-hospital', title: 'ClinicSolos', badge: '10',
    children: [
      { path: '/clinic/clinicsolos', title: 'clinicsolos' },
      { path: '/clinic/add_clinicsolo', title: 'Add clinicsolo' },
      { path: '/clinic/search_clinicsolo', title: 'Search in clinicsolos' },  
    ]
  },

  { path: '/Medicalfiles', icon: 'fa fa-medkit', title: 'Medical Files', badge: '10',
    children: [
      { path: '/clinic/medicalfiles', title: 'Medical Files' },
      { path: '/clinic/add_tcmsession', title: 'Add session' },
      { path: '/clinic/search_medicalfile', title: 'Search in Medical Files' },  
    ]
  },

  { path: '/treatments', icon: 'fa fa-medkit', title: 'Treatments for TCM', badge: '10',
    children: [
      { path: '/clinic/treatments', title: 'treatments' },
      { path: '/clinic/add_treatment', title: 'Add treatment' },
      { path: '/clinic/search_treatment', title: 'Search in treatments' },  
    ]
  },

  { path: '/Physical Conditions', icon: 'fa fa-child', title: 'Physical Conditions', badge: '10',
    children: [
      { path: '/clinic/physicalconditions', title: 'Physical Conditions' },
      { path: '/clinic/add_physicalcondition', title: 'Add Phisical Condtion of patient' },
    ]
  },
  
  { path: '/accounting', icon: 'fa fa-balance-scale', title: 'Accounting', badge: '10',
    children: [
      { path: '/clinic/invoices', title: 'invoices' },
      { path: '/clinic/add_invoice', title: 'Add invoice' },
      { path: '/clinic/expences', title: 'expences' },	  
      { path: '/clinic/expenses', title: 'Add expense' },  
    ]
  },

  { path: '/tickets', icon: 'fa fa-ticket-alt', title: 'Tickets', badge: '10',
    children: [
      { path: '/clinic/tickets-grid', title: 'Gridview of Tickets' },	
      { path: '/clinic/tickets', title: 'Tickets' },
      { path: '/clinic/add_ticket', title: 'Add ticket' },
      { path: '/clinic/search_ticket', title: 'Search in tickets' },  
    ]
  },
  
  { path: '/database', icon: 'fa fa-database', title: 'database', badge: '10',
    children: [
      { path: '/clinic/treatments', title: 'treatments' },
      { path: '/clinic/clinicsolos', title: 'clinics & Solos' },
      { path: '/clinic/currencies', title: 'currencies' },
      { path: '/clinic/titles', title: 'Titles' },
      { path: '/clinic/reservedNames', title: 'Reserved Names' },
      { path: '/clinic/meridians', title: 'Meridians' },
      { path: '/clinic/acupuncture', title: 'Acupuncture' },  	  
      { path: '/clinic/materiamedica', title: 'Materia Medica' },  	  	  
      { path: '/clinic/formulas', title: 'Formulas' },  	  	  	  
    ]
  },

  { path: '/database', icon: 'fa fa-book', title: 'Homeopathy-books', badge: '10',
    children: [
      { path: '/clinic/allen', title: 'Allen' },
      { path: '/clinic/boericke', title: 'Boericke' },
      { path: '/clinic/boger', title: 'Boger' },
      { path: '/clinic/clarke', title: 'Clarke' },	  
      { path: '/clinic/dunham', title: 'Dunham' },
      { path: '/clinic/farrington', title: 'Farrington' },
      { path: '/clinic/guernsey', title: 'Guernsey' },  	  
      { path: '/clinic/hahnemann', title: 'Hahnemann' },  	  	  
      { path: '/clinic/hering', title: 'Hering' },
      { path: '/clinic/kent', title: 'Kent' },
      { path: '/clinic/lippe', title: 'Lippe' },
      { path: '/clinic/mure', title: 'Mure' },	  
      { path: '/clinic/nash', title: 'Nash' },
    ]
  },
  
  { path: '/Salons', icon: 'fa fa-building', title: 'Salons', badge: '10',
    children: [
      { path: '/clinic/salons', title: 'Salons' },
      { path: '/clinic/add_salon', title: 'Add salon' },
      { path: '/clinic/search_reception', title: 'Search in Salons' },  
    ]
  },
  
  { path: '/Products', icon: 'fa fa-calendar', title: 'Products', badge: '10',
    children: [
      { path: '/clinic/products-b', title: 'Products Beauty' },
      { path: '/clinic/add_productb', title: 'Add Product' },
      { path: '/clinic/search_product', title: 'Search in Products' },  
    ]
  },
  { path: '/Treatments', icon: 'fa fa-calendar', title: 'Treatments', badge: '10',
    children: [
      { path: '/clinic/treatments-b', title: 'Treatments for Salon' },
      { path: '/clinic/add_treatmentb', title: 'Add Treatment' },
      { path: '/clinic/search_treatmentb', title: 'Search in Treatments for Salon' },  
    ]
  },
  { path: '/labels', icon: 'fa fa-ticket-alt', title: 'Labels',
    children: [
      { path: '/label/labels-grid', title: 'Gridview of Labels' },	
      { path: '/label/labels', title: 'Labels' },
    ]
  },

  { path: '/email', icon: 'fa fa-hdd', title: 'Email', badge: '10',
    children: [
      { path: '/email/inbox', title: 'Inbox' },
      { path: '/email/compose', title: 'Compose' },
      { path: '/email/detail', title: 'Detail' }
    ]
  },
  { path: '/kanban', icon: 'fa fa-columns', title: 'Kanban',
    children: [
      { path: '/kanban/kanban', title: 'Kanban', highlight: true },
    ]
  },
  
  { path: '/widgets', icon: 'fab fa-simplybuilt', title: 'Widgets', label: 'NEW' },
  { path: '/ui', icon: 'fa fa-gem', title: 'UI Elements', label: 'NEW',
    children: [
      { path: '/ui/general', title: 'General', highlight: true },
      { path: '/ui/typography', title: 'Typograhy' },
      { path: '/ui/tabs-accordion', title: 'Tabs & Accordion' },
      { path: '/ui/modal-notification', title: 'Modal & Notification' },
      { path: '/ui/widget-boxes', title: 'Widget Boxes' },
      { path: '/ui/media-object', title: 'Media Object' },
      { path: '/ui/buttons', title: 'Buttons', highlight: true },
      { path: '/ui/icons', title: 'Icons' },
      { path: '/ui/simple-line-icons', title: 'Simple Line Icons' },
      { path: '/ui/ionicons', title: 'Ionicons' },
      { path: '/ui/language-bar-icon', title: 'Language Bar & Icon' },
      { path: '/ui/social-buttons', title: 'Social Buttons' }
    ]
  },
  { path: '/bootstrap-4', img: '/assets/img/logo/logo-bs4.png', title: 'Bootstrap 4', label: 'NEW' },
  { path: '/form', icon: 'fa fa-list-ol', title: 'Form Stuff', label: 'NEW',
    children: [
      { path: '/form/elements', title: 'Form Elements', highlight: true },
      { path: '/form/add_clinicsolo', title: 'Add clinicsolo', highlight: true },
      { path: '/form/wizards', title: 'Form Wizards', highlight: true }
    ]
  },
  { path: '/table', icon: 'fa fa-table', title: 'Tables',
    children: [
      { path: '/table/basic', title: 'Basic Tables' },
      { path: '/table/data', title: 'Data Tables' }
    ]
  },
  { path: '/pos', icon: 'fa fa-cash-register', title: 'POS System', label: 'NEW',
    children: [
      { path: '/pos/customer-order', title: 'POS - Customer Order' },
      { path: '/pos/kitchen-order', title: 'POS - Kitchen Order' },
      { path: '/pos/counter-checkout', title: 'POS - Counter Checkout' },
      { path: '/pos/table-booking', title: 'POS - Table Booking' },
      { path: '/pos/menu-stock', title: 'POS - Menu Stock' },
    ]
  },
  { path: '/frontend', icon: 'fa fa-star', title: 'FrontEnd',
    children: [
      { path: '/frontend/one-page-parallax', title: 'One Page Parallax' },
      { path: '/frontend/blog', title: 'Blog' },
      { path: '/frontend/forum', title: 'Forum' },
      { path: '/frontend/e-commerce', title: 'E-Commerce' }
    ]
  },
  { path: '/email-template', icon: 'fa fa-envelope', title: 'Email Template',
    children: [
      { path: '/email-template/system', title: 'System Template' },
      { path: '/email-template/newsletter', title: 'Newsletter Template' }
    ]
  },
  { path: '/chart', icon: 'fa fa-chart-pie', title: 'Chart', label: 'NEW',
    children: [
      { path: '/chart/js', title: 'Chart JS' },
      { path: '/chart/d3', title: 'd3 Chart' },
      { path: '/chart/apex', title: 'Apex Chart', highlight: true }
    ]
  },
  { path: '/calendar', icon: 'fa fa-calendar', title: 'Calendar' },
  { path: '/map', icon: 'fa fa-map', title: 'Map' },
  { path: '/gallery', icon: 'fa fa-image', title: 'Gallery' },
  { path: '/page-option', icon: 'fa fa-cogs', title: 'Page Options', label: 'NEW',
    children: [
      { path: '/page-option/blank', title: 'Blank Page' },
      { path: '/page-option/with-footer', title: 'Page with Footer' },
      { path: '/page-option/without-sidebar', title: 'Page without Sidebar' },
      { path: '/page-option/with-right-sidebar', title: 'Page with Right Sidebar' },
      { path: '/page-option/with-minified-sidebar', title: 'Page with Minified Sidebar' },
      { path: '/page-option/with-two-sidebar', title: 'Page with Two Sidebar' },
      { path: '/page-option/full-height', title: 'Full Height Content' },
      { path: '/page-option/with-wide-sidebar', title: 'Page with Wide Sidebar' },
      { path: '/page-option/with-light-sidebar', title: 'Page with Light Sidebar' },
      { path: '/page-option/with-mega-menu', title: 'Page with Mega Menu' },
      { path: '/page-option/with-top-menu', title: 'Page with Top Menu' },
      { path: '/page-option/with-boxed-layout', title: 'Page with Boxed Layout' },
      { path: '/page-option/with-mixed-menu', title: 'Page with Mixed Menu' },
      { path: '/page-option/boxed-layout-with-mixed-menu', title: 'Boxed Layout with Mixed Menu' },
      { path: '/page-option/with-transparent-sidebar', title: 'Page with Transparent Sidebar' },
      { path: '/page-option/with-search-sidebar', title: 'Page with Search Sidebar', highlight: true }
    ]
  },
  { path: '/extra', icon: 'fa fa-gift', title: 'Extra', label: 'NEW',
    children: [
      { path: '/extra/timeline', title: 'Timeline' },
      { path: '/extra/coming-soon', title: 'Coming Soon Page' },
      { path: '/extra/search', title: 'Search Results' },
      { path: '/extra/invoice', title: 'Invoice' },
      { path: '/extra/error', title: '404 Error Page' },
      { path: '/extra/profile', title: 'Profile Page' },
      { path: '/extra/scrum-board', title: 'Scrum Board', highlight: true },
      { path: '/extra/cookie-acceptance-banner', title: 'Cookie Acceptance Banner', highlight: true },
    ]
  },
  { path: '/clinicsolo', icon: 'fa fa-key', title: 'Login & Register',
    children: [
      { path: '/clinicsolo/login-v1', title: 'Login' },
      { path: '/clinicsolo/login-v2', title: 'Login v2' },
      { path: '/clinicsolo/login-v3', title: 'Login v3' },
      { path: '/clinicsolo/register-v3', title: 'Register v3' }
    ]
  },
  { path: '/version', icon: 'fa fa-cubes', title: 'Version', label: 'NEW',
    children: [
      { path: '/version/html', title: 'HTML' },
      { path: '/version/ajax', title: 'AJAX' },
      { path: '/version/angularjs', title: 'ANGULAR JS' },
      { path: '/version/angularjs10', title: 'ANGULAR JS 10' },
      { path: '/version/laravel', title: 'LARAVEL' },
      { path: '/version/material', title: 'MATERIAL DESIGN' },
      { path: '/version/apple', title: 'APPLE DESIGN' },
      { path: '/version/transparent', title: 'TRANSPARENT DESIGN', highlight: true },
      { path: '/version/facebook', title: 'FACEBOOK DESIGN', highlight: true },
      { path: '/version/google', title: 'GOOGLE DESIGN', highlight: true }
    ]
  },
  { path: '/helper', icon: 'fa fa-medkit', title: 'Helper',
    children: [
      { path: '/helper/css', title: 'Predefined CSS Classes' }
    ]
  },
  { path: '/menu', icon: 'fa fa-align-left', title: 'Menu Level',
    children: [
      { path: '/menu/menu-1-1', title: 'Menu 1.1',
        children: [
          { path: '/menu/menu-1-1/menu-2-1', title: 'Menu 2.1',
            children: [
              { path: '/menu/menu-1-1/menu-2-1/menu-3-1', title: 'Menu 3.1' },
              { path: '/menu/menu-1-1/menu-2-1/menu-3-2', title: 'Menu 3.2' }
            ]
          },
          { path: '/menu/menu-1-1/menu-2-2', title: 'Menu 2.2' },
          { path: '/menu/menu-1-1/menu-2-3', title: 'Menu 2.3' },
        ]
      },
      { path: '/menu/menu-1-2', title: 'Menu 1.2' },
      { path: '/menu/menu-1-3', title: 'Menu 1.3' },
    ]
  },
]

export default Menu;
