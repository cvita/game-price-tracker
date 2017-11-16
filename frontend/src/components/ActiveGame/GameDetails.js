import React, { Component } from 'react';
import { Container, Row, Col, Badge, Button, Collapse } from 'reactstrap';
import LazyFadeIn from '../helper/LazyFadeIn';
import YouTubePlayer from './YouTubePlayer';
import './GameDetails.css';


class Description extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }
    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }
    render() {
        const { description } = this.props;
        const { collapse } = this.state;
        const descriptionLead = description.slice(0, description.indexOf('<br>'));
        const descriptionBody = description.slice(descriptionLead.length + 4);

        return (
            <div>
                <p className='lead' dangerouslySetInnerHTML={{ __html: descriptionLead }} />

                {!collapse && (
                    <Button onClick={this.toggle} color='secondary' outline block>
                        <i className='fa fa-angle-double-down' aria-hidden='true' />
                    </Button>)}

                <Collapse isOpen={collapse}>
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
        const images = screenshots.map(url => {
            return (
                <a href={url} key={url}>
                    <img className='img-fluid img-thumbnail gameDetailsMedia' src={url} alt={'screenshot'} />
                </a>
            );
        });

        return (
            <Container>
                <Row className='descriptionDetails'>
                    <Col md='9'>
                        <Description description={description} />
                    </Col>

                    <Col md='3'>
                        <dl className='row'>
                            <dt className='col-md-6'>Purchase</dt>
                            <dd className='col-md-6'><a href={url} target='_blank' rel='noopener noreferrer' >Sony store</a></dd>

                            <dt className='col-md-6'>Publisher</dt>
                            <dd className='col-md-6'>{gameDev}</dd>

                            <dt className='col-md-6'>Released</dt>
                            <dd className='col-md-6'>{new Date(releaseDate).toDateString().slice(3)}</dd>

                            <dt className='col-md-6'>Stars</dt>
                            <dd className='col-md-6'><Badge pill> {starRating}</Badge></dd>

                            <dt className='col-md-6'>Systems</dt>
                            <dd className='col-md-6'>{platforms.map(system => system + ' ')}</dd>

                            <dt className='col-md-6'>Rated</dt>
                            <dd className='col-md-6'>
                                <LazyFadeIn height={130}>
                                    <img className='esrbRating' src={esrbRating} alt='esrb rating' />
                                </LazyFadeIn>
                            </dd>
                        </dl>
                    </Col>
                </Row>

                <Row>
                    <Col md={12 - screenshots.length}>
                        <div className='gameDetailsMedia'>
                            <YouTubePlayer {...this.props} />
                        </div>
                    </Col>
                    <Col md={screenshots.length}>
                        {images}
                    </Col>
                </Row>
            </Container>
        );
    }
}


export default GameDetails;
