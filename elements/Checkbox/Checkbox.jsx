import React from 'react';

import './Checkbox.scss';

export const Checkbox = ({ id, name, className, onChange }) => {

    return (
      <div className='Checkbox'>
        <input
          type="checkbox"
          className={ className }
          name={ name }
          id={ id }
          onChange={ onChange }
        />
        <label className="element" htmlFor={ name }></label>
      </div>
    );
};