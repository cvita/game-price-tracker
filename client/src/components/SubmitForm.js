import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { Button, Input, InputGroup, InputGroupButton } from 'reactstrap';


class SubmitForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameInput: '',
            emailInput: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const value = event.target.value;
        if (event.target.id.indexOf('gameInput') !== -1) {
            this.setState({ gameInput: value, emailInput: this.state.emailInput });
        } else {
            this.setState({ gameInput: this.state.gameInput, emailInput: value });
        }
    }
    handleSubmit(event) {
        event.preventDefault();
        const { gameInput, emailInput } = this.state;
        if (emailInput !== '') {
            this.props.checkBlacklist(emailInput);
        }
        if (gameInput !== '') {
            browserHistory.push(`/${gameInput.slice(gameInput.indexOf('games/'))}`);
        }
    }
    render() {
        const emailRegExp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const emailIsValid = emailRegExp.test(this.state.emailInput);
        const gameUrlIsValid = this.state.gameInput.indexOf('store.playstation.com') !== -1 || this.props.activeGame;
        const color = emailIsValid && gameUrlIsValid ?
            'success' :
            'secondary';

        return (
            <form onSubmit={this.props.handleSubmit}>

                {this.props.context === 'UserSignUp.js' ?
                    <InputGroup>
                        <Input id='gameInput' type='text' placeholder='Paste in a PlayStation store url' onChange={this.handleChange} value={this.state.gameInput} />
                        <Input id='emailInput' type='email' placeholder='Email for price alert' onChange={this.handleChange} value={this.state.emailInput} />
                        <InputGroupButton>
                            <Button type='submit' onClick={this.handleSubmit} disabled={!gameUrlIsValid} color={color}>Submit</Button>
                        </InputGroupButton>
                    </InputGroup> :
                    
                    <InputGroup>
                        <Input id='emailInput' type='email' placeholder='Email for price alert' onChange={this.handleChange} value={this.state.emailInput} />
                        <InputGroupButton>
                            <Button type='submit' onClick={this.handleSubmit} disabled={!emailIsValid} color={color}>Submit</Button>
                        </InputGroupButton>
                    </InputGroup>}

            </form>
        );
    }
}

export default SubmitForm;
