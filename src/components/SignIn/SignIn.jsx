import SignInForm from "../../forms/SignInForm/SignInForm"
import './SignIn.scss'

const SignIn = () => {
    return (
		<section className='sign-in'>
			<div className='sign-in_form'>
				<h1>Login to Account</h1>
				<span>Please enter your email and password to continue</span>
				<SignInForm />
			</div>
		</section>
	)
}

export default SignIn;
