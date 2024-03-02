import styled from "styled-components";
 
export const Box = styled.div`
    padding: 5% 2.5%;
    background: #1a1a1a;
    // position: absolute;
    bottom: 0;
    width: 95%;
 
    @media (max-width: 1000px) {
        // padding: 70px 30px;
    }
`;
 
export const FooterContainer = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    h3{
        font-family: Quicksand;
    }
`;
 
 export const Socials = styled.a`
    color: white;
    font-size: 2.3rem;
    font-family: "Font Awesome 6 Brands";
    transition: color 0.3s ease-in-out;
    padding-right: 20px;
    &:hover{
        color: #c2fd15;
    }
 `

export const FooterLink = styled.a`

    margin: 20px;
    font-size: 18px;
    text-decoration: none;
 
    &:hover {
        color: green;
        transition: 200ms ease-in;
    }
`;
 
export const Heading = styled.p`
    font-size: 24px;
    color: #fff;
    margin-bottom: 40px;
    font-weight: bold;
`;