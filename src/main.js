import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';

const createAllProducts = async () => {
  const productContainer = document.querySelector('.products');
  const productsList = await fetchProductsList('computador');
  productsList.forEach((product) => productContainer.appendChild(createProductElement(product)));

}

document.querySelector('.cep-button').addEventListener('click', searchCep);

window.onload = () => {
  createAllProducts();
}
