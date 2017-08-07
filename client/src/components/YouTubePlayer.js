import React, { Component } from 'react';
import './YouTubePlayer.css';


class YouTubePlayer extends Component {
  componentDidMount() {
    if (this.props.activeGame) {
      this.props.searchVideo(
        this.props.activeGame.title + ' ' + this.props.activeGame.details.platforms[0]
      );
    }
  }
  render() {
    const videoId = this.props.activeGame.videos;
    const src = 'https://www.youtube.com/embed/' + videoId + '?enablejsapi=1';

    return (
      <div>
        {this.props.activeGame && this.props.activeGame.videos &&
          <div className='videoWrapper'>
            <iframe
              id='player'
              title={this.props.activeGame.title}
              type='text/html'
              src={src}
              frameBorder='0'
            />
          </div>}
      </div>
    );
  }
}


export default YouTubePlayer;
