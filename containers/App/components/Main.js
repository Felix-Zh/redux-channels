import React from 'react';
import { connect } from 'react-redux';
import Tab from './Tab';
import selectedChannel from '../../../actionCreator/selectedChannel';
import * as channelPosts from '../../../actionCreator/channelPosts';
import styles from '../index.scss';


class Main extends React.Component {
  constructor(props) {
    super(props);

    this.handleTabHeadItemClick = this.handleTabHeadItemClick.bind(this);
    this.handleRefreshButtonClick = this.handleRefreshButtonClick.bind(this);
  }

  componentDidMount() {
    const { props } = this;

    props.dispatch(channelPosts.fetchChannelIfNeeded(props.selectedChannel));
  }

  componentWillReceiveProps(nextProps) {
    const { props } = this;

    if (props.selectedChannel !== nextProps.selectedChannel) {
      props.dispatch(channelPosts.fetchChannelIfNeeded(nextProps.selectedChannel));
    }
  }

  handleTabHeadItemClick(channel) {
    const { dispatch } = this.props;

    dispatch(selectedChannel(channel));
  }

  handleRefreshButtonClick(channel) {
    const { dispatch } = this.props;

    dispatch(channelPosts.invalidChannel(channel));
    dispatch(channelPosts.fetchChannelIfNeeded(channel));
  }

  render() {
    const { props } = this;

    return (
      <div>
        <h1>Channels</h1>
        <Tab
          {...props}
          activeChannel={props.selectedChannel}
          onTabHeadItemClick={channel => this.handleTabHeadItemClick(channel)}
          onRefreshButtonClick={channel => this.handleRefreshButtonClick(channel)}
        />
        <p
          className={styles['last-update']}
        >
          Last Update: {props.lastModified ? new Date(props.lastModified).toLocaleString() : '-'}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const
    { selectedChannel } = state,
    { isFetching,
      posts,
      lastModified,
      isInvalid
    } = state.channelPosts[selectedChannel] || { isFetching: true, posts: [] };

  return {
    selectedChannel: selectedChannel,
    posts,
    isFetching,
    lastModified,
    isInvalid
  };
};

export default connect(mapStateToProps)(Main);
