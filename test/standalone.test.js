import Select from '../src';
import { SYSTEM_EVENTS } from '../src/constants';

const { CHANGE } = SYSTEM_EVENTS;

test('test without HTMLDivElement', () => {
  // create a wrapper in DOM
  const div = document.createElement('div');
  div.id = 'ouput';
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

  const instances = Select.init(null, options);

  instances.appendTo(document.getElementById('output'));

  // check if select has been successfully created and if existing wrapper, input, dropdown
  expect(instances.wrapper && instances.input && instances.dropdown).toBeTruthy();

  // empty elem
  expect(instances.elem).toBeNull();

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
