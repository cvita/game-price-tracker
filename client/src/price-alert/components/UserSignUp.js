import React, {Component} from 'react';
import {Button, Input, InputGroup, InputGroupButton} from 'reactstrap';


class UserSignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameUrl: '',
            userEmail: ''
        };
        this.changeGameUrl = this.changeGameUrl.bind(this);
        this.changeUserEmail = this.changeUserEmail.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    changeGameUrl(event) {
        this.setState({
            gameUrl: event.target.value
        });
    }
    changeUserEmail(event) {
        this.setState({
            userEmail: event.target.value
        });
    }
    handleClick() {
        this.props.handleClick(this.state.gameUrl, this.state.userEmail);
    }
    render() {
        // Todo: Add more secure email validation to server side
        const emailPattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        var emailIsValid = emailPattern.test(this.state.userEmail);

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
                        onChange={this.changeGameUrl}
                        value={this.state.gameUrl}
                    />
                    <Input
                        className='emailInput'
                        placeholder='Email for price alert'
                        onChange={this.changeUserEmail}
                        type='email'
                        value={this.state.userEmail}
                    />
                    <InputGroupButton>
                        {submitButton}
                    </InputGroupButton>
                </InputGroup>
            </div>
        );
    }
}

export default UserSignUp;