import styled from "styled-components";
import { SlideInFadeLeft } from "../Styles/AnimationComponents";
import { Keyword, KeywordAssigned, KeywordName } from "../Styles/CodeSnippet";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const Section = styled.section`
    display: flex;
    padding: 80px;
    align-items: center;
    background-color: #121212;
    height: 100%;
    flex-direction: column;
    
`

const TitleText = styled.h1`
    margin-top: 50px;
    text-align: left;
    font-family: Josefin Sans;
    background-image: linear-gradient(90deg, #c2fd15, #70d8a9);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 40px;
    width: 100%;

`
const ContainerMedium = styled.div`
    display: flex;
    align-items: center;
    background-color: #121212;
    width: 800px;
    flex-direction: column;
    animation: ${SlideInFadeLeft} 0.5s linear;
    `
const H1Text = styled.h1`
    text-align: left;
    font-family: Josefin Sans;
    color: white;
    font-size: 30px;
`

const Divider = styled.hr`
    width: 100%;
    border: 0;
    height: 1px;
    background-color: #292929;
    //background-image: linear-gradient(90deg, #c2fd15, #70d8a9);
    margin-top: 20px;
    margin-bottom: 20px;
`

const SubHeading = styled.p`
    width: 100%;
    text-align: left;
    font-family: Josefin Sans;
    font-weight: 600;
    color: white;
    font-size: 18px;
    margin-top: 10px;
    letter-spacing: 2px;
    a{
        color: #8d8d8d;
        text-decoration: none;
    }

    a:hover{
        text-decoration: underline;
    }

`

const MainText = styled.p`
    text-align: left;
    font-family: QuickSand;
    color: white;
    font-size: 15px;
    margin-top: 20px;

`

const CodeContainer = styled.div`
    background-color: #0c0c0c;
    padding: 20px;
    border-radius: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100%;
    pre{
        color: white;
    }
    code{
        color: white;
        font-size: 12px;
    }
`

function GetStarted() {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    useEffect(() => {
        // const token = localStorage.getItem('token');
        // if(token){
        //     // Set the Authorization header with the token
        //     const config = {
        //         headers: {
        //             Authorization: `Bearer ${token}`
        //         }
        //     };
            axios.get("/auth/user/", { withCredentials: true })
            .then(res=> {
                console.log("trying to verify for getting started", res.data);
            }).catch(error => {
                console.log("failed to verify getting started", error.response.data)
                navigate('/login')
            })
        //}
        // else{
        //     console.log("token is missing")
        //     navigate('/login')
        // }
    }, [])



  return (
    <>
    <Section>
        <ContainerMedium>
            <TitleText>Getting Started</TitleText>
            <SubHeading>February 18, 2024 by <a  target="_blank" href="https://www.linkedin.com/in/michael-carroll-b40020250/">Michael Carroll</a></SubHeading>
            <Divider></Divider>
        </ContainerMedium>


    
      <ContainerMedium>
        <div>
            <H1Text>Setting up your environment</H1Text>
            <Divider></Divider>
            <MainText>First, you need to install Node.js. You can download it from the official website. Once you have installed Node.js, you can use the following command to install the Create React App package.</MainText>
            <Divider></Divider>

            <MainText>To configure this bot, there is a layout that must be followed in order to reserve certain courts.</MainText>
            <MainText>When opening up the source code, there is a list of configurable variables which I have defined below:</MainText>
            <CodeContainer>
                <pre>
                    <code>
                        <Keyword>const</Keyword><KeywordName> user</KeywordName> = <KeywordAssigned>"user123"</KeywordAssigned>;
                        <br></br>
                        <Keyword>const</Keyword><KeywordName> password</KeywordName> = <KeywordAssigned>"password123"</KeywordAssigned>;
                        <br></br>
                        <Keyword>const</Keyword><KeywordName> TimeSlot</KeywordName> = <KeywordAssigned>2</KeywordAssigned>;
                        <br></br>
                        <Keyword>const</Keyword><KeywordName> CourtNum</KeywordName> = <KeywordAssigned>3</KeywordAssigned>;
                        <br></br>
                        <Keyword>const</Keyword><KeywordName> WhichCourt</KeywordName> = <KeywordAssigned>"Tom Brown"</KeywordAssigned>;
                    </code>
                </pre>

            </CodeContainer>
            <MainText>
            These variables are used to log in to the website, reserve a specific time slot and reserve a certain court at a specific location.
            <br></br>
            </MainText>
            <Divider></Divider>
            <SubHeading>Variables in more detail:</SubHeading>
            <Divider></Divider>
            <MainText><KeywordName>user</KeywordName> and <KeywordName>password</KeywordName> are the variables you will set to log in to the court reservation website using the bot.
                <br></br>
                DISCLAIMER: No data is being stored. This bot is ran locally, meaning YOU are the one who defines the values and no one else can see.
            </MainText>
            <MainText>The <KeywordName>CourtNum</KeywordName> variable corresponds to the court number you want to reserve.</MainText> 
            <MainText>
                    - Therefore, reserving courts at Tom Brown would be from ranges 1-4 and courts at Four Oaks would be any number from 1-6
            </MainText>

            <MainText>The <KeywordName>TimeSlot</KeywordName> variable corresponds to the time slot you want to reserve. In other words, it is the row number in the grid of reservations.</MainText> 
            <MainText>
                    - The range of values go from the value <KeywordAssigned>1</KeywordAssigned> corresponding to 8:30-10:00am to <KeywordAssigned>8</KeywordAssigned> corresponding to the time 7:00-8:30pm.
            </MainText>
            <MainText>Changing these variables is how you will customize which court you want to reserve and for what time.</MainText>
            <MainText>Specify which location you would like to make a reservation for <KeywordAssigned>"Tom Brown"</KeywordAssigned> or <KeywordAssigned>"Four Oaks"</KeywordAssigned></MainText>
            <MainText>ALL VARIABLES ARE REQUIRED TO RUN BOT</MainText>
            <Divider></Divider>
            <H1Text>More configuration... but it gets a little spicy</H1Text>
            <Divider></Divider>
            <SubHeading>CRON Scheduling</SubHeading>
            <MainText>This is how you can schedule the execution of the bot to perform on specific days at certain times</MainText>
            <Divider></Divider>
            <CodeContainer>
                <pre>
                    <code>

                    </code>
                </pre>

            </CodeContainer>

        </div>
        </ContainerMedium>
    </Section>

    </>
    
  );
}

export default GetStarted;