import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import {
  createProductElement,
  createCustomElement,
  createCartProductElement,
} from './helpers/shopFunctions';
import { saveCartID } from './helpers/cartFunctions';

// UPPER SCOPE DECLARATIONS
const productContainer = document.querySelector('.products');
const cartProducts = document.querySelector('.cart__products');

// FUNCTIONS
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
    loadingP.className = 'error';
    loadingP.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
  }
};

// EVENT LISTENERS
document.querySelector('.cep-button').addEventListener('click', searchCep);

// ONLOAD FUNCTIONS
window.onload = async () => {
  await createAllProducts('computador');
  const addToCartBtnsArr = document.querySelectorAll('.product__add');
  addToCartBtnsArr.forEach((btn) => btn.addEventListener('click', async (e) => {
    const ID = e.target.parentElement.firstElementChild.innerHTML;
    const productData = await fetchProduct(ID);
    const li = createCartProductElement(productData);
    saveCartID(ID);
    cartProducts.appendChild(li);
  }));
};
