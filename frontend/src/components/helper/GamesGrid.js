import React, { Component } from 'react';
import { push } from 'react-router-redux';
import store from '../../redux/store';

import LazyFadeIn from '../helper/LazyFadeIn';
import ListOfPlatforms from '../helper/ListOfPlatforms';
import { Row, Col, Button, Badge, Card, CardImg, CardImgOverlay, CardBody, CardSubtitle, CardFooter } from 'reactstrap';
import './GamesGrid.css';


class Game extends Component {
    handleClick(gameId) {
        store.dispatch(push(`/games/${gameId}`));
    }
    render() {
        const { title, _id, image, price, discount, psPlusPrice } = this.props;
        const { platforms, gameContentType } = this.props.details;
        const imageHeight = parseInt(image.slice(-3), 10);
        const discountBadge = psPlusPrice ?
            <Badge pill color='info'>{discount}% off PS+</Badge> :
            <Badge pill color='primary'>{discount}% off</Badge>;

        return (
            <Card className='game'>
                <LazyFadeIn height={imageHeight} offset={imageHeight * 1.5}>
                    <CardImg width='100%' src={image} alt={title} />
                </LazyFadeIn>

                <CardImgOverlay style={{ padding: '0' }}>
                    <div
                        className='gameOverlayBackground'
                        onClick={() => this.handleClick(_id)}
                    >
                        <Button className='gameSelectButton' size='sm' color='secondary' outline>
                            Select for price alert
                        </Button>
                    </div>
                </CardImgOverlay>

                <CardBody>
                    <CardSubtitle>
                        <strong>{title}</strong>
                    </CardSubtitle>
                    <small>{gameContentType}</small>
                    <br />
                    <ListOfPlatforms platforms={platforms} />
                    {discount && (
                        <div>{discountBadge}</div>)}
                </CardBody>

                <CardFooter>
                    ${price}
                </CardFooter>
            </Card>
        );
    }
}

const GamesGrid = props => {
    const { allGames, activeGame } = props;
    const gamesGrid = allGames.map((game, i) => {
        if (activeGame && game._id === activeGame._id) {
            return <div key={`${game._id} ${i}`} />;
        }
        return (
            <Col lg='3' md='4' sm='6' xs='12' key={`${game._id} ${i}`} >
                <Game  {...game} />
            </Col>
        );
    });
    return (
        <Row>
            {gamesGrid}
        </Row>
    );
};


export default GamesGrid;
