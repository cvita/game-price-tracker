import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Button, Badge, Card, CardImg, CardImgOverlay, CardBlock, CardSubtitle, CardFooter } from 'reactstrap';
import './Game.css';


class Game extends Component {
    handleClick(gameId) {
        browserHistory.push(`/games/${gameId}`);
    }
    render() {
        const { title, _id, image, price, discount, psPlusPrice } = this.props;
        const { platforms, gameContentType } = this.props.details;

        return (
            <Card className='game'>
                <CardImg width="100%" src={image} alt={title + ' cover image'} />
                
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
