import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs/react';

import HomePage from './HomePage';
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

import { reducers } from '../../store';

// TODO - Refactor Provider to be global for all stories?

const store = createStore(combineReducers({
  openmrs: reducers
}));

storiesOf('Home Page', module)
  .add('Default', () => {
    return (<Provider store={store}>
      <HomePage
        homeImage={text("homeImage", 'https://talk.openmrs.org/uploads/default/original/2X/f/f1ec579b0398cb04c80a54c56da219b2440fe249.jpg')}
      />
    </Provider>);
  });
