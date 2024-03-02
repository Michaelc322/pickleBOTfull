import React, { useState } from 'react'
import { Container, Fields, FormBox, FormContainer, InputLabel, Section, SmallText, SubmitButton } from '../Components/ForgotPasswordComponents'
import { Helmet } from 'react-helmet'
import axios, { Axios } from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword(){
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const resetPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        axios.post("/forgot-password", { 
            email 
        }).then(response => {
            if(response.data.status){
                alert("check your email for a reset link")
                navigate('/login');
            }
        }).catch(error => {
            console.log(error);
        })

    };

    return (
        <>
            <Helmet>
                <title>pickleBOT | Reset Password</title>
                <link rel="icon" type="image/png" href="./images/pickleball.png" />
            </Helmet>
            <Section>
                <Container>
                    <FormContainer>
                        <h1>Forgot Password</h1>
                        <FormBox onSubmit={resetPassword}>
                            <InputLabel>Email</InputLabel>
                            <Fields type="text" placeholder='Enter email...' onChange={e => setEmail(e.target.value)} />
                            <SubmitButton type='submit'><span>Reset my password</span></SubmitButton>

                        </FormBox>
                    </FormContainer>
                </Container>
                <SmallText>Remember your password? <a href="/login">Sign in instead</a></SmallText>
            </Section>
        </>
        )
        
}
