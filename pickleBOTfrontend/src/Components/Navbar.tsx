
import styled, { keyframes } from 'styled-components';
import { SlideInFadeRight } from '../Styles/AnimationComponents';
import { useState } from 'react';
import { useAuth } from '../../context/AuthProvider.tsx';
import '../Styles/styles.css';
import axios from 'axios';

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
    background: #121212;
    height: 80px;
    width: 100%;
    overflow: hidden;
    z-index: 100;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);


    @media screen and (max-width: 768px){
        nav{
            display: none;
        }
    }

    
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
    font-weight: 700;
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
    height: 50px;
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

const Hamburger = styled.div`
    display: none;

    @media screen and (max-width: 768px){
        display: block;
        right: 30px;
        position: relative;
        cursor: pointer;
        i{
            font-size: 26px;
        }
    }
`

const MobileMenuDiv = styled.div`
    display: none;
    @media screen and (max-width: 768px){
        position: fixed;
        z-index: 13;
        background-color: #121212;
        box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
        height: auto;
        width: 100%;
        display: flex;
        flex-direction: column;
        top: 80px;
        padding-top: 20px;
        padding-bottom: 20px;
        align-items: center;
        left:100%;
        transition: all 0.5s ease;

        &.menuActive{
            left: 0%;
            transition: all 0.5s ease;
        }
    }

`

const MenuLink = styled.a`
    width: 100%;
    padding: 10px;
    text-align: center;
    font-family: Poppins;
    text-decoration: none;
    cursor: pointer;
    font-size: 18px;
    font-weight: 700;
    color: white;

    animation: ${FadeUp} 0.2s linear;


    i{
        margin-right: 10px;
        margin-left: 5px;

    
    }

`

function Navbar(){
    const { isLoggedIn, userInfo, logout } = useAuth() as any;
    const [openDropdownMenu, setOpenDropdownMenu] = useState(false);  
    const [openHamburgerMenu, setOpenHamburgerMenu] = useState(false);
    console.log("is logged in navbar", isLoggedIn)
    const openDropdown = () => {
        setOpenDropdownMenu(!openDropdownMenu);
    }

    const openHamburger = () => {
        setOpenHamburgerMenu(!openHamburgerMenu);
    }

    const handleLogout = () => {
        axios.post('/auth/logout').then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        })

        logout();
        
    }

  return (
    <>
        <Nav>
            <LogoNav href ="/">
                <LogoImage src="/images/pickleball.png"/>
                <LogoTitle>pickleBOT</LogoTitle>
            </LogoNav>

        
            <nav>
                <NavLink href="/reserve-courts"><i className="fa-solid fa-calendar-days"></i>Reserve</NavLink>
                <NavLink href="/getstarted"><i className="fa-solid fa-folder-open"></i>Documentation</NavLink>

                {isLoggedIn ? (
                    <>
                        <NavLink onClick={openDropdown}><i className="fa-solid fa-user"></i>{userInfo.firstName}<i className="fa-solid fa-caret-down"></i></NavLink>
                    </>

                ) : (
                    <NavLink href="/register"><i className="fa-solid fa-user-plus"></i>Sign Up</NavLink>
                )}

            </nav>

            <Hamburger><i onClick={openHamburger} className={openHamburgerMenu ? "fa-solid fa-x":"fa-solid fa-bars"}></i></Hamburger>

              

        </Nav>

        {openDropdownMenu && (
                    <MenuDiv>
                        {/* <DropItems href="/">Settings<i className="fa-solid fa-gear"></i></DropItems> */}
                        <DropItems onClick={handleLogout} href="/login">Log Out<i className="fa-solid fa-right-from-bracket"></i></DropItems>

                    </MenuDiv>
                
        )}

        <MobileMenuDiv className={openHamburgerMenu ? "menuActive" : ""}>
            <MenuLink href="/">Home<i className="fa-solid fa-house"></i></MenuLink>
            <MenuLink href="/getstarted">Documentation<i className="fa-solid fa-folder-open"></i></MenuLink>
            <MenuLink href="/reserve-courts">Reserve<i className="fa-solid fa-calendar-days"></i></MenuLink>
            {isLoggedIn ? (
                <>
                    <MenuLink href="/">Settings<i className="fa-solid fa-gear"></i></MenuLink>
                    <MenuLink onClick={logout} href="/login">Log Out<i className="fa-solid fa-right-from-bracket"></i></MenuLink>

                </>

            ) : (
                <>
                <MenuLink href="/register">Sign Up<i className="fa-solid fa-user-plus"></i></MenuLink>
                <MenuLink href="/login">Log In<i className="fa-solid fa-right-to-bracket"></i></MenuLink>
                </>
                
            )}

        </MobileMenuDiv>   
        
        
        
    </>
  )
}

export default Navbar