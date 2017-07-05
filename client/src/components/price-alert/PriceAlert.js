import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import './PriceAlert.css';


import Client from '../../Client';
import UserSignUp from './components/UserSignUp';
import GamePreview from './components/GamePreview';


// Todo: change priceAlertSubmitted to priceAlertCreated
class PriceAlert extends Component {
    constructor(props) {
        super(props);
        this.resetActiveGame = this.resetActiveGame.bind(this);
        this.savePriceAlert = this.savePriceAlert.bind(this);
    }
    componentDidMount() {
     //   this.props.fetchGamesInDb(); // Update state...
    }
    resetActiveGame() {
        this.props.resetActiveGame();
    }
    savePriceAlert() {
        const priceAlertInfo = this.props.activeGame;
        priceAlertInfo.alerts = [{
                userEmail: this.props.activeGame.userEmail,
                price: this.props.activeGame.price,
                priceInt: this.props.activeGame.priceInt,
                dateAdded: this.props.activeGame.lastUpdated,
                dateAddedInt: new Date().getTime(),
                expiration: this.props.activeGame.expiration,
                expirationInt: this.props.activeGame.expirationInt
            }];

        this.props.createPriceAlertFromActiveGame(priceAlertInfo);
    }

    render() {
        return (
            <div>

                {!this.props.activeGame ?
                    <div>
                        <p className='lead'>Get an email when your game goes on sale.</p>
                        <UserSignUp {...this.props} />
                    </div> :
                    <div>
                        {this.props.activeGame === 'fetching game' ?
                            <Alert color='info'>Connecting to the Sony PlayStation store</Alert> :
                            <GamePreview
                                {...this.props.activeGame}
                                handleClickOnConfirmation={this.savePriceAlert}
                                handleClickOnReset={this.resetActiveGame}
                            />}
                    </div>}

            </div>
        );
    }
}




// {this.state.error &&
//     <Alert color='danger'>
//         <p>
//             <strong>Unable to create your price alert. </strong>
//             Your email is on our "do not send" list.
//                 Contact game.price.tracker@gmail.com if you feel this is in error.
//         </p>
//     </Alert>}

// {this.state.priceAlertSubmitted &&
//     <div>
//         <hr className='my-2' />
//         <Alert
//             color='success'
//             toggle={this.props.handleToggle}
//         >
//             <strong>You're all set!</strong> Make sure you allow messages from <strong>game.price.tracker@gmail.com</strong> or you might miss a sale.
//         </Alert>
//     </div>}

export default PriceAlert;
