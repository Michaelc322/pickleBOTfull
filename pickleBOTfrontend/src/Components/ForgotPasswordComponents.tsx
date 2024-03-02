import styled, { keyframes } from "styled-components"
import { FadeUp, SlideInFadeLeft } from "../Styles/AnimationComponents";



const Section = styled.section`
    position: relative;
    display: flex;
    padding: 80px;
    align-items: center;
    background-color: #121212;
    height: calc(100vh - 80px);
    flex-direction: column;
    justify-content: center;
    
`

const SectionTwo = styled.section`
    display: flex;
    padding: 80px;
    align-items: center;
    background-color: #121212;
    height: 65vh;
    flex-direction: column;
    
`

const UserSlide = keyframes`
    0% {
        opacity: 0%;
        transform: translateX(0) scale(1);
    }

    100% {
        opacity: 1;
        transform: translateX(-80) scale(1);
    }
`
const IntroBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px;
    padding: 50px;
    position: relative;
`

const WelcomeMsg = styled.h1`
    text-align: center;
    font-family: Josefin Sans;
    color: white;
    font-size: 40px;
    animation: ${SlideInFadeLeft} 0.5s linear;

`

const SpecWords = styled.span`
    font-family: Josefin Sans;
    background-image: linear-gradient(90deg, #c2fd15, #70d8a9);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${FadeUp} 0.5s linear;

`

const Testimonial = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 1150px;


`
const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 30%;
    font-family: Poppins;

    &::before, &::after{
        content: "";
        position: absolute;
        inset: -0.1rem;
        background-image: conic-gradient(
            from var(--gradient-angle),
             #c2fd15, 
             #70d8a9,
             #66ff60,
             #70d8a9,
             #c2fd15);
        border-radius: 20px;
        animation: rotation 10s linear infinite;
        z-index: 1;
    
    }

    &::after{
        filter: blur(.38rem);
    }
    @property --gradient-angle{
        syntax: "<angle>";
        initial-value: 0deg;
        inherits: false;
    }

    @keyframes rotation {
        0% {
            --gradient-angle: 0deg;
        }
        100%{
            --gradient-angle: 360deg;
        }
    }

`

const SmallContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 200px;
    font-family: Poppins;
    margin-top: 80px;
`

const TitleText = styled.h1`
    padding: 20px;
    background-image: linear-gradient(90deg, #c2fd15, #70d8a9);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 50px;
    font-family: Josefin Sans;
    margin-bottom: 20px;

`

const BulletPoints = styled.div`
    display:flex;
    flex-direction: column;
    text-align: left;

    p{
        font-size: 17px;
        margin-bottom: 10px;
    }
`

const Box = styled.div`
    display: flex;
    flex-direction: column;
    font-family: Poppins;
    justify-content: center;
    padding: 0px 20px 0px 20px;
    position: relative;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2em;
    height: 20rem;
    width: 40rem;
    backdrop-filter: blur(20px);
    z-index: 11;
    transform: translate(-80px, 50px);
    animation: ${UserSlide} 1s linear;

`



export const FormContainer = styled.div`
    width: 100%;
    background-color: #131313;
    border-radius: 20px;
    z-index: 5;
    position: relative;
    h1{
        margin-bottom: 20px;
        color: white;
        font-family: Poppins;
        padding: 20px;
        text-align: center;
    }

    h1::before{
        content: "";
        position: absolute;
        width: 25px;
        height: 3px;
        background: linear-gradient(90deg, #c2fd15, #70d8a9);
        top: 50px;
    }

    
`

export const Fields = styled.input`
    font-family: Quicksand;
    color: white;
    font-size: 14px;
    padding: 15px;
    margin: 5px 0px 20px 0;
    border-radius: 10px;
    outline: none;
    border: 1px solid #111111;
    background: #1d1d1d;
    transition: all 0.3s ease;

    &:focus{
        border-color:#c2fd15;
    }

`

export const SubmitButton = styled.button`
    display: flex;
    background-image: linear-gradient(90deg, #c2fd15, #70d8a9);
    border: none;
    border-radius: 50px;
    height:40px;
    text-align: center;
    margin-top: 10px;
    font-size: 18px;
    box-shadow: 0 10px 20px -8px rgba(0, 0, 0,.7);
    transform: scale(1);
    transition: 0.5s;
    cursor: pointer;
    position: relative;

    span{
        width:100%;
        line-height: 28px;
        text-decoration: none;
        color: white;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.7);
        transition: 0.5s;
        font-family: Poppins;
        top: 5px;
        position: relative;
    }

     
    span:after{
        content: ">>>";
        font-family: Josefin Sans;
        position: absolute;
        line-height: 28px;
        opacity: 0;
        top: 0px;
        right: -20px;
        transition: 0.5s;
    }

    &:hover span:after{
        padding-right: 50px;
    }
    &:hover span{
        padding-right: 25px;
    }

    &:hover {
        transform: scale(1.05);
        transition: 0.5s ease-in-out;
    }

    &:hover span:after{
        opacity: 1;
        right: 0;
    }
`

export const InputLabel = styled.label`
    font-family: Quicksand;
    font-size: 15px;
    color: white;


`

export const FormBox = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 20px;
    padding: 40px 60px;
`

export const SmallText = styled.h2`
    font-family: Quicksand;
    color: #414141;
    font-size: 13px;
    margin-top: 20px;
    a{
        color: #78a000;
    }

`

export { Section, SectionTwo, IntroBox, WelcomeMsg, SpecWords, Testimonial, Container, SmallContainer, TitleText, BulletPoints, Box }