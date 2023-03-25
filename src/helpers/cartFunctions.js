/**
 * Função que retorna todos os itens do carrinho salvos no localStorage.
 * @returns {Array} Itens de ids salvos do carrinho ou array vazio.
 */
export const getSavedCartIDs = () => {
  const cartProducts = localStorage.getItem('cartProducts');
  return cartProducts ? JSON.parse(cartProducts) : [];
};

/**
 * Saves subtotal amount to local storage.
 */
const saveSubTotal = () => {
  const subTotalElem = document.querySelector('.total-price');
  const subTotal = subTotalElem.innerHTML;
  localStorage.setItem('subTotal', subTotal);
};

/**
  * Restores subtotal amount from local storage and displays it on the respective element.
 */
export const restoreSubtotal = () => {
  const SavedSubTotal = localStorage.getItem('subTotal');
  const subTotalElem = document.querySelector('.total-price');
  const subTotal = SavedSubTotal || 0;
  subTotalElem.innerHTML = subTotal;
};

/**
 * Função que adiciona um product ao carrinho.
 * @param {string} id - ID do product a ser adicionado.
 */
export const saveCartID = (id) => {
  if (!id) throw new Error('Você deve fornecer um ID');

  const cartProducts = getSavedCartIDs();
  const newCartProducts = [...cartProducts, id];
  localStorage.setItem('cartProducts', JSON.stringify(newCartProducts));
  saveSubTotal();
};

/**
 * Função que remove um product do carrinho.
 * @param {string} id - ID do product a ser removido.
 */
export const removeCartID = (id) => {
  if (!id) throw new Error('Você deve fornecer um ID');

  const cartProducts = [...getSavedCartIDs()];
  const indexProduct = cartProducts.indexOf(id);
  cartProducts.splice(indexProduct, 1);
  localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  saveSubTotal();
};
