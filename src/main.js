import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement, createCustomElement } from './helpers/shopFunctions';

const productContainer = document.querySelector('.products');

const createEachProduct = async (query) => {
  const productsList = await fetchProductsList(query);
  productsList.forEach((product) => productContainer
    .appendChild(createProductElement(product)));
};

const createAllProducts = async (query) => {
  const loadingP = createCustomElement('p', 'loading', 'carregando...');
  try {
    productContainer.appendChild(loadingP);
    await createEachProduct(query);
    loadingP.className = 'hidden';
  } catch (error) {
    loadingP.innerHTML = 'Erro ao carregar API';
  }
  return null;
};

document.querySelector('.cep-button').addEventListener('click', searchCep);

window.onload = () => {
  createAllProducts('computador');
};
