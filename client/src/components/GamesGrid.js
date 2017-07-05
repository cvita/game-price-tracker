import React, { Component } from 'react';
import Game from './Game';
import './GamesGrid.css';

class GamesGrid extends Component {
    render() {
        //  console.log('GAMES GRID HERE', this.props.gamesInDb);

        return (
            <div className='gamesGridContainer'>
                <div className='gamesGrid'>
                    {this.props.gamesInDb.map((game, i) => {
                        return <Game {...this.props} key={i} i={i} gameInfo={game} />
                    })}
                </div>
            </div>
        );
    }
}

export default GamesGrid;