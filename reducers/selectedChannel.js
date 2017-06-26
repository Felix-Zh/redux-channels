import actions from 'constants/actionTypes';


export default (state = 'Captain America', action) => {
  switch (action.type) {
    case actions.SELECT_CHANNEL:
      return action.channel;
    default:
      return state;
  }
};
