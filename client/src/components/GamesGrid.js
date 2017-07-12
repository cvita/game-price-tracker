import React, { Component } from 'react';
import Game from './Game';
import './GamesGrid.css';


class GamesGrid extends Component {
    render() {
        const { allGames } = this.props;
        var gamesToDisplay = [];
        for (var i = allGames.length - 1; i >= 0; i--) {
            gamesToDisplay.push(<Game {...allGames[i]} key={i} />);
        }

        return (
            <div className='gamesGridContainer'>
                <div className='gamesGrid'>
                    {gamesToDisplay}
                </div>
            </div>
        );
    }
}


export default GamesGrid;
