import { removeCartID } from './cartFunctions';

// Esses comentários que estão antes de cada uma das funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições!

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'product__image';
  img.src = imageSource.replace('I.jpg', 'O.jpg');
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
export const createCustomElement = (element, className, innerText = '') => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
export const getIdFromProduct = (product) => (
  product.querySelector('span.product__id').innerText
);

/**
 * Subtracts a respective product price of the subtotal display element
 * @param {Element} add - Product element which price should be subtracted.
 */
const subtractTotal = (element) => {
  const subtrahendElem = element.querySelector('.product__price__value');
  const subtrahend = Number(subtrahendElem.innerHTML).toFixed(2);
  const subTotalElem = document.querySelector('.total-price');
  const subTotal = Number(subTotalElem.innerHTML);
  subTotalElem.innerHTML = (subTotal - subtrahend).toFixed(2);
};

/**
 * Adds a respective product price to the subtotal display element
 * @param {object} product - Product object which price should be added.
 */
export const addTotal = (product) => {
  const addNumber = product.price;
  const subTotalElem = document.querySelector('.total-price');
  const subTotal = Number(subTotalElem.innerHTML);
  subTotalElem.innerHTML = (subTotal + addNumber).toFixed(2);
};

/**
 * Função que remove o produto do carrinho.
 * @param {Element} li - Elemento do produto a ser removido do carrinho.
 * @param {string} id - ID do produto a ser removido do carrinho.
 */
const removeCartProduct = (li, id) => {
  subtractTotal(li);
  li.remove();
  removeCartID(id);
};

/**
 * Função responsável por criar e retornar um product do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @param {string} product.pictures - Imagens do produto.
 * @returns {Element} Elemento de um product do carrinho.
 */
export const createCartProductElement = ({ id, title, price, pictures }) => {
  const li = document.createElement('li');
  const fixedPrice = Number(price).toFixed(2);
  li.className = 'cart__product';
  const imgContainer = createCustomElement('div', 'cart__product__image-container');

  const img = createProductImageElement(pictures[0].url);
  imgContainer.appendChild(img);

  const img2 = createProductImageElement((pictures[1] || pictures[0]).url);
  imgContainer.appendChild(img2);

  li.appendChild(imgContainer);

  const infoContainer = createCustomElement('div', 'cart__product__info-container');
  infoContainer.appendChild(createCustomElement('span', 'product__title', title));
  const priceElem = createCustomElement('span', 'product__price', 'R$ ');
  priceElem.appendChild(createCustomElement('span', 'product__price__value', fixedPrice));
  infoContainer.appendChild(priceElem);

  li.appendChild(infoContainer);

  const removeButton = createCustomElement(
    'i',
    'material-icons cart__product__remove',
    'delete',
  );
  li.appendChild(removeButton);

  li.addEventListener('click', () => removeCartProduct(li, id));
  return li;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @param {number} product.price - Preço do produto.
 * @returns {Element} Elemento de produto.
 */
export const createProductElement = ({ id, title, thumbnail, price }) => {
  const section = document.createElement('section');
  const fixedPrice = price.toFixed(2);
  section.className = 'product';

  section.appendChild(createCustomElement('span', 'product__id', id));

  const thumbnailContainer = createCustomElement('div', 'img__container');
  thumbnailContainer.appendChild(createProductImageElement(thumbnail));
  section.appendChild(thumbnailContainer);

  section.appendChild(createCustomElement('span', 'product__title', title));

  const priceElem = createCustomElement('span', 'product__price', 'R$ ');
  priceElem.appendChild(createCustomElement('span', 'product__price__value', fixedPrice));
  section.appendChild(priceElem);

  const cartButton = createCustomElement(
    'button',
    'product__add',
    'Adicionar ao carrinho!',
  );
  section.appendChild(cartButton);

  return section;
};
