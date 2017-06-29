import React from 'react';
import { Alert, Badge, Button, Container, Row, Col } from 'reactstrap';



function RegularPrice(props) {
    var game = props.priceAlertInfo.game;
    var price = props.priceAlertInfo.price;
    return (
        <div>
            <h3>{game} is currently <Badge>{price}</Badge></h3>
        </div>
    );
}

function SalePrice(props) {
    var game = props.priceAlertInfo.game;
    var price = props.priceAlertInfo.price;
    var originalPrice = props.priceAlertInfo.onSale.originalPrice;

    return (
        <div>
            <h3><i>Nice!</i> {game} is already on sale for <Badge>{price}</Badge></h3>
            <strong>Regular price: {originalPrice}</strong>
            <Alert color='warning'>
                <p>You're still welcome to set up this price alert in case {game} gets an even greater discount.</p>
            </Alert>
        </div>
    );
}

function GamePreview(props) {
    var game = props.priceAlertInfo.game;
    var gameImage = props.priceAlertInfo.gameImage;
    var price = props.priceAlertInfo.price;
    var email = props.priceAlertInfo.email;
    var expiration = props.priceAlertInfo.expiration;

    var previewMessage = <RegularPrice priceAlertInfo={props.priceAlertInfo} />;
    if (props.priceAlertInfo.onSale.status) {
        previewMessage = <SalePrice priceAlertInfo={props.priceAlertInfo} />;
    }





    return (
        <div>
            <Container>
                <Row>
                    <Col md='6'>
                        <img className='gameImage' src={gameImage} alt='game thumbnail' />
                    </Col>
                    <Col md='6'>
                        {previewMessage}

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