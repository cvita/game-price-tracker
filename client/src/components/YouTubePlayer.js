import React, { Component } from 'react';
import './YouTubePlayer.css';


class YouTubePlayer extends Component {
  componentDidMount() {
    if (this.props) {
      this.props.searchVideo(
        this.props.title + ' ' + this.props.details.platforms[0].slice(0, 3) // slice to eliminate '™' from 'PS3'/'PS4'
      );
    }
  }
  render() {
    const videoId = this.props.videos;
    const src = 'https://www.youtube.com/embed/' + videoId + '?enablejsapi=1';

    return (
      <div>
        {this.props && this.props.videos &&
          <div className='videoWrapper'>
            <iframe
              id='player'
              title={this.props.title}
              type='text/html'
              src={src}
              frameBorder='0'
              allowFullScreen
            />
          </div>}
      </div>
    );
  }
}


export default YouTubePlayer;
