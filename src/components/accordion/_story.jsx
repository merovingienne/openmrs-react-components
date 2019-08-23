import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs/react';

import Accordion from './Accordion';

const renderChildContent = () => {
  return (<div style={{ padding: '20px' }}>
    <div style={{ fontSize: '1.5rem' }}>
      Test child content title
    </div>
    <div style={{marginTop: '10px'}}>
      You can pass another react component as a child to be rendered when this accordion is opened.
    </div>
  </div>);
};


storiesOf('Accordion', module)
  .add('Default', () => {
    return (<Accordion
      border={boolean("Border", true)}
      children={renderChildContent()}
      open={boolean("Open", false)}
      title={text("Title", 'Sample Title')}
    />);
  });
