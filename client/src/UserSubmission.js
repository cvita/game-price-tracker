import React, { Component } from 'react';
import {
    Button,
    Input,
    InputGroup,
    InputGroupButton,
} from 'reactstrap';
import './UserSubmission.css';


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
        var submitButton = <Button disabled>Submit</Button>;
        if (this.state.gameUrl.indexOf('store.playstation.com') !== -1
            && this.state.email.indexOf('@') !== -1) {
            submitButton = <Button onClick={this.handleClick} color='success' >Submit</Button>;
        }

        return (
            <div>
                <InputGroup className='gameInput'>
                    <Input
                        placeholder='Sony store game url'
                        onChange={this.handleGameUrlChange}
                        value={this.state.gameUrl}
                    />
                    <Input
                        placeholder='email@example.com'
                        onChange={this.handleEmailChange}
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


class UserSubmission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: '',
            gameImage: null,
            email: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(gameUrl, userEmail) {
        console.log('HandleSubmit from UserSubmission Component', gameUrl, userEmail);
    }

    render() {
        var game = this.state.game;
        var gameImage = this.state.gameImage;
        var email = this.state.email;

        return (
            <div>
                {!game &&
                    <UserSubmit
                        onSubmit={this.handleSubmit}
                    />}
                {gameImage !== null &&
                    <div>
                        A preview Component not yet made
                    </div>}
            </div>
        );
    }
}

export default UserSubmission;
