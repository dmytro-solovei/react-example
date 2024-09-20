import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {PhoneInput} from '../../../elements/PhoneInput';
import {Input} from '../../../elements/Input';
import {InputPassword} from '../../../elements/InputPassword';
import {Button} from '../../../elements/Button';

import {setActiveForm, signUpRequest} from '../../../store/actions';
import './SignUpForm.scss';

const Error = styled.div`
  text-transform: capitalize;
  margin-top: 15px;
  color: red;
  font-size: 14px;
  line-height: 26px;
  font-weight: 500;
  text-align: center;
`;
export const SignUpForm = () => {
    const dispatch = useDispatch();

    const data = useSelector(state => state.api);
    const signUpError = useSelector(state => state.auth.signUpError);

    const [form, setForm] = useState({});
    const [type, setType] = useState(false);
    const [error, setError] = useState(false);
    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSignUp = e => {
        e.preventDefault();
        dispatch(signUpRequest(form));
    };
    const getFormVal = (type, value) => {
        setError(false);
        setForm({ ...form, [type]: value });
    };

    const codeChange = (isvalid, value) => {
        setError(false);
        getFormVal('dialCode', value.dialCode);
        setForm({...form, phone: value});
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

    const signUpErrorMessage = () => {
        return signUpError.split('_').join(' ');
    };

    return <div className="sign-up-form-wrapper">
        <div className="title">Registration</div>

        <div className="form-wrapper">
            <form action="">
                {data.registration.values.map(item => {
                    switch (item.id) {
                        case 'phone':
                            return  <PhoneInput
                                placeholder="Phone"
                                name={item.id}
                                onChange={ numberChange }
                                onChangeCountry={ codeChange }
                            />;

                        case 'email':
                            return <Input placeholder="Email" name={item.id} type="email" required={item.require !== '0' } onChange={handleChange} />;
                        case 'name':
                            return <Input placeholder="Name" name={item.id} type="text" required={item.require !== '0' } onChange={handleChange} />;
                        case 'password':
                            return <InputPassword placeholder="Passowrd" name={item.id} required={item.require !== '0' } onChange={handleChange} />;
                        case 'promoCode':
                            return <Input placeholder="Promocode (Optional)" name={item.id} required={item.require !== '0' } type="text" onChange={handleChange} />;
                        default:
                            return <Input placeholder={item.id} name={item.id} required={item.require !== '0' } type="text" onChange={handleChange} />;
                    }
                })}
                <Button type="submit" disabled={!Object.values(form).some(item => !!item)} className='submit-button' onClick={handleSignUp}>
                    Registration
                </Button>
            </form>

            {signUpError && <Error>{signUpErrorMessage()}</Error>}

        </div>
        <Button onClick={back} to="/" className="handle-back-in-form">
            <img src="/images/icons/arrow.svg" alt="arrow-back"/>
            <span>Back</span>
        </Button>
    </div>;
};
