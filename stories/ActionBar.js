import React, { Fragment, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ActionBar from '../src/components/ActionBar';
import Readme from '../docs/ActionBar.md';

const defaultProps = {
  messages: [],
  clearList: () => null,
  focus: action('did focus'),
  baseClassName: 'action-bar',
  id: 'view-showing-actionbar',
  formatter: null,
  visibleDuration: 2000,
};

const BasicActionBar = props => {
  const newProps = { ...defaultProps, ...props };
  return <ActionBar {...newProps} />;
};

const DefaultActionBar = props => {
  const [messages, setMessages] = useState(props.messages || []);
  return (
    <Fragment>
      <button
        type="button"
        onClick={() => {
          setMessages([...messages, `new message ${messages.length + 1}`]);
        }}>
        Display Message
      </button>
      <BasicActionBar
        {...props}
        clearList={() => {
          setMessages([]);
        }}
        messages={messages}
      />
    </Fragment>
  );
};

storiesOf('ActionBar', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add('default with no messages', () => <DefaultActionBar />)
  .add('with one message', () => (
    <DefaultActionBar messages={['One Test message']} />
  ));
