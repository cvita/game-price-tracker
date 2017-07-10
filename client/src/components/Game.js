import React from 'react';
import { Card, CardImg, CardBlock, Button } from 'reactstrap';

function Game(props) {
    const { _id, image, url } = props;
    
    return (
        <Card className='game'>
            <a href={url}><CardImg top width="100%" src={image} alt={_id + ' cover image'} /></a>
            <CardBlock>
                <Button
                    onClick={() => props.makeActiveGame(url)}
                    block
                    color='secondary'
                    outline
                >
                    Select
                    </Button>
            </CardBlock>
        </Card>
    );
}

export default Game;
