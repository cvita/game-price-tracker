import React, { Component } from 'react';
import { Alert, Button } from 'reactstrap';
import './PriceAlert.css';

import UserSignUp from './components/UserSignUp';
import GamePreview from './components/GamePreview';


class PriceAlert extends Component {
    constructor(props) {
        super(props);
        this.savePriceAlert = this.savePriceAlert.bind(this);
    }
    componentDidMount() {
        //   this.props.fetchGamesInDb(); // Update state...
    }
    savePriceAlert() {
        this.props.createPriceAlert(this.props.userInfo, this.props.activeGame._id);
    }
    render() {
        return (
            <div>

                {!this.props.activeGame ?
                    <UserSignUp {...this.props} /> :
                    <div>
                        {this.props.activeGame === 'fetching game' ?
                            <Alert color='info'>Connecting to the Sony PlayStation store</Alert> :
                            <GamePreview {...this.props}>
                                {!this.props.activePriceAlert &&
                                    <div>
                                        <Button className='gamePreviewButton' color='success' onClick={this.savePriceAlert}>
                                            Sounds good
                                        </Button>
                                        <Button className='gamePreviewButton' color='danger' outline onClick={this.props.resetActiveGame}>
                                            Nevermind
                                        </Button>
                                    </div>}
                            </GamePreview>}
                    </div>}

                {this.props.activePriceAlert &&
                    <div className='confirmationMessages'>
                        {this.props.activePriceAlert.priceAlertCreated ?
                            <Alert color='success' toggle={this.props.resetActiveGame} isOpen={this.props.activePriceAlert !== null}>
                                <strong>You're all set! </strong>
                                Make sure you allow messages from <strong>game.price.tracker@gmail.com</strong> or you might miss a sale.
                            </Alert> :
                            <Alert color='danger' toggle={this.props.resetActiveGame} isOpen={this.props.activePriceAlert !== null}>
                                <strong>Unable to create your price alert. </strong>
                                Your email is on our "do not send" list. Contact game.price.tracker@gmail.com if you feel this is in error.
                            </Alert>}
                    </div>}

            </div>
        );
    }
}

export default PriceAlert;
