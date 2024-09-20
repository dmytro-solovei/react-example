import React from 'react';

import './Button.scss';

export const Button = (props) => {

    let classNames = 'button ' + props.className;

    return (
        <button
            type={props.type}
            className={ classNames } 
            data-state={ props.state } 
            data-loading={ props.loading }
            data-disabled={ props.disabled }
            data-hidden={ props.hidden }
            onClick={ props.onClick }
        >
            { props.loading && <img className='loader' src="images/spinner.svg" alt="Spinner" /> }
            {  props.children && <span>{ props.children }</span> }
        </button>
    );
};