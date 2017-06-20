import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Alert, Button } from 'reactstrap';
import './Unsubscribe.css';

import Client from '../../Client';


class Unsubscribe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertRemoved: false,
            addedToBlacklist: false,
            id: null,
            userEmail: null
        };
        this.checkUserStatus = this.checkUserStatus.bind(this);
        this.removeAlert = this.removeAlert.bind(this);
        this.addUserToBlacklist = this.addUserToBlacklist.bind(this);
    }
    componentDidMount() {
        var url = window.location.toString();
        var q = url.slice(url.indexOf('?') + 1);
        var userEmail = new URLSearchParams(q).get('user');
        var id = new URLSearchParams(q).get('id');
        if (!id) {
            return <Redirect to='/' />
        }
        if (!this.state.alertRemoved || !this.state.addedToBlacklist) {
            this.checkUserStatus(id, userEmail);
        }
    }
    checkUserStatus(id, userEmail) {
        Promise.all([
            Client.confirmDBEntryExists(id),
            Client.confirmUserIsOnBlacklist(userEmail)
        ]).then(results => {
            this.setState({
                alertRemoved: results[0].priceAlertRemoved,
                addedToBlacklist: results[1].userAddedToBlacklist,
                id: id,
                userEmail: userEmail
            });
        });
    }
    removeAlert() {
        Client.deleteDBEntry(this.state.id).then(result => {
            this.setState({
                alertRemoved: true
            });
        });
    }
    addUserToBlacklist() {
        Client.deleteDBEntry(this.state.id);
        Client.addUserToBlacklist(this.state.userEmail).then(result => {
            this.setState({
                alertRemoved: true,
                addedToBlacklist: true
            });
        });
    }
    render() {
        return (
            <div className='unsubscribeComponent'>
                <Link className='homeHeader' to='/'>
                    <h1>Game Price Tracker</h1>
                </Link>

                {!this.state.alertRemoved ?
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
