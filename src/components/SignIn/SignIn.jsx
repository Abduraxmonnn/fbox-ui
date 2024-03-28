import React from "react";
import {useSelector} from "react-redux";

import SignInForm from "../../forms/AuthForm/SignInForm"
import './SignIn.scss'

const SignIn = () => {
	const signInError = useSelector(state => state.user.signInError);

    return (
		<section className='sign-in'>
			<div className='sign-in_form'>
				<h1>Login to Account</h1>
				<span>Please enter your email and password to continue</span>
				{signInError && <p className="auth-fail-msg">Invalid Username or Password</p>}
				<SignInForm />
			</div>
		</section>
	)
}

export default SignIn;
