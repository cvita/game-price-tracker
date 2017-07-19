import React, { Component } from 'react';
import { Badge, Container, Row, Col } from 'reactstrap';
import './GamePreview.css';




class GamePreview extends Component {
    render() {
        const { title, image, strikePrice, onSale, psPlusPrice, price } = this.props;
        const regularPriceIsValid = !onSale || psPlusPrice;

        return (
            <Container>
                <Row>
                    <Col xs='6'>
                        <img className='img-fluid' src={image} alt={title} />
                    </Col>

                    <Col xl='6'>
                        {regularPriceIsValid &&
                            <h3>{title} is currently <Badge>${price}</Badge></h3>}

                        {psPlusPrice &&
                            <h5><i>PS Plus</i> member price <Badge color='info'>${psPlusPrice}</Badge></h5>}

                        {onSale && !psPlusPrice &&
                            <div>
                                <h3><i>Nice!</i> {title} is on sale for <Badge>${price}</Badge></h3>
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
