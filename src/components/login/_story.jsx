import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from "@storybook/addon-knobs/react";

import { Provider } from 'react-redux';
import { createStore , combineReducers } from 'redux';

import { reducers } from '../../store';

import LoginPage from './LoginPage';

// TODO - Refactor Provider to be global for all stories?

const store = createStore(combineReducers({
  openmrs: reducers
}));

storiesOf('Login Page', module)
  .add('Default', () => {
    return (<Provider store={store}>
      <LoginPage
        homeImage={text("homeImage", 'https://talk.openmrs.org/uploads/default/original/2X/f/f1ec579b0398cb04c80a54c56da219b2440fe249.jpg')}
        location={{state: 'state'}}/>
    </Provider>);
  });
