import React, { Component } from 'react';
import Game from './Game';
import './GamesGrid.css';


class GamesGrid extends Component {
    render() {
        const { allGames } = this.props;

        return (
            <div className='gamesGridContainer'>
                <div className='gamesGrid'>
                    {allGames.map((game, i) => {
                        return this.props.activeGame && game._id === this.props.activeGame._id ?
                            <div key={game._id} /> :
                            <Game {...game} key={game._id} makeActiveGame={this.props.makeActiveGame} />;
                    })}
                </div>
            </div>
        );
    }
}


export default GamesGrid;
