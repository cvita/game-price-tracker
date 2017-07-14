import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Button, Badge, Card, CardImg, CardText, CardImgOverlay } from 'reactstrap';
import './Game.css';


class Game extends Component {
    handleClick(url) {
        this.props.makeActiveGame(url)
        browserHistory.push(url.slice(url.indexOf('/games/')));
    }
    render() {
        const { _id, image, url } = this.props;
        const { platforms } = this.props.details;

        return (
            <Card inverse className='game'>
                <CardImg
                    width="100%"
                    src={image}
                    alt={_id + 'cover image'}
                />
                <CardImgOverlay id='cardImgOver'>
                    <div className='overlayBackground' onClick={() => this.handleClick(url)}>
                        <Button
                            id='selectButton'
                            size='sm'
                            color='secondary'
                            outline
                        >
                            Select for price alert
                            </Button>
                        <CardText>
                            {platforms.map((system, i) => <Badge pill key={system}>{system}</Badge>)}
                        </CardText>
                    </div>
                </CardImgOverlay>

            </Card>
        );
    }
}

export default Game;
