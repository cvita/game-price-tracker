import React from 'react';
import { Alert, Progress } from 'reactstrap';


function ProgressBarAndMessage(props) {
    var message = props.value < 35 ?
        'Connecting to the Sony PlayStation store' :
        'Getting price info';

    return (
        <div className='progressBarAndMessage'>
            <Alert color='info'>
                {message}
            </Alert>
            <Progress
                value={props.value}
                color='info'
            />
        </div>
    );
}


function UserSignUpComplete(props) {
    return (
        <div>
            <Alert
                color='success'
                toggle={props.handleToggle}
            >
                <strong>You're all set!</strong> Make sure you allow messages from <strong>game.price.tracker@gmail.com</strong> or you might miss a sale.
            </Alert>
        </div>
    );
}

const UserSignUpFeedback = { UserSignUpComplete, ProgressBarAndMessage };
export default UserSignUpFeedback;