import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'react-uuid';
import classNames from 'classnames';
import {setActiveInput} from '../../store/actions';
import './Input.scss';

export const Input = ({
	required,
	type,
	className = '',
	placeholder,
	onChange,
	disabled,
	name,
	autocomplete = 'on',
	theme }) => {

	const dispatch = useDispatch();
	const ref = useRef();
	const settings = useSelector(state => state.settings);
	const handling = useSelector(state => state.handling);
	const [generateId, setGenerateId] = useState( uuid());



	const handleChange = event => {
		onChange?.(event);
		//dispatch( setActiveInput(generateId))
		(settings.virtualKeyboard && !handling.size.mobile) && window.VirtualKeyboard.setInput(event.target.value);
	};

	const handleFocus = event => {
		if (settings.virtualKeyboard && !handling.size.mobile) {
			dispatch(setActiveInput(generateId));
			window.VirtualKeyboard.setInput(event.target.value);
		}
	};

	return (
		<>
			{settings.labelsForInputs && <span className='label'>{placeholder}</span>}
			<input
				required={required}
				name={name}
				ref={ref}
				id={generateId}
				key={type}
				className={classNames('input', className, {
					'input-royal': theme === 'royal',
				})}
				type={type}
				autoComplete={ autocomplete }
				onFocus={handleFocus}
				onChange={handleChange}
				disabled={disabled}
				placeholder={!settings.labelsForInputs ? placeholder : ''}
			/>
		</>
	);
};