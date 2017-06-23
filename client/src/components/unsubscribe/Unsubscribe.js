import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Alert, Button } from 'reactstrap';
import ActivePriceAlerts from './components/ActivePriceAlerts';
import './Unsubscribe.css';

import Client from '../../Client';


class Unsubscribe extends Component {
    constructor(props) {
        super(props);
        const url = window.location.toString();
        const q = url.slice(url.indexOf('?') + 1);
        this.state = {
            userEmail: new URLSearchParams(q).get('user'),
            addedToBlacklist: false,
            activePriceAlerts: null
        };
        this.checkUserStatus = this.checkUserStatus.bind(this);
        this.deleteAlert = this.deleteAlert.bind(this);
        this.addUserToBlacklist = this.addUserToBlacklist.bind(this);
    }
    componentDidMount() {
        if (!this.state.userEmail) {
            return <Redirect to='/' />
        }
    }
    checkUserStatus() {
        Client.checkForCurrentPriceAlerts(this.state.userEmail).then(result => {
            if (result.activePriceAlerts.length > 0) {
                this.setState({ activePriceAlerts: result.activePriceAlerts });
            } else {
                this.setState({ activePriceAlerts: null });
            }
        });
        Client.checkBlacklistForUserEmail(this.state.userEmail).then(result => {
            this.setState({ addedToBlacklist: result.userOnBlacklist });
        });
    }
    deleteAlert(info) {
        const alertInfo = {
            game: Object.keys(info)[0],
            userEmail: this.state.userEmail,
            dateAdded: info[Object.keys(info)[0]].alerts[0].dateAdded
        };
        Client.deletePriceAlert(alertInfo).then(this.checkUserStatus());
    }
    addUserToBlacklist() {
        Client.addUserToBlacklist(this.state.userEmail).then(this.checkUserStatus());
    }
    render() {
        var priceAlerts;
        if (this.state.activePriceAlerts) {
            priceAlerts = (
                <div>
                    <h4>Active price alerts</h4>
                    <ul className='activePriceAlerts'>
                        {this.state.activePriceAlerts.map(val => {
                            return (
                                <ActivePriceAlerts
                                    alertInfo={val}
                                    key={Object.keys(val)[0]}
                                    handleClick={this.deleteAlert}
                                />
                            );
                        })}
                    </ul>
                </div>
            );
        }

        return (
            <div className='unsubscribeComponent'>
                <Link className='homeHeader' to='/'>
                    <h1>Game Price Tracker</h1>
                </Link>

                {this.state.activePriceAlerts ?
                    <div>
                        {priceAlerts}
                    </div> :
                    <Alert color='info'>
                        You do not have any active price alerts.
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
