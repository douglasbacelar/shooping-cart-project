import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const getSection = document.querySelector('.products');

const getProducts = async () => {
  const product = await fetchProductsList('computador');
  product.forEach((element) => {
    const data = createProductElement(element);
    getSection.appendChild(data);
  });
};
getProducts();

const createLoading = () => {
  const p = document.createElement('p');
  p.className = 'loading';
  p.innerText = 'carregando...';
  return p;
};

console.log(createLoading());
