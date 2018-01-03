import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import store from '../../redux/store';

import { Alert, Button, Input, InputGroup, InputGroupButton } from 'reactstrap';


class EmailForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { emailInput: '' };
  }
  handleChange(event) {
    const value = event.target.value;
    this.setState({ emailInput: value });
  }
  handleSubmit(event) {
    event.preventDefault();
    const { emailInput } = this.state;
    if (emailInput !== '') {
      this.props.checkBlacklist(emailInput);
      this.setState({ emailInput: '' }); // Prevent multiple clicks
    }
  }
  render() {
    const { emailInput } = this.state;
    const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validEmail = emailRegExp.test(emailInput);
    return (
      <form>
        <InputGroup>
          <Input
            onChange={this.handleChange}
            value={emailInput}
            type='email'
            placeholder='Email for price alert'
          />
          <InputGroupButton>
            <Button
              onClick={this.handleSubmit}
              disabled={!validEmail}
              type='submit'
              color='primary'
            >
              Submit
            </Button>
          </InputGroupButton>
        </InputGroup>
      </form>
    );
  }
}

class ConfirmAndResetButtons extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { submitted: false };
  }
  handleClick() {
    this.props.handleClick();
    this.setState({ submitted: true });
  }
  render() {
    const { submitted } = this.state;
    return (
      <div>
        <Button
          className='gamePriceTrackerButton'
          onClick={this.handleClick}
          disabled={submitted}
          color='success'
        >
          Sounds good!
        </Button>

        {!submitted && (
          <Link to='/'>
            <Button
              className='gamePriceTrackerButton'
              color='danger'
              outline
            >
              Nevermind
            </Button>
          </Link>)}
      </div>
    );
  }
}

const PriceAlertUi = props => {
  const { userInfo, priceAlertCreated, createPriceAlert } = props;
  const { price } = props.activeGame;
  const { email } = props.userInfo;
  const expiration = new Date(new Date().getTime() + 10886400000).toDateString().slice(3);

  const stageSubmit = !email;
  const stageConfirm = !userInfo.onBlacklist && !priceAlertCreated;
  const stageFailure = userInfo.onBlacklist;
  const stageSuccess = priceAlertCreated;

  if (stageSubmit) {
    return (
      <div>
        <p>Enter an email address to receive a message if the price drops below ${price} before {expiration}.</p>
        <EmailForm {...props} />
      </div>
    );
  }
  if (stageConfirm) {
    return (
      <div>
        <p>You will receive a message at <strong>{email}</strong> if the price drops below ${price} before {expiration}.</p>
        <ConfirmAndResetButtons handleClick={() => createPriceAlert(userInfo)} />
      </div>
    );
  }
  if (stageFailure) {
    return (
      <Alert className='alertMessage' toggle={() => store.dispatch(push('/'))} color='danger'>
        <h4 className='alert-heading'>Unable to create your price alert</h4>
        <p>Your email is on our "do not send" list</p>
      </Alert>
    );
  }
  if (stageSuccess) {
    return (
      <Alert className='alertMessage' toggle={() => store.dispatch(push('/'))} color='success'>
        <h4 className='alert-heading'>You're all set!</h4>
        <p>Make sure you allow messages from <strong>game.price.tracker@gmail.com</strong> or you might miss a sale.</p>
      </Alert>
    );
  }
  return null;
};


export default PriceAlertUi;
