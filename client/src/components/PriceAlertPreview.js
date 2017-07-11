import React, { Component } from 'react';
import GamePreview from './GamePreview';
import { Alert } from 'reactstrap';
import SubmitForm from './SubmitForm';

class PriceAlertPreview extends Component {
    render() {
        const { _id, price, onSale } = this.props.activeGame;
        const { userEmail } = this.props.userInfo;
        const expiration = new Date(new Date().getTime() + 10886400000).toDateString();

        return (
            <GamePreview {...this.props.activeGame}>
                {onSale &&
                    <Alert color='warning'>
                        <p>You're still welcome to set up this price alert in case {_id} gets an even greater discount.</p>
                    </Alert>}

                {this.props.userInfo.userEmail ?
                    <p>You will receive a message at <strong>{userEmail}</strong> if {_id}'s price drops below ${price} before {expiration}.</p> :
                    <div>
                        <p>Enter an email address to receive a message if {_id}'s price drops below ${price} before {expiration}.</p>
                        <SubmitForm {...this.props} context={'PriceAlertPreview.js'} />
                    </div>}

                {this.props.children}
            </GamePreview>
        );
    }
}

export default PriceAlertPreview;
