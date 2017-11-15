import React, { Component } from 'react';
import { push } from 'react-router-redux';
import store from '../../redux/store';

import GamePreview from '../helper/GamePreview';
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Unsubscribe.css';


function UserPriceAlert(props) {
    const { userEmail, price, gameTitle, expiration } = props.userInfo;
    const activeGame = props.activeGame;
    return (
        <div>
            {activeGame &&
                <div className='manage'>
                    <p className='lead'>Manage your price alert</p>
                    <GamePreview  {...activeGame}>
                        {activeGame.onSale &&
                            <p>Here's <a href={activeGame.url}>the link</a> to purchase on the Sony PlayStation store</p>}

                        <p>You're all signed up to receive a message at <strong>{userEmail}</strong> if {gameTitle}'s price drops below ${price} before {new Date(expiration).toDateString()}.</p>
                        <PriceAlertButton handleClick={() => props.createPriceAlert(props.userInfo)} message={'Renew price alert'} color={'success'} />
                        <PriceAlertButton handleClick={() => props.deletePriceAlert(props.userInfo)} message={'Delete'} />
                    </GamePreview>
                </div>}
        </div>
    );
}

function Blacklist(props) {
    const { userEmail, onBlacklist } = props.userInfo;
    return (
        <div>
            {!onBlacklist && userEmail &&
                <div>
                    <p className='lead'>Danger zone</p>
                    <Alert color='danger'>
                        <PriceAlertButton handleClick={props.handleClick} message={'No more'} />
                        Never receive another email from Game Price Tracker.
                    </Alert>
                </div>}

            {onBlacklist &&
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
        const url = window.location.toString();
        const manageId = url.slice(url.indexOf('manage/') + 7) || null;
        if (manageId && manageId.indexOf('@') === -1) {
            this.props.fetchPriceAlert(manageId);
            this.props.checkBlacklist(manageId);
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
        this.props.addToBlacklist(this.props.userInfo.userEmail);
        this.props.deletePriceAlert(this.props.userInfo);
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
