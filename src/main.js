import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import {
  createProductElement,
  createCustomElement,
  createCartProductElement,
  addTotal,
} from './helpers/shopFunctions';
import { saveCartID, getSavedCartIDs, restoreSubtotal } from './helpers/cartFunctions';

// ============================UPPER SCOPE DECLARATIONS============================

const productContainer = document.querySelector('.products');
const cartProducts = document.querySelector('.cart__products');
const CEPInput = document.querySelector('.cep-input');
const CEPBtn = document.querySelector('.cep-button');
const srchInp = document.querySelector('.search-input');
const srchBtn = document.querySelector('.search-button');

// =============================FUNCTIONS=============================

/**
 * Create each product element returned from the API when given a string argument. Works together
 * with createAllProducts function.
 * @param {string} query - search query. This will be the endpoint of the API.
 */
const createEachProduct = async (query) => {
  const productsList = await fetchProductsList(query);
  productsList
    .forEach((product) => productContainer.appendChild(createProductElement(product)));
};

/**
 * Create all products elements returned from the API when given a string argument.
 * @param {string} query - search query. This will be the endpoint of the API.
 */
const createAllProducts = async (query) => {
  const loadingPrgph = createCustomElement('p', 'loading', 'carregando...');
  try {
    productContainer.appendChild(loadingPrgph);
    await createEachProduct(query);
    loadingPrgph.className = 'hidden';
  } catch (error) {
    loadingPrgph.className = 'error';
    loadingPrgph.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
  }
};

/**
 * Add selected elements to cart and save its IDs on local storage
 * @param {object} e - pointer event.
 */
const addToCart = async (e) => {
  const ID = e.target.parentElement.firstElementChild.innerHTML;
  const product = await fetchProduct(ID);
  const section = createCartProductElement(product);
  addTotal(product);
  saveCartID(ID);
  cartProducts.appendChild(section);
};

/**
 * Add an event listener for all 'add to cart' buttons. Should be called after such
 * buttons are created.
 */
const addToCartListener = () => {
  const addToCartBtnsArr = document.querySelectorAll('.product__add');
  addToCartBtnsArr.forEach((btn) => btn.addEventListener('click', addToCart));
};

/**
 * Get the ID's saved on the local storage and restore cart in the same order using Promise.all.
 * Also restores the subtotal value.
 */
const restoreCart = async () => {
  const storedArr = getSavedCartIDs();
  const promises = storedArr.map((ID) => fetchProduct(ID));
  const productDataArr = await Promise.all(promises);
  productDataArr.forEach((product) => {
    const li = createCartProductElement(product);
    cartProducts.appendChild(li);
  });
  restoreSubtotal();
};

/**
 * Search for a new product that is passed in the searchInput by the user, replacing previous ones.
 */
const searchProduct = async () => {
  productContainer.innerHTML = '';
  await createAllProducts(srchInp.value);
  addToCartListener();
};

// =============================SINGLE EVENT LISTENERS=============================

CEPBtn.addEventListener('click', searchCep);
CEPInput.addEventListener('keypress', (e) => (e.key === 'Enter' ? searchCep() : null));
srchBtn.addEventListener('click', async () => searchProduct());
srchInp.addEventListener('keypress', (e) => (e.key === 'Enter' ? searchProduct() : null));

// =============================ONLOAD FUNCTIONS=============================

window.onload = async () => {
  await createAllProducts('computador'); // Load page with a set of computers fetched from the API
  addToCartListener();
  restoreCart();
};
