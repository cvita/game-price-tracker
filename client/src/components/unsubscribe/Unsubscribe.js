import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import './Unsubscribe.css';

import Client from '../../Client';


class Unsubscribe extends Component {
    constructor(props) {
        super(props);
        this.state = { alertRemoved: false, addedToBlacklist: false };
        this.removeAlert = this.removeAlert.bind(this);
        this.addUserToBlacklist = this.addUserToBlacklist.bind(this);
    }
    removeAlert(id) {
        console.log('Yep!', id);
        Client.deleteDBEntry(id).then(result => {
            console.log(result);
            this.setState({
                alertRemoved: true
            });
        });
    }
    addUserToBlacklist(id) {
        Client.getUserEmailFromId(id).then(result => {
            console.log('About to add ' + result + ' to blacklist');
            Client.addUserToBlacklist(result).then(result => {
                console.log(result);
            });
        });
    }
    render() {
        var url = window.location.toString();
        var q = url.slice(url.indexOf('?') + 1);
        var id = new URLSearchParams(q).get('id');
        if (!id) {
            return <Redirect to='/' />
        }
        console.log('alertRemoved', this.state.alertRemoved);

        return (
            <div>
                <h1>Game Price Tracker</h1>

                {!this.state.alertRemoved ?
                    <Button
                        className='removeAlertButton button'
                        onClick={() => this.removeAlert(id)}
                        color='info'
                        outline
                    >
                        Remove alert
                </Button> :
                    <p>Your alert has been removed.</p>}


                {!this.state.addedToBlacklist ?
                    <Button
                        className='addEmailToBlacklistButton button'
                        onClick={() => this.addUserToBlacklist(id)}
                        color='danger'
                        outline
                    >
                        Never receive Game Price Tracker emails again
                </Button> :
                    <p>You will never receive another email from Game Price Tracker</p>}

                <Link to='/'>Home</Link>
            </div>
        );
    }
}

export default Unsubscribe;
