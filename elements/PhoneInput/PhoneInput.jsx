import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import './PhoneInput.scss';
import {setActiveInput} from '../../store/actions';

export const PhoneInput = ({ placeholder = '', onChange, onChangeCountry, disabled = false }) => {
	
	const ref = useRef();
	const dispatch = useDispatch();
	const words = useSelector(state => state.words);
	const settings = useSelector(state => state.settings);
	const handling = useSelector(state => state.handling);
	
	let country = localStorage.getItem('itiAutoCountry') !== '' ? localStorage.getItem('itiAutoCountry') : false;

	const handleFocus = () => {
		settings.virtualKeyboard && dispatch( setActiveInput(ref.current.tel) );
	};
	const handleChange = (isvalid, value, event) => {
		onChange(isvalid, value, event);
		// (settings.virtualKeyboard && !handling.size.mobile)
	};

	const handleChangeCountry = (isvalid, value, event) => {
		onChangeCountry(isvalid, value, event);
		value.iso2 && localStorage.setItem('itiAutoCountry', value.iso2 );
	};
	if (ref.current) ref.current.tel.id = 'tel-input';

	return (
		<>
		{ settings.labelsForInputs && <span className='label'>{ words.server.enter_phone }</span>}
		<div className='PhoneInput' onFocus={ handleFocus }>
			<IntlTelInput
				ref={ ref }
				formatOnInit={false}
				inputClassName="input"
				nationalMode={ true }
				defaultCountry={ 'auto' }
				geoIpLookup={ country ? country : '' }
				separateDialCode={ true }
				disabled={ disabled }
				onPhoneNumberChange={ handleChange }
				format={ false }
				onSelectFlag={ handleChangeCountry }
				placeholder={ !settings.labelsForInputs ? placeholder : '' }
			/>
		</div>
		</>
	);
};