import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Alert, Button } from 'reactstrap';
import './Unsubscribe.css';

import Client from '../../Client';


class Unsubscribe extends Component {
    constructor(props) {
        super(props);
        var url = window.location.toString();
        var q = url.slice(url.indexOf('?') + 1);
        this.state = {
            priceAlertRemoved: false,
            addedToBlacklist: false,
            id: new URLSearchParams(q).get('id'),
            userEmail: new URLSearchParams(q).get('user')
        };
        this.checkUserStatus = this.checkUserStatus.bind(this);
        this.removeAlert = this.removeAlert.bind(this);
        this.addUserToBlacklist = this.addUserToBlacklist.bind(this);
    }
    componentDidMount() {
        if (!this.state.id) {
            return <Redirect to='/' />
        }
        this.checkUserStatus();
    }
    checkUserStatus() {
        if (!this.state.priceAlertRemoved) {
            Client.checkIfPriceAlertExists(this.state.id).then(result => {
                this.setState({ priceAlertRemoved: result.priceAlertRemoved });
            });
        }
        if (!this.state.addedToBlacklist) {
            Client.checkIfUserIsOnBlacklist(this.state.userEmail).then(result => {
                this.setState({ addedToBlacklist: result.userOnBlacklist });
            });
        }
    }
    removeAlert() {
        Client.deletePriceAlert(this.state.id).then(result => {
            this.setState({ priceAlertRemoved: result.priceAlertRemoved })
        });
    }
    addUserToBlacklist() {
        if (!this.state.priceAlertRemoved) {
            Client.deletePriceAlert(this.state.id);
        }
        Client.addUserToBlacklist(this.state.userEmail).then(result => {
            this.setState({ addedToBlacklist: result.userOnBlacklist });
        });
    }
    render() {
        return (
            <div className='unsubscribeComponent'>
                <Link className='homeHeader' to='/'>
                    <h1>Game Price Tracker</h1>
                </Link>

                {!this.state.priceAlertRemoved ?
                    <Alert color='info'>
                        <Button
                            className='removeAlertButton button'
                            onClick={this.removeAlert}
                            color='info'
                        >
                            Remove alert
                        </Button>
                        Cancel this price alert.
                        </Alert> :
                    <Alert color='success'>
                        This price alert has been removed.
                    </Alert>}

                {!this.state.addedToBlacklist ?
                    <Alert color='danger'>
                        <Button
                            className='addEmailToBlacklistButton button'
                            onClick={this.addUserToBlacklist}
                            color='danger'
                            outline
                        >
                            Never again
                        </Button>
                        Never receive another email from Game Price Tracker.
                    </Alert> :
                    <Alert color='success'>
                        You will never receive another email from Game Price Tracker.
                    </Alert>}

            </div>
        );
    }
}

export default Unsubscribe;
