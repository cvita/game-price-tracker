import React from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';


function ErrorAlert(props) {
  const { errors } = props;
  return (
    <div>
      {errors.length > 0 &&
        <div>
          {errors.map((errorMessage, i) => <Alert color='danger' key={errorMessage + i}><strong>Error:</strong> {errorMessage}</Alert>)}
          <p>Let's go back <Link to='/'>home</Link> and try again!</p>
        </div>}
    </div>
  );
}


export default ErrorAlert;
