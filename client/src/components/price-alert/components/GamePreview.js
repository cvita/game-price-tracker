import React from 'react';
import { Alert, Badge, Container, Row, Col } from 'reactstrap';


function GamePreview(props) {
    const { image, price, strikePrice } = props.activeGame;
    const title = props.activeGame._id;
    const { userEmail, expiration } = props.userInfo;

    return (
        <Container>
            <Row>
                <Col md='6'>
                    <img className='gameImage' src={image} alt='game thumbnail' />
                </Col>

                <Col md='6'>
                    {!props.onSale ?
                        <h3>{title} is currently <Badge>${price}</Badge></h3> :
                        <div>
                            <h3><i>Nice!</i> {title} is already on sale for <Badge>${price}</Badge></h3>
                            <strong>Regular price: {strikePrice}</strong>
                            <Alert color='warning'>
                                <p>You're still welcome to set up this price alert in case {title} gets an even greater discount.</p>
                            </Alert>
                        </div>}

                    <p className='gamePreviewMessage'>
                        You will receive a message at <strong>{userEmail}</strong> if {title}'s price drops below ${price} before {expiration}.
                    </p>
                    {props.children}
                </Col>

            </Row>
        </Container>
    );
}

export default GamePreview;
