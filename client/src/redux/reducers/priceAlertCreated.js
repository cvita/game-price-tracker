import * as types from '../constants/actionTypes';
import initialState from '../initialState';


function priceAlertCreated(state = initialState.priceAlertCreated, action) {
  switch (action.type) {
    case types.SUBMIT_PRICE_ALERT_SUCCEEDED:
      return action.payload.ok === 1;
    case types.DELETE_PRICE_ALERT_SUCCEEDED:
    case types.RESET_ACTIVE_GAME:
      return initialState.priceAlertCreated;
    default:
      return state;
  }
}


export default priceAlertCreated;
