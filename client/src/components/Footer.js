import React from 'react';
import { Col, Row, Nav, NavLink } from 'reactstrap';
import './Footer.css';

function Footer(props) {
    return (
        <footer className='footer'>
            <Row>
                <Col md='12'>
                    <Nav>
                        <NavLink href='https://github.com/VitaC123/game-price-tracker'>View source</NavLink>
                    </Nav>
                </Col>
            </Row>
        </footer>
    );
}

export default Footer;