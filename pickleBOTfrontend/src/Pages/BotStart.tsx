import { useEffect } from 'react';
import { Container, Fields, FormBox, FormContainer, InputLabel, Section, SubmitButton } from '../Components/LogInComponents';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import * as yup from 'yup';
import { useFormik } from 'formik';
import '../Styles/styles.css';
import { useNavigate } from 'react-router-dom';



export default function BptStart() { 
    const basicSchema = yup.object().shape({
        userSubmitted: yup.string().required('Required'),
        passwordSubmitted: yup.string().required('Required'),
        CourtNum: yup.string().required('Required'),
        TimeSlot: yup.string().required('Required'),
        WhichCourt: yup.string().required('Required'),
    })

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    useEffect(() => {
            axios.get("/auth/user/", { withCredentials: true })
            .then(res=> {
                console.log("trying to verify for reserve", res.data);
            }).catch(error => {
                console.log("failed to verify reserve", error.response.data)
                navigate('/login')
            })
    }, [])

    const { values, errors, touched, handleChange, handleSubmit } = useFormik({
        initialValues: {
            userSubmitted: '',
            passwordSubmitted: '',
            CourtNum: '',
            TimeSlot: '',
            WhichCourt: '',
        },
        validationSchema: basicSchema,
        onSubmit: async (values) => {
            console.log("trying to verify for getting started", values);
            axios.post('/picklebot/activate', values).then(res=> {
                console.log("trying to verify for getting started", res.data);
            }).catch(error => {
                console.log("failed to verify getting started", error.response.data)
            })
        }
    })


  return (
    <>
      <Helmet>
        <title>pickleBOT | Bot</title>
        <link rel="icon" type="image/png" href="./images/pickleball.png"/>
      </Helmet>
    <Section>
        <Container>
            <FormContainer>
                <h1>Reserve a court</h1>
                <FormBox onSubmit={handleSubmit}>
                    <InputLabel>User</InputLabel>
                    <Fields autoComplete="on" className={errors.userSubmitted && touched.userSubmitted ? "input-error" : ""} id="userSubmitted" type="text" placeholder='Enter username...' value={values.userSubmitted} onChange={handleChange}/>
                    {errors.userSubmitted && touched.userSubmitted && <p className="error">{errors.userSubmitted}</p>}
                    <InputLabel>Password</InputLabel>
                    <Fields autoComplete="on" className={errors.passwordSubmitted && touched.userSubmitted? "input-error" : ""} id="passwordSubmitted" type="text" placeholder='Enter password...' value={values.passwordSubmitted} onChange={handleChange}/>
                    {errors.passwordSubmitted && touched.userSubmitted && <p className="error">{errors.userSubmitted}</p>}

                    <InputLabel>Court Name</InputLabel>
                    <Fields autoComplete="on" className={errors.passwordSubmitted && touched.userSubmitted? "input-error" : ""} id="WhichCourt" type="text" placeholder='Enter court name...' value={values.WhichCourt} onChange={handleChange}/>

                    <InputLabel>Court Number</InputLabel>
                    <Fields autoComplete="on" className={errors.passwordSubmitted && touched.userSubmitted? "input-error" : ""} id="CourtNum" type="text" placeholder='Enter court number...' value={values.CourtNum} onChange={handleChange}/>
                    
                    <InputLabel>Time Slot</InputLabel>
                    <Fields autoComplete="on" className={errors.passwordSubmitted && touched.userSubmitted? "input-error" : ""} id="TimeSlot" type="text" placeholder='Enter time slot...' value={values.TimeSlot} onChange={handleChange}/>

                    
                    <SubmitButton type='submit'><span>Reserve POST</span></SubmitButton>
                </FormBox>
            </FormContainer>
        </Container>
    </Section>
    </>
  )
}