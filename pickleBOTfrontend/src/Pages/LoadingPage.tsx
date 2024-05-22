import styled, { keyframes } from 'styled-components'


const Section = styled.section`
    display: flex;
    width: 100%;
    align-items: center;
    background-color: #121212;
    height: 100vh;
    flex-direction: column;
    
`



const Spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`
const Loader = styled.div`
  border: 4px solid #585858;
  border-top: 4px solid #c2fd15;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  position: relative;
  top: 100px;
  animation: ${Spin} 1s linear infinite;

`


const PageNotFound = () => {
  return (
    <Section>
      <Loader/>
    </Section>
  )
}

export default PageNotFound