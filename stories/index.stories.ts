/* eslint-disable */
import { storiesOf } from '@storybook/html';
import { withActions, decorate } from '@storybook/addon-actions';

import Select from "../src/select";
import "../src/css/style.scss";

const withHTMLDivElement = () => {
  // create two wrapper in DOM
  const div = document.createElement('div');
  div.classList.add('wrapper');
  document.body.appendChild(div);

  // set option
  const options = {
    placeholder: 'Choose a theme',
    // eslint-disable-next-line sort-keys
    label: 'Label',
    name: 'foo',
    options: [
      { value: 5, label: 'foo' },
      { value: 10, label: 'bar' },
      { value: 15, label: 'foobar' },
      { value: 20, label: 'foobarz' },
    ],
  };

  Select.create(document.querySelector('.wrapper'), options);

  return div;
};

const withHTMLDivElements = () => {
  // create two wrapper in DOM
  const div = document.createElement('div');
  const div2 = document.createElement('div');

  div.classList.add('wrapper');
  div2.classList.add('wrapper');

  document.body.appendChild(div);
  document.body.appendChild(div2);

  // set option
  const options = {
    placeholder: 'Choose a theme',
    // eslint-disable-next-line sort-keys
    label: 'Label',
    name: 'foo',
    options: [
      { value: 5, label: 'foo' },
      { value: 10, label: 'bar' },
      { value: 15, label: 'foobar' },
      { value: 20, label: 'foobarz' },
    ],
  };

  Select.create(document.querySelectorAll('.wrapper'), options);

  return div;
};

const withHTMLSelectElement = () => {
  // create two wrapper in DOM
  const div = document.createElement('div');
  const div2 = document.createElement('div');

  div.classList.add('wrapper');
  div2.classList.add('wrapper');

  document.body.appendChild(div);
  document.body.appendChild(div2);

  // set option
  const options = {
    placeholder: 'Choose a theme',
    // eslint-disable-next-line sort-keys
    label: 'Label',
    name: 'foo',
    options: [
      { value: 5, label: 'foo' },
      { value: 10, label: 'bar' },
      { value: 15, label: 'foobar' },
      { value: 20, label: 'foobarz' },
    ],
  };

  Select.create(document.querySelectorAll('.wrapper'), options);

  return div;
};

// @ts-ignore
storiesOf('Example 1', module).add('with HTML Div Element', () => withHTMLDivElement());
storiesOf('Example 2', module).add('with HTML Div(s) Elements', () => withHTMLDivElements());
storiesOf('Example 3', module).add('with HTML Select Element', () => withHTMLSelectElement());
