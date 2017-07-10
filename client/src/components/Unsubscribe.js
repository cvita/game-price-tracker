import React, { Component } from 'react';
import { Redirect } from 'react-router';
import GamePreview from './GamePreview';
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Unsubscribe.css';


function GamePriceTrackerButton(props) {
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
        const manageId = url.slice(url.indexOf('unsubscribe/') + 12) || null;
        if (manageId) {
            this.props.fetchPriceAlert(manageId);
            this.props.checkBlacklist(manageId);
        } else {
            console.log('Should redirect');
            return <Redirect to='/' />
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
        const { game_id, userEmail, onBlacklist, price, expiration } = this.props.userInfo;
        const { activeGame } = this.props;

        return (
            <div>

                {activeGame &&
                    <GamePreview {...activeGame}>
                        <p className='lead'>Manage your price alerts</p>

                        {activeGame.onSale &&
                            <p>Here's <a href={activeGame.url}>the link</a> to the Sony PlayStation store</p>}

                        <p>You're all signed up to receive a message at <strong>{userEmail}</strong> if {game_id}'s price drops below ${price} before {new Date(expiration).toDateString()}.</p>
                        <GamePriceTrackerButton handleClick={() => this.props.createPriceAlert(this.props.userInfo)} message={'Renew price alert'} color={'success'} />
                        <GamePriceTrackerButton handleClick={() => this.props.deletePriceAlert(this.props.userInfo)} message={'Delete'} />
                    </GamePreview>}

                {!onBlacklist && userEmail &&
                    <div>
                        <p className='lead'>Danger zone</p>
                        <Alert color='danger'>
                            <GamePriceTrackerButton handleClick={this.toggle} message={'No more'} />
                            Never receive another email from Game Price Tracker.
                        </Alert>
                    </div>}

                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Permanently unsubscribe?</ModalHeader>
                    <ModalBody>
                        By clicking 'confirm' you will add yourself to our 'Do not send list' and will <strong>delete</strong> any current price alerts.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.confirmAddToBlacklist}>Confirm</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                {onBlacklist &&
                    <Alert color='danger'>
                        You are unsubscribed and will never receive another email from Game Price Tracker.
                    </Alert>}

            </div >
        );
    }
}


export default Unsubscribe;
