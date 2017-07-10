import React, { Component } from 'react';
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
        if (gameInput !== '') {
            this.props.makeActiveGame(gameInput);
        }
        if (emailInput !== '') {
            this.props.checkBlacklist(emailInput);
        }
    }
    render() {
        var children = this.props.children;
        if (!Array.isArray(children)) {
            children = [children];
        }

        const emailRegExp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const emailIsValid = emailRegExp.test(this.state.emailInput);

        var gameUrlIsValid = true;
        if (children.length > 1) {
            gameUrlIsValid = this.state.gameInput.indexOf('store.playstation.com') !== -1;
        }

        const submitButton = emailIsValid && gameUrlIsValid ?
            <Button type='submit' onClick={this.handleSubmit} color='success'>Submit</Button> :
            <Button type='submit' disabled>Submit</Button>;

        return (
            <form onSubmit={this.props.handleSubmit}>
                <InputGroup>
                    {children.map((child, i) => {
                        return <Input {...child.props} key={i} onChange={this.handleChange} value={this.state[child.props.id]} />
                    })}
                    <InputGroupButton>
                        {submitButton}
                    </InputGroupButton>
                </InputGroup>
            </form>
        );
    }
}

export default SubmitForm;
