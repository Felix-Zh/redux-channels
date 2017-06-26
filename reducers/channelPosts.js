import actions from 'constants/actionTypes';


const posts = (state = {
  isFetching: false,
  isInvalid: false,
  invalidTimer: null,
  posts: []
}, action) => {
  switch (action.type) {
    case actions.INVALID_CHANNEL:
      return Object.assign({}, state, { isInvalid: true });
    case actions.EXPIRED_CHANNEL:
      return Object.assign({}, state, { invalidTimer: action.timer });
    case actions.REQUEST_CHANNEL:
      return Object.assign({}, state, { isFetching: true, isInvalid: false });
    case actions.RECEIVE_CHANNEL:
      return Object.assign({}, state, {
        isFetching: false,
        isInvalid: false,
        posts: action.posts,
        lastModified: action.modifiedAt
      });
  }
};

export default (state = {}, action) => {
  switch (action.type) {
    case actions.INVALID_CHANNEL:
    case actions.EXPIRED_CHANNEL:
    case actions.REQUEST_CHANNEL:
    case actions.RECEIVE_CHANNEL:
      return Object.assign({}, state, {
        [action.channel]: posts(state[action.channel], action)
      });
    default:
      return state;
  }
};

/*
*
* {
*    isFetching: false,
*    isInvalid: false,
*    lastModified: Date.now(),
*    posts: []
* }
*
* */
