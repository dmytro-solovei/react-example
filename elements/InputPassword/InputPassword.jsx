import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import uuid from 'react-uuid';
import {setActiveInput} from '../../store/actions';
import './InputPassword.scss';

export const InputPassword = ({ placeholder, onChange, label, name, required }) => {
	
	const dispatch = useDispatch();
	const ref = useRef();
	const words = useSelector(state => state.words);
	const handling = useSelector(state => state.handling);
	const settings = useSelector(state => state.settings);


    const [visible, setVisible] = useState(false);
	const [generateId, setGenerateId] = useState( uuid());

	const handleChange = event => {
		onChange?.(event);
		//dispatch( setActiveInput(generateId))
		(settings.virtualKeyboard && !handling.size.mobile) && window.VirtualKeyboard.setInput(event.target.value);
	};

	const handleFocus = event => {
		if (settings.virtualKeyboard && !handling.size.mobile) {
			dispatch(setActiveInput(generateId));
			//console.log(event.target.value)
			window.VirtualKeyboard.setInput(event.target.value);
		}
	};
	
	return (
		<div className="InputPassword">
			<input
				required={required}
				name={name}
				ref={ ref }
				id={generateId}
				key={ generateId}
				className='input'
				type={ !visible ? 'password' : 'text' } 
				onFocus={handleFocus}
				onChange={handleChange}
				placeholder={ placeholder ? placeholder : 'words.server.password' }

			/>
			<div className='visible' data-active={ visible } onClick={ () => setVisible(!visible) }>
				<img src="images/icons/eye.svg" alt="Eye"/>
			</div>
		</div>
	);
};