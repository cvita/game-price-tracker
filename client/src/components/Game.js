import React, { Component } from 'react';
//import { Link } from 'react-router';
import {
    Card, CardImg, CardBlock,
    CardTitle, Button
} from 'reactstrap';

class Game extends Component {
    handleClick(gameUrl) {
        this.props.makeActiveGame(gameUrl);
    }

    render() {
        const { gameInfo } = this.props

        return (
            <Card className='game'>
                <a href={gameInfo.gameUrl}>
                    <CardImg top width="100%" src={gameInfo.gameImage} alt={gameInfo.game + ' cover image'} />
                </a>
                <CardBlock>
                    <CardTitle>

                    </CardTitle>
                    <Button
                        onClick={() => this.handleClick(gameInfo.gameUrl)}
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
}

export default Game;
