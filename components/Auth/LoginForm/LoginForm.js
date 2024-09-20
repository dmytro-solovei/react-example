import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, Navigate} from 'react-router-dom';
import styled from 'styled-components';
import {PhoneInput} from '../../../elements/PhoneInput';
import {Input} from '../../../elements/Input';
import {InputPassword} from '../../../elements/InputPassword';
import {Button} from '../../../elements/Button';
import { setActiveForm } from '../../../store/actions';
import {signInRequest} from '../../../store/actions';
import './LoginForm.scss';

const Error = styled.div`
  text-transform: capitalize;
  margin-top: 15px;
  color: red;
  font-size: 14px;
  line-height: 26px;
  font-weight: 500;
  text-align: center;
`;

export const LoginForm = () => {

    const dispatch = useDispatch();
    const auth = localStorage.getItem('user-token');
    const userError = useSelector(state => state.auth.userError);

    const [redirect, setRedirect] = useState(false)
    const [form, setForm] = useState({
        login: '',
        phone: '',
        password: '',
    });

    const [type, setType] = useState(false);
    const [error, setError] = useState(false);
    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = () => {
        setForm({
            login: '',
            password: '',
        });
        dispatch(signInRequest(form)).then(res => {
            if (res.content.token) {
                console.log('ezz');
                setRedirect(true)
            }
        });
    };

    const forgotPassword = () => {
        dispatch(setActiveForm('forgot'));
    };
    const getFormVal = (type, value) => {
        setError(false);
        setForm({ ...form, [type]: value });
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
    const renderRegistration = () => {
        dispatch(setActiveForm('registration'));
    };

    const loginError = () => {
        return userError.split('_').join(' ');
    };

    return (
        <>
            {redirect ? <Navigate to="/"/> : <div className="login-form-wrapper">
                <div className="title">Login</div>

                <div className="form-wrapper">
                    <PhoneInput
                        placeholder="phone"
                        onChange={ numberChange }
                        onChangeCountry={ codeChange }
                    />
                    <div className="or">Phone number Or Email</div>
                    <Input placeholder="Email / Log in" name="login" type="email" onChange={handleChange} />
                    <InputPassword placeholder="Password" name="password" onChange={handleChange} />
                    <Button disabled={!Object.values(form).some(item => !!item)} className='submit-button' onClick={handleLogin}>
                        LOG IN
                    </Button>
                    <Button onClick={forgotPassword} className='restore-button' >
                        Forgot password?
                    </Button>
                    <Button onClick={renderRegistration} className='signin-button'>
                        <span>REGISTRATION</span>
                    </Button>
                    {userError && <Error>{loginError()}</Error>}

                </div>
                <Link to="/" className="handle-back-in-form">
                    <img src="/images/icons/arrow.svg" alt="arrow-back"/>
                    <span>Back</span>
                </Link>
            </div>}
        </>
    );
};