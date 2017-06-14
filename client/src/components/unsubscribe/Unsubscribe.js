import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './Unsubscribe.css';

class Unsubscribe extends Component {
    render() {

        let paramsString = window.location.search;
        let searchParams = new URLSearchParams(paramsString);
        console.log(searchParams.get('id'));

        return (
            <div>
                <h1>Game Price Tracker</h1>

                <Button
                    className='removeAlertButton button'
                    color='info'
                    outline
                >
                    Remove alert
                </Button>

                <Button
                    className='addEmailToBlacklistButton button'
                    color='danger'
                    outline
                >
                    Never receive Game Price Tracker emails again
                </Button>
            </div>
        );
    }
}

export default Unsubscribe;
