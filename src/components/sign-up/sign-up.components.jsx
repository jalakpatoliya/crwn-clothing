import React from 'react';
import './sign-up.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component'

import { auth, createUserProfileDocument } from '../firebase/firebase.utils';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { displayName, email, password, confirmPassword } = this.state;


        if (password !== confirmPassword) {
            alert("password don't match");
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            console.log(`user fr:${JSON.stringify(user)}`);

            await createUserProfileDocument(user, { displayName });
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        } catch (error) {
            throw error
        }
    }

    handleChange = async event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div className='sign-up'>
                <h1 className='title'>
                    I do not have an account
                </h1>
                <span>
                    Sign up with your email and password
                </span>

                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput label='Display Name' handleChange={this.handleChange} name='displayName' type='text' value={this.state.displayName} required />
                    <FormInput label='Email' handleChange={this.handleChange} name='email' type='email' value={this.state.email} required />
                    <FormInput label='Password' handleChange={this.handleChange} name='password' type='password' value={this.state.password} required />
                    <FormInput label='Confirm Password' handleChange={this.handleChange} name='confirmPassword' type='password' value={this.state.confirmPassword} required />

                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </div>
        )
    }
}


export default SignUp;