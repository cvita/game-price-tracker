import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Alert, Button } from 'reactstrap';
import ActivePriceAlerts from './components/ActivePriceAlerts';
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
            userEmail: new URLSearchParams(q).get('user'),
            activePriceAlerts: null
        };
        this.checkUserStatus = this.checkUserStatus.bind(this);
        this.removeAlert = this.removeAlert.bind(this);
        this.addUserToBlacklist = this.addUserToBlacklist.bind(this);
    }
    componentDidMount() {
        if (!this.state.userEmail) {
            return <Redirect to='/' />
        }
        this.checkUserStatus();
    }
    checkUserStatus() {
        var userInfo = { "userEmail": this.state.userEmail };
        Client.checkForCurrentPriceAlerts(userInfo).then(result => {
            if (result.activePriceAlerts.length > 0) {
                this.setState({ activePriceAlerts: result.activePriceAlerts });
            } else {
                this.setState({ activePriceAlerts: null });
            }
        });

    }
    removeAlert(info) {
        var title = Object.keys(info)[0];
        var alertInfo = {
            game: title,
            userEmail: this.state.userEmail,
            dateAdded: info[title].alerts[0].dateAdded
        };
        Client.deletePriceAlert(alertInfo).then(result => {
            this.checkUserStatus();
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
                                    handleClick={this.removeAlert}
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

                {/*{!this.state.priceAlertRemoved ?
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
                    </Alert>}*/}

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
