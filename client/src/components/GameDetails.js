import React, { Component } from 'react';
import { Container, Row, Col, Badge } from 'reactstrap';

import './GameDetails.css';

class GameDetails extends Component {
    render() {
        const { url } = this.props;
        const { description, esrbRating, starRating, platforms, gameDev, releaseDate } = this.props.details;
        const { videos, screenshots } = this.props.media;

        return (
            <div className='gameDetailsContainer'>
                <Container>
                    <Row className='descriptionAndDetails'>
                        <Col sm='8'>
                            <div className='gameDescription'>
                                <p className='lead'>{description}</p>
                            </div>
                        </Col>

                        <Col xl='4'>
                            <dl className='row'>
                                <dt className='col-lg-3'>Purchase</dt>
                                <dd className='col-lg-9'><a href={url} target='_blank' rel='noopener noreferrer' >Sony store</a></dd>

                                <dt className='col-xl-3'>Developer</dt>
                                <dd className='col-xl-9'>{gameDev}</dd>

                                <dt className='col-xl-3'>Released</dt>
                                <dd className='col-xl-9'>{new Date(releaseDate).toDateString().slice(3)}</dd>


                                <dt className='col-xl-3'>Stars</dt>
                                <dd className='col-xl-9'><Badge pill> {starRating}</Badge></dd>

                                <dt className='col-xl-3'>Systems</dt>
                                <dd className='col-xl-9'>{platforms.map(system => system + ' ')}</dd>

                                <dt className='col-xl-3'>Rated</dt>
                                <dd className='col-xl-9'><img className='esrbRating' src={esrbRating} alt='esrb rating' /></dd>
                            </dl>
                        </Col>
                    </Row>

                    {videos.length > 0 &&
                        <Row>
                            <Col md='8'>
                                <video className='videoPlayer' controls>
                                    <source src={videos[0]} type='video/mp4' />
                                    Your browser does not support HTML5 video.
                            </video>
                            </Col>
                            <Col md='4'>
                                <div className='screenshotsContainer'>
                                    {screenshots.map((url, i) =>
                                        <img src={url} alt={'screenshot' + i} key={i} className='screenshot' />)}
                                </div>
                            </Col>
                        </Row>}
                </Container>
            </div>
        );
    }
}

export default GameDetails;


