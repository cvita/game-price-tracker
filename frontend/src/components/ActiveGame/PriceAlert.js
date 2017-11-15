import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import store from '../../redux/store';

import PriceAlertPreview from './PriceAlertPreview';
import GameDetails from './GameDetails';
import { Alert, Button } from 'reactstrap';
import './PriceAlert.css';


class ConfirmAndResetButtons extends Component {
    constructor(props) {
        super(props);
        this.state = { submitted: false };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.props.handleClick();
        this.setState({ submitted: true });
    }
    render() {
        return (
            <div>
                <Button
                    className='gamePriceTrackerButton'
                    color='success'
                    disabled={this.state.submitted}
                    onClick={this.handleClick}
                >
                    Sounds good
                </Button>

                {!this.state.submitted &&
                    <Link to='/'>
                        <Button
                            className='gamePriceTrackerButton'
                            color='danger'
                            outline
                        >
                            Nevermind
                        </Button>
                    </Link>}
            </div>
        );
    }
}

class PriceAlert extends Component {
    componentDidMount() {
        const url = window.location.toString();
        const gameId = url.slice(url.indexOf('games/') + 6);
        this.props.makeActiveGame(gameId);
    }
    render() {
        const { activeGame, priceAlertCreated, userInfo, createPriceAlert } = this.props;
        const validUserEmail = userInfo.userEmail !== null;
        return (
            <div>
                {activeGame &&
                    <div>
                        <PriceAlertPreview {...this.props} >
                            {userInfo.onBlacklist !== null && (
                                <div>
                                    {!priceAlertCreated && !userInfo.onBlacklist ?
                                        <ConfirmAndResetButtons handleClick={() => createPriceAlert(userInfo)} validUserEmail={validUserEmail} /> :
                                        <Alert className='confirmationMessages' color='danger' toggle={() => store.dispatch(push('/'))} isOpen={userInfo.onBlacklist}>
                                            <strong>Unable to create your price alert. </strong>
                                            Your email is on our "do not send" list. Contact game.price.tracker@gmail.com if you feel this is in error.
                                </Alert>}
                                </div>)}

                            <Alert className='confirmationMessages' isOpen={priceAlertCreated} toggle={() => store.dispatch(push('/'))} color='success'>
                                <strong>You're all set! </strong>
                                Make sure you allow messages from <strong>game.price.tracker@gmail.com</strong> or you might miss a sale.
                            </Alert>
                        </PriceAlertPreview>

                        <GameDetails {...this.props.activeGame} searchVideo={this.props.searchVideo} />
                    </div>}
            </div>
        );
    }
}

export default PriceAlert;
