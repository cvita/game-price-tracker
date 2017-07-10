import React, { Component } from 'react';
import { Button, Tooltip } from 'reactstrap';
import SubmitForm from '../../SubmitForm';
import './UserSignUp.css';


class UserSignUp extends Component {
    constructor(props) {
        super(props);
        this.state = { tooltipOpen: false };
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({ tooltipOpen: !this.state.tooltipOpen });
    }
    openSonyStore() {
        window.open('https://store.playstation.com/#!/en-us/home/games');
    }
    render() {
        return (
            <div>
                <p className='lead'>Get an email when your game goes on sale.</p>
                <SubmitForm {...this.props}>
                    <div id='gameInput' type='text' placeholder='Paste in a PlayStation store url' />
                    <div id='emailInput' type='email' placeholder='Email for price alert' />
                </SubmitForm>

                <Tooltip placement='right' isOpen={this.state.tooltipOpen} target='gameInput' toggle={this.toggle}>
                    Or, select from below
                </Tooltip>

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
