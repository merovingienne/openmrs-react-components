import React from 'react';
import { storiesOf } from '@storybook/react';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import List from './List';

import { reducers } from '../../store';

// TODO - Refactor Provider to be global for all stories?

const store = createStore(combineReducers({
  openmrs: reducers
}));

storiesOf('List', module)
  .add('Default', () => {
    return (<Provider store={store}>
      <List />
    </Provider>);
  });
