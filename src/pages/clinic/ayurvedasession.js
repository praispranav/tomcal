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

		this.earsOptions = [
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
	
	async populateEarsOptions(){
		this.earsoptions = this.earsOptions.map(option => (
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
		await this.populateEyesOptions();		
		await this.populateEarsOptions();
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


	doSubmit = async (ayurvedasession) => {
		//console.log('working');
	    try{
	
			await saveUser(this.state.data,this.state.imageSrc);
			//console.log(this.state.data);
			this.props.history.push("/clinic/ayurvedasessions");
		}catch(ex){
			//if(ex.response && ex.response.status === 404){
			if(ex.response){
				const errors = {...this.state.errors};
				errors.ayurvedasessionname = ex.response.data;
				this.setState({errors});
				//console.log(this.state.errors);
			}
		}
		
	};
	
	
	mapToViewModel(ayurvedasession) {
		return {
		  _id: ayurvedasession._id,
		  profile: ayurvedasession.profile,
		  email: ayurvedasession.email,
		  firstName: ayurvedasession.firstName,
		  lastName: ayurvedasession.firstName,
		  initials: ayurvedasession.initials,
		  prefix: ayurvedasession.prefix,
		  country: ayurvedasession.country,
		  appointmentType: ayurvedasession.appointmentType,
		  sessionType: ayurvedasession.sessionType,
		  chiefComplaint: ayurvedasession.chiefComplaint,
		  symptoms: ayurvedasession.symptoms,
		  WesternDisease: ayurvedasession.WesternDisease,
		  currentTreatment: ayurvedasession.currentTreatment,
		  diseasesIllnesses: ayurvedasession.diseasesIllnesses,
		  surgeries: ayurvedasession.surgeries,
		  medicamentsSupplements: ayurvedasession.medicamentsSupplements,
		  allergies: ayurvedasession.allergies,
		  pregnancies: ayurvedasession.pregnancies,
		  familyRole: ayurvedasession.familyRole,
		  familyDisease: ayurvedasession.familyDisease,
		  familyDiseaseYear: ayurvedasession.familyDiseaseYear,
		  familyDiseaseState: ayurvedasession.familyDiseaseState,
		  medicalHistoryNote: ayurvedasession.medicalHistoryNote,
		  socialRelationship: ayurvedasession.socialRelationship,
		  habits: ayurvedasession.habits,
		  occupation: ayurvedasession.occupation,
		  occupationState: ayurvedasession.occupationState,
		  sport: ayurvedasession.sport,
		  sportFrequency: ayurvedasession.sportFrequency,
		  hobbies: ayurvedasession.hobbies,
		  smoking: ayurvedasession.smoking,
		  sugar: ayurvedasession.sugar,
		  alcohol: ayurvedasession.alcohol,
		  tea: ayurvedasession.tea,
		  coffee: ayurvedasession.coffee,
		  heroin: ayurvedasession.heroin,
		  weight: physicalcondition.weight,
		  height: physicalcondition.height,
		  vitality: ayurvedasession.vitality,
		  appearance: ayurvedasession.appearance,
		  appearanceNote: ayurvedasession.appearanceNote,
		  faceColorLustre: ayurvedasession.faceColorLustre,
		  tongueShape: ayurvedasession.tongueShape,
		  tongueColor: ayurvedasession.tongueColor,
		  tongueQuality: ayurvedasession.tongueQuality,
		  tongueNote: ayurvedasession.tongueNote,
		  respiration: ayurvedasession.respiration,
		  speech: ayurvedasession.speech,
		  cough: ayurvedasession.cough,
		  odor: ayurvedasession.odor,
		  appetite: ayurvedasession.appetite,
		  appetiteNote: ayurvedasession.appetiteNote,
		  vomiting: ayurvedasession.vomiting,
		  vomitingNote: ayurvedasession.vomitingNote,
		  diet: ayurvedasession.diet,
		  dietNote: ayurvedasession.dietNote,		  
		  taste: ayurvedasession.taste,
		  thirst: ayurvedasession.thirst,		  
		  defecation: ayurvedasession.defecation,
		  urination: ayurvedasession.urination,		  
		  urineColor: ayurvedasession.urineColor,		  
		  sleeping: ayurvedasession.sleeping,
		  thermalFeeling: ayurvedasession.thermalFeeling,		  
		  perspiration: ayurvedasession.perspiration,		  
		  head: ayurvedasession.head,
		  eyes: ayurvedasession.eyes,
		  ears: ayurvedasession.ears,
		  nose: ayurvedasession.nose,
		  throat: ayurvedasession.throat,		  
		  painLocation: ayurvedasession.painLocation,		  
		  painNature: ayurvedasession.painNature,
		  menstruationHistory: ayurvedasession.menstruationHistory,
		  leukorrhea: ayurvedasession.leukorrhea,		  
		  emotionalStatus: ayurvedasession.emotionalStatus,		  
		  emotionalNote: ayurvedasession.emotionalNote,		  
		  interviewNote: ayurvedasession.interviewNote ,		  
		  pulseSpeed: ayurvedasession.pulseSpeed,
		  pulseDepth: ayurvedasession.pulseDepth,		  
		  pulseStrength: ayurvedasession.pulseStrength,		  
		  pulseShape: ayurvedasession.pulseShape,
		  pulseTension: ayurvedasession.pulseTension,
		  pulseRhythm: ayurvedasession.pulseRhythm,
		  pulseNote: ayurvedasession.pulseNote,		  
		  physicalAppearance: ayurvedasession.physicalAppearance,
		  physicalPalpationEpigastrium: ayurvedasession.physicalPalpationEpigastrium,
		  physicalPalpationEpigastriumNote: ayurvedasession.physicalPalpationEpigastriumNote,		  
		  physicalPalpationAbdomen: ayurvedasession.physicalPalpationAbdomen,
		  physicalPalpationAcupoint: ayurvedasession.physicalPalpationAcupoint,
		  rangeMotion: ayurvedasession.rangeMotion,
		  painLevel: ayurvedasession.painLevel,		  		  
		  physicalExaminationNote: ayurvedasession.physicalExaminationNote,		  
		  AyurvedaDiagnosis: ayurvedasession.AyurvedaDiagnosis,
		  principleTreatment: ayurvedasession.principleTreatment,		  
		  acuPoints: ayurvedasession.acuPoints,		  
		  acuTreatmentNote: ayurvedasession.acuTreatmentNote,		  
		  TDP: ayurvedasession.TDP,		  
		  TDPNote: ayurvedasession.TDPNote,				  
		  moxibustion: ayurvedasession.moxibustion,		  
		  tuina: ayurvedasession.tuina,		  		  
		  herbalFormula1: ayurvedasession.herbalFormula1,		  
		  materiaMedica1: ayurvedasession.materiaMedica1,
		  mmDosage1: ayurvedasession.mmDosage1,
		  mmUnit1: ayurvedasession.mmUnit1,
		  herbalFormula2: ayurvedasession.herbalFormula2,		  
		  materiaMedica2: ayurvedasession.materiaMedica2,
		  mmDosage2: ayurvedasession.mmDosage2,
		  mmUnit2: ayurvedasession.mmUnit2,		  
		  dietTherapy: ayurvedasession.dietTherapy,		  
		  recommendation: ayurvedasession.recommendation,		  		  
		  createdOn: new Date(ayurvedasession.date),		  
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
											<label className="col-lg-4 col-form-label" htmlFor="familyRole" >Family Role</label>
											<div className="col-lg-8">
												<select name="familyRole" id="familyRole" value={data.familyRole} onChange={this.handleChange} className="form-control" >
													<option value="">Select Family-Role</option>
													{this.familyRoleoptions}
												</select>
											</div>
											{errors.familyRole && (<div className="alert alert-danger">{errors.familyRole}</div>)}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="familyDiseaseStatus" >Family Disease Status</label>
											<div className="col-lg-8">
												<select name="familyDiseaseStatus" id="familyDiseaseStatus" value={data.familyDiseaseStatus} onChange={this.handleChange} className="form-control" >
													<option value="">Select FamilyDiseaseStatus</option>
													{this.familyDiseaseStatusoptions}
												</select>
											</div>
											{errors.familyDiseaseStatus && (<div className="alert alert-danger">{errors.familyDiseaseStatus}</div>)}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="currentTreatment" >Current Treatment</label>
											<div className="col-lg-8">
												<select name="currentTreatment" id="currentTreatment" value={data.currentTreatment} onChange={this.handleChange} className="form-control" >
													<option value="">Select CurrentTreatment</option>
													{this.currentTreatmentoptions}
												</select>
											</div>
											{errors.currentTreatment && (<div className="alert alert-danger">{errors.currentTreatment}</div>)}
										</div>


										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="socialRelationship" >Social Relationship</label>
											<div className="col-lg-8">
												<select name="socialRelationship" id="socialRelationship" value={data.socialRelationship} onChange={this.handleChange} className="form-control" >
													<option value="">Select Social Relationship</option>
													{this.socialRelationshipoptions}
												</select>
											</div>
											{errors.socialRelationship && (<div className="alert alert-danger">{errors.socialRelationship}</div>)}
										</div>


										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="employmentStatus" >Employment Status</label>
											<div className="col-lg-8">
												<select name="employmentStatus" id="employmentStatus" value={data.employmentStatus} onChange={this.handleChange} className="form-control" >
													<option value="">Select EmploymentStatus</option>
													{this.employmentStatusoptions}
												</select>
											</div>
											{errors.employmentStatus && (<div className="alert alert-danger">{errors.employmentStatus}</div>)}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="thermalFeeling" >ThermalFeeling</label>
											<div className="col-lg-8">
												<select name="thermalFeeling" id="thermalFeeling" value={data.thermalFeeling} onChange={this.handleChange} className="form-control" >
													<option value="">Select ThermalFeeling</option>
													{this.thermalFeelingoptions}
												</select>
											</div>
											{errors.thermalFeeling && (<div className="alert alert-danger">{errors.thermalFeeling}</div>)}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="perspiration" >perspiration</label>
											<div className="col-lg-8">
												<select name="perspiration" id="perspiration" value={data.perspiration} onChange={this.handleChange} className="form-control" >
													<option value="">Select perspiration</option>
													{this.perspirationoptions}
												</select>
											</div>
											{errors.perspiration && (<div className="alert alert-danger">{errors.perspiration}</div>)}
										</div>


										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="appetite" >appetite</label>
											<div className="col-lg-8">
												<select name="appetite" id="appetite" value={data.appetite} onChange={this.handleChange} className="form-control" >
													<option value="">Select Appetite</option>
													{this.appetiteoptions}
												</select>
											</div>
											{errors.appetite && (<div className="alert alert-danger">{errors.appetite}</div>)}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="vomitting" >vomitting</label>
											<div className="col-lg-8">
												<select name="vomitting" id="vomitting" value={data.vomitting} onChange={this.handleChange} className="form-control" >
													<option value="">Select vomitting</option>
													{this.vomittingoptions}
												</select>
											</div>
											{errors.vomitting && (<div className="alert alert-danger">{errors.vomitting}</div>)}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="diet" >Diet</label>
											<div className="col-lg-8">
												<select name="diet" id="diet" value={data.diet} onChange={this.handleChange} className="form-control" >
													<option value="">Select Diet</option>
													{this.dietoptions}
												</select>
											</div>
											{errors.diet && (<div className="alert alert-danger">{errors.diet}</div>)}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="taste" >Current Taste</label>
											<div className="col-lg-8">
												<select name="taste" id="taste" value={data.taste} onChange={this.handleChange} className="form-control" >
													<option value="">Select Taste</option>
													{this.tasteoptions}
												</select>
											</div>
											{errors.taste && (<div className="alert alert-danger">{errors.taste}</div>)}
										</div>


										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="thirst" >thirst</label>
											<div className="col-lg-8">
												<select name="thirst" id="thirst" value={data.thirst} onChange={this.handleChange} className="form-control" >
													<option value="">Select Thirst</option>
													{this.thirstoptions}
												</select>
											</div>
											{errors.thirst && (<div className="alert alert-danger">{errors.thirst}</div>)}
										</div>


										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="defecation" >defecation</label>
											<div className="col-lg-8">
												<select name="defecation" id="defecation" value={data.profile} onChange={this.handleChange} className="form-control" >
													<option value="">Select defecation</option>
													{this.defecationoptions}
												</select>
											</div>
											{errors.defecation && (<div className="alert alert-danger">{errors.defecation}</div>)}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="urination" >urination</label>
											<div className="col-lg-8">
												<select name="urination" id="urination" value={data.urination} onChange={this.handleChange} className="form-control" >
													<option value="">Select urination</option>
													{this.urinationoptions}
												</select>
											</div>
											{errors.urination && (<div className="alert alert-danger">{errors.urination}</div>)}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="urinationColor" >urinationColor</label>
											<div className="col-lg-8">
												<select name="urinationColor" id="urinationColor" value={data.urinationColor} onChange={this.handleChange} className="form-control" >
													<option value="">Select urinationColor</option>
													{this.urinationColoroptions}
												</select>
											</div>
											{errors.urinationColor && (<div className="alert alert-danger">{errors.urinationColor}</div>)}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="sleep" >Sleep</label>
											<div className="col-lg-8">
												<select name="sleep" id="sleep" value={data.sleep} onChange={this.handleChange} className="form-control" >
													<option value="">Select Sleep</option>
													{this.sleepoptions}
												</select>
											</div>
											{errors.sleep && (<div className="alert alert-danger">{errors.sleep}</div>)}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="head" >Family Role</label>
											<div className="col-lg-8">
												<select name="head" id="head" value={data.head} onChange={this.handleChange} className="form-control" >
													<option value="">SelectHead</option>
													{this.headoptions}
												</select>
											</div>
											{errors.head && (<div className="alert alert-danger">{errors.head}</div>)}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="eyes" >Family Disease Status</label>
											<div className="col-lg-8">
												<select name="eyes" id="eyes" value={data.eyes} onChange={this.handleChange} className="form-control" >
													<option value="">Select Eyes</option>
													{this.eyesoptions}
												</select>
											</div>
											{errors.eyes && (<div className="alert alert-danger">{errors.eyes}</div>)}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="ears" >Current Treatment</label>
											<div className="col-lg-8">
												<select name="ears" id="ears" value={data.ears} onChange={this.handleChange} className="form-control" >
													<option value="">Select Ears</option>
													{this.earsoptions}
												</select>
											</div>
											{errors.ears && (<div className="alert alert-danger">{errors.ears}</div>)}
										</div>


										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="nose" >Social Relationship</label>
											<div className="col-lg-8">
												<select name="nose" id="nose" value={data.nose} onChange={this.handleChange} className="form-control" >
													<option value="">Select Nose</option>
													{this.noseoptions}
												</select>
											</div>
											{errors.nose && (<div className="alert alert-danger">{errors.nose}</div>)}
										</div>


										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="throat" >Employment Status</label>
											<div className="col-lg-8">
												<select name="throat" id="throat" value={data.throat} onChange={this.handleChange} className="form-control" >
													<option value="">Select Throat</option>
													{this.throatoptions}
												</select>
											</div>
											{errors.throat && (<div className="alert alert-danger">{errors.throat}</div>)}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="menstruation" >ThermalFeeling</label>
											<div className="col-lg-8">
												<select name="menstruation" id="menstruation" value={data.menstruation} onChange={this.handleChange} className="form-control" >
													<option value="">Select menstruation</option>
													{this.menstruationoptions}
												</select>
											</div>
											{errors.menstruation && (<div className="alert alert-danger">{errors.menstruation}</div>)}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="leukorrhea" >leukorrhea</label>
											<div className="col-lg-8">
												<select name="leukorrhea" id="leukorrhea" value={data.leukorrhea} onChange={this.handleChange} className="form-control" >
													<option value="">Select leukorrhea</option>
													{this.leukorrheaoptions}
												</select>
											</div>
											{errors.leukorrhea && (<div className="alert alert-danger">{errors.leukorrhea}</div>)}
										</div>


										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="naturePain" >naturePain</label>
											<div className="col-lg-8">
												<select name="naturePain" id="naturePain" value={data.naturePain} onChange={this.handleChange} className="form-control" >
													<option value="">Select Nature of Pain</option>
													{this.naturePainoptions}
												</select>
											</div>
											{errors.naturePain && (<div className="alert alert-danger">{errors.naturePain}</div>)}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="emotionalStatus" >emotionalStatus</label>
											<div className="col-lg-8">
												<select name="emotionalStatus" id="emotionalStatus" value={data.emotionalStatus} onChange={this.handleChange} className="form-control" >
													<option value="">Select Emotional Status</option>
													{this.emotionalStatusoptions}
												</select>
											</div>
											{errors.emotionalStatus && (<div className="alert alert-danger">{errors.emotionalStatus}</div>)}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="respiration" >Diet</label>
											<div className="col-lg-8">
												<select name="respiration" id="respiration" value={data.respiration} onChange={this.handleChange} className="form-control" >
													<option value="">Select Respiration</option>
													{this.respirationoptions}
												</select>
											</div>
											{errors.respiration && (<div className="alert alert-danger">{errors.respiration}</div>)}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="speech" >Current Taste</label>
											<div className="col-lg-8">
												<select name="speech" id="speech" value={data.speech} onChange={this.handleChange} className="form-control" >
													<option value="">Select Speech</option>
													{this.speechoptions}
												</select>
											</div>
											{errors.speech && (<div className="alert alert-danger">{errors.speech}</div>)}
										</div>


										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="cough" >cough</label>
											<div className="col-lg-8">
												<select name="cough" id="cough" value={data.cough} onChange={this.handleChange} className="form-control" >
													<option value="">Select Cough</option>
													{this.coughoptions}
												</select>
											</div>
											{errors.cough && (<div className="alert alert-danger">{errors.cough}</div>)}
										</div>


										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="odor" >odor</label>
											<div className="col-lg-8">
												<select name="odor" id="odor" value={data.profile} onChange={this.handleChange} className="form-control" >
													<option value="">Select odor</option>
													{this.odoroptions}
												</select>
											</div>
											{errors.odor && (<div className="alert alert-danger">{errors.odor}</div>)}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="vitality" >vitality</label>
											<div className="col-lg-8">
												<select name="vitality" id="vitality" value={data.vitality} onChange={this.handleChange} className="form-control" >
													<option value="">Select Vitality</option>
													{this.vitalityoptions}
												</select>
											</div>
											{errors.vitality && (<div className="alert alert-danger">{errors.vitality}</div>)}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="appearance" >appearance</label>
											<div className="col-lg-8">
												<select name="appearance" id="appearance" value={data.appearance} onChange={this.handleChange} className="form-control" >
													<option value="">Select appearance</option>
													{this.appearanceoptions}
												</select>
											</div>
											{errors.appearance && (<div className="alert alert-danger">{errors.appearance}</div>)}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="colorLustreFace" >Sleep</label>
											<div className="col-lg-8">
												<select name="colorLustreFace" id="colorLustreFace" value={data.colorLustreFace} onChange={this.handleChange} className="form-control" >
													<option value="">Select Sleep</option>
													{this.colorLustreFaceoptions}
												</select>
											</div>
											{errors.colorLustreFace && (<div className="alert alert-danger">{errors.colorLustreFace}</div>)}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="tongueShape" >Tongue Shape</label>
											<div className="col-lg-8">
												<select name="tongueShape" id="tongueShape" value={data.tongueShape} onChange={this.handleChange} className="form-control" >
													<option value="">Select Tongue-Shape</option>
													{this.tongueShapeoptions}
												</select>
											</div>
											{errors.tongueShape && (<div className="alert alert-danger">{errors.tongueShape}</div>)}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="tongueColor" >Tongue Color</label>
											<div className="col-lg-8">
												<select name="tongueColor" id="tongueColor" value={data.tongueColor} onChange={this.handleChange} className="form-control" >
													<option value="">Select tongueColor</option>
													{this.tongueColoroptions}
												</select>
											</div>
											{errors.tongueColor && (<div className="alert alert-danger">{errors.tongueColor}</div>)}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="tongueQuality" >tongueQuality</label>
											<div className="col-lg-8">
												<select name="tongueQuality" id="tongueQuality" value={data.tongueQuality} onChange={this.handleChange} className="form-control" >
													<option value="">Select tongueQuality</option>
													{this.tongueQualityoptions}
												</select>
											</div>
											{errors.tongueQuality && (<div className="alert alert-danger">{errors.tongueQuality}</div>)}
										</div>


										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="pulseQuality" >pulseQuality</label>
											<div className="col-lg-8">
												<select name="pulseQuality" id="pulseQuality" value={data.pulseQuality} onChange={this.handleChange} className="form-control" >
													<option value="">Select pulseQuality</option>
													{this.pulseQualityoptions}
												</select>
											</div>
											{errors.pulseQuality && (<div className="alert alert-danger">{errors.pulseQuality}</div>)}
										</div>


										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="pulseDepth" >pulseDepth</label>
											<div className="col-lg-8">
												<select name="pulseDepth" id="pulseDepth" value={data.pulseDepth} onChange={this.handleChange} className="form-control" >
													<option value="">Select pulseDepth</option>
													{this.pulseDepthoptions}
												</select>
											</div>
											{errors.pulseDepth && (<div className="alert alert-danger">{errors.pulseDepth}</div>)}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="pulseStrength" >pulseStrength</label>
											<div className="col-lg-8">
												<select name="pulseStrength" id="pulseStrength" value={data.pulseStrength} onChange={this.handleChange} className="form-control" >
													<option value="">Select pulseStrength</option>
													{this.pulseStrengthoptions}
												</select>
											</div>
											{errors.pulseStrength && (<div className="alert alert-danger">{errors.pulseStrength}</div>)}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="pulseTension" >pulseTension</label>
											<div className="col-lg-8">
												<select name="pulseTension" id="pulseTension" value={data.pulseTension} onChange={this.handleChange} className="form-control" >
													<option value="">Select pulseTension</option>
													{this.pulseTensionoptions}
												</select>
											</div>
											{errors.pulseTension && (<div className="alert alert-danger">{errors.pulseTension}</div>)}
										</div>


										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="pulseRhythm" >pulseRhythm</label>
											<div className="col-lg-8">
												<select name="pulseRhythm" id="pulseRhythm" value={data.pulseRhythm} onChange={this.handleChange} className="form-control" >
													<option value="">Select pulseRhythm</option>
													{this.pulseRhythmoptions}
												</select>
											</div>
											{errors.pulseRhythm && (<div className="alert alert-danger">{errors.pulseRhythm}</div>)}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="physicalAppearanceQuality" >physicalAppearanceQuality</label>
											<div className="col-lg-8">
												<select name="physicalAppearanceQuality" id="physicalAppearanceQuality" value={data.physicalAppearanceQuality} onChange={this.handleChange} className="form-control" >
													<option value="">Select physicalAppearanceQuality</option>
													{this.physicalAppearanceQualityoptions}
												</select>
											</div>
											{errors.physicalAppearanceQuality && (<div className="alert alert-danger">{errors.physicalAppearanceQuality}</div>)}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="palpationEpigastrium" >palpationEpigastriume</label>
											<div className="col-lg-8">
												<select name="palpationEpigastrium" id="palpationEpigastrium" value={data.palpationEpigastrium} onChange={this.handleChange} className="form-control" >
													<option value="">Select palpationEpigastrium</option>
													{this.palpationEpigastriumoptions}
												</select>
											</div>
											{errors.palpationEpigastrium && (<div className="alert alert-danger">{errors.palpationEpigastrium}</div>)}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="palpationAbdomen" >Current palpationAbdomen</label>
											<div className="col-lg-8">
												<select name="palpationAbdomen" id="palpationAbdomen" value={data.palpationAbdomen} onChange={this.handleChange} className="form-control" >
													<option value="">Select palpationAbdomen</option>
													{this.palpationAbdomenoptions}
												</select>
											</div>
											{errors.palpationAbdomen && (<div className="alert alert-danger">{errors.palpationAbdomen}</div>)}
										</div>


										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="rangeMotion" >rangeMotion</label>
											<div className="col-lg-8">
												<select name="rangeMotion" id="rangeMotion" value={data.rangeMotion} onChange={this.handleChange} className="form-control" >
													<option value="">Select rangeMotion</option>
													{this.rangeMotionoptions}
												</select>
											</div>
											{errors.rangeMotion && (<div className="alert alert-danger">{errors.rangeMotion}</div>)}
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
											<label className="col-lg-4 col-form-label" htmlFor="ayurvedasessionname">UserName</label>
											<div className="col-lg-8">
												<div className="row row-space-10">
													<input type="text" id="ayurvedasessionname" name="ayurvedasessionname"
														value={data.ayurvedasessionname}
														className="form-control m-b-5"
														placeholder="Enter ayurvedasessionname"
														onChange={this.handleChange}
														autoFocus />
													{errors.ayurvedasessionname && (
														<div className="alert alert-danger">
															{errors.ayurvedasessionname}
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