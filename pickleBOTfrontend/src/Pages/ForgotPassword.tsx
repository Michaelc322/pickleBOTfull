import { useState } from 'react'
import { Container, Fields, FormBox, FormContainer, InputLabel, Section, SmallText, SubmitButton } from '../Components/ForgotPasswordComponents'
import { Helmet } from 'react-helmet'
import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';
import '../Styles/styles.css';

export default function ForgotPassword(){
    const [success, setSuccess] = useState(false);
    const basicSchema = yup.object().shape({
        email: yup.string().email('Invalid email').required('Email is required'),
    })
    
    const { values, errors, touched, handleChange, handleSubmit } = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: basicSchema,
        onSubmit: async (values) => {
            console.log("values", values)
            try {
                const {data} = await axios.post('/forgot-password', values);
                if(data.error){
                    //toast.error(data.error);
                    setSuccess(true);
                } else {
                    setSuccess(true);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    })


    return (
        <>
            <Helmet>
                <title>pickleBOT | Reset Password</title>
                <link rel="icon" type="image/png" href="./images/pickleball.png" />
            </Helmet>
            <Section>
                {success ?
                <Container>
                    
                    <FormContainer>
                        <div className="successBox">
                            <i className="fa-solid fa-check"></i>                            
                            <h2 className="successH1">Account recovery email sent!</h2>
                            <p className="successText">If the entered email is associated with an account, an email has been sent with instructions of how to reset your password</p>
                            <SmallText><a href="/login">Log In</a></SmallText>
                        </div>
                    </FormContainer> 

                </Container> 
                
                : 
                <>
                <Container>

                    <FormContainer>
                        <h1>Forgot Password</h1>
                        <FormBox onSubmit={handleSubmit}>
                            <InputLabel>Email</InputLabel>
                            <Fields type="text" placeholder='Enter email...' id="email" value={values.email} className={errors.email && touched.email ? "input-error" : ""} onChange={handleChange} />
                            {errors.email && touched.email && <p className="error_2">{errors.email}</p>}
                            <SubmitButton type='submit'><span>Reset my password</span></SubmitButton>

                        </FormBox>
                    </FormContainer>
                </Container>
                <SmallText>Remember your password? <a href="/login">Sign in instead</a></SmallText>
                </>
                }
            </Section>
        </>
        )
        
}
