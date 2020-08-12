/* eslint-disable */
import Select from './select';
import './css/style.scss';

const options = {
  placeholder: 'Choisir une thématique',
  label: 'label',
  name: 'foo',
  options: []
};

const elem = document.getElementById('select');
const instance = Select.create(elem, options);

// @ts-ignore
instance.on('CHANGE', result => {
  console.log('RESULT : ', result);
});
