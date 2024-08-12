import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import SignInForm from "../../forms/AuthForm/SignInForm"
import './SignIn.scss'
import {useNavigate} from "react-router-dom";
import getUser from "../../store/utilits";

const SignIn = () => {
    const signInError = useSelector(state => state.user.signInError);
    const [user, setUser] = useState(getUser())
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate("/analysis")
        }
    }, []);

    return (
        <section className='sign-in'>
            <div className='sign-in_form'>
                <h1>Login to Account</h1>
                <span>Please enter your email and password to continue</span>
                {signInError && <p className="auth-fail-msg">Invalid Username or Password</p>}
                <SignInForm/>
            </div>
        </section>
    )
}

export default SignIn;
