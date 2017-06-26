import actionTypes from 'constants/actionTypes';
import store from '../store';

export function invalidChannel(channel) {
  return { type: actionTypes.INVALID_CHANNEL, channel };
}

function expiredChannel(channel) {
  return {
    type: actionTypes.EXPIRED_CHANNEL,
    channel,
    timer: setTimeout(() => store.dispatch(invalidChannel(channel)), 10000)
  };
}

function requestChannel(channel) {
  return { type: actionTypes.REQUEST_CHANNEL, channel };
}

function fetchChannel(channel) {
  return (dispatch, getState) => {
    dispatch(requestChannel(channel));

    return fetch(`http://localhost:4001/channel/${channel}`)
      .then(res => res.json())
      .then(posts => {
        const targetChannel = getState().channelPosts[channel];

        clearTimeout(targetChannel.invalidTimer);
        dispatch(receiveChannel(channel, posts));
        dispatch(expiredChannel(channel));
      });
  };
}

export function shouldFetchPosts(state, channel) {
  const targetChannel = state.channelPosts[channel];

  if (!targetChannel) {
    return true;
  } else if (targetChannel.isFetching) {
    return false;
  } else {
    return targetChannel.isInvalid;
  }
}

export function fetchChannelIfNeeded(channel) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), channel)) {
      return dispatch(fetchChannel(channel));
    } else {
      return Promise.resolve();
    }
  };
}

export function receiveChannel(channel, posts) {
  return { type: actionTypes.RECEIVE_CHANNEL, channel, posts, modifiedAt: Date.now() };
}
