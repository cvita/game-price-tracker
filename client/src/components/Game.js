import React from 'react';
import { Link } from 'react-router';
import { Badge, Card, CardImg, CardBlock } from 'reactstrap';
import './Game.css';

function Game(props) {
    const { _id, image, url, price } = props;

    return (
        <Card className='game'>
            <Link to={`${url.slice(url.indexOf('/games/'))}`}>
                <CardImg
                    top
                    width="100%"
                    src={image}
                    alt={_id + ' cover image'}
                />
            </Link>
            <CardBlock>
                <Badge>PS4</Badge>{' '}
                ${price}
            </CardBlock>
        </Card>
    );
}

export default Game;
