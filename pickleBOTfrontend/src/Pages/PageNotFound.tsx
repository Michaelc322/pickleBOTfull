import styled from 'styled-components'


const Section = styled.section`
    display: flex;
    width: 100%;
    align-items: center;
    background-color: #121212;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    
`
const MissText = styled.h1`
    text-align: center;
    font-family: Josefin Sans;
    color: white;
    font-size: 40px;

`

const Container = styled.div`
    top: -50px;
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 90%;
    font-family: Poppins;


`
const HomeButton = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    color: #c2fd15;
    font-family: Poppins;
    font-size: 20px;
    border-radius: 10px;
    text-decoration: none;
    &:hover{
        text-decoration: underline;
    }

`
const PageNotFound = () => {
  return (
    <Section>
        <Container>
            <MissText>Oops! This page does not exist.</MissText>
            <HomeButton href="/">Take me back to the home page</HomeButton>
        </Container>
    </Section>
  )
}

export default PageNotFound