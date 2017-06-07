import React from 'react';
import {Container, Row, Col, Badge, Button} from 'reactstrap';

function GamePreview(props) {
    const info = props.priceAlertInfo;

    var game = info.game;
    var gameImage = info.gameImage;
    var price = info.price;
    var expiration = info.expiration;
    var email = info.email;

    return (
        <div>
            <Container>
                <Row>
                    <Col md='6'>
                        <img className='gameImage' src={gameImage} alt='game thumbnail' />
                    </Col>
                    <Col md='6'>
                        <h3>{game} is currently <Badge>{price}</Badge></h3>
                        <p className='gamePreviewMessage'>
                            You will receive a message at {email} if {game} drops below {price} before {expiration}.
                            </p>

                        {!props.priceAlertSubmitted &&
                            <div>
                                <Button
                                    className='gamePreviewButton'
                                    color='success'
                                    onClick={props.handleConfirmationClick}
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
                            </div>}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default GamePreview;