import React, { useState } from 'react'
import { Container, Fields, FormBox, FormContainer, InputLabel, Section, SmallText, SubmitButton } from '../Components/ForgotPasswordComponents'
import { Helmet } from 'react-helmet'
import axios, { Axios } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import toast from 'react-hot-toast';

export default function ResetPassword(){
    const {token} = useParams();

    const basicSchema = yup.object().shape({
        password: yup.string().min(7, 'Password must be at least 7 characters').required('Password is required'),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords do not match').required('Confirm password is required')
    })

    const { values, errors, touched, handleChange, handleSubmit } = useFormik({
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        validationSchema: basicSchema,
        onSubmit: async (values) => {
            try {
                
                const {data} = await axios.post("/reset-password/"+token, values);

                console.log("posted")
                if(data.error){
                    toast.error(data.error);
                } else {
                    toast.success('Password successfully changed')
                    navigate('/login')
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    })


    const navigate = useNavigate();

    return (
        <>
            <Helmet>
                <title>pickleBOT | Reset Password</title>
                <link rel="icon" type="image/png" href="./images/pickleball.png" />
            </Helmet>
            <Section>
                <Container>
                    <FormContainer>
                        <h1>Reset Password</h1>
                        <FormBox onSubmit={handleSubmit}>
                        <InputLabel>New password</InputLabel>
                            <Fields autoComplete="off" className={errors.password && touched.confirmPassword ? "input-error" : ""} id="password" type="password" placeholder='Enter password...' value={values.password} onChange={handleChange} />
                            {errors.password && touched.confirmPassword && <p className="error_2">{errors.password}</p>}
                            <InputLabel>Confirm new password</InputLabel>
                            <Fields autoComplete="off" className={errors.confirmPassword && touched.confirmPassword ? "input-error" : ""} id="confirmPassword" type="password" placeholder='Confirm password...' value={values.confirmPassword} onChange={handleChange} />
                            {errors.confirmPassword && touched.password && <p className="error_2">{errors.confirmPassword}</p>}
                            <SubmitButton type='submit'><span>Reset my password</span></SubmitButton>

                        </FormBox>
                    </FormContainer>
                </Container>
                <SmallText>Remember your password? <a href="/login">Sign in instead</a></SmallText>
            </Section>
        </>
        )
        
}