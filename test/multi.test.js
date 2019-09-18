import Select from '../src/js/index';
import { SYSTEM_EVENTS } from '../src/js/constants';

const { CHANGE } = SYSTEM_EVENTS;

test('test two HTMLDivElements', () => {
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
    label: 'Select Component',
    name: 'foo',
    options: [
      { value: 5, label: 'foo' },
      { value: 10, label: 'bar' },
      { value: 15, label: 'foobar' },
      { value: 20, label: 'foobarz' }
    ]
  };

  const instances = Select.init(document.querySelectorAll('.wrapper'), options);

  for (let i = 0; i < instances.length; i += 1) {
    // check if select has been successfully created and if existing wrapper, input, dropdown
    expect(instances[i].wrapper && instances[i].input && instances[i].dropdown).toBeTruthy();

    // empty elem
    expect(instances[i].elem).toBeTruthy();

    // compare options and list option created programmaticaly
    expect(options.options.length).toEqual(instances[i].dropdown.querySelectorAll('.c-select__dropdown__item').length);

    // simulate click on input
    // NB: you shouldn't attach event listeners in a for loop (only for test)
    instances[i].input.click();

    expect(instances[i].dropdown.classList[1]).toEqual('is-visible');

    // execute action change
    instances[i].on(CHANGE, result => result);

    // if event CHANGE existing action on select has been successfully dispatched
    expect(typeof instances[i].events.events.CHANGE).toEqual('object');
  }
});


test('test two HTMLSelectElement', () => {
  // create first select
  const selectList = document.createElement('select');
  selectList.classList.add('select');
  document.body.appendChild(selectList);

  const value = [
    { value: 5, label: 'foo' },
    { value: 10, label: 'bar' },
    { value: 15, label: 'foobar' },
    { value: 20, label: 'foobarz' }
  ];

  for (let i = 0; i < value.length; i += 1) {
    const option = document.createElement('option');
    option.value = value[i].value;
    option.innerText = value[i].label;
    selectList.appendChild(option);
  }

  // create second select
  const selectList2 = document.createElement('select');
  selectList2.classList.add('select');
  document.body.appendChild(selectList2);

  for (let i = 0; i < value.length; i += 1) {
    const option = document.createElement('option');
    option.value = value[i].value;
    option.innerText = value[i].label;
    selectList2.appendChild(option);
  }

  // set option
  const options = {
    placeholder: 'Choose a theme',
    label: 'Select Component',
    name: 'foo',
    options: []
  };

  const instances = Select.init(document.querySelectorAll('.select'), options);

  for (let i = 0; i < instances.length; i += 1) {
    // check if select has been successfully created and if existing wrapper, input, dropdown
    expect(instances[i].wrapper && instances[i].input && instances[i].dropdown).toBeTruthy();

    // empty elem
    expect(instances[i].elem).toBeTruthy();

    // compare options and list option created programmaticaly
    expect(options.options.length).toEqual(instances[i].dropdown.querySelectorAll('.c-select__dropdown__item').length);

    // simulate click on input
    // NB: you shouldn't attach event listeners in a for loop (only for test)
    instances[i].input.click();

    expect(instances[i].dropdown.classList[1]).toEqual('is-visible');

    // execute action change
    instances[i].on(CHANGE, result => result);

    // if event CHANGE existing action on select has been successfully dispatched
    expect(typeof instances[i].events.events.CHANGE).toEqual('object');
  }
});