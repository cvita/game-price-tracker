import React, { Component } from 'react';
import { Button, Input, InputGroup, InputGroupButton } from 'reactstrap';
import './UserSignUp.css';

class UserSignUp extends Component {
    constructor(props) {
        super(props);
        this.state = { gameInputValue: '', emailInputValue: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openSonyStore = this.openSonyStore.bind(this);
    }
    handleChange(event) {
        const value = event.target.value;
        if (event.target.id.indexOf('gameInput') !== -1) {
            this.setState({ gameInputValue: value, emailInputValue: this.state.emailInputValue });
        } else {
            this.setState({ gameInputValue: this.state.gameInputValue, emailInputValue: value });
        }
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.makeActiveGame(this.state.gameInputValue);
        this.props.preparePriceAlert(this.state.emailInputValue);
    }
    openSonyStore() {
        window.open('https://store.playstation.com/#!/en-us/home/games');
    }
    render() {
        const emailRegExp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const emailIsValid = emailRegExp.test(this.state.emailInputValue);
        const gameUrlIsValid = this.state.gameInputValue.indexOf('store.playstation.com') !== -1;

        const submitButton = emailIsValid && gameUrlIsValid ?
            <Button type='submit' onClick={this.handleSubmit} color='success'>Submit</Button> :
            <Button type='submit' disabled>Submit</Button>;

        return (
            <div>
                <p className='lead'>Get an email when your game goes on sale.</p>
                <form onSubmit={this.handleSubmit}>
                    <InputGroup>
                        <Input
                            id='gameInput'
                            placeholder='Paste in a PlayStation store url'
                            onChange={this.handleChange}
                            type='text'
                            value={this.state.gameInputValue}
                        />
                        <Input
                            id='emailInput'
                            placeholder='Email for price alert'
                            onChange={this.handleChange}
                            type='email'
                            value={this.state.emailInputValue}
                        />
                        <InputGroupButton>
                            {submitButton}
                        </InputGroupButton>
                    </InputGroup>
                </form>

                <Button
                    className='openSonyStoreButton'
                    onClick={this.openSonyStore}
                    color='info'
                    outline
                    size='sm'
                >
                    Open Sony PS store
                </Button>
            </div>
        );
    }
}

export default UserSignUp;
