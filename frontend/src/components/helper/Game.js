import React, { Component } from 'react';
import { Button, Badge, Card, CardImg, CardImgOverlay, CardBlock, CardSubtitle, CardFooter } from 'reactstrap';
import LazyLoad from 'react-lazy-load';
import './Game.css';


class Game extends Component {
    handleClick(gameId) {
       // browserHistory.push(`/games/${gameId}`);
    }
    render() {
        const { title, _id, image, price, discount, psPlusPrice } = this.props;
        const { platforms, gameContentType } = this.props.details;
        const imageHeight = parseInt(image.slice(-3), 10);

        return (
            <Card className='game'>
                <LazyLoad height={imageHeight} offset={imageHeight * 1.5}>
                    <CardImg width="100%" src={image} alt={title + ' cover image'} />
                </LazyLoad>
                <CardImgOverlay id='cardImgOver'>
                    <div className='overlayBackground' onClick={() => this.handleClick(_id)}>
                        <Button id='selectButton' size='sm' color='secondary' outline>
                            Select for price alert
                        </Button>
                    </div>
                </CardImgOverlay>

                <CardBlock>
                    <CardSubtitle><strong>{title}</strong></CardSubtitle>
                    <div>
                        <small>{gameContentType}</small><br />
                        {platforms.map((system, i) => <span key={system}><Badge pill>{system}</Badge> </span>)}

                        {discount &&
                            <div>
                                {!psPlusPrice ?
                                    <Badge pill color='primary'>{discount}% off</Badge> :
                                    <Badge pill color='info'>{discount}% off PS+</Badge>}
                            </div>}
                    </div>
                </CardBlock>

                <CardFooter>${price}</CardFooter>
            </Card>
        );
    }
}


export default Game;
