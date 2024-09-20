import React from 'react';
import { useDispatch } from 'react-redux';
import {getPopup} from '../../store/actions';
import {Checkbox} from '../Checkbox';
import './AcceptTerms.scss';

export const AcceptTerms = ({ onChange }) => {

    const dispatch = useDispatch();

    return (
        <div className="AcceptTerms">

          <Checkbox id='terms' name='terms' onChange={ onChange }/>
          
          <div className="signInTerms">
            <label htmlFor="terms">I turned 18, I read and accepted the general conditions</label>
                <span className="termsHref" onClick={ () => dispatch( getPopup({ active: true, name: 'terms'})) }>
                Read here
                </span>
          </div>

        </div>
    );
};