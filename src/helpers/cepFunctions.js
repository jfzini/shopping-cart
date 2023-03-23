export const getAddress = async (CEP) => {
  const awesomeAPI = fetch(`https://cep.awesomeapi.com.br/json/${CEP}`);
  const brasilAPI = fetch(`https://brasilapi.com.br/api/cep/v2/${CEP}`);
  const returned = await Promise.any([awesomeAPI, brasilAPI]);
  const data = await returned.json();
  return data
};

export const searchCep = async () => {
  const span = document.querySelector('.cart__address');
  const CEP = document.querySelector('.cep-input').value;
  try {
    const { address, district, city, state } = await getAddress(CEP);
    span.innerHTML = `${address} - ${district} - ${city} - ${state}`
  } catch (error) {
    span.innerHTML = 'CEP não encontrado';
  }
};
