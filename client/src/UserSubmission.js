import React, { Component } from 'react';
import {
    Badge,
    Button,
    Input,
    InputGroup,
    InputGroupButton,
    Container,
    Row,
    Col
} from 'reactstrap';
import './UserSubmission.css';
import Client from './Client';

// Todo: Create visual feedback while scraping Sony PlayStation store
class UserSubmit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameUrl: '',
            email: ''
        };
        this.handleGameUrlChange = this.handleGameUrlChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleGameUrlChange(event) {
        this.setState({
            gameUrl: event.target.value
        });
    }
    handleEmailChange(event) {
        this.setState({
            email: event.target.value
        });
    }
    handleClick() {
        console.log('Submit btn clicked!');
        this.props.onSubmit(this.state.gameUrl, this.state.email);
    }
    render() {
        // Todo: Add more secure email validation to server side
        const emailPattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        var emailIsValid = emailPattern.test(this.state.email);

        var submitButton = <Button disabled>Submit</Button>;
        if (this.state.gameUrl.indexOf('store.playstation.com') !== -1
            && emailIsValid) {
            submitButton = <Button onClick={this.handleClick} color='success' >Submit</Button>;
        }

        return (
            <div>
                <InputGroup>
                    <Input
                        className='gameInput'
                        placeholder='Paste in a PlayStation store url'
                        onChange={this.handleGameUrlChange}
                        value={this.state.gameUrl}
                    />
                    <Input
                        className='emailInput'
                        placeholder='email to receive price alert'
                        onChange={this.handleEmailChange}
                        type='email'
                        value={this.state.email}
                    />
                    <InputGroupButton>
                        {submitButton}
                    </InputGroupButton>
                </InputGroup>
            </div>
        );
    }
}

function GamePreview(props) {
    var game = props.gameInfo.game;
    var gameImage = props.gameInfo.gameImage;
    var price = props.gameInfo.price;
    var expiration = props.gameInfo.expiration;
    var email = props.gameInfo.email;

    return (
        <div>
            <Container>
                <Row>
                    <Col md='6'>
                        <img className='gameImage' src={gameImage} alt='game thumbnail' />
                    </Col>
                    <Col md='6'>
                        <h3>{game} is currently <Badge>{price}</Badge></h3>
                        <p className='gamePreviewMessage'>
                            You will receive a message at {email} if {game} drops below {price} before {expiration}.
                            </p>

                        <Button
                            className='gamePreviewButton'
                            color='success'
                            onClick={props.submissionConfirmed}
                        >
                            Sounds good
                        </Button>

                        <Button
                            className='gamePreviewButton'
                            color='danger'
                            outline
                            onClick={props.resetSubmission}
                        >
                            Reset
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}


class UserSubmission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: '', // Empty string or null?
            gameImage: null,
            price: '',
            expiration: '',
            email: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.submissionConfirmed = this.submissionConfirmed.bind(this);
        this.resetSubmission = this.resetSubmission.bind(this);
    }
    handleSubmit(gameUrl, userEmail) {
        Client.requestScrape(gameUrl).then(result => {
            var expirationInt = new Date().toDateString() + 10886400000; // 18 weeks from now

            this.setState({
                game: result.title,
                gameUrl: gameUrl,
                gameImage: result.image,
                price: result.price,
                priceInt: result.priceInt,
                expiration: new Date(expirationInt).toDateString(),
                expirationInt: expirationInt,
                email: userEmail
            });
        });
    }
    submissionConfirmed() {
        var gameInfo = this.state;
        gameInfo.dateAdded = new Date().getTime();
        Client.createDBEntry(gameInfo);
        // Todo: Create visual feedback on success or failure
    }
    resetSubmission() {
        this.setState({
            game: null,
            gameImage: null,
            price: null,
            email: null,
            expiration: null
        });
    }
    render() {
        return (
            <div>
                {!this.state.game &&
                    <UserSubmit onSubmit={this.handleSubmit} />}

                {this.state.gameImage !== null &&
                    <div>
                        <hr className="my-2" />
                        <GamePreview
                            gameInfo={this.state}
                            submissionConfirmed={this.submissionConfirmed}
                            resetSubmission={this.resetSubmission}
                        />
                    </div>}
            </div>
        );
    }
}



export default UserSubmission;
