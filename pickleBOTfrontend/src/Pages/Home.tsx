import styled from "styled-components"
import { FadeUp, SlideInFadeLeft } from "../Styles/AnimationComponents";
import { device } from "../Styles/breakpoints";



const Section = styled.section`
    display: flex;
    width: 100%;
    align-items: center;
    background-color: #121212;
    height: 100vh;
    flex-direction: column;
    
`

const SectionTwo = styled.section`
    display: flex;
    width: 100%;
    align-items: center;
    background-color: #121212;
    height: 80vh;
    flex-direction: column;
    
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
    margin-top: 80px;
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
    left: 60px;

    @media ${device.lg}{
        width: 800px;
    
    }

    @media ${device.md}{
        width: 80%;
    }
    @media ${device.sm}{
        left: 0px;
        width: 250px;
        height: 400px;
        flex-direction: column;
    }

`
const Container = styled.div`
    margin-top: 80px;
    
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 1000px;
    font-family: Poppins;
    text-align: center;

    @media ${device.lg}{
        width: 300px;
    
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

    @media ${device.lg}{
        font-size: 40px;
    
    }

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

    @media ${device.sm}{
        transform: translate(0px, 20px);
        width: 300px;
        padding: 0px;
        height: 10rem;
        border-radius: 1em;
    }

`

const UserProfile = styled.div`

    position: relative;
    display: flex;

    @media ${device.sm}{

        padding-left: 10px;
    }
`
const Name = styled.div`
    display: flex;
    flex-direction: column;
    font-family: Poppins;
    p{
        color: #111111
    }
    h2{
        line-height: 24px;
        @media ${device.sm}{

            line-height: 15px;
        }
    }
    @media ${device.sm}{

        font-size: 10px;
    }
`
const TMessage = styled.div`
    font-family: Quicksand;
    line-height: 15px;
    position: relative;
    p{
        color: white;
    }

    @media ${device.sm}{
        padding-right: 10px;
        padding-left: 10px;
        font-size: 14px;
    }

`
const ProfilePic = styled.div`
    position: relative;
    img{
        border-radius: 50%;
        height: 50px;
        margin-right: 12px;
        @media ${device.sm}{
        height: 30px;
    }
    }


`
const PickleImage = styled.div`
    position: relative;
    width: 800px;
    height: 400px;
    overflow: hidden;
    img{
        z-index: 8;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
        position: absolute;

    }
    @media ${device.sm}{
            width: 100%;
            height: 100%;
    }
`

const GetStartedButton = styled.button`
    display: flex;
    justify-content: center;
    background-image: linear-gradient(90deg, #c2fd15, #70d8a9);
    border: none;
    border-radius: 50px;
    width: 300px;
    height:50px;
    text-align: center;
    padding: 10px 60px;
    font-size: 20px;
    box-shadow: 0 10px 20px -8px rgba(0, 0, 0,.7);
    transform: scale(1);
    transition: 0.5s;

    a{
        width:100%;
        line-height: 28px;
        text-decoration: none;
        color: white;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.7);
        transition: 0.5s;
        font-family: Poppins;
    }

     
    a:after{
        content: ">>>";
        font-family: Josefin Sans;
        position: absolute;
        line-height: 28px;
        opacity: 0;
        top: 10px;
        right: -20px;
        transition: 0.5s;
    }


    &:hover a:after{
        padding-right: 50px;
    }
    &:hover a{
        padding-right: 25px;
    }

    &:hover {
        transform: scale(1.1);
        transition: 0.5s ease-in-out;
    }

    &:hover a:after{
        opacity: 1;
        right: 0;
    }

`




function Home(){    

    return(
        <>
            <Section>
                <IntroBox>
                    <WelcomeMsg><SpecWords>pickleBOT </SpecWords>is an innovative way to <SpecWords>reserve</SpecWords> a pickleball court.</WelcomeMsg>
                </IntroBox>


                <Testimonial>
                    <PickleImage>
                        <img src="./images/peopleplayingl.jpg"/>
                    </PickleImage>
                    <Box>
                        <UserProfile>
                        <ProfilePic>
                            <img src="./images/fsupbinstaprofile.png"/>
                        </ProfilePic>
                        <Name>
                            <h2>Florida State Pickleball</h2>
                            <p>@pickleballfsu</p>
                        </Name>
                        </UserProfile>
                        <TMessage><p>pickleBOT is so good. i love pickleBOT. pickleBOT is life.</p></TMessage>
                        {/* pickleBOT has dramatically improved the amount of courts 
                        we are able to reserve in Tallahassee. We are now able to hold full practices with over 80+ members
                        without worrying about not having enough space */}
                    </Box>


                </Testimonial>
            </Section>
            <SectionTwo>
                <Container>
                    <TitleText>Overview of pickleBOT</TitleText>
                    <BulletPoints>
                    <p><SpecWords>&gt;</SpecWords> Set up specific court and time reservations.</p>
                    <p><SpecWords>&gt;</SpecWords> Easily configurable to meet needs.</p>
                    <p><SpecWords>&gt;</SpecWords> Schedule the reservation to execute periodically.</p>
                    </BulletPoints>
                </Container>
                <SmallContainer>
                    <GetStartedButton>
                        <a href="/register">Sign Up</a>
                    </GetStartedButton>
                </SmallContainer>
            </SectionTwo>

        </>
    )
}

export default Home