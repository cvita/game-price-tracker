import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Button, Badge, Card, CardImg, CardText, CardImgOverlay, CardBlock, CardSubtitle } from 'reactstrap';
import './Game.css';


class Game extends Component {
    handleClick(storeCode) {
        browserHistory.push(`/games/${storeCode}`);
    }
    render() {
        const { title, _id, image, } = this.props;
        const { platforms, gameContentType } = this.props.details;

        return (
            <Card className='game'>

                <CardImg
                    width="100%"
                    src={image}
                    alt={title + ' cover image'}
                />
                <CardImgOverlay id='cardImgOver'>
                    <div className='overlayBackground' onClick={() => this.handleClick(_id)}>
                        <Button
                            id='selectButton'
                            size='sm'
                            color='secondary'
                            outline
                        >
                            Select for price alert
                            </Button>
                    </div>
                </CardImgOverlay>

                <CardBlock>
                    <CardSubtitle><strong>{title}</strong></CardSubtitle>
                    <CardText>
                        <small>{gameContentType}</small><br />
                        {platforms.map((system, i) => <span key={system}><Badge pill>{system}</Badge> </span>)}
                    </CardText>
                </CardBlock>
                
            </Card>
        );
    }
}

export default Game;
