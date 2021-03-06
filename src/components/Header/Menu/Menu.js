import React from 'react';
import './Menu.scss';
import {Link as ScrollLink} from "react-scroll";
import {Link} from 'react-router-dom';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const Menu= ({loggedUser, setLoggedUser}) => {
    let result = null;

    if (loggedUser) {
        result = (
            <div className="navbar__buttons--welcome">
                Cześć {loggedUser.email}!
            </div>
        )
    }

    const handleLogout = () => {
        firebase.auth().signOut().then(function() {
            setLoggedUser(null);
        }).catch(function(error) {
            console.log(error.message);
        })
    };

    return (
        <Container className="navbar__container">
            <Navbar fixed="top" bg="light" expand="lg" className="navbar__mobile">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <div className="navbar__buttons--mobile">
                    {loggedUser ? <Link to="/wylogowano"><Button onClick={()=>handleLogout()} variant="outline-secondary">Wyloguj</Button></Link>: <Link to="/logowanie"><Button variant="outline-secondary">Zaloguj się</Button></Link>}
                </div>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Start</Nav.Link>
                        <ScrollLink className="nav-link" to="steps" spy={true} smooth={true} offset={-100} duration={500}>O co chodzi?</ScrollLink>
                        <ScrollLink className="nav-link" to="about" spy={true} smooth={true} offset={-35} duration={500}>O nas</ScrollLink>
                        <ScrollLink className="nav-link" to="associations" spy={true} smooth={true} offset={-50} duration={500}>Fundacja i organizacje</ScrollLink>
                        <ScrollLink className="nav-link" to="contact" spy={true} smooth={true} offset={-20} duration={500}>Kontakt</ScrollLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <div className="navbar__buttons--desktop">
                {loggedUser ? result : null}
                {loggedUser ? <Link to="/oddaj-rzeczy"><Button variant="outline-secondary">Oddaj rzeczy</Button></Link> : <Link to="/logowanie"><Button variant="outline-secondary">Zaloguj się</Button></Link>}
                {loggedUser ? <Link to="/wylogowano"><Button onClick={()=>handleLogout()} variant="outline-secondary">Wyloguj</Button></Link> : <Link to="/rejestracja"><Button variant="outline-secondary">Załóż konto</Button></Link>}
            </div>
            <Nav className="justify-content-end navbar__desktop">
                <Nav.Item>
                    <Nav.Link href="/">Start</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <ScrollLink className="nav-link" to="steps" spy={true} smooth={true} offset={-110} duration={500}>O co chodzi?</ScrollLink>
                </Nav.Item>
                <Nav.Item>
                    <ScrollLink className="nav-link" to="about" spy={true} smooth={true} offset={-140} duration={500}>O nas</ScrollLink>
                </Nav.Item>
                <Nav.Item>
                    <ScrollLink className="nav-link" to="associations" spy={true} smooth={true} offset={-30} duration={500}>Fundacja i organizacje</ScrollLink>
                </Nav.Item>
                <Nav.Item>
                    <ScrollLink className="nav-link" to="contact" spy={true} smooth={true} duration={500}>Kontakt</ScrollLink>
                </Nav.Item>
            </Nav>
        </Container>
    );
};
export default Menu;