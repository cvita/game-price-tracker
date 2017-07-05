import React from 'react';
import { Alert, Badge, Button, Container, Row, Col } from 'reactstrap';


function GamePreview(props) {
    return (
        <div>
            <Container>
                <Row>
                    <Col md='6'>
                         <img className='gameImage' src={props.gameImage} alt='game thumbnail' />
                    </Col>
                    <Col md='6'>

                        {!props.onSale ?
                            <h3>{props.game} is currently <Badge>{props.price}</Badge></h3> :
                            <div>
                                <h3><i>Nice!</i> {props.game} is already on sale for <Badge>{props.price}</Badge></h3>
                                <strong>Regular price: {props.strikePrice}</strong>
                                <Alert color='warning'>
                                    <p>You're still welcome to set up this price alert in case {props.game} gets an even greater discount.</p>
                                </Alert>
                            </div>}
                        
                        <p className='gamePreviewMessage'>
                            You will receive a message at {props.userEmail} if {props.game} drops below {props.price} before {props.expiration}.
                        </p>

                        <Button
                            className='gamePreviewButton'
                            color='success'
                            onClick={props.handleClickOnConfirmation}
                        >
                            Sounds good
                        </Button>

                        <Button
                            className='gamePreviewButton'
                            color='danger'
                            outline
                            onClick={props.handleResetClick}
                        >
                            Nevermind
                        </Button>
                        
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default GamePreview;
