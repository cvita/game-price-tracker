import React, { Component } from 'react';
import { Badge, Container, Row, Col } from 'reactstrap';

class GamePreview extends Component {
    render() {
        const { _id, image, price, strikePrice, onSale } = this.props;

        return (
            <Container>
                <Row>
                    <Col md='6'>
                        <img className='gameImage' src={image} alt='game thumbnail' />
                    </Col>

                    <Col md='6'>
                        {!onSale ?
                            <h3>{_id} is currently <Badge>${price}</Badge></h3> :
                            <div>
                                <h3><i>Nice!</i> {_id} is on sale for <Badge>${price}</Badge></h3>
                                <strong>Regular price: ${strikePrice}</strong>
                            </div>}

                        {this.props.children}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default GamePreview;
