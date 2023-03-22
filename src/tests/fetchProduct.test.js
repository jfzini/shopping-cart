import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aquii
describe('Teste a função fetchProduct', () => {
  it('fetchProduct é uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });

  it('fetch é chamado ao executar fetchProduct', () => {
    fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProduct', () => {
    fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561');
  });

  it(`retorno da função fetchProduct com o argumento 'MLB1405519561' é uma estrutura de dados igual ao objeto 'product'`, async () => {
    const actual = await fetchProduct('MLB1405519561');
    expect(actual).toEqual(product);
  });

  it(`lança o erro 'ID não informado' quando chamado sem argumentos`, async () => {
    await expect(() => fetchProduct()).rejects.toThrowError('ID não informado');
  }); 
});
