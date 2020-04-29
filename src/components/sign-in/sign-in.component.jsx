import React from 'react'
import FormInput from '../form-input/form-input.component'
import './sign-in.styles.scss'
import CustomButton from '../custom-button/custom-button.component';
import { auth, signInWithGoogle } from '../firebase/firebase.utils';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: '', password: '' })
        } catch (error) {
            console.log(error);
        }

    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }

    render() {
        const { email, password } = this.state;
        console.log();

        return (
            <div className='sign-in'>
                <h1>
                    I already have an account
                    </h1>
                <span>
                    Sign in with your email and password
                    </span>
                <form onSubmit={this.handleSubmit}>

                    <FormInput label='Email' type="email" name="email" value={email} handleChange={this.handleChange} required />

                    <FormInput label='Password' type="password" name="password" value={password} handleChange={this.handleChange} required />

                    <div className='buttons'>
                        <CustomButton type="submit"> Sign in </CustomButton>
                        <CustomButton isGoogleSignIn onClick={signInWithGoogle}>Sign in with google</CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;