import { configure, addDecorator  } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';

// global knobs decorator
addDecorator(withKnobs);


const req = require.context("../src/components", true, /_story\.jsx$/);

function loadStories(){
  req.keys().forEach(req);
}

configure(loadStories, module);
