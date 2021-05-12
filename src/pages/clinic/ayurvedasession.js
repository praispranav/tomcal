import React from 'react';
import { Link,withRouter} from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from '../../components/panel/panel.jsx';
import { UncontrolledDropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import ReactTags from 'react-tag-autocomplete';
import DatePicker from 'react-datepicker';
import DateTime from 'react-datetime';
import moment from "moment";
//import Select from 'react-select';
//import Select from "../../common/select";
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'react-datetime/css/react-datetime.css';
import 'react-datepicker/dist/react-datepicker.css';
import Joi from 'joi';
import Form from '../../common/form.jsx';
import {apiUrl} from '../../config/config.json';
import http from '../../services/httpService';
import {saveAyurvedaSession,getAyurvedaSession} from './../../services/tcmsessions';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;


class AyurvedaSession extends Form {
	constructor(props) {
		super(props);

		var maxYesterday = '';
		var minYesterday = DateTime.moment().subtract(1, 'day');

		this.minDateRange = (current) => {
			return current.isAfter(minYesterday);
		};
		this.maxDateRange = (current) => {
			return current.isAfter(maxYesterday);
		};
		this.minDateChange = (value) => {
			this.setState({
				maxDateDisabled: false
			});
			maxYesterday = value;
		};
	
		this.state = {
			maxDateDisabled: true,
			countries: [],
			profiles: [],
			data: {
				username: '',
				password: '',
				email: '',
				firstName: '',
				lastName: '',
				initials: '',
				profile: '',
				country: '',
				// mobilePhone: '',
				date: new Date(),
				gender: '',
				prefix: ''
			},
            selectedFile: null,
			errors: {}
		}

		this.familyRoleOptions = [
			{ value: 'father', label: 'father' },
			{ value: 'mother', label: 'mother' },
			{ value: 'brother', label: 'brother' },
			{ value: 'sister', label: 'sister' },
			{ value: 'twin-brother', label: 'twin-brother' },
			{ value: 'twin-sister', label: 'twin-sister' },
            { value: 'grandpa-father-side', label: 'Grandpa at Father\'s side' },
			{ value: 'gradma-father-side', label: 'Grandma at Father\'s side' },
			{ value: 'grandpa-mother-side', label: 'Grandpa at Mother\'s side' },
            { value: 'grandma-mother-side', label: 'Grandma at Mother\'s side' },
            { value: 'uncle-father-side', label: 'Grandpa at Father\'s side' },
			{ value: 'aunt-father-side', label: 'Grandma at Father\'\s side' },
			{ value: 'uncle-mother-side', label: 'Grandpa at Mother\'s side' },
			{ value: 'aunt-mother-side', label: 'Grandma at Mother\'s side' },
			{ value: 'cousin-father-side', label: 'Cousin at Father\'s side' },
			{ value: 'cousin-mother-side', label: 'Cousin at Mother\'s side' },
			{ value: 'nephew', label: 'Nephew' },
            { value: 'niece', label: 'Niece' },
            { value: 'granduncle-father-side', label: 'Granduncle at Father\'s side' },
			{ value: 'gradaunt-father-side', label: 'Grandaunt at Father\'s side' },
			{ value: 'granduncle-mother-side', label: 'Granduncle at Mother\'s side' },
            { value: 'grandaunt-mother-side', label: 'Grandaunt at Mother\'s side' },

		];

		this.familyDiseaseStatusOptions = [
			{ value: 'cured', label: 'cured' },
			{ value: 'in treatment', label: 'in teratment' },
			{ value: 'died', label: 'died' },
			{ value: 'other', label: 'other' },
		];

		this.currentTreatmentOptions = [
			{ value: 'ayurveda', label: 'ayurveda' },
			{ value: 'homeopathy', label: 'homeopathy' },
			{ value: 'TCM-herbsccu', label: 'Traditional Chinese Medicine (herbs and acu)' },
			{ value: 'acupuncture', label: 'Acupuncture' },			
			{ value: 'chineseherbs', label: 'Chinese Herbs' },						
			{ value: 'regularconventional', label: 'regular/conventional' },
			{ value: 'naturopratic', label: 'naturopratic' },
			{ value: 'tuina', label: 'tuina' },
			{ value: 'reiki', label: 'reiki' },
			{ value: 'bach-flowers', label: 'bach flowers' },			
			{ value: 'osteopathic', label: 'osteopathic' },						
			{ value: 'shiatsu', label: 'shiatsu' },			
			{ value: 'other', label: 'other' },
		];

		this.socialRelationshipOptions = [
			{ value: 'single', label: 'single' },
			{ value: 'divorced', label: 'divorced' },
			{ value: 'widowed', label: 'widowed' },
			{ value: 'separated', label: 'separated' },			
			{ value: 'married', label: 'married' },						
			{ value: 'relationship', label: 'in relationship' },
		];

		this.employmentStatusOptions = [
			{ value: 'fulltime', label: 'fulltime' },
			{ value: 'parttime', label: 'parttime' },
			{ value: 'freelance', label: 'freelance' },
			{ value: 'retired', label: 'retired' },			
			{ value: 'unemployed', label: 'unemployed' },
		];

		this.thermalFeelingOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'chilly', label: 'chilly' },
			{ value: 'hotflush', label: 'hot flush' },
			{ value: 'feverish', label: 'feverish' },			
			{ value: 'nightsweating', label: 'night sweating' },
		];

		this.perspirationOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'frequent', label: 'frequent' },
			{ value: 'absent', label: 'absent' },
			{ value: 'profuse', label: 'profuse' },			
			{ value: 'nightsweating', label: 'night sweating' },
		];

		this.appetiteOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'excess', label: 'excess' },
			{ value: 'poor', label: 'poor' },
			{ value: 'craving', label: 'craving' },			
		];
		this.vomittingOptions = [
			{ value: 'no', label: 'no' },
			{ value: 'yes', label: 'yes' },
			{ value: 'yeswithblood', label: 'yes with blood' },	
		];

		this.dietOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'meat', label: 'meat' },			
			{ value: 'vegetarian', label: 'vegetarian' },
			{ value: 'diversity', label: 'diversity' },			
			{ value: 'processedfood', label: 'processed food' },			
			{ value: 'seafood', label: 'seafood' },
			{ value: 'glutenfree', label: 'gluten-free' },			
			{ value: 'balanced', label: 'balanced' },						
			{ value: 'bionic', label: 'bionic' },						
		];

		this.tasteOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'bitter', label: 'bitter' },			
			{ value: 'sweet', label: 'sweet' },
			{ value: 'greasy', label: 'greasy' },			
			{ value: 'bland', label: 'bland' },							
			{ value: 'acridpungent', label: 'acrid/pungent' },										
		];

		this.thirstOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'excess', label: 'excess' },
			{ value: 'little', label: 'little' },			
			{ value: 'cold', label: 'cold' },			
			{ value: 'hot', label: 'hot' },
		];

		this.defecationOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'diarrhea', label: 'diarrhea' },
			{ value: 'constipated', label: 'constipated' },			
			{ value: 'loose', label: 'loose' },			
			{ value: 'dry', label: 'dry' },
		];

		this.urinationOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'scanty', label: 'scanty' },
			{ value: 'difficult', label: 'difficult' },			
			{ value: 'painful', label: 'painful' },			
			{ value: 'frequent', label: 'frequent' },
			{ value: 'frequentinnight', label: 'frequent in the night' },			
		];

		this.urinationColorOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'yellow', label: 'yellow' },
			{ value: 'darkyellow', label: 'darkyellow' },			
			{ value: 'bloody', label: 'bloody' },			
			{ value: 'white', label: 'white' },
		];

		this.sleepOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'heavy', label: 'heavy' },
			{ value: 'poor', label: 'poor' },			
			{ value: 'restlesness', label: 'restlesness' },			
			{ value: 'dreamed', label: 'dreamed' },
		];

		this.headOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'dizzy', label: 'dizzy' },
			{ value: 'drowsy', label: 'drowsy' },			
			{ value: 'headache', label: 'headache' },			
		];

		this.eyesOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'blurry', label: 'Blurry vision' },
			{ value: 'dry', label: 'dry' },			
			{ value: 'tearing', label: 'tearing' },			
			{ value: 'continent', label: 'Continent' },
			{ value: 'red', label: 'Red' },
			{ value: 'yellow', label: 'Yellow' },			
			{ value: 'lazy', label: 'Lazy' },			
			{ value: 'colorblindness', label: 'Colorblindness' },						
			{ value: 'lightsensitivity', label: 'Lightsensitivity' },
			{ value: 'floaters', label: 'Floaters' },
			{ value: 'discharge', label: 'discharge' },			
			{ value: 'pink', label: 'Pink' },			
			{ value: 'watery', label: 'Watery' },			
		];

		this.earOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'earringing', label: 'ear ringing' },
			{ value: 'poorhearing', label: 'poor hearing' },			
			{ value: 'pain', label: 'pain' },			
			{ value: 'discharge', label: 'discharge' },
		];

		this.noseOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'dry', label: 'dry' },
			{ value: 'runnynose', label: 'runny nose' },			
			{ value: 'blockedsensation', label: 'blocked sensation' },			
			{ value: 'discharge', label: 'discharge' },
			{ value: 'nasalstuffiness', label: 'nasal stuffiness' },
			{ value: 'nasalcongestion', label: 'nasal congestion' },
			{ value: 'reduced sense of smell', label: 'reduced sense of smell' },			
			{ value: 'loose of smell', label: 'loose of smell' },						
			{ value: 'snorring', label: 'snorring' },			
			{ value: 'bleeding', label: 'bleeding' },
			{ value: 'postnasaldrip', label: 'postnasal drip' },
			{ value: 'breathingthroughyourmouth', label: 'breathing through your mouth' },			
			{ value: 'feelingofpressureforeheadorface', label: 'a feeling of pressure in your forehead or face' },			
		];

		this.throatOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'dry', label: 'dry' },
			{ value: 'soar', label: 'soar' },			
			{ value: 'difficultyswallow', label: 'difficulty swallow' },			
			{ value: 'obstructivefeeling', label: 'obstructive feeling' },
			{ value: 'swollen', label: 'swollen' },			
		];

		this.menstruationOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'absent', label: 'absent' },
			{ value: 'irregular', label: 'irregular' },			
			{ value: 'usingpill', label: 'using birth-control-pill' },			
		];

		this.leukorrheaOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'thick', label: 'thick' },
			{ value: 'watery', label: 'watery' },			
			{ value: 'profuse', label: 'profuse' },			
			{ value: 'yellowish', label: 'yellowish' },
			{ value: 'clear', label: 'clear' },			
			{ value: 'odor', label: 'odor' },
		];
		this.naturePainOptions = [
			{ value: 'distending', label: 'distending' },
			{ value: 'sharp/pricking like needles', label: 'sharp/pricking like needles' },
			{ value: 'dull', label: 'dull' },			
			{ value: 'hollow', label: 'hollow' },			
			{ value: 'fixed', label: 'fixed' },
			{ value: 'movable', label: 'movable' },			
			{ value: 'lumb/numbness', label: 'lumb/numbness' },
			{ value: 'distending', label: 'distending' },
			{ value: 'sharp/pricking like needles', label: 'sharp/pricking like needles' },
			{ value: 'nodule', label: 'nodule' },			
			{ value: 'dislike pressure', label: 'dislike pressure' },			
			{ value: 'prefer cold', label: 'prefer cold' },
			{ value: 'prefer hot', label: 'prefer hot' },			
			{ value: 'radiating', label: 'radiating' },
			{ value: 'weighty', label: 'weighty' },			
			{ value: 'colickly', label: 'colickly' },
			{ value: 'burning', label: 'burning' },			
			{ value: 'normal', label: 'normal' },			
		];

		this.emotionalStatusOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'unhappy/sad', label: 'unhappy/sad' },
			{ value: 'happy', label: 'happy' },			
			{ value: 'stressed', label: 'stressed' },			
			{ value: 'depressed', label: 'depressed' },
			{ value: 'lonely', label: 'lonely' },			
			{ value: 'melancholy', label: 'melancholy' },			
			{ value: 'angry', label: 'angry' },			
		];

		this.respirationOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'lower', label: 'lower' },
			{ value: 'heavy feeble', label: 'heavy feeble' },			
			{ value: 'wheezing or breathing noisily', label: 'wheezing or breathing noisily' },						
		];

		this.speechOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'shallow', label: 'shallow' },
			{ value: 'louder', label: 'louder' },			
			{ value: 'feeble', label: 'feeble' },			
		];

		this.coughOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'coarse', label: 'coarse' },
			{ value: 'spurum', label: 'spurum' },			
			{ value: 'dry', label: 'dry' },						
			{ value: 'feeble', label: 'feeble' },			
		];

		this.odorOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'stinky', label: 'stinky' },
			{ value: 'foul', label: 'foul' },			
			{ value: 'sour', label: 'sour' },			
		];

		this.vitalityOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'dispirited', label: 'dispirited' },
			{ value: 'hyperactive depressed', label: 'hyperactive depressed' },			
			{ value: 'anxious', label: 'anxious' },			
			{ value: 'stressed', label: 'stressed' },						
		];

		this.appearanceOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'heavy', label: 'heavy' },
			{ value: 'fat', label: 'fat' },			
			{ value: 'medium', label: 'medium' },			
			{ value: 'slim', label: 'slim' },						
			{ value: 'strong', label: 'strong' },
			{ value: 'weak', label: 'weak' },			
		];

		this.colorLustreFaceOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'pale', label: 'pale' },
			{ value: 'yellow', label: 'yellow' },			
			{ value: 'red', label: 'red' },			
			{ value: 'blue', label: 'blue' },						
			{ value: 'dark-gray', label: 'dark-gray' },
		];

		this.tongueShapeOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'deviated', label: 'deviated' },
			{ value: 'toothmarks', label: 'toothmarks' },			
			{ value: 'cracked in the center vertically', label: 'cracked in the center vertically' },			
			{ value: 'long', label: 'long' },						
			{ value: 'thin', label: 'thin' },
			{ value: 'stiff', label: 'stiff' },
			{ value: 'flappy', label: 'flappy' },			
			{ value: 'cracked over the whole tongue', label: 'cracked over the whole tongue' },			
		];

		this.tongueColorOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'white swollen', label: 'white swollen' },
			{ value: 'thin rigid', label: 'thin rigid' },			
			{ value: 'flaccid pale', label: 'flaccid pale' },			
			{ value: 'red thick', label: 'red thick' },						
			{ value: 'greasy', label: 'greasy' },
			{ value: 'yellow cracked', label: 'yellow cracked' },
			{ value: 'white coating', label: 'white coating' },						
			{ value: 'yellow coating', label: 'yellow coating' },						
			{ value: 'gray coating', label: 'gray coating' },			
			{ value: 'black coating', label: 'black coating' },			
			{ value: 'purple', label: 'purple' },					
		];

		this.tongueQualityOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'thin', label: 'thin' },			
			{ value: 'thick', label: 'thick' },									
			{ value: 'dry', label: 'dry' },		
			{ value: 'wet/moist', label: 'wet/moist' },
			{ value: 'peeled', label: 'peeled' },					
		];

		this.pulseQualityOptions = [
			{ value: 'normal (four beats /breath)', label: 'normal (four beats /breath)' },
			{ value: 'slow (chi mai 迟脉)', label: 'slow (chi mai 迟脉)' },			
			{ value: 'mild slow', label: 'mild slow' },									
			{ value: 'mild rapid', label: 'mild rapid' },		
			{ value: 'rapid (shu mai數脈)', label: 'rapid (shu mai數脈)' },
		];

		this.pulseDepthOptions = [
			{ value: 'normal (four beats /breath)', label: 'normal (four beats /breath)' },
			{ value: 'superficial (fu mai 浮脉)', label: 'superficial (fu mai 浮脉)' },			
			{ value: 'deep (chen mai 沉脉)', label: 'deep (chen mai 沉脉)' },									
		];

		this.pulseStrengthOptions = [
			{ value: 'normal (four beats /breath)', label: 'normal (four beats /breath)' },
			{ value: 'excess (shi mai 实脉)', label: 'excess (shi mai 实脉)' },			
			{ value: 'deficiency (xu mai虚脉)', label: 'deficiency (xu mai虚脉)' },									
		];

		this.pulseTensionOptions = [
			{ value: 'normal (four beats /breath)', label: 'normal (four beats /breath)' },
			{ value: 'wiry (xian/xuan mai弦脉)', label: 'wiry (xian/xuan mai弦脉)' },			
			{ value: 'tense (jin mai紧脉)', label: 'tense (jin mai紧脉)' },									
			{ value: 'soft (ru mai濡脉)', label: 'soft (ru mai濡脉)' },			
			{ value: 'weak (ruo mai弱脉)', label: 'weak (ruo mai弱脉)' },									
		];

		this.pulseRhythmOptions = [
			{ value: 'normal (four beats /breath)', label: 'normal (four beats /breath)' },
			{ value: 'abrupt (cu mai促脉)', label: 'abrupt (cu mai促脉)' },			
			{ value: 'knotted (jie mai结脉)', label: 'knotted (jie mai结脉)' },									
			{ value: 'regularly intermitten (dai mai代脉)', label: 'regularly intermitten (dai mai代脉)' },			
		];
		
		this.physicalAppearanceQualityOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'discoloration', label: 'discoloration' },			
			{ value: 'swelling', label: 'swelling' },									
			{ value: 'edema', label: 'edema' },		
			{ value: 'atrophy', label: 'atrophy' },				
		];

		this.palpationEpigastriumOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'hard', label: 'hard' },			
			{ value: 'soft', label: 'soft' },									
		];

		this.palpationAbdomenOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'distension and fullness', label: 'distension and fullness' },			
			{ value: 'fullness like a rubber bag', label: 'fullness like a rubber bag' },									
		];

		this.rangeMotionOptions = [
			{ value: 'cervical', label: 'cervical' },
			{ value: 'lumbar', label: 'lumbar' },			
			{ value: 'shoulder', label: 'shoulder' },									
			{ value: 'elbow', label: 'elbow' },												
			{ value: 'hip', label: 'hip' },															
			{ value: 'knee', label: 'knee' },																		
			{ value: 'ankle', label: 'ankle' },																					
		];

		
		this.handleSlider = (props) => {
			const { value, dragging, index, ...restProps } = props;
			return (
				<Tooltip
					prefixCls="rc-slider-tooltip"
					overlay={value}
					visible={dragging}
					placement="top"
					key={index}
				>
					<Handle value={value} {...restProps} />
				</Tooltip>
			);
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.onChangeImgHandler = this.onChangeImgHandler.bind(this);
	}


	async populateCountries() {
		const { data: countries } = await http.get(apiUrl+"/countries");
		this.setState({ countries: countries });
		//this.selectCountries = this.state.countries.map((country)=>({label: country.name, value: country.name}) );
		this.selectCountries = this.state.countries.map((country) => ({ _id: country._id,label: country.name, value: country.name }));
	}
	async populateAccounType() {
	const { data: profiles } = await http.get(apiUrl+"/profiles");
	this.setState({ profiles });
	//this.selectProfiles = this.state.profiles.map((profile)=>({label: profile.profileName, value: profile._id}) );
	this.selectProfiles = this.state.profiles.map(option => (
		<option key={option._id} value={option._id}>
			{option.profileName}
		</option>
	));
	}
	
	async populateFamilyRoleOptions(){
		this.familyRoleoptions = this.familyRoleOptions.map(option => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	
	async populateFamilyDiseaseStatusOptions(){
		this.familyDiseaseStatusoptions = this.familyDiseaseStatusOptions.map(option => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	
	async populateSocialRelationshipOptions(){
    this.socialRelationshipoptions = this.socialRelationshipOptions.map(option => (
		<option key={option.label} value={option.value}>
			{option.value}
		</option>
	));
	}

	async populateEmploymentStatusOptions(){
		this.employmentStatusoptions = this.employmentStatusOptions.map(option => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	
	async populateThermalFeelingOptions(){
		this.thermalFeelingoptions = this.thermalFeelingOptions.map(option => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	
	async populateCurrentTreatmentOptions(){
		this.currentTreatmentoptions = this.currentTreatmentOptions.map(option => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	
	async populatePerspirationOptions(){
    this.perspirationoptions = this.perspirationOptions.map(option => (
		<option key={option.label} value={option.value}>
			{option.value}
		</option>
	));
	}

	async populateFamilyRoleOptions(){
		this.familyRoleoptions = this.familyRoleOptions.map(option => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	async populateAppetiteOptions(){
		this.appetiteoptions = this.appetiteOptions.map(option => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	async populateVomittingOptions(){
		this.vomittingoptions = this.vomittingOptions.map(option => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	
	async populateSocialRelationshipOptions(){
    this.socialRelationshipoptions = this.socialRelationshipOptions.map(option => (
		<option key={option.label} value={option.value}>
			{option.value}
		</option>
	));
	}

	async populateDietOptions(){
		this.dietoptions = this.dietOptions.map(option => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	
	async populateTasteOptions(){
		this.tasteoptions = this.tasteOptions.map(option => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	
	async populateThirstOptions(){
		this.thirstoptions = this.thirstOptions.map(option => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	
	async populateDefecationOptions(){
    this.defecationoptions = this.defecationOptions.map(option => (
		<option key={option.label} value={option.value}>
			{option.value}
		</option>
	));
	}

	async populateUrinationOptions(){
		this.urinationoptions = this.urinationOptions.map(option => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}

	async populateUrinationColorOptions(){
		this.urinationColoroptions = this.urinationColorOptions.map(option => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	
	async populateSleepOptions(){
		this.sleepoptions = this.sleepOptions.map(option => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	
	async populateHeadOptions(){
    this.headoptions = this.headOptions.map(option => (
		<option key={option.label} value={option.value}>
			{option.value}
		</option>
	));
	}

	async populateEyesOptions(){
		this.eyesoptions = this.eyesOptions.map(option => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	
	async populateEarOptions(){
		this.earoptions = this.earOptions.map(option => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	
	async populateNoseOptions(){
		this.noseoptions = this.noseOptions.map(option => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	
	async populateThroatOptions(){
    this.throatoptions = this.throatOptions.map(option => (
		<option key={option.label} value={option.value}>
			{option.value}
		</option>
	));
	}

	async populateMenstruationOptions(){
		this.menstruationoptions = this.menstruationOptions.map(option => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	async populateleukorrheaOptions(){
		this.leukorrheaoptions = this.leukorrheaOptions.map(option => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	async populateNaturePainOptions(){
		this.naturePainoptions = this.naturePainOptions.map(option => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	
	async populateEmotionalStatusOptions(){
    this.emotionalStatusoptions = this.emotionalStatusOptions.map(option => (
		<option key={option.label} value={option.value}>
			{option.value}
		</option>
	));
	}

	async populateRespirationOptions(){
		this.respirationoptions = this.respirationOptions.map(option => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	
	async populateSpeechOptions(){
		this.speechoptions = this.speechOptions.map(option => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	
	async populateCoughOptions(){
		this.coughoptions = this.coughOptions.map(option => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	
	async populateOdorOptions(){
    this.odoroptions = this.odorOptions.map(option => (
		<option key={option.label} value={option.value}>
			{option.value}
		</option>
	));
	}

	async populateVitalityOptions(){
		this.vitalityoptions = this.vitalityOptions.map(option => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}

	async populateAppearanceOptions(){
		this.appearanceoptions = this.appearanceOptions.map(option => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	
	async populateColorLustreFaceOptions(){
		this.colorLustreFaceoptions = this.colorLustreFaceOptions.map(option => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	
	async populatePulses(){
		this.pulseoptions = this.pulseOptions.map(option => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	async populateTongues(){
    this.tongueoptions = this.tongueOptions.map(option => (
		<option key={option.label} value={option.value}>
			{option.value}
		</option>
	));
	}

	async populateUser() { 
		try {
		  const userId = this.props.match.params.id;
		
		  if (userId === "new") return;
	
		  const { data: user } = await getUser(userId);

			 //console.log(this.mapToViewModel(user));
			 if(!user.dateBirth) user.dateBirth = new Date();
		
			 user.firstName = user.contactName.first;
			 user.lastName = user.contactName.last;
			 user.initials = user.contactName.initials;
		  this.setState({ data: this.mapToViewModel(user) });

		  console.log(this.state.data);
		} catch (ex) {
		  if (ex.response && ex.response.status === 404)
			this.props.history.replace("/error");
		}
	  }


	async componentDidMount() {
	
		
		//await this.populateProfiles();
		await this.populateMateriaMedicas();		
		await this.populateFamilyRoleOptions();
		await this.populateFamilyDiseaseStatusOptions();
		await this.populateCurrentTreatmentOptions();
		await this.populateSocialRelationshipOptions();
		await this.populateEmploymentStatusOptions();
		await this.populateThermalFeelingOptions();		
		await this.populatePerspirationOptions();		
		await this.populateAppetiteOptions();
		await this.populateVomittingOptions();
		await this.populateDietOptions();		
		await this.populateTasteOptions();		
		await this.populateThirstOptions();
		await this.populateDefecationOptions();
		await this.populateUrinationOptions();
		await this.populateUrinationColorOptions();		
		await this.populateSleepOptions();
		await this.populateHeadOptions();		
		await this.populateEyeOptions();		
		await this.populateEarOptions();
		await this.populateNoseOptions();
		await this.populateThroatOptions();
		await this.populateMenstruationOptions();
		await this.populateLeukorrheaOptions();
		await this.populateNaturePainOptions();		
		await this.populateEmotionalStatusOptions();		
		await this.populateRespirationOptions();		
		await this.populateSpeechOptions();				
		await this.populateCoughOptions();		
		await this.populateOdorOptions();
		await this.populateVitalityOptions();		
		await this.populateAppearanceOptions();
		await this.populateColorLustreFaceOptions();				
		await this.populateTongueShapeOptions();		
		await this.populateTongueColorOptions();		
		await this.populateTongueQualityOptions();		
		await this.populatePulseQualityOptions();
		await this.populatePulseDepthOptions();
		await this.populatePulseStrengthOptions();				
		await this.populatePulseTensionOptions();		
		await this.populatePulseRhythmOptions();				
		await this.populatePhysicalAppearanceQualityOptions();		
		await this.populatePalpationEpigastriumOptions();	
		await this.populatePalpationAbdomenOptions();		

		await this.populatePatient();	
		await this.populateTCMTreatments();			
	}

	// schema = Joi.object({
	// 	username: Joi.string().required().label('Username')
	// 	//password: Joi.string().required().label('Password'),
	// 	//email:Joi.string().required().label('Email'),	
	// 	//gender:Joi.string().required().label('Gender'),
	// 	//country:Joi.string().required().label('Country')
	// });

schema = Joi.object({
		  userNo: Joi.string().optional(),
		  clinicNo: Joi.string().optional(),
		  doctorNo: Joi.string().optional(),
		  businessName: Joi.string().optional(),
		  appointmentType: Joi.string().optional(),
		  sessionType: Joi.string().optional(),
		  chiefComplaint: Joi.string().optional(),
		  symptoms: Joi.string().optional(),
		  WesternDisease: Joi.string().optional(),
		  currentTreatment: Joi.string().optional(),
		  diseasesIllnesses: Joi.string().optional(),
		  surgeries: Joi.string().optional(),
		  medicamentsSupplements: Joi.string().optional(),
		  allergies: Joi.string().optional(),
		  pregnancies: Joi.string().optional(),
		  familyRole: Joi.string().optional(),
		  familyDisease: Joi.string().optional(),
		  familyDiseaseYear: Joi.string().optional(),
		  familyDiseaseState: Joi.string().optional(),
		  medicalHistoryNote: Joi.string().optional(),
		  socialRelationship: Joi.string().optional(),
		  habits: Joi.string().optional(),
		  occupation: Joi.string().optional(),
		  occupationState: Joi.string().optional(),
		  sport: Joi.string().optional(),
		  sportFrequency: Joi.string().optional(),
		  hobbies: Joi.string().optional(),
		  smoking: Joi.string().optional(),
		  sugar: Joi.string().optional(),
		  alcohol: Joi.string().optional(),
		  tea: Joi.string().optional(),
		  coffee: Joi.string().optional(),
		  heroin: Joi.string().optional(),
		  vitality: Joi.string().optional(),
		  appearance: Joi.string().optional(),
		  appearanceNote: Joi.string().optional(),
		  faceColorLustre: Joi.string().optional(),
		  tongueShape: Joi.string().optional(),
		  tongueColor: Joi.string().optional(),
		  tongueQuality: Joi.string().optional(),
		  tongueNote: Joi.string().optional(),
		  respiration: Joi.string().optional(),
		  speech: Joi.string().optional(),
		  cough: Joi.string().optional(),
		  odor: Joi.string().optional(),
		  appetite: Joi.string().optional(),
		  appetiteNote: Joi.string().optional(),
		  vomiting: Joi.string().optional(),
		  vomitingNote: Joi.string().optional(),
		  diet: Joi.string().optional(),
		  dietNote: Joi.string().optional(),
		  taste: Joi.string().optional(),
		  thirst: Joi.string().optional(),
		  defecation: Joi.string().optional(),
		  urination: Joi.string().optional(),
		  urineColor: Joi.string().optional(),
		  sleeping: Joi.string().optional(),
		  thermalFeeling: Joi.string().optional(),
		  perspiration: Joi.string().optional(),
		  head: Joi.string().optional(),
		  eyes: Joi.string().optional(),
		  ears: Joi.string().optional(),
		  nose: Joi.string().optional(),
		  throat: Joi.string().optional(),
		  painLocation: Joi.string().optional(),
		  painNature: Joi.string().optional(),
		  menstruationHistory: Joi.string().optional(),
		  leukorrhea: Joi.string().optional(),
		  emotionalStatus: Joi.string().optional(),
		  emotionalNote: Joi.string().optional(),
		  interviewNote: Joi.string().optional(),
		  pulseSpeed: Joi.string().optional(),
		  pulseDepth: Joi.string().optional(),
		  pulseStrength: Joi.string().optional(),
		  pulseShape: Joi.string().optional(),
		  pulseTension: Joi.string().optional(),
		  pulseRhythm: Joi.string().optional(),
		  pulseNote: Joi.string().optional(),
		  physicalAppearance: Joi.string().optional(),
		  physicalPalpationEpigastrium: Joi.string().optional(),
		  physicalPalpationEpigastriumNote: Joi.string().optional(),
		  physicalPalpationAbdomen: Joi.string().optional(),
		  physicalPalpationAcupoint: Joi.string().optional(),
		  rangeMotion: Joi.string().optional(),
		  painLevel: Joi.string().optional(),
		  physicalExaminationNote: Joi.string().optional(),
		  AyurvedaDiagnosis: Joi.string().optional(),
		  principleTreatment: Joi.string().optional(),
		  materiaMedica: Joi.string().optional(),
		  potency: Joi.string().optional(),
		  dietTherapy: Joi.string().optional(),
		  recommendation: Joi.string().optional(),
	
	});

	onChangeImgHandler=event=>{

		this.setState({ imageSrc: event.target.files[0] });
	  console.log(event.target.files[0]);
	
	}


	doSubmit = async (user) => {
		//console.log('working');
	    try{
	
			await saveUser(this.state.data,this.state.imageSrc);
			//console.log(this.state.data);
			this.props.history.push("/clinic/users");
		}catch(ex){
			//if(ex.response && ex.response.status === 404){
			if(ex.response){
				const errors = {...this.state.errors};
				errors.username = ex.response.data;
				this.setState({errors});
				//console.log(this.state.errors);
			}
		}
		
	};
	
	
	mapToViewModel(user) {
		return {
		  _id: user._id,
		  username: user.username,
		  profile: user.profile,
		  email: user.email,
		  createdOn: new Date(user.date),
		  firstName: user.firstName,
		  lastName: user.firstName,
		  initials: user.initials,
		  prefix: user.prefix,
		  country: user.country,
		  appointmentType: user.appointmentType,
		  sessionType: user.sessionType,
		  chiefComplaint: user.chiefComplaint,
		  symptoms: user.symptoms,
		  WesternDisease: user.WesternDisease,
		  currentTreatment: user.currentTreatment,
		  diseasesIllnesses: user.diseasesIllnesses,
		  surgeries: user.surgeries,
		  medicamentsSupplements: user.medicamentsSupplements,
		  allergies: user.allergies,
		  pregnancies: user.pregnancies,
		  familyRole: user.familyRole,
		  familyDisease: user.familyDisease,
		  familyDiseaseYear: user.familyDiseaseYear,
		  familyDiseaseState: user.familyDiseaseState,
		  medicalHistoryNote: user.medicalHistoryNote,
		  socialRelationship: user.socialRelationship,
		  habits: user.habits,
		  occupation: user.occupation,
		  occupationState: user.occupationState,
		  sport: user.sport,
		  sportFrequency: user.sportFrequency,
		  hobbies: user.hobbies,
		  smoking: user.smoking,
		  sugar: user.sugar,
		  alcohol: user.alcohol,
		  tea: user.tea,
		  coffee: user.coffee,
		  heroin: user.heroin,
		  vitality: user.vitality,
		  appearance: user.appearance,
		  appearanceNote: user.appearanceNote,
		  faceColorLustre: user.faceColorLustre,
		  tongueShape: user.tongueShape,
		  tongueColor: user.tongueColor,
		  tongueQuality: user.tongueQuality,
		  tongueNote: user.tongueNote,
		  respiration: user.respiration,
		  speech: user.speech,
		  cough: user.cough,
		  odor: user.odor,
		  appetite: user.appetite,
		  appetiteNote: user.appetiteNote,
		  vomiting: user.vomiting,
		  vomitingNote: user.vomitingNote,
		  diet: user.diet,
		  dietNote: user.dietNote,		  
		  taste: user.taste,
		  thirst: user.thirst,		  
		  defecation: user.defecation,
		  urination: user.urination,		  
		  urineColor: user.urineColor,		  
		  sleeping: user.sleeping,
		  thermalFeeling: user.thermalFeeling,		  
		  perspiration: user.perspiration,		  
		  head: user.head,
		  eyes: user.eyes,
		  ears: user.ears,
		  nose: user.nose,
		  throat: user.throat,		  
		  painLocation: user.painLocation,		  
		  painNature: user.painNature,
		  menstruationHistory: user.menstruationHistory,
		  leukorrhea: user.leukorrhea,		  
		  emotionalStatus: user.emotionalStatus,		  
		  emotionalNote: user.emotionalNote,		  
		  interviewNote: user.interviewNote ,		  
		  pulseSpeed: user.pulseSpeed,
		  pulseDepth: user.pulseDepth,		  
		  pulseStrength: user.pulseStrength,		  
		  pulseShape: user.pulseShape,
		  pulseTension: user.pulseTension,
		  pulseRhythm: user.pulseRhythm,
		  pulseNote: user.pulseNote,		  
		  physicalAppearance: user.physicalAppearance,
		  physicalPalpationEpigastrium: user.physicalPalpationEpigastrium,
		  physicalPalpationEpigastriumNote: user.physicalPalpationEpigastriumNote,		  
		  physicalPalpationAbdomen: user.physicalPalpationAbdomen,
		  physicalPalpationAcupoint: user.physicalPalpationAcupoint,
		  rangeMotion: user.rangeMotion,
		  painLevel: user.painLevel,		  		  
		  physicalExaminationNote: user.physicalExaminationNote,		  
		  AyurvedaDiagnosis: user.AyurvedaDiagnosis,
		  principleTreatment: user.principleTreatment,		  
		  acuPoints: user.acuPoints,		  
		  acuTreatmentNote: user.acuTreatmentNote,		  
		  TDP: user.TDP,		  
		  TDPNote: user.TDPNote,				  
		  moxibustion: user.moxibustion,		  
		  tuina: user.tuina,		  		  
		  herbalFormula1: user.herbalFormula1,		  
		  materiaMedica1: user.materiaMedica1,
		  mmDosage1: user.mmDosage1,
		  mmUnit1: user.mmUnit1,
		  herbalFormula2: user.herbalFormula2,		  
		  materiaMedica2: user.materiaMedica2,
		  mmDosage2: user.mmDosage2,
		  mmUnit2: user.mmUnit2,		  
		  dietTherapy: user.dietTherapy,		  
		  recommendation: user.recommendation,		  		  
		};
	  }


	render() {

		const { data, errors } = this.state;
		return (
			<React.Fragment>
				<div>
					<ol className="breadcrumb float-xl-right">
						<li className="breadcrumb-item"><Link to="/form/plugins">Home</Link></li>
						<li className="breadcrumb-item"><Link to="/clinic/medicalfiles">Medical Files</Link></li>
						<li className="breadcrumb-item active">Add AyurvedaSession</li>
					</ol>
					<h1 className="page-header">
						Add AyurvedaSession
					</h1>

					<div className="row">
						<div className="col-xl-10">
							<Panel>
								<PanelHeader>Add User</PanelHeader>
								<PanelBody className="panel-form">
									<form className="form-horizontal form-bordered" onSubmit={this.handleSubmit} >

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="profile" >Select Account-type</label>
											<div className="col-lg-8">
												<select name="profile" id="profile" value={data.profile} onChange={this.handleChange} className="form-control" >
													<option value="">Select Account-type</option>
													{this.selectProfiles}
												</select>
											</div>
											{errors.profile && (<div className="alert alert-danger">{errors.profile}</div>)}
										</div>


										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="prefix" >Select Prefix</label>
											<div className="col-lg-8">
												<select name="prefix" id="prefix" value={data.prefix} onChange={this.handleChange} className="form-control" >
													<option value="">Select Prefix</option>
													{this.prefixoptions}
												</select>
											</div>
											{errors.prefix && (<div className="alert alert-danger">{errors.prefix}</div>)}
										</div>

										{this.renderInput(
											"firstName",
											"First Name",
											"text",
											"Enter Firstname"
										)}
										{this.renderInput(
											"initials",
											"Initials",
											"text",
											"Enter Initials"
										)}
										{this.renderInput(
											"lastName",
											"Last Name",
											"text",
											"Enter Lastname"
										)}
							

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="gender" >Select Gender</label>
											<div className="col-lg-8">
												<select name="gender" id="gender" value={data.gender} onChange={this.handleChange} className="form-control" >
													<option value="">Select Gender</option>
													{this.genderoptions}
												</select>
											</div>
											{errors.gender && (<div className="alert alert-danger">{errors.gender}</div>)}
										</div>


										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="username">UserName</label>
											<div className="col-lg-8">
												<div className="row row-space-10">
													<input type="text" id="username" name="username"
														value={data.username}
														className="form-control m-b-5"
														placeholder="Enter username"
														onChange={this.handleChange}
														autoFocus />
													{errors.username && (
														<div className="alert alert-danger">
															{errors.username}
														</div>
													)}
												</div>
											</div>
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="imageSrc">Avatar</label>
											<div className="col-lg-8">
												<div className="row row-space-10">
													<input type="file" id="imageSrc" name="imageSrc"
													
														className="form-control-file m-b-5"
														onChange={this.onChangeImgHandler}
													/>
													{errors.imageSrc && (
														<div className="alert alert-danger">
															{errors.imageSrc}
														</div>
													)}
												</div>
											</div>
										</div>

							
										{this.renderInput("email", "Email", "email", "Enter email")}

										{this.renderInput("password", "Password", "password", "Enter Password")}
									

										{this.renderSelect(
											"country",
											"Country",
											this.state.countries
										)}

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="dateBirth" >Date of Birth</label>
											<div className="col-lg-8">
												<DatePicker
													onChange={this.handleDobChange}
													id={data.dateBirth}
													value={data.dateBirth}
													selected={data.dateBirth}
													inputProps={{ placeholder: "Datepicker" }}
													className="form-control"
												/>
												{errors.dateBirth && <div className="alert alert-danger">{errors.dateBirth}</div>}
											</div>
										</div>

										<div className="form-group row">
											<div className="col-lg-8">
												<button	type="submit" disabled={this.validate()} className="btn btn-primary btn-block btn-lg">Submit</button>
											</div>
										</div>
									</form>
								</PanelBody>
							</Panel>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default withRouter(AyurvedaSession);