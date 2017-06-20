import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import './PriceAlert.css';

import Client from '../../Client';
import UserSignUp from './components/UserSignUp';
import GamePreview from './components/GamePreview';
import UserSignUpFeedback from './components/UserSignUpFeedback';
const UserSignUpComplete = UserSignUpFeedback.UserSignUpComplete;
const ProgressBarAndMessage = UserSignUpFeedback.ProgressBarAndMessage;

// Todo: change priceAlertSubmitted to priceAlertCreated
class PriceAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            priceAlertSubmitted: false
        };
        this.submitPriceAlertRequest = this.submitPriceAlertRequest.bind(this);
        this.resetCurrentPriceAlert = this.resetCurrentPriceAlert.bind(this);
        this.activateProgressBar = this.activateProgressBar.bind(this);
        this.savePriceAlertToDB = this.savePriceAlertToDB.bind(this);
        this.devModeDemo = this.devModeDemo.bind(this);
    }
    submitPriceAlertRequest(gameUrl, userEmail) {
        this.activateProgressBar();
        Client.requestScrape(gameUrl).then(result => {
            var expirationInt = new Date().getTime() + 10886400000; // 18 weeks from now
            this.setState({
                game: result.title,
                gameUrl: gameUrl,
                gameImage: result.image,
                price: result.price,
                priceInt: result.priceInt,
                onSale: result.onSale,
                expiration: new Date(expirationInt).toDateString(),
                expirationInt: expirationInt,
                userEmail: userEmail
            });
        });
    }
    resetCurrentPriceAlert() {
        this.setState({
            priceAlertSubmitted: false,
            game: null,
            gameUrl: null,
            gameImage: null,
            price: null,
            priceInt: null,
            onSale: null,
            expiration: null,
            expirationInt: null,
            userEmail: null,
            error: false
        });
    }
    activateProgressBar() {
        var currentVal = 0;
        var incrementProgressBar = setInterval(() => {
            if (currentVal < 200) {
                currentVal++;
                this.setState({ progressBarValue: currentVal * 0.5 });
            }

            if (currentVal >= 200 || this.state.game) {
                clearInterval(incrementProgressBar);
                this.setState({ progressBarValue: null })
            }
        }, 40);
    }
    savePriceAlertToDB() {
        var priceAlertInfo = {
            game: this.state.game,
            gameUrl: this.state.gameUrl,
            gameImage: this.state.gameImage,
            price: this.state.price,
            priceInt: this.state.priceInt,
            expiration: this.state.expiration,
            expirationInt: this.state.expirationInt,
            userEmail: this.state.userEmail,
            dateAdded: new Date().getTime()
        };
        Client.createPriceAlert(priceAlertInfo).then(result => {
            if (result.priceAlertSubmitted) {
                this.setState(result);
            } else {
                // Feedback to user that price alert could not be created
                this.setState({ error: true })
            }
        });
    }
    devModeDemo() {
        console.log('Starting devModeDemo()...');
        var testGameUrl = 'https://store.playstation.com/#!/en-us/games/god-of-war-iii-remastered/cid=UP9000-CUSA01623_00-0000GODOFWAR3PS4';
        var testEmail = 'chris.vita@gmail.com';
        this.submitPriceAlertRequest(testGameUrl, testEmail);
    }
    render() {
        return (
            <div>
                {!this.state.game &&
                    <UserSignUp handleClick={this.submitPriceAlertRequest} />}

                {this.state.progressBarValue &&
                    <ProgressBarAndMessage value={this.state.progressBarValue} />}

                {this.state.gameImage &&
                    <div>
                        <hr className='my-2' />
                        <GamePreview
                            priceAlertInfo={this.state}
                            handleConfirmationClick={this.savePriceAlertToDB}
                            handleResetClick={this.resetCurrentPriceAlert}
                            priceAlertSubmitted={this.state.priceAlertSubmitted}
                        />
                    </div>}

                {this.state.error &&
                    <div>
                        <Alert color='danger'>
                            <p>
                                <strong>Unable to create your price alert. </strong>
                                Your email is on our "do not send" list. 
                                Contact game.price.tracker@gmail.com if you feel this is in error.
                            </p>
                        </Alert>
                    </div>
                }

                {this.state.priceAlertSubmitted &&
                    <div>
                        <hr className='my-2' />
                        <UserSignUpComplete handleToggle={this.resetCurrentPriceAlert} />
                    </div>}

                <button className='devModeDemoButton' onClick={this.devModeDemo}>Dev mode demo</button>
            </div>
        );
    }
}


export default PriceAlert;
