## SELECT COMPONENT

## Usage
```js
// Simple select (with HTMLDivElement)

import Select from '@m2g/select';
import '@m2g/select/dist/style.css';

const options = {
  placeholder: 'Choisir une thématique',
  label: 'label',
  name: 'foo',
  options: [
    { value: 5, label: 'foo' },
    { value: 10, label: 'bar' }
  ]
};

const elem = document.querySelector('#select');
const instance = Select.create(elem, options);

instance.on('CHANGE', result => {
  console.log('RESULT : ', result);
});
```
```js
// Multi select (with HTMLDivElements OR HTMLSelectElements)

import Select from '@m2g/select';
import '@m2g/select/dist/style.css';

const options = {
  placeholder: 'Choisir une thématique',
  label: 'label',
  name: 'foo',
  // for HTMLDivElements
  options: [
    { value: 5, label: 'foo' },
    { value: 10, label: 'bar' }
  ]
  // for HTMLSelectElements
  // options: []
};

const elems = document.querySelectorAll('.select');
const instances = Select.create(elems, options);

instances[0].on('CHANGE', result => console.log('RESULT : ', result));
instances[1].on('CHANGE', result => console.log('RESULT : ', result));

// OR

for (let i = 0; i < instances.length; i += 1) {
  instances[i].on('CHANGE', result => {
    console.log('RESULT : ', result);
  });
}
```

```js
// Simple select (with HTMLSelectElement)

import Select from '@m2g/select';
import '@m2g/select/dist/style.css';

const options = {
  placeholder: 'Choisir une thématique',
  label: 'label',
  name: 'foo',
  options: []
};

const select = document.querySelector('#select2');
const instance = Select.create(select, options);

instance.on('CHANGE', result => {
  console.log('RESULT : ', result);
});
```

```js
// Simple select (without HTMLElement)

import Select from '@m2g/select';
import '@m2g/select/dist/style.css';

const options = {
  placeholder: 'Choisir une thématique',
  label: 'label',
  name: 'foo',
  options: [
    { value: 5, label: 'foo' },
    { value: 10, label: 'bar' }
  ]
};

const instance = Select.create(null, options);

instance.appendTo(document.getElementById('output'));

instance.on('CHANGE', result => {
  console.log('RESULT : ', result);
});
```

## METHODS

### `instance.on('CHANGE', callback);`
### `instance.appendTo(elem)`
### `instance.destroy();`

## License
[MIT](https://tldrlegal.com/license/mit-license)
