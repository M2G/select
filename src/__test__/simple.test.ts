/* eslint-disable */

import Select from '../select';
import { SYSTEM_EVENTS } from '../constants';

const { CHANGE } = SYSTEM_EVENTS;

test('test one HTMLSelectElement', () => {
  // Create select programmatically
  const selectList = document.createElement('select');
  selectList.id = 'select';
  document.body.appendChild(selectList)

  const value = [
    { value: 5, label: 'foo' },
    { value: 10, label: 'bar' },
    { value: 15, label: 'foobar' },
    { value: 20, label: 'foobarz' }
  ];

  for (let i = 0; i < value.length; i += 1) {
    const option = document.createElement('option');
    option.value = String(value[i].value);
    option.innerText = value[i].label;
    selectList.appendChild(option);
  }

  // set option
  const options = {
    placeholder: 'Choose a theme',
    label: 'Select Component',
    name: 'foo',
    options: []
  };

  const instances:any = Select.create(document.querySelector('#select'), options);

    // check if select has been successfully created and if existing wrapper, input, dropdown
  expect(instances.elem &&
    instances.wrapper &&
    instances.input &&
    instances.dropdown).toBeTruthy();

  // compare options and list option created programmaticaly
  expect(selectList.options.length).toEqual(instances.dropdown.querySelectorAll('.c-select__dropdown__item').length);

  // simulate click on input
  instances.input.click();

  expect(instances.dropdown.classList[1]).toEqual('is-visible');

  // execute action change
  instances.on(CHANGE, result => result);

  // if event CHANGE existing action on select has been successfully dispatched
  expect(typeof instances.events.events.CHANGE).toEqual('object');

});

test('test one elem', () => {
  // create a wrapper in DOM
  const div = document.createElement('div');
  div.classList.add('wrapper');
  document.body.appendChild(div);

  // set option
  const options = {
    placeholder: 'Choose a theme',
    label: 'Select Component',
    name: 'foo',
    options: [
      { value: 5, label: 'foo' },
      { value: 10, label: 'bar' },
      { value: 15, label: 'foobar' },
      { value: 20, label: 'foobarz' }
    ]
  };

  const instances: any = Select.create(document.querySelector('.wrapper'), options);

  // check if select has been successfully created and if existing wrapper, input, dropdown
  expect(instances.wrapper && instances.input && instances.dropdown).toBeTruthy();

  // empty elem
  expect(instances.elem).toBeTruthy();

  // compare options and list option created programmaticaly
  expect(options.options.length).toEqual(instances.dropdown.querySelectorAll('.c-select__dropdown__item').length);

  // simulate click on input
  instances.input.click();

  expect(instances.dropdown.classList[1]).toEqual('is-visible');

  // execute action change
  instances.on(CHANGE, result => result);

  // if event CHANGE existing action on select has been successfully dispatched
  expect(typeof instances.events.events.CHANGE).toEqual('object');

});
