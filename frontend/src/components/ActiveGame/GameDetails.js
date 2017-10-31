import React, { Component } from 'react';
import { Container, Row, Col, Badge, Button, Collapse } from 'reactstrap';
import YouTubePlayer from './YouTubePlayer';
import './GameDetails.css';


class Description extends Component {
    constructor(props) {
        super(props);
        this.state = { collapse: false };
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }
    render() {
        const { description } = this.props;
        const descriptionLead = description.slice(0, description.indexOf('<br>'));
        const descriptionBody = description.slice(descriptionLead.length + 4);

        return (
            <div>
                <p className='lead' dangerouslySetInnerHTML={{ __html: descriptionLead }} />
                {!this.state.collapse &&
                    <Button color="secondary" outline onClick={this.toggle}>Continue reading</Button>}
                <Collapse isOpen={this.state.collapse}>
                    <p dangerouslySetInnerHTML={{ __html: descriptionBody }} />
                </Collapse>
            </div>
        );
    }
}

class GameDetails extends Component {
    render() {
        const { url, screenshots } = this.props;
        const { description, esrbRating, starRating, platforms, gameDev, releaseDate } = this.props.details;

        return (
            <div className='gameDetailsContainer'>
                <Container>

                    <Row className='descriptionAndDetails'>
                        <Col sm='8'>
                            <div className='gameDescription'>
                                <Description description={description} />
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

                    <Row>
                        <Col md={12 - screenshots.length}>
                            <div className='videoPlayerContainer'>
                                <YouTubePlayer {...this.props} />
                            </div>
                        </Col>
                        <Col md={screenshots.length}>
                            <div className='screenshotsContainer'>
                                {screenshots.map((url, i) => <img src={url} alt={'screenshot' + i} key={i} className='screenshot' />)}
                            </div>
                        </Col>
                    </Row>

                </Container>
            </div>
        );
    }
}


export default GameDetails;
