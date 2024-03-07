
import styled, { keyframes } from 'styled-components';
import { SlideInFadeRight } from '../Styles/AnimationComponents';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthProvider.tsx';
import UserDropdown from './UserDropdown.tsx';
import styles from '../Styles/styles.css';

const FadeUp = keyframes`
    0% {
        opacity: 0%;
        transform: translateY(30px) scale(0.9);
    }

    100% {
        opacity: 1;
        transform: translateY(0px) scale(1);
    }
`

const Nav = styled.div`
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #1a1a1a;
    height: 80px;
    width: 100%;
    overflow: hidden;
    z-index: 100;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5)
`

const NavLink = styled.a`

    color: #ffffff;
    text-align: center;
    font-family: Poppins;
    text-decoration: none;
    padding-left: 5px;
    padding-right: 5px;
    margin-right:40px;
    font-size: 18px;
    font-weight: 400;
    position: relative;
    cursor: pointer;
    
    background-image: linear-gradient(90deg, white, white);
    background-clip: text;
    -webkit-text-fill-color: white;
    animation: ${FadeUp} 0.5s linear;
    &:hover:after{
        width: 100%;
        transition: 0.3s;
    }


    &:after{
        content:"";
        position: absolute;
        background-image: linear-gradient(90deg, #c2fd15, #70d8a9);
        height: 3px;
        width: 0;
        left: 0;
        bottom: -10px;
        transition: 0.3s;
    
    }

    i{
        margin-right: 10px;
        margin-left: 5px;

    
    }
`


const LogoImage = styled.img`
    height: 100%;
`

const LogoNav = styled.a`
    display: flex;
    text-align: center;
    height: 60%;
    margin-left:35px;
    text-decoration: none;
    color: white;
    animation: ${SlideInFadeRight} .5s linear;
`

const LogoTitle = styled.h1`
padding-left: 10px;
    line-height: 55px;
    font-family: Josefin Sans;
`

const MenuDiv = styled.div`
    display: flex;
    align-items: center;
    padding-top: 10px;
    height: 70px;
    background-color: #1a1a1a;
    width: 150px;
    position: fixed;
    right: 40px;
    z-index: 2;
    flex-direction: column;

    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);

    top: 80px;
    transition: transform 0.3s ease;

    
`

const DropItems = styled.a`
    color: #ffffff;
    text-align: center;
    font-family: Josefin Sans;
    text-decoration: none;
    padding-left: 5px;
    padding-right: 5px;
    font-size: 18px;
    font-weight: 400;
    position: relative;
    margin: 5px;
    cursor: pointer;

    i{
        margin-left: 10px;
    }
`

function Navbar(){
    const { isLoggedIn, logout, userInfo } = useAuth() as { isLoggedIn: boolean, logout: () => void, userInfo: any };
    const [openDropdownMenu, setOpenDropdownMenu] = useState(false);  

    const openDropdown = () => {
        setOpenDropdownMenu(!openDropdownMenu);
    }

    // Example: Check if user is logged in from localStorage
    axios.defaults.withCredentials = true;
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            // Set the Authorization header with the token
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            axios.get("/auth/user/", config)
            .then(res=> {

                console.log("logged in", res.data)
            }).catch(error => {
                console.log("User is not logged in; log in is false")
            
            })
        }
        else{
            console.log("token is missing")
        }
    }, [])

  return (
    <>
        <Nav>
            <LogoNav href ="/">
                <LogoImage src="/images/pickleball.png"/>
                <LogoTitle>pickleBOT</LogoTitle>
            </LogoNav>

            <nav>
                <NavLink href="/getstarted"><i className="fa-solid fa-folder-open"></i>Documentation</NavLink>
                {isLoggedIn ? (
                    <>
                        <NavLink onClick={openDropdown}><i className="fa-solid fa-user"></i>{userInfo.firstName}<i className="fa-solid fa-caret-down"></i></NavLink>
                    </>

                ) : (
                    <NavLink href="/register"><i className="fa-solid fa-user-plus"></i>Sign Up</NavLink>
                )}

            </nav>



              

        </Nav>

        {openDropdownMenu && (
                    <MenuDiv>
                        <DropItems href="/">Settings<i className="fa-solid fa-gear"></i></DropItems>
                        <DropItems onClick={logout} href="/login">Log Out<i className="fa-solid fa-right-from-bracket"></i></DropItems>
                    </MenuDiv>
                
                )}
    
    </>
  )
}

export default Navbar