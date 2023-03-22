import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';

const productsList = await fetchProductsList('computador');
productsList.forEach(async (product) => await createProductElement(product));

document.querySelector('.cep-button').addEventListener('click', searchCep);
