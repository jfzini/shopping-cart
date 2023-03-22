export const fetchProduct = () => {
  // seu código aqui
};

export const fetchProductsList = async (query) => {
  if (!query) {
    return Promise.reject(new Error('Termo de busca não informado'));
  }
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
  const data = await response.json();
  return data.results;
};
