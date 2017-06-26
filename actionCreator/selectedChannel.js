import actionTypes from 'constants/actionTypes';


export default function selectChannal(channel) {
  return { type: actionTypes.SELECT_CHANNEL, channel };
}
