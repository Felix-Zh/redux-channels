import React from 'react';
import cn from 'classnames';
import constants from 'constants/constants';
import styles from '../index.scss';


export default class Tab extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { props, props: { activeChannel } } = this;

    return (
      <div>
        <TabHead
          list={constants.channels}
          onItemClick={props.onTabHeadItemClick}
          activeItem={activeChannel}
        />
        <TabContent
          {...props}
          onRefreshButtonClick={() => props.onRefreshButtonClick(activeChannel)}
        />
      </div>
    );
  }
}

// sub components
const TabHead = ({ list, activeItem, onItemClick }) => {
  if (!list) {
    return;
  }

  return (
    <ul className={styles['tab-head']}>
      {list.map(item => (
        <li
          key={item}
          className={cn(styles['tab-head-item'], { [styles['tab-head-item-active']]: item === activeItem })}
          onClick={() => onItemClick(item)}
        >{item}
        </li>
      ))}
    </ul>
  );
};

const TabContent = ({ isFetching, isInvalid, posts, onRefreshButtonClick }) => {
  return (
    <div className={styles['tab-content']}>
      <button
        onClick={onRefreshButtonClick}
        disabled={isFetching}
        className={styles['refresh-button']}
      >Refresh</button>
      {isInvalid && <span className={styles['refresh-notice']}>💡new items founded, click the button to refresh.</span>}
      {isFetching && <div className={styles['loading']}>loading...</div>}
      { !isFetching && !posts.length && 'Empty.' }
      {
        !!posts.length && <ContentList isFetching={isFetching} data={posts} />
      }
    </div>
  );
};

const ContentList = ({ data, isFetching }) => (
  <ul className={cn(styles['content-list'], { [styles['fetching']]: isFetching })}>
    {
      data.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))
    }
  </ul>
);
