import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import {
  createProductElement,
  createCustomElement,
  createCartProductElement,
  addTotal,
} from './helpers/shopFunctions';
import { saveCartID, getSavedCartIDs, getSavedSubTotal } from './helpers/cartFunctions';

// ============================UPPER SCOPE DECLARATIONS============================
const productContainer = document.querySelector('.products');
const cartProducts = document.querySelector('.cart__products');
const CEPInput = document.querySelector('.cep-input');
const CEPBtn = document.querySelector('.cep-button');
const srcInpt = document.querySelector('.search-input');
const srcBtn = document.querySelector('.search-button');

// ============================FUNCTIONS============================
const createEachProduct = async (query) => {
  const productsList = await fetchProductsList(query);
  productsList
    .forEach((product) => productContainer.appendChild(createProductElement(product)));
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

// add selected elements to cart and save its IDs on local storage
const addToCart = async (e) => {
  const ID = e.target.parentElement.firstElementChild.innerHTML;
  const productData = await fetchProduct(ID);
  const section = createCartProductElement(productData);
  const addNumber = productData.price;
  addTotal(addNumber);
  saveCartID(ID);
  cartProducts.appendChild(section);
};

const addToCartListener = () => {
  const addToCartBtnsArr = document.querySelectorAll('.product__add');
  addToCartBtnsArr.forEach((btn) => btn.addEventListener('click', addToCart));
};

// get the ID's saved on the local storage and restore cart in the same order using Promise.all
const restoreCart = async () => {
  const storedArr = getSavedCartIDs();
  const promises = storedArr.map((ID) => fetchProduct(ID));
  const productDataArr = await Promise.all(promises);
  productDataArr.forEach((product) => {
    const li = createCartProductElement(product);
    cartProducts.appendChild(li);
  });
  getSavedSubTotal();
};

const searchProduct = async () => {
  productContainer.innerHTML = '';
  await createAllProducts(srcInpt.value);
  addToCartListener();
};

// ============================SINGLE EVENT LISTENERS============================
CEPBtn.addEventListener('click', searchCep);
CEPInput.addEventListener('keypress', (e) => (e.key === 'Enter' ? searchCep() : null));
srcBtn.addEventListener('click', async () => searchProduct());
srcInpt.addEventListener('keypress', (e) => (e.key === 'Enter' ? searchProduct() : null));

// ============================ONLOAD FUNCTIONS============================
window.onload = async () => {
  await createAllProducts('computador'); // Load the page with a set of computers fetched from the API
  addToCartListener();
  restoreCart();
};
