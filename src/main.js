import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement, createCustomElement } from './helpers/shopFunctions';
const productContainer = document.querySelector('.products');

const createEachProduct = async (query) => {
  const productsList = await fetchProductsList(query);
  productsList.forEach((product) => productContainer.appendChild(createProductElement(product)));
}

const createAllProducts = async (query) => {
  const loadingP = createCustomElement('p', 'loading', 'carregando...');
  productContainer.appendChild(loadingP);
  await createEachProduct(query);
  loadingP.className = 'hidden';
}

document.querySelector('.cep-button').addEventListener('click', searchCep);

window.onload = () => {
  createAllProducts('computador');
}
