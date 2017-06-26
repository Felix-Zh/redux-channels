import { combineReducers } from 'redux';
import selectedChannel from './selectedChannel';
import channelPosts from './channelPosts';


const reducers = combineReducers({
  selectedChannel,
  channelPosts
});

export default reducers;
