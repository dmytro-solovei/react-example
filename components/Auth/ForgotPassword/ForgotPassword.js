import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {PhoneInput} from '../../../elements/PhoneInput';
import {Input} from '../../../elements/Input';
import {Button} from '../../../elements/Button';

import './ForgotPassword.scss';
import {setActiveForm} from '../../../store/actions';
import {useDispatch} from 'react-redux';

export const ForgotPassword = () => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        login: '',
        password: '',
    });
    const [formData, setFormData] = useState({});
    const [type, setType] = useState(false);
    const [error, setError] = useState(false);
    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleForgotPassword = () => {
        setForm({
            email: '',
            phone: '',
        });
    };
    const getFormVal = (type, value) => {
        setError(false);
        setFormData({ ...formData, [type]: value });
    };

    const codeChange = (isvalid, value) => {
        setError(false);
        getFormVal('dialCode', value.dialCode);
    };

    const numberChange = (isvalid, value, event) => {
        setError(false);
        getFormVal('phone', event.dialCode + value);
        let type = value && value.length > 0 && value !== '' ? 'phone' : false;
        setType(type);
    };
    const back = () => {
        dispatch(setActiveForm('login'));
    };

    return <div className="forgot-password-wrapper">
        <div className="title">Forgot Password</div>

        <div className="form-wrapper">
            <PhoneInput
                placeholder="phone"
                onChange={ numberChange }
                onChangeCountry={ codeChange }/>
            <div className="or">Phone number Or Email</div>
            <Input placeholder="Email" name="login" type="email" onChange={handleChange} />
            <Button disabled={!Object.values(form).some(item => !!item)} className='submit-button' onClick={handleForgotPassword}>
                CONFIRM
            </Button>
        </div>
        <Button onClick={back} to="/auth" className="handle-back-in-form">
            <img src="/images/icons/arrow.svg" alt="arrow-back"/>
            <span>Back</span>
        </Button>
    </div>;
};