import React, { Component } from 'react';
import Game from './Game';
import './GamesGrid.css';

class GamesGrid extends Component {
    render() {
        return (
            <div className='gamesGridContainer'>
                <div className='gamesGrid'>
                    {this.props.allGames.map((game, i) => {
                        return <Game {...this.props.allGames[i]} key={i} makeActiveGame={this.props.makeActiveGame}/>
                    })}
                </div>
            </div>
        );
    }
}


export default GamesGrid;
