import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginForm } from './LoginForm/LoginForm';
import { SignUpForm } from './SignUpForm/SignUpForm';
import { ForgotPassword } from './ForgotPassword/ForgotPassword';


export const Auth = () => {

    const authFormType = useSelector(state => state.auth.activeForm);
    const renderForm = type => {
        switch (type) {
            case 'login':
                return <LoginForm />;
            case 'registration':
                return  <SignUpForm/>;
            case 'forgot':
                return <ForgotPassword/>;
            default:
                return <LoginForm />;
        }
    };
    return (
        <>
            <div className="forms">
                { renderForm(authFormType) }
            </div>
        </>
    );
};
