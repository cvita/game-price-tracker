import React, { Component } from 'react';
import { push } from 'react-router-redux';
import store from '../../redux/store';

import GameOverview from '../ActiveGame/GameOverview';
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Unsubscribe.css';


function UserPriceAlert(props) {
    if (props.activeGame) {
        const { title, url, onSale } = props.activeGame;
        const { email, price, expires } = props.userInfo;

        return (
            <div className='manage'>
                <p className='lead'>Manage your price alert</p>
                <GameOverview  {...props.activeGame}>
                    {onSale && (
                        <p>Here's <a href={url}>the link</a> to purchase on the Sony PlayStation store</p>)}

                    <p>You're all signed up to receive a message at <strong>{email}</strong> if {title}'s price drops below ${price} before {new Date(expires).toDateString()}.</p>
                    <PriceAlertButton handleClick={() => props.createPriceAlert({ title, ...props.userInfo })} message={'Renew price alert'} color={'success'} />
                    <PriceAlertButton handleClick={() => props.deletePriceAlert(props.userInfo.game_id, email)} message={'Delete'} />
                </GameOverview>
            </div>
        );
    }
    return null;
}

function Blacklist(props) {
    const { email, on_blacklist } = props.userInfo;
    return (
        <div>
            {!on_blacklist && email &&
                <div>
                    <p className='lead'>Danger zone</p>
                    <Alert color='danger'>
                        <PriceAlertButton handleClick={props.handleClick} message={'No more'} />
                        Never receive another email from Game Price Tracker.
                    </Alert>
                </div>}

            {on_blacklist &&
                <Alert color='danger'>
                    You are unsubscribed and will never receive another email from Game Price Tracker.
                </Alert>}
        </div>
    );
}

function PriceAlertButton(props) {
    const { message, color, handleClick } = props;
    return (
        <Button
            className='gamePriceTrackerButton'
            onClick={handleClick}
            color={color || 'danger'}
            outline={!color}
        >
            {message}
        </Button>
    );
}


class Unsubscribe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            backdrop: true
        };
        this.toggle = this.toggle.bind(this);
        this.changeBackdrop = this.changeBackdrop.bind(this);
        this.confirmAddToBlacklist = this.confirmAddToBlacklist.bind(this);
    }
    componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        const alertId = params.get('alert_id');
        const email = params.get('email');
        if (alertId && email) {
            this.props.fetchPriceAlert(alertId, email);
        } else {
            console.error('Redirecting to home page: manageId must be an encrypted string');
            store.dispatch(push('/'));
        }
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    changeBackdrop(e) {
        let value = e.target.value;
        if (value !== 'static') {
            value = JSON.parse(value);
        }
        this.setState({ backdrop: value });
    }
    confirmAddToBlacklist() {
        this.props.addToBlacklist(this.props.userInfo.email);
        this.props.resetActiveGame();
        this.toggle();
    }
    render() {
        return (
            <div>
                <UserPriceAlert {...this.props } />

                <div className='unsubscribe'>
                    <Blacklist {...this.props} handleClick={this.toggle} />

                    <Modal className={this.props.className} isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>
                            Permanently unsubscribe?
                        </ModalHeader>
                        <ModalBody>
                            By clicking 'confirm' you will add yourself to our 'Do not send list' and will <strong>delete</strong> any current price alerts.
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={this.confirmAddToBlacklist}>Confirm</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>

            </div>
        );
    }
}


export default Unsubscribe;
