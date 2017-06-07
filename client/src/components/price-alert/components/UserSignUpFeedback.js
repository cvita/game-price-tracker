import React from 'react';
import { Alert, Button, Progress } from 'reactstrap';


function ProgressBarAndMessage(props) {
    var message = props.value < 50 ?
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


// Todo: create and use gamepricetracker@gmail.com
function UserSignUpComplete(props) {
    return (
        <div>
            <Alert color='success'>
                <strong>You're all set!</strong> Make sure you allow messages from <strong>nodeuser123@gmail.com</strong> or you might miss a sale.
            </Alert>
            <Button
                className='successComponentClearButton'
                onClick={props.handleClick}
                color='danger'
                outline
            >
                Clear
            </Button>
        </div>
    );
}

const UserSignUpFeedback = { UserSignUpComplete, ProgressBarAndMessage };
export default UserSignUpFeedback;