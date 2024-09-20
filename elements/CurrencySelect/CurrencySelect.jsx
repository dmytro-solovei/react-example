import React from 'react';
import { useSelector } from 'react-redux';

import './CurrencySelect.scss';

export const CurrencySelect = ({ onChange }) => {
    
	const currencies = useSelector(state => state.settings.registrationData.currencies);

	const renderElements = currencies => {
		return currencies.map( element => {
			return (
			  <option key={`currency_${ element }`} value={ element }>
				{ element }
			  </option>
			  );
		});
	};
	
	return (
		<div className="CurrencySelect">
			<select
				disabled={ currencies.length <= 1 }
				onChange={ onChange }
			>
			{ currencies.length > 1 &&
			  <option key="currency_placeholder" value={0}>
				  Currency
			  </option>
			}
			{ renderElements(currencies) }
		  </select>
		  <img className='arrow' src="/images/icons/arrow-left.svg" alt="Arrow" />
		</div>
	);
};