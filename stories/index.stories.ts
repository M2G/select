/* eslint-disable */
import { storiesOf } from '@storybook/html';

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
  div.classList.add('wrapper');
  document.body.appendChild(div);

  const select = document.createElement("select");
  select.setAttribute("name", "test");
  select.setAttribute("id", "test");
  for (let j = 0; j < 5; j += 1) {
    const option = document.createElement("option");
    option.setAttribute("value", String(j + 1));
    option.innerHTML = String(j + 1);
    select.appendChild(option);
  }
  div.appendChild(select);

  // set option
  const options = {
    placeholder: 'Choose a theme',
    label: 'Label',
    name: 'foo',
    options: [],
  };

  Select.create(document.getElementById('test'), options);

  return div;
};


const withHTMLSelectElements = () => {
  // create two wrapper in DOM
  const div = document.createElement('div');
  div.classList.add('wrapper');
  document.body.appendChild(div);

  const div2 = document.createElement('div');
  div2.classList.add('wrapper');
  document.body.appendChild(div2);

  const select = document.createElement("select");
  select.setAttribute("name", "test");
  select.classList.add('test');
  select.setAttribute("id", "test");
  for (let j = 0; j < 5; j += 1) {
    const option = document.createElement("option");
    option.setAttribute("value", String(j + 1));
    option.innerHTML = String(j + 1);
    select.appendChild(option);
  }

  const select2 = document.createElement("select");
  select2.setAttribute("name", "test2");
  select2.setAttribute("id", "test2");
  select2.classList.add('test');
  for (let j = 0; j < 10; j += 1) {
    const option2 = document.createElement("option");
    option2.setAttribute("value", String(j + 1));
    option2.innerHTML = String(j + 1);
    select2.appendChild(option2);
  }

  div.appendChild(select);
  div2.appendChild(select2);

  // set option
  const options = {
    placeholder: 'Choose a theme',
    label: 'Label',
    name: 'foo',
    options: [],
  };

  Select.create(document.querySelectorAll('.test'), options);

  return div;
};

const withNoElements = () => {
  // create two wrapper in DOM
  const div = document.createElement('div');
  div.id = 'output';
  document.body.appendChild(div);

  const options = {
    placeholder: 'Choisir une thématique',
    label: 'label',
    name: 'foo',
    options: [
      { value: 5, label: 'foo' },
      { value: 10, label: 'bar' }
    ]
  };

  const instance:any = Select.create(null, options);

  instance.appendTo(document.getElementById('output'));

  return div;
};

// @ts-ignore
storiesOf('Example 1', module).add('with HTML Div Element', () => withHTMLDivElement());
storiesOf('Example 2', module).add('with HTML Div(s) Element(s)', () => withHTMLDivElements());
storiesOf('Example 3', module).add('with HTML Select Element', () => withHTMLSelectElement());
storiesOf('Example 4', module).add('with HTML Select(s) Element(s)', () => withHTMLSelectElements());
storiesOf('Example 5', module).add('No Element', () => withNoElements());
